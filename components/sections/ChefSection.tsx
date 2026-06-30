'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Section from '@/components/common/Section'
import { staggerContainer, fadeInUp, slideInLeft, slideInRight } from '@/lib/animations'
import { Award, UtensilsCrossed, Heart } from 'lucide-react'

const accolades = [
  { icon: Award, label: 'Culinary Excellence', value: '15+ Years' },
  { icon: UtensilsCrossed, label: 'Dishes Crafted', value: '200+' },
  { icon: Heart, label: 'Happy Guests', value: '50,000+' },
]

export default function ChefSection() {
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
          <motion.p variants={fadeInUp} className="section-label mb-4">The Culinary Mind</motion.p>
          <motion.h2 variants={fadeInUp} className="section-title">
            Meet the{' '}
            <span className="italic text-gold">Chef</span>
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
              Every dish I create is a letter written to a memory — a coastal market in Istanbul, a grandmother's kitchen in Ankara, the scent of olive groves at dawn.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-cream-muted font-body font-light text-base leading-relaxed mb-4"
            >
              Chef Mehmet Yilmaz brings over fifteen years of culinary mastery to every plate that leaves the LIORA kitchen. Trained in Istanbul and honed across the finest kitchens of Europe, his philosophy centres on a single conviction: that the most extraordinary meals are those rooted in place and memory.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-cream-muted font-body font-light text-base leading-relaxed mb-8"
            >
              At LIORA, he has curated a menu that honours the breadth of Mediterranean tradition — from the charcoal-kissed proteins of the Levant to the wood-fired pizzas of the Campanian coast — each preparation elevated with seasonal ingredients and modern technique.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <p className="font-display text-lg text-cream">Chef Mehmet Yilmaz</p>
              <p className="text-cream-dark text-sm font-body mt-1 tracking-wide">Executive Chef &amp; Co-Founder, LIORA</p>
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
                src="/images/chef/chefs-full-work-mode.jpeg"
                alt="Chef Mehmet Yilmaz at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 to-transparent" />
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
          {['/images/chef/interior-6.jpeg', '/images/chef/interior-7.jpeg'].map((src, i) => (
            <motion.div
              key={src}
              variants={fadeInUp}
              className="relative aspect-[16/9] overflow-hidden"
            >
              <Image
                src={src}
                alt={`LIORA kitchen ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 700px"
              />
              <div className="absolute inset-0 bg-luxury-black/30" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
