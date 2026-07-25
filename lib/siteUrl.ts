/**
 * siteUrl.ts
 *
 * Single source of truth for the canonical site URL.
 *
 * Set  NEXT_PUBLIC_SITE_URL  in your environment:
 *   Development  →  http://localhost:3000
 *   Production   →  https://liorarestaurant.fi
 *
 * Changing ONLY that variable automatically updates:
 *   • Canonical URLs          • Open Graph / Twitter cards
 *   • Sitemap                 • robots.txt
 *   • Restaurant JSON-LD      • All metadata URLs
 */

/** Base URL with no trailing slash */
export const SITE_URL: string =
  (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

/**
 * Build an absolute URL for a given path.
 *
 * @example
 * siteUrl('/images/hero/new1.jpeg')
 * // → 'https://liorarestaurant.fi/images/hero/new1.jpeg'
 */
export function siteUrl(path: string = ''): string {
  const normalised = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalised}`
}
