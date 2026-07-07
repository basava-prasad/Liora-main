'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { Locale, LocalizedText } from '@/types'
import { translations } from './translations'

const STORAGE_KEY = 'liora-locale'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (key: string, params?: Record<string, string | number>) => string
  tr: (field: LocalizedText | undefined, fallback?: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getNested(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, obj)
}

function interpolate(value: string, params?: Record<string, string | number>): string {
  if (!params) return value
  return Object.entries(params).reduce(
    (acc, [key, val]) => acc.replaceAll(`{${key}}`, String(val)),
    value
  )
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'fi') {
      setLocaleState(stored)
    } else if (window.navigator.language.toLowerCase().startsWith('fi')) {
      setLocaleState('fi')
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])
  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === 'en' ? 'fi' : 'en'))
  }, [])

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const value = getNested(translations[locale], key)
      return typeof value === 'string' ? interpolate(value, params) : key
    },
    [locale]
  )

  const tr = useCallback(
    (field: LocalizedText | undefined, fallback = '') => {
      if (!field) return fallback
      return field[locale] ?? field.en ?? fallback
    },
    [locale]
  )

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t, tr }),
    [locale, setLocale, toggleLocale, t, tr]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
