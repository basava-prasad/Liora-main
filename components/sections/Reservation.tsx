'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Calendar, Clock, Users, User, Mail, Phone, MessageSquare } from 'lucide-react'
import Section from '@/components/common/Section'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { RESERVATION_TIMES, OPENING_HOURS, CONTACT_INFO } from '@/lib/constants'
import { useLanguage } from '@/lib/i18n/LanguageContext'

function buildReservationSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(2, t('reservation.errorName')),
    email: z.string().email(t('reservation.errorEmail')),
    phone: z.string().min(7, t('reservation.errorPhone')),
    date: z.string().min(1, t('reservation.errorDate')),
    time: z.string().min(1, t('reservation.errorTime')),
    guests: z.string().min(1, t('reservation.errorGuests')),
    specialRequests: z.string().optional(),
  })
}

type ReservationValues = z.infer<ReturnType<typeof buildReservationSchema>>

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
  const { t, tr } = useLanguage()

  const reservationSchema = buildReservationSchema(t)

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
  const telHref = `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`

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
              {t('reservation.label')}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="section-title">
              {t('reservation.titleMain')}{' '}
              <span className="italic text-gold">{t('reservation.titleAccent')}</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="gold-divider mt-6 mb-8" />
            <motion.p
              variants={fadeInUp}
              className="text-cream-muted font-body font-light text-base leading-relaxed mb-8"
            >
              {t('reservation.intro')}
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-1 mb-10">
              {OPENING_HOURS.map((item) => (
                <motion.div
                  key={tr(item.days)}
                  variants={fadeInUp}
                  className="flex items-center justify-between py-3.5 border-b border-luxury-border"
                >
                  <span className="text-cream-muted text-sm font-body">{tr(item.days)}</span>
                  <span className="text-cream text-sm font-body font-medium">{item.hours}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.p variants={fadeInUp} className="text-cream-dark text-sm font-body leading-relaxed">
              {t('reservation.largePartyNote')}{' '}
              <a href={telHref} className="text-gold hover:text-gold-light transition-colors duration-300">
                {CONTACT_INFO.phone}
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
                  <h3 className="font-display text-2xl text-cream mb-3">{t('reservation.successTitle')}</h3>
                  <p className="text-cream-muted font-body font-light text-sm leading-relaxed">
                    {t('reservation.successMessage')}
                  </p>
                  <div className="mt-6 pt-6 border-t border-gold/20">
                    <p className="text-cream-dark text-xs font-body">
                      {t('reservation.questionsCall')}{' '}
                      <a href={telHref} className="text-gold">
                        {CONTACT_INFO.phone}
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
                    <FieldWrapper label={t('reservation.fieldFullName')} icon={User} error={errors.name?.message}>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder={t('reservation.placeholderName')}
                        className={inputClass}
                      />
                    </FieldWrapper>
                    <FieldWrapper label={t('reservation.fieldEmail')} icon={Mail} error={errors.email?.message}>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder={t('reservation.placeholderEmail')}
                        className={inputClass}
                      />
                    </FieldWrapper>
                  </div>

                  <FieldWrapper label={t('reservation.fieldPhone')} icon={Phone} error={errors.phone?.message}>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder={t('reservation.placeholderPhone')}
                      className={inputClass}
                    />
                  </FieldWrapper>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldWrapper label={t('reservation.fieldDate')} icon={Calendar} error={errors.date?.message}>
                      <input
                        {...register('date')}
                        type="date"
                        min={today}
                        className={`${inputClass} [color-scheme:dark]`}
                      />
                    </FieldWrapper>
                    <FieldWrapper label={t('reservation.fieldTime')} icon={Clock} error={errors.time?.message}>
                      <select {...register('time')} className={inputClass}>
                        <option value="">{t('reservation.selectTimePlaceholder')}</option>
                        {RESERVATION_TIMES.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </FieldWrapper>
                  </div>

                  <FieldWrapper label={t('reservation.fieldGuests')} icon={Users} error={errors.guests?.message}>
                    <select {...register('guests')} className={inputClass}>
                      <option value="">{t('reservation.selectGuestsPlaceholder')}</option>
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <option key={n} value={String(n)}>
                          {n} {n === 1 ? t('reservation.guestSingular') : t('reservation.guestPlural')}
                        </option>
                      ))}
                    </select>
                  </FieldWrapper>

                  <FieldWrapper label={t('reservation.fieldSpecialRequests')} icon={MessageSquare}>
                    <textarea
                      {...register('specialRequests')}
                      placeholder={t('reservation.specialRequestsPlaceholder')}
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
                        {t('reservation.submitButtonLoading')}
                      </span>
                    ) : (
                      t('reservation.submitButton')
                    )}
                  </motion.button>

                  <p className="text-center text-cream-dark text-[11px] font-body leading-relaxed">
                    {t('reservation.disclaimer')}
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
