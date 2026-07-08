import { SignJWT, jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'

export const ADMIN_COOKIE_NAME = 'liora_admin_session'
export const OAUTH_STATE_COOKIE_NAME = 'liora_oauth_state'
export const SESSION_DURATION_SECONDS = 60 * 60 * 8 // 8 hours

function getSecretKey() {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('Please define JWT_SECRET in .env.local')
  }
  return new TextEncoder().encode(secret)
}

export interface AdminSessionPayload {
  email: string
  role: 'admin'
}

export async function signAdminSession(email: string): Promise<string> {
  return new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey())
}

export async function verifyAdminSession(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    if (payload.role !== 'admin' || typeof payload.email !== 'string') return null
    return { email: payload.email, role: 'admin' }
  } catch {
    return null
  }
}

/** For use in Route Handlers (app/api/**) to check the caller is an authenticated admin. */
export async function requireAdmin(req: NextRequest): Promise<AdminSessionPayload | null> {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value
  if (!token) return null
  return verifyAdminSession(token)
}

/** Google accounts allowed to sign in as admin, from the comma-separated ADMIN_EMAILS env var. */
export function isAllowedAdminEmail(email: string): boolean {
  const allowed = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
  return allowed.includes(email.toLowerCase())
}
