import React, { useState, useRef, useEffect } from 'react'
import { Play } from 'lucide-react'
import { TagPill } from '@/components/ui/Badge'
import { MOCK_VIDEOS } from '@/lib/mockData'

const FILTERS = ['All', 'Formula 1', 'Race Highlights', 'Analysis', 'Behind the Scenes']

// Duplicate mock videos for display
const ALL_VIDEOS = [
  ...MOCK_VIDEOS,
  ...MOCK_VIDEOS.map(v => ({ ...v, id: v.id + 100, title: v.title + ' — Extended' })),
]

function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (playing) {
    return (
      <article>
        <div className="rounded-[6px] overflow-hidden" style={{ aspectRatio: '16/9', background: '#000' }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="mt-3">
          <h3 style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 15, color: 'var(--dta-white)', lineHeight: 1.4 }}>
            {video.title}
          </h3>
          <p style={{ fontSize: 12, color: 'var(--dta-muted)', marginTop: 4 }}>{video.publishedAt}</p>
          {video.description && (
            <p style={{ fontSize: 13, color: 'var(--dta-muted)', marginTop: 8, lineHeight: 1.6 }}>{video.description}</p>
          )}
        </div>
      </article>
    )
  }

  return (
    <article
      className="group cursor-pointer"
      onClick={() => setPlaying(true)}
    >
      <div
        className="relative overflow-hidden rounded-[6px]"
        style={{ aspectRatio: '16/9', background: 'var(--dta-card)' }}
      >
        {!loaded && <div className="absolute inset-0 shimmer" />}
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 300ms ease-out, transform 400ms ease-out' }}
        />

        {/* Play overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[220ms] ease-out"
          style={{ background: 'rgba(14,14,14,0.45)' }}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full" style={{ background: 'var(--dta-red)' }}>
            <Play size={24} fill="white" color="white" />
          </div>
        </div>

        {/* Duration */}
        <div
          className="absolute bottom-2 right-2 px-2 py-0.5 rounded-[2px]"
          style={{ background: 'rgba(14,14,14,0.88)', fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: 'var(--dta-white)' }}
        >
          {video.duration || '8:42'}
        </div>
      </div>

      <div className="mt-3">
        <h3
          className="group-hover:text-[#CE4F37] transition-colors duration-150"
          style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 15, color: 'var(--dta-white)', lineHeight: 1.4 }}
        >
          {video.title}
        </h3>
        <p style={{ fontSize: 12, color: 'var(--dta-muted)', marginTop: 4 }}>{video.publishedAt}</p>
      </div>
    </article>
  )
}

export default function VideosPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const gridRef = useRef(null)

  useEffect(() => {
    if (!gridRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) gridRef.current.classList.add('is-visible') },
      { threshold: 0.05 }
    )
    observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: 'var(--dta-black)', minHeight: '100vh' }}>
      {/* Page header */}
      <div
        style={{
          background: 'var(--dta-surface)',
          borderBottom: '1px solid var(--dta-border)',
          padding: '96px 0 48px',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <h1 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em', fontSize: 'clamp(48px, 8vw, 80px)', color: 'var(--dta-white)', lineHeight: 1 }}>
            Videos
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: 'var(--dta-muted)', marginTop: 12, maxWidth: 480 }}>
            Race highlights, analysis, and behind-the-scenes content from the paddock.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map(f => (
            <TagPill key={f} active={activeFilter === f} onClick={() => setActiveFilter(f)}>
              {f}
            </TagPill>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 reveal"
        >
          {ALL_VIDEOS.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  )
}
