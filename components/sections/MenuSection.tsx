'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import Section from '@/components/common/Section'
import MenuGrid from '@/components/menu/MenuGrid'
import type { MenuCategory } from '@/types'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface MenuSectionProps {
  categories: MenuCategory[]
}

export default function MenuSection({ categories }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')

  const allItems = useMemo(() => categories.flatMap((c) => c.items), [categories])

  const filteredItems = useMemo(() => {
    const pool = activeCategory === 'all'
      ? allItems
      : categories.find((c) => c.id === activeCategory)?.items ?? []

    if (!query.trim()) return pool
    const q = query.toLowerCase()
    return pool.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
    )
  }, [activeCategory, query, allItems, categories])

  const tabs = [
    { id: 'all', name: 'All', icon: '✦' },
    ...categories.map((c) => ({ id: c.id, name: c.name, icon: c.icon })),
  ]

  return (
    <Section id="menu" className="bg-luxury-dark">
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
            Our Menu
          </motion.p>
          <motion.h2 variants={fadeInUp} className="section-title">
            The Full{' '}
            <span className="italic text-gold">Experience</span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="gold-divider mx-auto mt-6" />
          <motion.p
            variants={fadeInUp}
            className="mt-5 text-cream-muted max-w-xl mx-auto text-base font-body font-light leading-relaxed"
          >
            A complete culinary journey through the Mediterranean — from mezze and charcoal grill to handcrafted pizzas, gourmet burgers, and desserts.
          </motion.p>
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
            placeholder="Search dishes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-luxury-card border border-luxury-border text-cream placeholder:text-cream-dark font-body text-sm pl-10 pr-10 py-3.5 outline-none focus:border-gold/50 transition-colors duration-300"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cream-dark hover:text-cream transition-colors"
              aria-label="Clear search"
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
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-body uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === tab.id
                  ? 'bg-gold text-luxury-black border-gold'
                  : 'border-luxury-border text-cream-dark hover:border-gold/40 hover:text-cream'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-cream-dark text-xs font-body uppercase tracking-wider">
            {filteredItems.length} {filteredItems.length === 1 ? 'dish' : 'dishes'}
          </p>
          {query && (
            <p className="text-cream-dark text-xs font-body">
              Results for &ldquo;<span className="text-gold">{query}</span>&rdquo;
            </p>
          )}
        </div>

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
