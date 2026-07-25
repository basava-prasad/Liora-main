/**
 * components/seo/RestaurantSchema.tsx
 *
 * Server component — zero client JS.
 * Renders a <script type="application/ld+json"> tag with Restaurant schema.
 *
 * All URL fields use SITE_URL from the env variable.
 * Contact / address data comes from lib/constants.ts.
 */
import { SITE_URL, siteUrl } from '@/lib/siteUrl'
import { CONTACT_INFO, OPENING_HOURS } from '@/lib/constants'

/**
 * Map our OPENING_HOURS constant to schema.org openingHoursSpecification.
 * We expand abbreviated day ranges (Mon–Thu → Mo,Tu,We,Th) for full compliance.
 */
function buildOpeningHours() {
  const dayMap: Record<string, string[]> = {
    'Mon': ['Monday'],
    'Tue': ['Tuesday'],
    'Wed': ['Wednesday'],
    'Thu': ['Thursday'],
    'Fri': ['Friday'],
    'Sat': ['Saturday'],
    'Sun': ['Sunday'],
    'Mon–Thu': ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
  }

  return OPENING_HOURS.map((item) => {
    const key = item.days.en
    const days = dayMap[key] ?? [key]
    const [opens, closes] = item.hours.replace(/\u2013/g, '-').split('-').map((t) => t.trim())
    return {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: days,
      opens: opens.replace('.', ':'),
      closes: closes.replace('.', ':'),
    }
  })
}

export default function RestaurantSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'LIORA Restaurant',
    description:
      'Fine Mediterranean, Turkish, and charcoal grill cuisine in Salo, Finland. Handcrafted pizzas, premium burgers, mezze platters, and an exquisite dining atmosphere.',
    url: SITE_URL,
    image: siteUrl('/images/hero/new1.jpeg'),
    logo: siteUrl('/images/logo/logo.png'),
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Länsiranta 8',
      addressLocality: 'Salo',
      postalCode: '24100',
      addressCountry: 'FI',
    },
    geo: {
      '@type': 'GeoCoordinates',
      // Approximate coordinates for Länsiranta 8, Salo, Finland
      latitude: '60.3845',
      longitude: '23.1254',
    },
    servesCuisine: ['Mediterranean', 'Turkish', 'Pizza', 'Charcoal Grill', 'Burgers'],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card',
    openingHoursSpecification: buildOpeningHours(),
    hasMenu: siteUrl('/#menu'),
    reservations: siteUrl('/#reservations'),
    sameAs: [
      'https://www.instagram.com/liora.restaurant',
    ],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: siteUrl('/#reservations'),
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'Reservation',
        name: 'Table reservation at LIORA Restaurant',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data is server-generated, not user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
