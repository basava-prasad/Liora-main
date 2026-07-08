'use client'

import { useEffect, useState, useCallback } from 'react'
import { Check, X, Trash2, Loader2, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReviewRow {
  _id: string
  name: string
  initials: string
  rating: number
  review: string
  dish?: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

const TABS = ['all', 'pending', 'approved', 'rejected'] as const

const statusStyles: Record<string, string> = {
  pending: 'bg-gold/15 text-gold',
  approved: 'bg-green-700/15 text-green-700',
  rejected: 'bg-red-700/10 text-red-700',
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} className={i <= rating ? 'fill-gold text-gold' : 'fill-luxury-border text-luxury-border'} />
      ))}
    </div>
  )
}

export default function AdminReviewsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('all')
  const [reviews, setReviews] = useState<ReviewRow[]>([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = useCallback(async (status: (typeof TABS)[number]) => {
    setLoading(true)
    const qs = status === 'all' ? '' : `?status=${status}`
    const res = await fetch(`/api/reviews${qs}`)
    if (res.ok) {
      const data = await res.json()
      setReviews(data.reviews)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load(tab)
  }, [tab, load])

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    setBusyId(id)
    const res = await fetch(`/api/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) await load(tab)
    setBusyId(null)
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this review permanently?')) return
    setBusyId(id)
    const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' })
    if (res.ok) await load(tab)
    setBusyId(null)
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-1">Reviews</h1>
      <p className="text-cream-muted font-body text-sm mb-6">
        Moderate customer reviews before they appear on the site.
      </p>

      <div className="flex gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-4 py-2 text-xs font-body uppercase tracking-widest rounded-md transition-colors duration-200',
              tab === t ? 'bg-gold text-luxury-black' : 'bg-luxury-card border border-luxury-border text-cream-muted hover:text-cream'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-cream-muted text-sm font-body py-10 justify-center">
          <Loader2 size={16} className="animate-spin" /> Loading…
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-cream-muted font-body text-sm py-10 text-center">No reviews here.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r._id} className="glass-card p-5">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-display text-lg text-cream">{r.name}</p>
                    <span className={cn('px-2.5 py-0.5 rounded-full text-[10px] font-body uppercase tracking-widest', statusStyles[r.status])}>
                      {r.status}
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <Stars rating={r.rating} />
                  </div>
                  <p className="text-cream text-sm font-body mt-2 leading-relaxed italic">
                    &ldquo;{r.review}&rdquo;
                  </p>
                  {r.dish && (
                    <p className="text-gold/70 text-[11px] font-body uppercase tracking-widest mt-2">
                      {r.dish}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {r.status !== 'approved' && (
                    <button
                      onClick={() => updateStatus(r._id, 'approved')}
                      disabled={busyId === r._id}
                      className="p-2 rounded-md bg-green-700/10 text-green-700 hover:bg-green-700/20 transition-colors duration-200 disabled:opacity-50"
                      aria-label="Approve"
                      title="Approve"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  {r.status !== 'rejected' && (
                    <button
                      onClick={() => updateStatus(r._id, 'rejected')}
                      disabled={busyId === r._id}
                      className="p-2 rounded-md bg-red-700/10 text-red-700 hover:bg-red-700/20 transition-colors duration-200 disabled:opacity-50"
                      aria-label="Reject"
                      title="Reject"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => remove(r._id)}
                    disabled={busyId === r._id}
                    className="p-2 rounded-md bg-luxury-hover text-cream-dark hover:text-cream transition-colors duration-200 disabled:opacity-50"
                    aria-label="Delete"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
