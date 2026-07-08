import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_COOKIE_NAME, OAUTH_STATE_COOKIE_NAME, SESSION_DURATION_SECONDS, isAllowedAdminEmail, signAdminSession } from '@/lib/auth'
import { exchangeCodeForIdentity } from '@/lib/googleOAuth'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl
  const loginUrl = (error: string) => new URL(`/admin/login?error=${error}`, origin)

  if (searchParams.get('error')) {
    return NextResponse.redirect(loginUrl('access_denied'))
  }

  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const expectedNonce = req.cookies.get(OAUTH_STATE_COOKIE_NAME)?.value

  if (!code || !state || !expectedNonce) {
    return NextResponse.redirect(loginUrl('invalid_request'))
  }

  const [nonce, encodedFrom] = state.split(':')
  if (nonce !== expectedNonce) {
    return NextResponse.redirect(loginUrl('invalid_state'))
  }

  const from = encodedFrom ? decodeURIComponent(encodedFrom) : '/admin'
  const safeFrom = from.startsWith('/admin') ? from : '/admin'

  try {
    const redirectUri = new URL('/api/auth/google/callback', origin).toString()
    const identity = await exchangeCodeForIdentity(code, redirectUri)

    if (!identity.emailVerified || !isAllowedAdminEmail(identity.email)) {
      return NextResponse.redirect(loginUrl('not_allowed'))
    }

    const token = await signAdminSession(identity.email)
    const res = NextResponse.redirect(new URL(safeFrom, origin))
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      // 'lax' (not 'strict'): this cookie is set mid-redirect-chain from Google's
      // cross-site callback, and the follow-up redirect to /admin is still part of
      // that same chain — a Strict cookie would be dropped on that next request.
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_DURATION_SECONDS,
    })
    res.cookies.set(OAUTH_STATE_COOKIE_NAME, '', { path: '/', maxAge: 0 })
    return res
  } catch {
    return NextResponse.redirect(loginUrl('google_error'))
  }
}
