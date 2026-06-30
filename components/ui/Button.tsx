'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import type { ComponentPropsWithoutRef } from 'react'

interface ButtonProps extends ComponentPropsWithoutRef<typeof motion.button> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-body font-semibold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer select-none'

  const variants = {
    primary:
      'bg-gold text-luxury-black hover:bg-gold-light hover:shadow-[0_0_40px_rgba(212,175,55,0.35)]',
    outline:
      'border border-gold text-gold hover:bg-gold hover:text-luxury-black hover:shadow-[0_0_40px_rgba(212,175,55,0.35)]',
    ghost:
      'text-cream/70 hover:text-cream',
  }

  const sizes = {
    sm: 'px-6 py-2.5 text-xs',
    md: 'px-8 py-3.5 text-sm',
    lg: 'px-10 py-4 text-sm',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
