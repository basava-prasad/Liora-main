import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export default function Section({
  id,
  className,
  children,
  padding = 'lg',
}: SectionProps) {
  const paddings = {
    none: '',
    sm: 'py-16 md:py-20',
    md: 'py-20 md:py-28',
    lg: 'py-24 md:py-32',
  }

  return (
    <section
      id={id}
      className={cn('relative', paddings[padding], className)}
    >
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
}: SectionHeaderProps) {
  const isCenter = align === 'center'
  return (
    <div className={cn(isCenter ? 'text-center' : 'text-left', className)}>
      {label && <p className="section-label mb-4">{label}</p>}
      <h2 className={cn('section-title', titleClassName)}>{title}</h2>
      {subtitle && (
        <p
          className={cn(
            'mt-5 text-cream-muted max-w-2xl text-base leading-relaxed font-body font-light',
            isCenter && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
      <div className={cn('mt-6 gold-divider', isCenter && 'mx-auto')} />
    </div>
  )
}
