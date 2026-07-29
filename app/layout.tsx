import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/providers/LenisProvider'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import RestaurantSchema from '@/components/seo/RestaurantSchema'
import { SITE_URL, siteUrl } from '@/lib/siteUrl'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

// ---------------------------------------------------------------------------
// Production-ready metadata
// Changing NEXT_PUBLIC_SITE_URL is the ONLY change needed for a new domain.
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  // Resolves all relative URLs (og:image, twitter:image, etc.) to absolute
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'LIORA — Fine Mediterranean Dining in Salo, Finland',
    template: '%s | LIORA Restaurant',
  },

  description:
    'Experience fine Mediterranean, Turkish, and charcoal grill cuisine at LIORA in Salo, Finland. Handcrafted pizzas, premium burgers, mezze, and an exquisite dining atmosphere. Reserve your table today.',

  keywords: [
    'LIORA restaurant',
    'Mediterranean dining Salo',
    'Turkish cuisine Finland',
    'charcoal grill restaurant',
    'fine dining Salo',
    'luxury restaurant Finland',
    'Mediterranean food Salo',
    'Turkish food Finland',
    'pizza Salo',
    'kebab restaurant Salo',
    'table reservation Salo',
    'Länsiranta 8 Salo',
  ],

  authors: [{ name: 'LIORA Restaurant', url: SITE_URL }],
  creator: 'LIORA Restaurant',
  publisher: 'LIORA Restaurant',

  // Canonical URL — updated automatically when NEXT_PUBLIC_SITE_URL changes
  alternates: {
    canonical: SITE_URL,
  },

  // Tell search engines to index and follow all links
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph — og:url and og:image use SITE_URL, never hardcoded
  openGraph: {
    type: 'website',
    locale: 'en_FI',
    url: SITE_URL,
    siteName: 'LIORA Restaurant',
    title: 'LIORA — Fine Mediterranean Dining in Salo, Finland',
    description:
      'Where every meal becomes a memory. Premium Mediterranean cuisine crafted with passion and served with excellence. Located at Länsiranta 8, Salo 24100.',
    images: [
      {
        url: siteUrl('/images/hero/new1.jpeg'),
        width: 1280,
        height: 720,
        alt: 'LIORA Restaurant — Fine Mediterranean Dining in Salo, Finland',
        type: 'image/jpeg',
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: 'summary_large_image',
    title: 'LIORA — Fine Mediterranean Dining in Salo, Finland',
    description:
      'Where every meal becomes a memory. Premium Mediterranean cuisine crafted with passion and served with excellence.',
    images: [siteUrl('/images/hero/new1.jpeg')],
    creator: '@liorarestaurant',
  },

  // Google Search Console verification
  // Set GOOGLE_SITE_VERIFICATION in .env.local — do NOT hardcode the token
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const shouldLoadAnalytics = process.env.NODE_ENV === 'production' && Boolean(measurementId)

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
      <body className="font-body bg-luxury-black text-cream antialiased">
        {shouldLoadAnalytics && measurementId ? <GoogleAnalytics gaId={measurementId} /> : null}
        {/* Restaurant JSON-LD structured data — injected in <head> by Next.js */}
        <RestaurantSchema />
        <LanguageProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
