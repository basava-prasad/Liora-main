import mongoose, { Schema, models, model } from 'mongoose'

export type ReviewStatus = 'pending' | 'approved' | 'rejected'

export interface ReviewDoc extends mongoose.Document {
  name: string
  initials: string
  rating: number
  review: string
  dish?: string
  status: ReviewStatus
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new Schema<ReviewDoc>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    initials: { type: String, required: true, trim: true, maxlength: 4 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true, trim: true, maxlength: 2000 },
    dish: { type: String, trim: true, maxlength: 120 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

export default models.Review || model<ReviewDoc>('Review', ReviewSchema)
