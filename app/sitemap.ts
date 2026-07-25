/**
 * app/sitemap.ts
 *
 * Auto-generates /sitemap.xml at build time and on-demand.
 *
 * Every URL is built from SITE_URL (read from NEXT_PUBLIC_SITE_URL).
 * Changing ONLY that environment variable updates all sitemap entries.
 */
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/siteUrl'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    // Home page — highest priority
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Key section anchors — helps search engines discover page structure
    {
      url: `${SITE_URL}/#about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#menu`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#chef`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#gallery`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#reviews`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#reservations`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
