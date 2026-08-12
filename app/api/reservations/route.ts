import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'
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

  // Send notification email — failure must never block the successful response
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const toEmailRaw = process.env.RESERVATION_NOTIFICATION_EMAIL
    const fromEmail = process.env.RESEND_FROM_EMAIL

    if (!toEmailRaw || !fromEmail) {
      console.warn('[Reservations] RESERVATION_NOTIFICATION_EMAIL or RESEND_FROM_EMAIL is not set — skipping notification email.')
    } else {
      const toEmails = toEmailRaw.split(',').map(e => e.trim()).filter(Boolean)
      const { name, email, phone, date, time, guests, specialRequests, status } = reservation

      await resend.emails.send({
        from: fromEmail,
        to: toEmails,
        subject: 'New Reservation – Liora Restaurant',
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
            <h2 style="margin-bottom:4px">New Reservation – Liora Restaurant</h2>
            <p style="color:#555;margin-top:0">A new reservation has been submitted.</p>
            <table style="width:100%;border-collapse:collapse;margin-top:16px">
              <tbody>
                <tr style="border-bottom:1px solid #e5e5e5">
                  <td style="padding:10px 8px;font-weight:600;width:40%">Name</td>
                  <td style="padding:10px 8px">${name}</td>
                </tr>
                <tr style="border-bottom:1px solid #e5e5e5">
                  <td style="padding:10px 8px;font-weight:600">Email</td>
                  <td style="padding:10px 8px">${email}</td>
                </tr>
                <tr style="border-bottom:1px solid #e5e5e5">
                  <td style="padding:10px 8px;font-weight:600">Phone</td>
                  <td style="padding:10px 8px">${phone}</td>
                </tr>
                <tr style="border-bottom:1px solid #e5e5e5">
                  <td style="padding:10px 8px;font-weight:600">Date</td>
                  <td style="padding:10px 8px">${date}</td>
                </tr>
                <tr style="border-bottom:1px solid #e5e5e5">
                  <td style="padding:10px 8px;font-weight:600">Time</td>
                  <td style="padding:10px 8px">${time}</td>
                </tr>
                <tr style="border-bottom:1px solid #e5e5e5">
                  <td style="padding:10px 8px;font-weight:600">Guests</td>
                  <td style="padding:10px 8px">${guests}</td>
                </tr>
                <tr style="border-bottom:1px solid #e5e5e5">
                  <td style="padding:10px 8px;font-weight:600">Special Requests</td>
                  <td style="padding:10px 8px">${specialRequests || '—'}</td>
                </tr>
                <tr>
                  <td style="padding:10px 8px;font-weight:600">Status</td>
                  <td style="padding:10px 8px;text-transform:capitalize">${status}</td>
                </tr>
              </tbody>
            </table>
            <p style="margin-top:24px;font-size:12px;color:#999">
              This email was sent automatically by Liora Restaurant's reservation system.
            </p>
          </div>
        `,
      })
    }
  } catch (err) {
    console.error('[Reservations] Failed to send notification email:', err)
  }

  return NextResponse.json({ reservation }, { status: 201 })
}
