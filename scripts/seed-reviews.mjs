import mongoose from 'mongoose'
import { readFile } from 'node:fs/promises'

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  console.error('Please define MONGODB_URI (run with: node --env-file=.env.local scripts/seed-reviews.mjs)')
  process.exit(1)
}

const ReviewSchema = new mongoose.Schema(
  {
    name: String,
    initials: String,
    rating: Number,
    review: String,
    dish: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
)

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema)

async function main() {
  const raw = await readFile(new URL('../data/reviews.json', import.meta.url), 'utf-8')
  const { reviews } = JSON.parse(raw)

  await mongoose.connect(MONGODB_URI)

  const existing = await Review.countDocuments()
  if (existing > 0) {
    console.log(`Reviews collection already has ${existing} document(s). Skipping seed to avoid duplicates.`)
    await mongoose.disconnect()
    return
  }

  const docs = reviews.slice(0, 3).map((r) => ({
    name: r.name,
    initials: r.initials,
    rating: r.rating,
    review: r.review.en,
    dish: r.dish?.en,
    status: 'approved',
  }))

  await Review.insertMany(docs)
  console.log(`Seeded ${docs.length} reviews as approved.`)

  await mongoose.disconnect()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
