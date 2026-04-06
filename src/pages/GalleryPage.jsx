import React, { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { MOCK_GALLERIES } from '@/lib/mockData'

// Generate gallery images using picsum with seeds
const GALLERY_IMAGES = [
  { id: 1, src: 'https://picsum.photos/seed/f1-1/800/600', thumb: 'https://picsum.photos/seed/f1-1/400/300', caption: 'Verstappen leads into Turn 1, Bahrain 2025', width: 800, height: 600 },
  { id: 2, src: 'https://picsum.photos/seed/f1-2/600/800', thumb: 'https://picsum.photos/seed/f1-2/300/400', caption: 'Hamilton in the Ferrari garage — testing day', width: 600, height: 800 },
  { id: 3, src: 'https://picsum.photos/seed/f1-3/800/500', thumb: 'https://picsum.photos/seed/f1-3/400/250', caption: 'Leclerc attacks the chicane in Monaco qualifying', width: 800, height: 500 },
  { id: 4, src: 'https://picsum.photos/seed/f1-4/700/700', thumb: 'https://picsum.photos/seed/f1-4/350/350', caption: 'Pit stop: Red Bull Racing crew in action', width: 700, height: 700 },
  { id: 5, src: 'https://picsum.photos/seed/f1-5/800/550', thumb: 'https://picsum.photos/seed/f1-5/400/275', caption: 'Norris celebrates maiden championship lead', width: 800, height: 550 },
  { id: 6, src: 'https://picsum.photos/seed/f1-6/600/900', thumb: 'https://picsum.photos/seed/f1-6/300/450', caption: 'The Silverstone grandstands at sunset', width: 600, height: 900 },
  { id: 7, src: 'https://picsum.photos/seed/f1-7/900/600', thumb: 'https://picsum.photos/seed/f1-7/450/300', caption: 'Safety car leads the field through Spa-Francorchamps', width: 900, height: 600 },
  { id: 8, src: 'https://picsum.photos/seed/f1-8/750/600', thumb: 'https://picsum.photos/seed/f1-8/375/300', caption: 'Alonso celebrates podium with Aston Martin', width: 750, height: 600 },
  { id: 9, src: 'https://picsum.photos/seed/f1-9/600/750', thumb: 'https://picsum.photos/seed/f1-9/300/375', caption: 'Ferrari engineers in the garage between sessions', width: 600, height: 750 },
  { id: 10, src: 'https://picsum.photos/seed/f1-10/880/620', thumb: 'https://picsum.photos/seed/f1-10/440/310', caption: 'Night race: Singapore under lights', width: 880, height: 620 },
  { id: 11, src: 'https://picsum.photos/seed/f1-11/700/500', thumb: 'https://picsum.photos/seed/f1-11/350/250', caption: 'Tyre strategy battle: medium vs hard compound', width: 700, height: 500 },
  { id: 12, src: 'https://picsum.photos/seed/f1-12/600/800', thumb: 'https://picsum.photos/seed/f1-12/300/400', caption: 'Paddock portraits: the faces behind the helmets', width: 600, height: 800 },
]

function GalleryImage({ image, index, onOpen }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className="mb-4 cursor-pointer overflow-hidden rounded-[6px] group relative"
      onClick={() => onOpen(index)}
      style={{ breakInside: 'avoid' }}
    >
      {!loaded && (
        <div
          className="shimmer"
          style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}
        />
      )}
      <img
        src={image.thumb}
        alt={image.caption}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="w-full block transition-transform duration-[300ms] ease-out group-hover:scale-[1.02]"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 300ms ease-out, transform 300ms ease-out', display: loaded ? 'block' : 'none' }}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[220ms] flex items-end"
        style={{ background: 'linear-gradient(to top, rgba(14,14,14,0.7) 0%, transparent 60%)' }}>
        <p className="px-3 pb-3" style={{ fontSize: 12, color: 'var(--dta-white)', fontFamily: 'Inter' }}>{image.caption}</p>
      </div>
    </div>
  )
}

function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex)
  const [imgLoaded, setImgLoaded] = useState(false)

  const prev = useCallback(() => {
    setImgLoaded(false)
    setCurrent(i => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setImgLoaded(false)
    setCurrent(i => (i + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const image = images[current]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center lightbox-entry"
      style={{ background: 'rgba(14,14,14,0.96)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-[4px] transition-colors duration-150"
        style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--dta-white)', border: 'none', cursor: 'pointer', zIndex: 10 }}
        onClick={onClose}
        aria-label="Close"
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
      >
        <X size={18} />
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center rounded-[4px] transition-colors duration-150"
        style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--dta-white)', border: 'none', cursor: 'pointer' }}
        onClick={e => { e.stopPropagation(); prev() }}
        aria-label="Previous"
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
      >
        <ChevronLeft size={22} />
      </button>

      {/* Image */}
      <div
        className="flex flex-col items-center px-20"
        onClick={e => e.stopPropagation()}
      >
        {!imgLoaded && <div className="shimmer rounded-[6px]" style={{ width: 800, maxWidth: '90vw', height: 500 }} />}
        <img
          key={image.id}
          src={image.src}
          alt={image.caption}
          onLoad={() => setImgLoaded(true)}
          className="rounded-[6px] lightbox-img-entry"
          style={{
            maxHeight: '80vh',
            maxWidth: '90vw',
            objectFit: 'contain',
            display: imgLoaded ? 'block' : 'none',
          }}
        />
        {imgLoaded && (
          <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--dta-muted)', marginTop: 16, textAlign: 'center' }}>
            {image.caption}
          </p>
        )}
        <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'var(--dta-subtle)', marginTop: 8 }}>
          {current + 1} / {images.length}
        </p>
      </div>

      {/* Next */}
      <button
        className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center rounded-[4px] transition-colors duration-150"
        style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--dta-white)', border: 'none', cursor: 'pointer' }}
        onClick={e => { e.stopPropagation(); next() }}
        aria-label="Next"
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
      >
        <ChevronRight size={22} />
      </button>
    </div>
  )
}

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <div style={{ background: 'var(--dta-black)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--dta-surface)', borderBottom: '1px solid var(--dta-border)', padding: '96px 0 48px' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <h1 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em', fontSize: 'clamp(48px, 8vw, 80px)', color: 'var(--dta-white)', lineHeight: 1 }}>
            Galleries
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: 'var(--dta-muted)', marginTop: 12, maxWidth: 480 }}>
            On-track action, paddock portraits, and moments from the race weekend.
          </p>
        </div>
      </div>

      {/* Masonry grid */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 py-12">
        <div
          style={{
            columnCount: 3,
            columnGap: 16,
          }}
          className="[column-count:1] sm:[column-count:2] lg:[column-count:3]"
        >
          {GALLERY_IMAGES.map((image, i) => (
            <GalleryImage
              key={image.id}
              image={image}
              index={i}
              onOpen={setLightboxIndex}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}
