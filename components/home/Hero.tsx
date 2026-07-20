'use client'

import { useCallback, useEffect, useState } from 'react'
import { getImageProps } from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const SLIDE_INTERVAL = 6000
const MOBILE_MEDIA_QUERY = '(max-width: 767px)'
const DESKTOP_MEDIA_QUERY = '(min-width: 768px)'

type VideoSlide = { type: 'video'; src: string }
type ImageSlide = {
  type: 'image'
  src: string
  width: number
  height: number
  // Dedicated 9:16 crop for phones — the source photos are 16:9, and on a
  // tall mobile viewport a plain object-position crop only shows a ~30%-wide
  // sliver of them, which isn't enough to frame the subject reliably.
  mobileSrc: string
  mobileWidth: number
  mobileHeight: number
}
type HeroSlide = VideoSlide | ImageSlide

const HERO_SLIDES: HeroSlide[] = [
  { type: 'video', src: '/videos/bgvideo.mp4' },
  {
    type: 'image',
    src: '/images/hero/new1.jpeg',
    width: 1280,
    height: 720,
    mobileSrc: '/images/hero/new1-mobile.jpg',
    mobileWidth: 480,
    mobileHeight: 854,
  },
  {
    type: 'image',
    src: '/images/hero/new3.jpeg',
    width: 1280,
    height: 720,
    mobileSrc: '/images/hero/new3-mobile.jpg',
    mobileWidth: 480,
    mobileHeight: 854,
  },
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

// True art direction (different crops per breakpoint via <picture>), not a
// scaled-down image — the browser only downloads whichever <source> matches.
function HeroSlideImage({ slide, alt, priority }: { slide: ImageSlide; alt: string; priority: boolean }) {
  const common = { alt, sizes: '100vw' }
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, width: slide.width, height: slide.height, quality: 90, src: slide.src })
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({
    ...common,
    width: slide.mobileWidth,
    height: slide.mobileHeight,
    quality: 82,
    src: slide.mobileSrc,
  })

  return (
    <picture>
      <source media={MOBILE_MEDIA_QUERY} srcSet={mobileSrcSet} />
      <source media={DESKTOP_MEDIA_QUERY} srcSet={desktopSrcSet} />
      <img
        {...imgProps}
        alt={alt}
        fetchPriority={priority ? 'high' : undefined}
        loading={priority ? 'eager' : 'lazy'}
        className="w-full h-full object-cover object-center"
      />
    </picture>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((index: number) => {
    setCurrent(((index % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  const go = useCallback((dir: 1 | -1) => goTo(current + dir), [current, goTo])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [paused, current])

  const slide = HERO_SLIDES[current]

  return (
    <section
      className="relative w-full mt-20 h-[calc(100svh-5rem)] min-h-[560px] md:min-h-[600px] flex items-start md:items-center justify-center pt-16 md:pt-0 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background slider */}
      <div className="absolute inset-0 z-0">
        {slide.type === 'video' ? (
          <video
            key={slide.src}
            className="w-full h-full object-cover object-center"
            src={slide.src}
            autoPlay
            loop
            muted
            playsInline
            aria-label={t('hero.imageAlt')}
          />
        ) : (
          <HeroSlideImage key={slide.src} slide={slide} alt={t('hero.imageAlt')} priority={current === 0} />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-hero-scrim" />

      {/* Previous / Next controls — bottom corners on mobile, side-centered on desktop */}
      <button
        onClick={() => go(-1)}
        className="absolute left-4 bottom-6 md:left-8 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-30 w-11 h-11 rounded-full bg-luxury-card/50 backdrop-blur-md border border-cream-dark/25 shadow-[0_2px_16px_rgba(0,0,0,0.15)] flex items-center justify-center text-cream hover:text-gold hover:border-gold/50 transition-all duration-300"
        aria-label={t('hero.previousAria')}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-4 bottom-6 md:right-8 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-30 w-11 h-11 rounded-full bg-luxury-card/50 backdrop-blur-md border border-cream-dark/25 shadow-[0_2px_16px_rgba(0,0,0,0.15)] flex items-center justify-center text-cream hover:text-gold hover:border-gold/50 transition-all duration-300"
        aria-label={t('hero.nextAria')}
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
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

      {/* Top decorative line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gold/30 z-20 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto w-full">
        {/* ============ Mobile composition (below 768px) ============ */}
        {/* Independent layout, not a scaled-down desktop version. */}
        <div className="md:hidden flex flex-col items-center">
          <motion.div
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-3 mb-3"
          >
            <span className="w-8 h-px bg-gold-muted/60" />
            <span className="section-label text-luxury-card">{t('hero.label')}</span>
            <span className="w-8 h-px bg-gold-muted/60" />
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-[clamp(3rem,13vw,3.75rem)] text-luxury-card leading-none"
            >
              {t('hero.titleLine1')}
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-[clamp(3rem,13vw,3.75rem)] italic leading-none mt-0.5 text-gold-metallic"
            >
              {t('hero.titleLine2')}
            </motion.h1>
          </div>

          <motion.p
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 w-[90%] mx-auto text-luxury-card text-base font-body font-normal leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-3 w-full mt-6"
          >
            <a href="#menu" className="btn-primary w-[88%] max-w-xs">
              {t('hero.exploreMenu')}
            </a>
            <a
              href="#reservations"
              className="btn-outline w-[88%] max-w-xs !border-luxury-card !text-luxury-card hover:!bg-luxury-card hover:!text-gold"
            >
              {t('hero.bookTable')}
            </a>
          </motion.div>
        </div>

        {/* ============ Desktop composition (768px and up, unchanged) ============ */}
        <div className="hidden md:block">
          {/* Label */}
          <motion.div
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-12 h-px bg-gold-muted/60" />
            <span className="section-label text-luxury-card">{t('hero.label')}</span>
            <span className="w-12 h-px bg-gold-muted/60" />
          </motion.div>

          {/* Main Headline */}
          <div className="overflow-hidden">
            <motion.h1
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-6xl md:text-7xl lg:text-8xl text-luxury-card leading-none"
            >
              {t('hero.titleLine1')}
            </motion.h1>
          </div>
          <div className="overflow-hidden pr-3 md:pr-4">
            <motion.h1
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-6xl md:text-7xl lg:text-8xl italic leading-none mt-1 text-gold-metallic"
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
            className="mt-8 text-luxury-card text-base md:text-lg font-body font-normal leading-relaxed max-w-xl mx-auto"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-row items-center justify-center gap-4 mt-10"
          >
            <a href="#menu" className="btn-primary">
              {t('hero.exploreMenu')}
            </a>
            <a
              href="#reservations"
              className="btn-outline !border-luxury-card !text-luxury-card hover:!bg-luxury-card hover:!text-gold"
            >
              {t('hero.bookTable')}
            </a>
          </motion.div>
        </div>
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
        <span className="text-cream/70 text-xs tracking-[0.25em] uppercase font-body group-hover:text-gold/60 transition-colors duration-300">
          {t('hero.scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-gold/50 group-hover:text-gold transition-colors duration-300" />
        </motion.div>
      </motion.button>
    </section>
  )
}
