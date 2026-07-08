import { NextResponse, type NextRequest } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Review from '@/lib/models/Review'
import { requireAdmin } from '@/lib/auth'
import { initialsFromName, reviewCreateSchema } from '@/lib/validation'

export async function GET(req: NextRequest) {
  await connectDB()

  const admin = await requireAdmin(req)

  if (!admin) {
    const reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ reviews })
  }

  const status = req.nextUrl.searchParams.get('status')
  const query = status && ['pending', 'approved', 'rejected'].includes(status) ? { status } : {}
  const reviews = await Review.find(query).sort({ createdAt: -1 }).lean()
  return NextResponse.json({ reviews })
}

export async function POST(req: NextRequest) {
  const parsed = reviewCreateSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid review data' }, { status: 400 })
  }

  await connectDB()

  const { name, rating, review, dish } = parsed.data
  const created = await Review.create({
    name,
    rating,
    review,
    dish: dish || undefined,
    initials: initialsFromName(name),
    status: 'pending',
  })

  return NextResponse.json({ review: created }, { status: 201 })
}
