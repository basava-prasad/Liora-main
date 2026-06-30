'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Section from '@/components/common/Section'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface GalleryImage {
  src: string
  alt: string
  aspect?: string
}

interface GalleryProps {
  images: GalleryImage[]
}

export default function Gallery({ images }: GalleryProps) {
  const [showGallery, setShowGallery] = useState(false)
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  return (
    <Section id="gallery" className="bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeInUp} className="section-label mb-4">The Space</motion.p>
          <motion.h2 variants={fadeInUp} className="section-title">
            Inside{' '}
            <span className="italic text-gold">LIORA</span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="gold-divider mx-auto mt-6" />
          <motion.p
            variants={fadeInUp}
            className="mt-5 text-cream-muted max-w-xl mx-auto text-base font-body font-light leading-relaxed"
          >
            An atmosphere as carefully crafted as our menu — where warm lighting, intimate spaces, and considered design come together.
          </motion.p>

          {!showGallery && (
            <motion.div variants={fadeInUp} className="mt-10">
              <button
                onClick={() => setShowGallery(true)}
                className="btn-primary"
              >
                Visit LIORA
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Image grid — only visible after clicking */}
        <AnimatePresence>
          {showGallery && (
            <motion.div
              className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {images.map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
                  className="break-inside-avoid overflow-hidden cursor-pointer group"
                  onClick={() => setLightbox(img)}
                >
                  <div className={`relative overflow-hidden ${img.aspect === '16/9' ? 'aspect-[16/9]' : i % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/30 transition-all duration-500" />
                    <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                      <p className="text-cream/80 text-xs font-body tracking-wide">{img.alt}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 bg-luxury-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[85vh] aspect-[4/3]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
            <button
              className="absolute top-6 right-6 w-10 h-10 border border-gold/30 flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold transition-all duration-300"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
