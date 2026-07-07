'use client'

import { NAV_LINKS, CONTACT_INFO, OPENING_HOURS } from '@/lib/constants'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const SocialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const { t, tr } = useLanguage()

  return (
    <footer className="bg-luxury-dark border-t border-gold/10">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="font-display text-2xl tracking-[0.35em] text-cream">LIORA</span>
            <p className="mt-4 text-cream-dark text-sm leading-relaxed font-body font-light max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4 mt-6">
              {SocialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-gold/20 flex items-center justify-center text-cream-dark hover:text-gold hover:border-gold transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm text-cream tracking-widest uppercase mb-6">{t('footer.explore')}</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream-dark text-sm hover:text-gold transition-colors duration-300 font-body"
                  >
                    {tr(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-display text-sm text-cream tracking-widest uppercase mb-6">{t('footer.hours')}</h4>
            <ul className="space-y-3">
              {OPENING_HOURS.map((item) => (
                <li key={tr(item.days)}>
                  <p className="text-cream-dark text-xs font-body uppercase tracking-wide">{tr(item.days)}</p>
                  <p className="text-cream text-sm font-body mt-0.5">{item.hours}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm text-cream tracking-widest uppercase mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-1 shrink-0" />
                <span className="text-cream-dark text-sm font-body leading-relaxed">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-gold shrink-0" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-cream-dark text-sm hover:text-gold transition-colors duration-300 font-body">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-gold shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-cream-dark text-sm hover:text-gold transition-colors duration-300 font-body">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream-dark text-xs font-body">
            {t('footer.rights', { year })}
          </p>
          <div className="flex gap-6">
            {[t('footer.privacyPolicy'), t('footer.termsOfService')].map((item) => (
              <a key={item} href="#" className="text-cream-dark text-xs hover:text-gold transition-colors duration-300 font-body">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
