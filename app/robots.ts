/**
 * app/robots.ts
 *
 * Auto-generates /robots.txt at build time and on-demand.
 *
 * The Sitemap URL is built from SITE_URL (read from NEXT_PUBLIC_SITE_URL).
 * Changing ONLY that environment variable updates robots.txt automatically.
 *
 * Result:
 *   User-agent: *
 *   Allow: /
 *   Disallow: /admin/
 *   Sitemap: https://liorarestaurant.fi/sitemap.xml
 */
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/siteUrl'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all search engines to crawl the public site
        userAgent: '*',
        allow: '/',
        // Keep the admin dashboard out of search indexes
        disallow: '/admin/',
      },
    ],
    // Sitemap URL uses SITE_URL — never hardcoded
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
