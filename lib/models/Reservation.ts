import mongoose, { Schema, models, model } from 'mongoose'

export type ReservationStatus = 'pending' | 'approved' | 'cancelled'

export interface ReservationDoc extends mongoose.Document {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  specialRequests?: string
  status: ReservationStatus
  createdAt: Date
  updatedAt: Date
}

const ReservationSchema = new Schema<ReservationDoc>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true, min: 1, max: 50 },
    specialRequests: { type: String, trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

export default models.Reservation || model<ReservationDoc>('Reservation', ReservationSchema)
