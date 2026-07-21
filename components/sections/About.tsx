'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Section, { SectionHeader } from '@/components/common/Section'
import { staggerContainer, fadeInUp, slideInLeft, slideInRight } from '@/lib/animations'
import { Flame, Leaf, Star } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  const pillars = [
    { icon: Flame, title: t('about.pillarCraftTitle'), desc: t('about.pillarCraftDesc') },
    { icon: Leaf, title: t('about.pillarAuthenticityTitle'), desc: t('about.pillarAuthenticityDesc') },
    { icon: Star, title: t('about.pillarExperienceTitle'), desc: t('about.pillarExperienceDesc') },
  ]

  return (
    <Section id="about" className="bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-none overflow-hidden">
              <Image
                src="/images/chef/interior-6.jpeg"
                alt={t('about.imageAlt')}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating accent card */}
            <motion.div
              className="absolute -bottom-6 -right-6 glass-card-gold p-6 max-w-[200px]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-3xl text-luxury-dark">2026</p>
              <p className="text-luxury-dark text-xs font-body mt-1 tracking-wide uppercase leading-snug">
                {(() => {
                  const words = t('about.estIn').split(' ')
                  const last = words[words.length - 1]
                  const rest = words.slice(0, -1).join(' ')
                  return (
                    <>
                      {rest}
                      <br />
                      {last}
                    </>
                  )
                })()}
              </p>
            </motion.div>
            {/* Gold border accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/40" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div variants={fadeInUp}>
              <p className="section-label mb-4">{t('about.label')}</p>
              <h2 className="section-title">
                {t('about.titleLine1')}<br />
                <span className="italic text-gold">{t('about.titleLine2')}</span>
              </h2>
              <div className="gold-divider mt-6 mb-8" />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-cream-muted font-body font-light text-base leading-relaxed mb-5"
            >
              {t('about.paragraph1')}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-cream-muted font-body font-light text-base leading-relaxed mb-10"
            >
              {t('about.paragraph2')}
            </motion.p>

            {/* Pillars */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {pillars.map((p) => {
                const Icon = p.icon
                return (
                  <motion.div
                    key={p.title}
                    variants={fadeInUp}
                    className="glass-card p-5 group hover:border-gold/30 transition-colors duration-300"
                  >
                    <Icon size={20} className="text-gold mb-3" />
                    <h3 className="font-display text-base text-cream mb-2">{p.title}</h3>
                    <p className="text-cream-dark text-xs font-body leading-relaxed">{p.desc}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
