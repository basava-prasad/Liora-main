'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Section from '@/components/common/Section'
import { SIGNATURE_DISHES } from '@/lib/constants'
import { staggerContainer, fadeInUp, scaleIn } from '@/lib/animations'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

function StarBadge({ count }: { count: number }) {
  if (count < 2) return null
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={10} className="fill-gold text-gold" />
      ))}
    </div>
  )
}

export default function SignatureDishes() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? 380 : -380, behavior: 'smooth' })
    setTimeout(updateScrollState, 400)
  }

  return (
    <Section id="signature" className="bg-luxury-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeInUp} className="section-label mb-4">
            Culinary Masterpieces
          </motion.p>
          <motion.h2 variants={fadeInUp} className="section-title">
            Signature{' '}
            <span className="italic text-gold">Creations</span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="gold-divider mx-auto mt-6" />
          <motion.p
            variants={fadeInUp}
            className="mt-5 text-cream-muted max-w-xl mx-auto text-base font-body font-light leading-relaxed"
          >
            Twelve dishes that define LIORA — each one a celebration of craft, flavour, and the finest ingredients.
          </motion.p>
        </motion.div>

        {/* Scroll controls */}
        <div className="flex items-center justify-end gap-3 mb-6">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-10 h-10 border border-gold/20 flex items-center justify-center text-cream-dark hover:text-gold hover:border-gold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-10 h-10 border border-gold/20 flex items-center justify-center text-cream-dark hover:text-gold hover:border-gold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-5 overflow-x-auto no-scrollbar px-6 lg:px-8 pb-4"
      >
        {SIGNATURE_DISHES.map((dish, i) => (
          <motion.div
            key={dish.id}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: Math.min(i, 4) * 0.1 }}
            className="flex-none w-[300px] sm:w-[330px] group"
          >
            <motion.div
              className="relative bg-luxury-card border border-luxury-border overflow-hidden cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="330px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-card via-transparent to-transparent" />

                {/* Stars badge */}
                {dish.stars >= 2 && (
                  <div className="absolute top-3 left-3 glass-card-gold px-2.5 py-1">
                    <StarBadge count={dish.stars} />
                  </div>
                )}

                {/* Category pill */}
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] uppercase tracking-widest font-body font-medium text-cream/60 bg-luxury-black/60 backdrop-blur-sm px-2 py-1">
                    {dish.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                {dish.for && (
                  <p className="text-[10px] uppercase tracking-widest text-gold/60 font-body mb-1">{dish.for}</p>
                )}
                <h3 className="font-display text-lg text-cream leading-tight">{dish.name}</h3>
                <p className="text-cream-dark text-xs font-body mt-2 leading-relaxed line-clamp-2">{dish.description}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-luxury-border">
                  <span className="font-body font-semibold text-gold text-base">{dish.price}</span>
                  <motion.a
                    href="#menu"
                    className="text-xs text-cream/40 hover:text-gold transition-colors duration-300 font-body uppercase tracking-wider"
                    whileHover={{ x: 3 }}
                  >
                    View →
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
