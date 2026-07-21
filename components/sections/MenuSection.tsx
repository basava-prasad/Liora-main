'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Section from '@/components/common/Section'
import MenuGrid from '@/components/menu/MenuGrid'
import type { MenuCategory } from '@/types'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface MenuSectionProps {
  categories: MenuCategory[]
}

export default function MenuSection({ categories }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')
  const { t, tr, locale } = useLanguage()
  const tabsRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateTabsScrollState = () => {
    const el = tabsRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const scrollTabs = (dir: 'left' | 'right') => {
    const el = tabsRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? 220 : -220, behavior: 'smooth' })
    setTimeout(updateTabsScrollState, 400)
  }

  useEffect(() => {
    updateTabsScrollState()
  }, [categories])

  const allItems = useMemo(() => categories.flatMap((c) => c.items), [categories])

  const filteredItems = useMemo(() => {
    const pool = activeCategory === 'all'
      ? allItems
      : categories.find((c) => c.id === activeCategory)?.items ?? []

    if (!query.trim()) return pool
    const q = query.toLowerCase()
    return pool.filter(
      (item) =>
        item.name[locale].toLowerCase().includes(q) ||
        item.description?.[locale].toLowerCase().includes(q)
    )
  }, [activeCategory, query, allItems, categories, locale])

  const tabs = [
    { id: 'all', name: t('menu.allTab') },
    ...categories.map((c) => ({ id: c.id, name: tr(c.name) })),
  ]

  return (
    <Section id="menu" className="bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeInUp} className="section-label mb-4">
            {t('menu.label')}
          </motion.p>
          <motion.h2 variants={fadeInUp} className="section-title">
            {t('menu.titleMain')}{' '}
            <span className="italic text-gold">{t('menu.titleAccent')}</span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="gold-divider mx-auto mt-6" />
        </motion.div>

        {/* Search */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-md mx-auto mb-10"
        >
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-dark" />
          <input
            type="text"
            placeholder={t('menu.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-luxury-card border border-luxury-border text-cream placeholder:text-cream-dark font-body text-sm pl-10 pr-10 py-3.5 outline-none focus:border-gold/50 transition-colors duration-300"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cream-dark hover:text-cream transition-colors"
              aria-label={t('menu.clearSearchAria')}
            >
              <X size={14} />
            </button>
          )}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mb-12"
        >
          {/* Edge fades */}
          <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-luxury-dark to-transparent z-10 transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-luxury-dark to-transparent z-10 transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

          {/* Scroll arrows (desktop) */}
          <button
            onClick={() => scrollTabs('left')}
            disabled={!canScrollLeft}
            className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center bg-luxury-dark border border-gold/20 text-cream-dark hover:text-gold hover:border-gold transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
            aria-label={t('menu.scrollLeftAria')}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => scrollTabs('right')}
            disabled={!canScrollRight}
            className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center bg-luxury-dark border border-gold/20 text-cream-dark hover:text-gold hover:border-gold transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
            aria-label={t('menu.scrollRightAria')}
          >
            <ChevronRight size={14} />
          </button>

          <div
            ref={tabsRef}
            onScroll={updateTabsScrollState}
            className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-proximity px-1"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex-none snap-start whitespace-nowrap px-4 py-2 text-xs font-body uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === tab.id
                    ? 'bg-gold text-luxury-black border-gold'
                    : 'border-luxury-border text-cream-dark hover:border-gold/40 hover:text-cream'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Search results indicator */}
        {query && (
          <div className="flex items-center justify-end mb-6">
            <p className="text-cream-dark text-xs font-body">
              {t('menu.resultsFor')} &ldquo;<span className="text-gold">{query}</span>&rdquo;
            </p>
          </div>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${query}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <MenuGrid items={filteredItems} />
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
