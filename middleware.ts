import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value
  const session = token ? await verifyAdminSession(token) : null

  if (!session) {
    const loginUrl = new URL('/admin/login', req.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
