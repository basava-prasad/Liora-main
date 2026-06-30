'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

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
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function initParallax() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!bgRef.current) return

      gsap.to(bgRef.current, {
        y: '-6%',
        ease: 'none',
        scrollTrigger: {
          trigger: bgRef.current.closest('section'),
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    initParallax()

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      })
    }
  }, [])

  return (
    <section className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Background Image with GSAP parallax */}
      <div ref={bgRef} className="absolute inset-x-0 top-0 z-0" style={{ bottom: '-7%' }}>
        <Image
          src="/images/hero/Homepage.jpeg"
          alt="LIORA Restaurant — Fine Mediterranean Dining"
          fill
          priority
          quality={90}
          className="object-cover object-left-top"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-luxury-black/50" />
      <div className="absolute inset-0 z-10 bg-hero-overlay" />

      {/* Top decorative line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gold/30 z-20 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
      />

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
          <span className="section-label text-gold/80">Fine Mediterranean Dining</span>
          <span className="w-12 h-px bg-gold/50" />
        </motion.div>

        {/* Main Headline */}
        <div className="overflow-hidden">
          <motion.h1
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream leading-none"
          >
            Where Every Meal
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic text-gold leading-none mt-1"
          >
            Becomes a Memory
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 text-cream/65 text-base md:text-lg font-body font-light leading-relaxed max-w-xl mx-auto"
        >
          Mediterranean cuisine crafted with passion, served in an atmosphere designed to stay with you long after the last course.
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
            Explore Our Menu
          </a>
          <a href="#reservations" className="btn-outline">
            Book a Table
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
        aria-label="Scroll to next section"
      >
        <span className="text-cream/40 text-xs tracking-[0.25em] uppercase font-body group-hover:text-gold/60 transition-colors duration-300">
          Scroll
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
