'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n/LanguageContext'

function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage()

  return (
    <div className={cn('flex items-center gap-1 text-xs font-body tracking-widest', className)}>
      {(['en', 'fi'] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLocale(code)}
          className={cn(
            'px-2 py-1 uppercase transition-colors duration-300',
            locale === code ? 'text-gold' : 'text-cream/50 hover:text-cream'
          )}
          aria-pressed={locale === code}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t, tr } = useLanguage()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        setMobileOpen(false)
      }
    }
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-luxury-dark/95 backdrop-blur-xl border-b border-gold/10 shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="relative group shrink-0"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            >
              <Image
                src="/images/logo/logo.png"
                alt="LIORA"
                width={1945}
                height={808}
                priority
                className="h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative font-body text-sm text-cream/70 hover:text-cream transition-colors duration-300 group tracking-wide"
                >
                  {tr(link.label)}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-6">
              <LanguageSwitcher />
              <a
                href="#reservations"
                onClick={(e) => handleNavClick(e, '#reservations')}
                className="btn-outline"
                style={{ padding: '0.5rem 1.5rem', fontSize: '0.7rem' }}
              >
                {t('nav.reserveTable')}
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex lg:hidden items-center gap-3">
              <LanguageSwitcher />
              <button
                className="text-cream/70 hover:text-gold transition-colors duration-300 p-2"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={t('nav.toggleMenu')}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-luxury-black/98 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col items-center gap-8">
              <Image
                src="/images/logo/logo.png"
                alt="LIORA"
                width={1945}
                height={808}
                className="h-16 w-auto mb-4"
              />
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body text-xl text-cream/70 hover:text-gold transition-colors duration-300 tracking-widest uppercase"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  {tr(link.label)}
                </motion.a>
              ))}
              <motion.a
                href="#reservations"
                onClick={(e) => handleNavClick(e, '#reservations')}
                className="btn-outline mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.07 + 0.15 }}
              >
                {t('nav.reserveTable')}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
