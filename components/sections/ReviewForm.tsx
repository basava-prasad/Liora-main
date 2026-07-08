'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Star, PenSquare, X } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

function buildReviewSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(2, t('reviewForm.errorName')),
    rating: z.number().min(1).max(5),
    review: z.string().min(10, t('reviewForm.errorReview')),
    dish: z.string().optional(),
  })
}

type ReviewValues = z.infer<ReturnType<typeof buildReviewSchema>>

const inputClass =
  'w-full bg-luxury-card border border-luxury-border text-cream placeholder:text-cream-dark/50 font-body text-sm px-4 py-3.5 outline-none focus:border-gold/50 transition-colors duration-300 appearance-none'

export default function ReviewForm() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { t } = useLanguage()

  const reviewSchema = buildReviewSchema(t)

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5 },
  })

  const rating = watch('rating')

  const onSubmit = async (values: ReviewValues) => {
    setLoading(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitted(true)
      reset({ rating: 5, name: '', review: '', dish: '' })
    } catch {
      setSubmitError(t('reviewForm.submitError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {!open && !submitted && (
        <div className="text-center">
          <button
            onClick={() => setOpen(true)}
            className="btn-outline inline-flex items-center gap-2"
          >
            <PenSquare size={14} />
            {t('reviewForm.toggleOpen')}
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="form-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="glass-card p-8 relative">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 text-cream-dark hover:text-gold transition-colors duration-300"
                aria-label={t('reviewForm.toggleClose')}
              >
                <X size={18} />
              </button>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6"
                  >
                    <CheckCircle2 size={44} className="text-gold mx-auto mb-4" />
                    <h3 className="font-display text-xl text-cream mb-2">
                      {t('reviewForm.successTitle')}
                    </h3>
                    <p className="text-cream-muted font-body font-light text-sm leading-relaxed">
                      {t('reviewForm.successMessage')}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                  >
                    <h3 className="font-display text-xl text-cream mb-1">{t('reviewForm.title')}</h3>

                    <div>
                      <label className="block text-xs font-body uppercase tracking-widest text-cream-dark mb-2">
                        {t('reviewForm.fieldName')}
                      </label>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder={t('reviewForm.placeholderName')}
                        className={inputClass}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-[11px] text-red-400 font-body">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-body uppercase tracking-widest text-cream-dark mb-2">
                        {t('reviewForm.fieldRating')}
                      </label>
                      <Controller
                        control={control}
                        name="rating"
                        render={({ field }) => (
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <button
                                key={n}
                                type="button"
                                onClick={() => field.onChange(n)}
                                aria-label={`${n}`}
                              >
                                <Star
                                  size={22}
                                  className={
                                    n <= (rating ?? 0)
                                      ? 'fill-gold text-gold'
                                      : 'fill-transparent text-luxury-border'
                                  }
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-body uppercase tracking-widest text-cream-dark mb-2">
                        {t('reviewForm.fieldDish')}
                      </label>
                      <input
                        {...register('dish')}
                        type="text"
                        placeholder={t('reviewForm.placeholderDish')}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-body uppercase tracking-widest text-cream-dark mb-2">
                        {t('reviewForm.fieldReview')}
                      </label>
                      <textarea
                        {...register('review')}
                        placeholder={t('reviewForm.placeholderReview')}
                        rows={4}
                        className={`${inputClass} resize-none`}
                      />
                      {errors.review && (
                        <p className="mt-1.5 text-[11px] text-red-400 font-body">{errors.review.message}</p>
                      )}
                    </div>

                    {submitError && (
                      <p className="text-center text-[13px] text-red-400 font-body">{submitError}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                      whileHover={!loading ? { scale: 1.01 } : {}}
                      whileTap={!loading ? { scale: 0.99 } : {}}
                    >
                      {loading ? t('reviewForm.submitButtonLoading') : t('reviewForm.submitButton')}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
