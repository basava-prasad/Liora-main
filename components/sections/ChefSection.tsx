'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Section from '@/components/common/Section'
import { staggerContainer, fadeInUp, slideInLeft, slideInRight } from '@/lib/animations'
import { Award, UtensilsCrossed, Heart } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function ChefSection() {
  const { t } = useLanguage()

  const accolades = [
    { icon: Award, label: t('chef.accoladeExcellenceLabel'), value: t('chef.accoladeExcellenceValue') },
    { icon: UtensilsCrossed, label: t('chef.accoladeDishesLabel'), value: t('chef.accoladeDishesValue') },
    { icon: Heart, label: t('chef.accoladeGuestsLabel'), value: t('chef.accoladeGuestsValue') },
  ]

  return (
    <Section id="chef" className="bg-luxury-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeInUp} className="section-label mb-4">{t('chef.label')}</motion.p>
          <motion.h2 variants={fadeInUp} className="section-title">
            {t('chef.titleMain')}{' '}
            <span className="italic text-gold">{t('chef.titleAccent')}</span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="gold-divider mx-auto mt-6" />
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={fadeInUp} className="font-accent text-5xl text-gold/20 leading-none mb-4 select-none">"</motion.p>
            <motion.p
              variants={fadeInUp}
              className="font-accent text-xl md:text-2xl text-cream italic leading-relaxed mb-6"
            >
              {t('chef.quote')}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-cream-muted font-body font-light text-base leading-relaxed mb-4"
            >
              {t('chef.bio1')}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-cream-muted font-body font-light text-base leading-relaxed mb-8"
            >
              {t('chef.bio2')}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <p className="font-display text-lg text-cream">{t('chef.name')}</p>
              <p className="text-cream-dark text-sm font-body mt-1 tracking-wide">{t('chef.role')}</p>
            </motion.div>
          </motion.div>

          {/* Images */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/chef/chef2.jpeg"
                alt={t('chef.chefImageAlt')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/15 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-gold/40" />
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold/40" />
          </motion.div>
        </div>

        {/* Accolades */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {accolades.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                variants={fadeInUp}
                className="glass-card p-8 text-center group hover:border-gold/30 transition-colors duration-300"
              >
                <Icon size={24} className="text-gold mx-auto mb-4" />
                <p className="font-display text-3xl text-cream mb-2">{item.value}</p>
                <p className="text-cream-dark text-xs font-body uppercase tracking-widest">{item.label}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Secondary images */}
        <motion.div
          className="grid grid-cols-2 gap-5 mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {['/images/chef/interior-6.jpeg', '/images/chef/chefs-full-work-mode.jpeg'].map((src, i) => (
            <motion.div
              key={src}
              variants={fadeInUp}
              className="relative aspect-[16/9] overflow-hidden"
            >
              <Image
                src={src}
                alt={t('chef.kitchenImageAlt', { n: i + 1 })}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 700px"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
