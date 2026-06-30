'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Calendar, Clock, Users, User, Mail, Phone, MessageSquare } from 'lucide-react'
import Section from '@/components/common/Section'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { RESERVATION_TIMES } from '@/lib/constants'

const reservationSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  guests: z.string().min(1, 'Please select number of guests'),
  specialRequests: z.string().optional(),
})

type ReservationValues = z.infer<typeof reservationSchema>

function FieldWrapper({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string
  icon: React.ElementType
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-body uppercase tracking-widest text-cream-dark mb-2">
        <Icon size={12} className="text-gold/60" />
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[11px] text-red-400 font-body">{error}</p>}
    </div>
  )
}

const inputClass =
  'w-full bg-luxury-card border border-luxury-border text-cream placeholder:text-cream-dark/50 font-body text-sm px-4 py-3.5 outline-none focus:border-gold/50 transition-colors duration-300 appearance-none'

export default function Reservation() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
  })

  const onSubmit = async (_values: ReservationValues) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1400))
    setLoading(false)
    setSubmitted(true)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <Section id="reservations" className="bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={fadeInUp} className="section-label mb-4">
              Book Your Table
            </motion.p>
            <motion.h2 variants={fadeInUp} className="section-title">
              Reserve Your{' '}
              <span className="italic text-gold">Experience</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="gold-divider mt-6 mb-8" />
            <motion.p
              variants={fadeInUp}
              className="text-cream-muted font-body font-light text-base leading-relaxed mb-8"
            >
              Secure your table at LIORA and let us take care of everything else. Whether it is an intimate dinner for two or a celebration for the whole family, we will make it memorable.
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-1 mb-10">
              {[
                { days: 'Monday – Thursday', hours: '12:00 – 23:00' },
                { days: 'Friday – Saturday', hours: '11:00 – 00:00' },
                { days: 'Sunday', hours: '12:00 – 22:00' },
              ].map((item) => (
                <motion.div
                  key={item.days}
                  variants={fadeInUp}
                  className="flex items-center justify-between py-3.5 border-b border-luxury-border"
                >
                  <span className="text-cream-muted text-sm font-body">{item.days}</span>
                  <span className="text-cream text-sm font-body font-medium">{item.hours}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.p variants={fadeInUp} className="text-cream-dark text-sm font-body leading-relaxed">
              For parties of 8 or more, please call us directly at{' '}
              <a href="tel:+35315550198" className="text-gold hover:text-gold-light transition-colors duration-300">
                +353 1 555 0198
              </a>
            </motion.p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card-gold p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle2 size={52} className="text-gold mx-auto mb-6" />
                  </motion.div>
                  <h3 className="font-display text-2xl text-cream mb-3">Reservation Received</h3>
                  <p className="text-cream-muted font-body font-light text-sm leading-relaxed">
                    Thank you for choosing LIORA. We have received your reservation request and will confirm via email within a few hours.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gold/20">
                    <p className="text-cream-dark text-xs font-body">
                      Questions? Call us at{' '}
                      <a href="tel:+35315550198" className="text-gold">
                        +353 1 555 0198
                      </a>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldWrapper label="Full Name" icon={User} error={errors.name?.message}>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </FieldWrapper>
                    <FieldWrapper label="Email" icon={Mail} error={errors.email?.message}>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="your@email.com"
                        className={inputClass}
                      />
                    </FieldWrapper>
                  </div>

                  <FieldWrapper label="Phone" icon={Phone} error={errors.phone?.message}>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+353 1 234 5678"
                      className={inputClass}
                    />
                  </FieldWrapper>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldWrapper label="Date" icon={Calendar} error={errors.date?.message}>
                      <input
                        {...register('date')}
                        type="date"
                        min={today}
                        className={`${inputClass} [color-scheme:dark]`}
                      />
                    </FieldWrapper>
                    <FieldWrapper label="Time" icon={Clock} error={errors.time?.message}>
                      <select {...register('time')} className={inputClass}>
                        <option value="">Select time</option>
                        {RESERVATION_TIMES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </FieldWrapper>
                  </div>

                  <FieldWrapper label="Guests" icon={Users} error={errors.guests?.message}>
                    <select {...register('guests')} className={inputClass}>
                      <option value="">Number of guests</option>
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <option key={n} value={String(n)}>
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </FieldWrapper>

                  <FieldWrapper label="Special Requests" icon={MessageSquare}>
                    <textarea
                      {...register('specialRequests')}
                      placeholder="Allergies, celebrations, seating preferences..."
                      rows={4}
                      className={`${inputClass} resize-none`}
                    />
                  </FieldWrapper>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={!loading ? { scale: 1.01 } : {}}
                    whileTap={!loading ? { scale: 0.99 } : {}}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <motion.span
                          className="block w-4 h-4 border-2 border-luxury-black/30 border-t-luxury-black rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        />
                        Confirming Reservation…
                      </span>
                    ) : (
                      'Confirm Reservation'
                    )}
                  </motion.button>

                  <p className="text-center text-cream-dark text-[11px] font-body leading-relaxed">
                    By submitting you agree to our cancellation policy. Reservations held for 15 minutes.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
