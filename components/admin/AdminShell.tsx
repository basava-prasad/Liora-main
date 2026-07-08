'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, CalendarCheck, MessageSquareText, LayoutDashboard, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/reservations', label: 'Reservations', icon: CalendarCheck },
  { href: '/admin/reviews', label: 'Reviews', icon: MessageSquareText },
]

export default function AdminShell({
  email,
  children,
}: {
  email: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-luxury-black flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 border-r border-luxury-border bg-luxury-dark">
        <div className="px-6 py-8">
          <Image
            src="/images/logo/logo.png"
            alt="LIORA"
            width={1945}
            height={808}
            className="h-9 w-auto"
          />
          <p className="text-xs text-cream-dark font-body uppercase tracking-widest mt-2">Admin</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 text-sm font-body rounded-md transition-colors duration-200',
                  active
                    ? 'bg-gold/15 text-gold'
                    : 'text-cream-muted hover:bg-luxury-hover hover:text-cream'
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="px-6 py-5 border-t border-luxury-border">
          <p className="text-xs text-cream-dark font-body truncate mb-3">{email}</p>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 text-sm font-body text-cream-muted hover:text-gold transition-colors duration-200 disabled:opacity-50"
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-luxury-border bg-luxury-dark">
        <Image
          src="/images/logo/logo.png"
          alt="LIORA"
          width={1945}
          height={808}
          className="h-8 w-auto"
        />
        <button onClick={() => setMobileOpen((v) => !v)} className="text-cream-muted p-1">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      {mobileOpen && (
        <div className="lg:hidden border-b border-luxury-border bg-luxury-dark px-5 py-4 space-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 text-sm font-body rounded-md',
                  active ? 'bg-gold/15 text-gold' : 'text-cream-muted'
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 text-sm font-body text-cream-muted pt-2 mt-2 border-t border-luxury-border w-full"
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 px-5 py-8 lg:px-10 lg:py-10 max-w-6xl w-full mx-auto">{children}</main>
    </div>
  )
}
