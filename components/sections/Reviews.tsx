'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Section from '@/components/common/Section'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import type { Review } from '@/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface ReviewsProps {
  reviews: Review[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= rating ? 'fill-gold text-gold' : 'fill-luxury-border text-luxury-border'}
        />
      ))}
    </div>
  )
}

export default function Reviews({ reviews }: ReviewsProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const { t, tr } = useLanguage()

  const go = (dir: 1 | -1) => {
    setDirection(dir)
    setCurrent((prev) => (prev + dir + reviews.length) % reviews.length)
  }

  const review = reviews[current]

  return (
    <Section id="reviews" className="bg-luxury-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeInUp} className="section-label mb-4">{t('reviews.label')}</motion.p>
          <motion.h2 variants={fadeInUp} className="section-title">
            {t('reviews.titleMain')}{' '}
            <span className="italic text-gold">{t('reviews.titleAccent')}</span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="gold-divider mx-auto mt-6" />
        </motion.div>

        {/* Featured review */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <Quote size={48} className="text-gold/10 mx-auto mb-6" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <StarRating rating={review.rating} />

                <p className="font-accent text-xl md:text-2xl text-cream italic leading-relaxed mt-6 mb-8">
                  &ldquo;{tr(review.review)}&rdquo;
                </p>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 bg-gold/15 border border-gold/30 flex items-center justify-center mb-2">
                    <span className="font-display text-sm text-gold">{review.initials}</span>
                  </div>
                  <p className="font-display text-base text-cream">{review.name}</p>
                  <p className="text-cream-dark text-xs font-body mt-0.5">{tr(review.date)}</p>
                  {review.dish && (
                    <p className="text-gold/60 text-[11px] font-body uppercase tracking-widest mt-1">
                      {tr(review.dish)}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 border border-gold/20 flex items-center justify-center text-cream-dark hover:text-gold hover:border-gold transition-all duration-300"
              aria-label={t('reviews.previousAria')}
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`transition-all duration-300 ${
                    i === current
                      ? 'w-6 h-1 bg-gold'
                      : 'w-1 h-1 bg-gold/30 hover:bg-gold/60 rounded-full'
                  }`}
                  aria-label={t('reviews.dotAria', { n: i + 1 })}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="w-10 h-10 border border-gold/20 flex items-center justify-center text-cream-dark hover:text-gold hover:border-gold transition-all duration-300"
              aria-label={t('reviews.nextAria')}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* All reviews mini grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.slice(0, 4).map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`glass-card p-5 cursor-pointer transition-all duration-300 ${
                current === i ? 'border-gold/40' : 'hover:border-gold/20'
              }`}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            >
              <StarRating rating={r.rating} />
              <p className="text-cream text-sm font-body leading-relaxed mt-3 mb-4 line-clamp-3 italic">
                &ldquo;{tr(r.review)}&rdquo;
              </p>
              <div className="flex items-center gap-2 border-t border-luxury-border pt-3">
                <div className="w-7 h-7 bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                  <span className="font-display text-[10px] text-gold">{r.initials}</span>
                </div>
                <div>
                  <p className="text-cream text-xs font-body">{r.name}</p>
                  <p className="text-cream-dark text-[10px] font-body">{tr(r.date)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
