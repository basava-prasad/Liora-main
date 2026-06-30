'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import type { MenuItem } from '@/types'
import { cn } from '@/lib/utils'

interface DishCardProps {
  item: MenuItem
  index?: number
}

export default function DishCard({ item, index = 0 }: DishCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 6) * 0.07 }}
      className="group relative bg-luxury-card border border-luxury-border hover:border-gold/30 transition-all duration-400"
    >
      <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
        {/* Image */}
        {item.image ? (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-card/80 via-transparent to-transparent" />
            {item.stars && item.stars >= 2 && (
              <div className="absolute top-2.5 left-2.5 flex items-center gap-0.5 glass-card-gold px-2 py-1">
                {Array.from({ length: item.stars }).map((_, i) => (
                  <Star key={i} size={9} className="fill-gold text-gold" />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="h-2 bg-gradient-to-r from-gold/10 via-gold/20 to-gold/10" />
        )}

        {/* Content */}
        <div className={cn('p-5', !item.image && 'pt-4')}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="font-display text-base text-cream leading-tight truncate">{item.name}</h3>
                {item.note && (
                  <span className="shrink-0 text-[9px] uppercase tracking-widest text-gold/60 font-body border border-gold/20 px-1.5 py-0.5">
                    {item.note}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-cream-dark text-xs font-body leading-relaxed line-clamp-2">{item.description}</p>
              )}
            </div>
            <span className="shrink-0 font-body font-semibold text-gold text-sm whitespace-nowrap">{item.price}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
