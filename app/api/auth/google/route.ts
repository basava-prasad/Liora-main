import { NextResponse, type NextRequest } from 'next/server'
import { OAUTH_STATE_COOKIE_NAME } from '@/lib/auth'
import { buildGoogleAuthUrl } from '@/lib/googleOAuth'

export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get('from')
  const safeFrom = from && from.startsWith('/admin') ? from : '/admin'

  const nonce = crypto.randomUUID()
  const state = `${nonce}:${encodeURIComponent(safeFrom)}`
  const redirectUri = new URL('/api/auth/google/callback', req.nextUrl.origin).toString()

  const res = NextResponse.redirect(buildGoogleAuthUrl(redirectUri, state))
  res.cookies.set(OAUTH_STATE_COOKIE_NAME, nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  })
  return res
}
