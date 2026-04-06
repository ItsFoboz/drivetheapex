import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import { LiveBadge } from '@/components/ui/Badge'

// Hero background — using a high-quality motorsport placeholder
const HERO_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80'

export default function Hero() {
  const bgRef = useRef(null)
  const contentRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Parallax scroll
  useEffect(() => {
    if (isMobile) return
    let rafId
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (bgRef.current) {
          const scrollY = window.scrollY
          bgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [isMobile])

  // Mouse parallax
  useEffect(() => {
    if (isMobile) return
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  // Entry animation trigger
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const bgX = isMobile ? 0 : mousePos.x * 3
  const bgY = isMobile ? 0 : mousePos.y * 3

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
      {/* Background image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ top: '-10%', bottom: '-10%' }}
      >
        <img
          src={HERO_IMAGE}
          alt="Formula 1 racing"
          className="w-full h-full object-cover"
          style={{
            transform: `translate(${bgX}px, ${bgY}px)`,
            transition: 'none',
          }}
        />
      </div>

      {/* Grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background: 'linear-gradient(to bottom, rgba(14,14,14,0) 0%, rgba(14,14,14,0.5) 50%, rgba(14,14,14,0.92) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-[4] flex flex-col justify-end h-full px-6 md:px-12 lg:px-16 pb-16 md:pb-24"
      >
        <div className="max-w-4xl">
          {/* Category badge */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 480ms cubic-bezier(0,0,0.2,1), transform 480ms cubic-bezier(0,0,0.2,1)',
              transitionDelay: '0ms',
            }}
            className="mb-4"
          >
            <LiveBadge />
          </div>

          {/* Headline */}
          <h1
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 480ms cubic-bezier(0,0,0.2,1), transform 480ms cubic-bezier(0,0,0.2,1)',
              transitionDelay: '100ms',
              fontFamily: '"Barlow Condensed", sans-serif',
              fontWeight: 800,
              fontStyle: 'italic',
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              color: '#E0DDD6',
              lineHeight: 1,
            }}
            className="text-5xl md:text-7xl lg:text-8xl mb-4"
          >
            Red Bull Dominates<br />Bahrain Season Opener
          </h1>

          {/* Subheadline */}
          <p
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 480ms cubic-bezier(0,0,0.2,1), transform 480ms cubic-bezier(0,0,0.2,1)',
              transitionDelay: '200ms',
              fontFamily: 'Inter, sans-serif',
              color: '#888580',
              fontSize: 17,
              lineHeight: 1.65,
            }}
            className="max-w-xl mb-8"
          >
            Max Verstappen leads a commanding 1-2 for Red Bull as Mercedes struggles to find pace in the season-opening Bahrain Grand Prix.
          </p>

          {/* CTAs */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 480ms cubic-bezier(0,0,0.2,1), transform 480ms cubic-bezier(0,0,0.2,1)',
              transitionDelay: '300ms',
            }}
            className="flex items-center gap-4 flex-wrap"
          >
            <Button variant="primary" size="lg" as={Link} to="/article/red-bull-dominates-bahrain">
              Read Full Story
            </Button>
            <Button variant="secondary" size="lg" as={Link} to="/race-hub">
              Race Hub
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-1 text-[#888580]"
        aria-hidden="true"
        style={{
          opacity: mounted ? 1 : 0,
          transition: 'opacity 480ms ease-out',
          transitionDelay: '600ms',
        }}
      >
        <span className="font-[Inter] font-bold text-[10px] tracking-[0.14em] uppercase">Scroll</span>
        <ChevronDown
          size={16}
          className="animate-[bounce-chevron_1.5s_ease-in-out_infinite]"
        />
      </div>
    </section>
  )
}
