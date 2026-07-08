import { z } from 'zod'

export const reservationCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40),
  date: z.string().trim().min(1),
  time: z.string().trim().min(1),
  guests: z.coerce.number().int().min(1).max(50),
  specialRequests: z.string().trim().max(1000).optional().or(z.literal('')),
})

export const reservationStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'cancelled']),
})

export const reviewCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  rating: z.coerce.number().int().min(1).max(5),
  review: z.string().trim().min(10).max(2000),
  dish: z.string().trim().max(120).optional().or(z.literal('')),
})

export const reviewStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']),
})

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('')
  return initials || '?'
}
