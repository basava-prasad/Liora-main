'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const SLIDE_INTERVAL = 6000

const HERO_IMAGES = [
  { src: '/images/hero/Homepage.jpeg', position: 'object-top' },
  { src: '/images/hero/Interior-1.jpeg', position: 'object-center' },
  { src: '/images/hero/interior-2.jpeg', position: 'object-center' },
]

const textVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE, delay: i * 0.18 + 0.3 },
  }),
}

const scrollToNext = () => {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((index: number) => {
    setCurrent(((index % HERO_IMAGES.length) + HERO_IMAGES.length) % HERO_IMAGES.length)
  }, [])

  const go = useCallback((dir: 1 | -1) => goTo(current + dir), [current, goTo])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [paused, current])

  return (
    <section
      className="relative w-full mt-20 h-[calc(100vh-5rem)] min-h-[600px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.1, ease: EASE }, scale: { duration: SLIDE_INTERVAL / 1000 + 1, ease: 'linear' } }}
          >
            <Image
              src={HERO_IMAGES[current].src}
              alt={t('hero.imageAlt')}
              fill
              priority={current === 0}
              quality={90}
              className={`object-cover ${HERO_IMAGES[current].position}`}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-luxury-black/4" />
      <div className="absolute inset-0 z-10 bg-hero-overlay" />

      {/* Top decorative line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gold/30 z-20 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
      />

      {/* Previous / Next controls */}
      <button
        onClick={() => go(-1)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-luxury-card/50 backdrop-blur-md border border-cream-dark/25 shadow-[0_2px_16px_rgba(0,0,0,0.15)] flex items-center justify-center text-cream hover:text-gold hover:border-gold/50 transition-all duration-300"
        aria-label={t('hero.previousAria')}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-luxury-card/50 backdrop-blur-md border border-cream-dark/25 shadow-[0_2px_16px_rgba(0,0,0,0.15)] flex items-center justify-center text-cream hover:text-gold hover:border-gold/50 transition-all duration-300"
        aria-label={t('hero.nextAria')}
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full shadow-[0_1px_6px_rgba(0,0,0,0.2)] ${
              i === current ? 'w-6 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-cream/70 hover:bg-gold/70'
            }`}
            aria-label={t('hero.slideAria', { n: i + 1 })}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Label */}
        <motion.div
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-4 mb-6"
        >
          <span className="w-12 h-px bg-gold/50" />
          <span className="section-label text-gold/80 hero-text-glow">{t('hero.label')}</span>
          <span className="w-12 h-px bg-gold/50" />
        </motion.div>

        {/* Main Headline */}
        <div className="overflow-hidden">
          <motion.h1
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream leading-none hero-text-glow"
          >
            {t('hero.titleLine1')}
          </motion.h1>
        </div>
        <div className="overflow-hidden pr-2 sm:pr-3 md:pr-4">
          <motion.h1
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic text-gold leading-none mt-1 hero-text-glow"
          >
            {t('hero.titleLine2')}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 text-cream text-base md:text-lg font-body font-normal leading-relaxed max-w-xl mx-auto hero-subtitle-glow"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <a href="#menu" className="btn-primary">
            {t('hero.exploreMenu')}
          </a>
          <a href="#reservations" className="btn-outline">
            {t('hero.bookTable')}
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group bg-transparent border-0"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        aria-label={t('hero.scrollAria')}
      >
        <span className="text-cream/70 text-xs tracking-[0.25em] uppercase font-body group-hover:text-gold/60 transition-colors duration-300 hero-text-glow">
          {t('hero.scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-gold/50 group-hover:text-gold transition-colors duration-300" />
        </motion.div>
      </motion.button>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-luxury-black to-transparent z-20 pointer-events-none" />
    </section>
  )
}
