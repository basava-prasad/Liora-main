import { connectDB } from '@/lib/mongodb'
import ReviewModel from '@/lib/models/Review'
import type { Review } from '@/types'

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })

export async function getApprovedReviews(): Promise<Review[]> {
  await connectDB()

  const docs = await ReviewModel.find({ status: 'approved' }).sort({ createdAt: -1 }).lean()

  return docs.map((doc) => ({
    id: String(doc._id),
    name: doc.name,
    initials: doc.initials,
    rating: doc.rating,
    review: doc.review,
    date: dateFormatter.format(doc.createdAt),
    dish: doc.dish,
  }))
}
