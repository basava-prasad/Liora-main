import { createRemoteJWKSet, jwtVerify } from 'jose'

const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token'
const GOOGLE_JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'))

function getClientId() {
  const id = process.env.GOOGLE_CLIENT_ID
  if (!id) throw new Error('Please define GOOGLE_CLIENT_ID in .env.local')
  return id
}

function getClientSecret() {
  const secret = process.env.GOOGLE_CLIENT_SECRET
  if (!secret) throw new Error('Please define GOOGLE_CLIENT_SECRET in .env.local')
  return secret
}

export function buildGoogleAuthUrl(redirectUri: string, state: string): string {
  const url = new URL(GOOGLE_AUTH_ENDPOINT)
  url.searchParams.set('client_id', getClientId())
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', 'openid email profile')
  url.searchParams.set('state', state)
  url.searchParams.set('access_type', 'online')
  url.searchParams.set('prompt', 'select_account')
  return url.toString()
}

export interface GoogleIdentity {
  email: string
  emailVerified: boolean
  name?: string
}

export async function exchangeCodeForIdentity(
  code: string,
  redirectUri: string
): Promise<GoogleIdentity> {
  const tokenRes = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: getClientId(),
      client_secret: getClientSecret(),
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  })

  if (!tokenRes.ok) {
    throw new Error('Failed to exchange authorization code with Google')
  }

  const tokenData = (await tokenRes.json()) as { id_token?: string }
  if (!tokenData.id_token) {
    throw new Error('Google did not return an id_token')
  }

  const { payload } = await jwtVerify(tokenData.id_token, GOOGLE_JWKS, {
    issuer: ['https://accounts.google.com', 'accounts.google.com'],
    audience: getClientId(),
  })

  if (typeof payload.email !== 'string') {
    throw new Error('Google id_token did not include an email')
  }

  return {
    email: payload.email,
    emailVerified: payload.email_verified === true,
    name: typeof payload.name === 'string' ? payload.name : undefined,
  }
}
