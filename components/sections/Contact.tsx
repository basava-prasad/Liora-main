'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Section from '@/components/common/Section'
import { staggerContainer, fadeInUp, slideInLeft } from '@/lib/animations'
import { CONTACT_INFO, OPENING_HOURS } from '@/lib/constants'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function Contact() {
  const { t, tr } = useLanguage()

  const contactItems = [
    {
      icon: MapPin,
      label: t('contact.addressLabel'),
      value: CONTACT_INFO.address,
      href: '#',
    },
    {
      icon: Phone,
      label: t('contact.phoneLabel'),
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      label: t('contact.emailLabel'),
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
    },
  ]

  return (
    <Section id="contact" className="bg-luxury-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeInUp} className="section-label mb-4">{t('contact.label')}</motion.p>
          <motion.h2 variants={fadeInUp} className="section-title">
            {t('contact.titleMain')}{' '}
            <span className="italic text-gold">{t('contact.titleAccent')}</span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="gold-divider mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Map placeholder */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative aspect-[4/3] bg-luxury-card border border-luxury-border overflow-hidden"
          >
            {/* Styled map placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-gold/30 flex items-center justify-center">
                  <MapPin size={28} className="text-gold" />
                </div>
                <div className="absolute -inset-4 border border-gold/10 rounded-full animate-ping opacity-30" />
              </div>
              <p className="mt-6 font-display text-lg text-cream text-center px-6">
                Länsiranta 8<br />
                <span className="text-gold text-base">Salo 24100</span>
              </p>
              <a
                href="https://maps.app.goo.gl/oSEKSxmdmMfhKiDY9?g_st=iwb"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 btn-outline text-xs py-2.5 px-6"
              >
                {t('contact.openInMaps')}
              </a>
            </div>
            {/* Decorative grid lines */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(#6B4226 1px, transparent 1px), linear-gradient(90deg, #6B4226 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </motion.div>

          {/* Contact info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col justify-center"
          >
            {/* Contact items */}
            <div className="space-y-8 mb-12">
              {contactItems.map((item) => {
                const Icon = item.icon
                return (
                  <motion.div key={item.label} variants={fadeInUp} className="flex items-start gap-5">
                    <div className="w-10 h-10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-cream-dark text-xs font-body uppercase tracking-widest mb-1">{item.label}</p>
                      <a
                        href={item.href}
                        className="text-cream text-sm font-body leading-relaxed hover:text-gold transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Hours */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-5">
                <Clock size={16} className="text-gold" />
                <p className="text-cream-dark text-xs font-body uppercase tracking-widest">{t('contact.openingHoursLabel')}</p>
              </div>
              <div className="space-y-3">
                {OPENING_HOURS.map((item) => (
                  <div
                    key={tr(item.days)}
                    className="flex items-center justify-between py-3 border-b border-luxury-border last:border-0"
                  >
                    <span className="text-cream-muted text-sm font-body">{tr(item.days)}</span>
                    <span className="text-cream text-sm font-body font-medium">{item.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
