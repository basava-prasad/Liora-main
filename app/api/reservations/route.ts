import { NextResponse, type NextRequest } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Reservation from '@/lib/models/Reservation'
import { requireAdmin } from '@/lib/auth'
import { reservationCreateSchema } from '@/lib/validation'

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()

  const status = req.nextUrl.searchParams.get('status')
  const query = status && ['pending', 'approved', 'cancelled'].includes(status) ? { status } : {}

  const reservations = await Reservation.find(query).sort({ createdAt: -1 }).lean()
  return NextResponse.json({ reservations })
}

export async function POST(req: NextRequest) {
  const parsed = reservationCreateSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid reservation data' }, { status: 400 })
  }

  await connectDB()

  const reservation = await Reservation.create({
    ...parsed.data,
    status: 'pending',
  })

  return NextResponse.json({ reservation }, { status: 201 })
}
