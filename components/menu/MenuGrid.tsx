'use client'

import DishCard from './DishCard'
import type { MenuItem } from '@/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function MenuGrid({ items }: { items: MenuItem[] }) {
  const { t } = useLanguage()

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-cream-dark font-body text-sm">{t('menu.noResults')}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item, i) => (
        <DishCard key={item.id} item={item} index={i} />
      ))}
    </div>
  )
}
