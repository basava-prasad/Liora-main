import Link from 'next/link'
import { connectDB } from '@/lib/mongodb'
import Reservation from '@/lib/models/Reservation'
import Review from '@/lib/models/Review'

async function getStats() {
  await connectDB()

  const [pendingReservations, approvedReservations, pendingReviews, approvedReviews] =
    await Promise.all([
      Reservation.countDocuments({ status: 'pending' }),
      Reservation.countDocuments({ status: 'approved' }),
      Review.countDocuments({ status: 'pending' }),
      Review.countDocuments({ status: 'approved' }),
    ])

  return { pendingReservations, approvedReservations, pendingReviews, approvedReviews }
}

function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link
      href={href}
      className="glass-card p-6 block hover:border-gold/30 transition-colors duration-300"
    >
      <p className="text-3xl font-display text-cream">{value}</p>
      <p className="text-xs font-body uppercase tracking-widest text-cream-dark mt-2">{label}</p>
    </Link>
  )
}

export default async function AdminOverviewPage() {
  const stats = await getStats()

  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-1">Overview</h1>
      <p className="text-cream-muted font-body text-sm mb-8">
        Quick glance at what needs your attention.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending Reservations" value={stats.pendingReservations} href="/admin/reservations" />
        <StatCard label="Approved Reservations" value={stats.approvedReservations} href="/admin/reservations" />
        <StatCard label="Pending Reviews" value={stats.pendingReviews} href="/admin/reviews" />
        <StatCard label="Approved Reviews" value={stats.approvedReviews} href="/admin/reviews" />
      </div>
    </div>
  )
}
