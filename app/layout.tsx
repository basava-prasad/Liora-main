import type { Metadata } from 'next'
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/providers/LenisProvider'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://liora.ie'),
  title: 'LIORA — Fine Mediterranean Dining',
  description:
    'Experience the finest Mediterranean, Turkish, and charcoal grill cuisine at LIORA. Handcrafted pizzas, premium burgers, and an exquisite dining atmosphere.',
  keywords: [
    'LIORA restaurant',
    'Mediterranean dining',
    'Turkish cuisine',
    'charcoal grill',
    'fine dining',
    'luxury restaurant',
  ],
  openGraph: {
    title: 'LIORA — Fine Mediterranean Dining',
    description:
      'Where every meal becomes a memory. Premium Mediterranean cuisine crafted with passion and served with excellence.',
    type: 'website',
    images: [{ url: '/images/hero/Homepage.jpeg', width: 1200, height: 630 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
      <body className="font-body bg-luxury-black text-cream antialiased">
        <LanguageProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
