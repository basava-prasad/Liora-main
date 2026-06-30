'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Section from '@/components/common/Section'
import { staggerContainer, fadeInUp, slideInLeft } from '@/lib/animations'
import { CONTACT_INFO, OPENING_HOURS } from '@/lib/constants'

const contactItems = [
  {
    icon: MapPin,
    label: 'Address',
    value: CONTACT_INFO.address,
    href: '#',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
]

export default function Contact() {
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
          <motion.p variants={fadeInUp} className="section-label mb-4">Find Us</motion.p>
          <motion.h2 variants={fadeInUp} className="section-title">
            Get in{' '}
            <span className="italic text-gold">Touch</span>
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
                14 Mediterranean Quarter<br />
                <span className="text-gold text-base">Dublin 2, Ireland</span>
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 btn-outline text-xs py-2.5 px-6"
              >
                Open in Maps
              </a>
            </div>
            {/* Decorative grid lines */}
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'linear-gradient(#7A1515 1px, transparent 1px), linear-gradient(90deg, #7A1515 1px, transparent 1px)',
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
                <p className="text-cream-dark text-xs font-body uppercase tracking-widest">Opening Hours</p>
              </div>
              <div className="space-y-3">
                {OPENING_HOURS.map((item) => (
                  <div
                    key={item.days}
                    className="flex items-center justify-between py-3 border-b border-luxury-border last:border-0"
                  >
                    <span className="text-cream-muted text-sm font-body">{item.days}</span>
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
