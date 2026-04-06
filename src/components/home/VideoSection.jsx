import React, { useRef, useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import { MOCK_VIDEOS } from '@/lib/mockData'

function VideoCard({ video }) {
  const [loaded, setLoaded] = useState(false)
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
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
    )
  }

  return (
    <article className="group cursor-pointer" onClick={() => setPlaying(true)}>
      {/* Thumbnail */}
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
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-[220ms] ease-out"
          style={{
            background: 'rgba(14,14,14,0.4)',
            opacity: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
          ref={el => {
            if (el) {
              const parent = el.closest('.group')
              parent.addEventListener('mouseenter', () => { el.style.opacity = '1' })
              parent.addEventListener('mouseleave', () => { el.style.opacity = '0' })
            }
          }}
        >
          <div
            className="flex items-center justify-center w-14 h-14 rounded-full"
            style={{ background: 'var(--dta-red)' }}
          >
            <Play size={20} fill="white" color="white" />
          </div>
        </div>
        {/* Duration badge */}
        <div
          className="absolute bottom-2 right-2 px-2 py-0.5 rounded-[2px]"
          style={{
            background: 'rgba(14,14,14,0.88)',
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--dta-white)',
          }}
        >
          {video.duration || '8:42'}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3">
        <h4
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: 14,
            color: 'var(--dta-white)',
            lineHeight: 1.4,
          }}
          className="group-hover:text-[#CE4F37] transition-colors duration-150"
        >
          {video.title}
        </h4>
        <p style={{ fontSize: 12, color: 'var(--dta-muted)', marginTop: 4 }}>
          {video.publishedAt}
        </p>
      </div>
    </article>
  )
}

export default function VideoSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) sectionRef.current.classList.add('is-visible')
      },
      { threshold: 0.1 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ background: 'var(--dta-black)', padding: '64px 0' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--dta-red)',
              }}
            >
              LATEST VIDEOS
            </span>
            <div className="h-px w-24" style={{ background: 'var(--dta-border)' }} />
          </div>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--dta-muted)',
              textDecoration: 'none',
              transition: 'color 150ms ease-out',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--dta-white)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--dta-muted)' }}
          >
            View All →
          </a>
        </div>

        {/* Video grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal"
        >
          {MOCK_VIDEOS.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  )
}
