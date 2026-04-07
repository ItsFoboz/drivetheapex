import React, { useRef, useEffect } from 'react'
import { ArticleCard } from '@/components/ui/Card'
import { MOCK_ARTICLES } from '@/lib/mockData'

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

function RevealSection({ children, className = '' }) {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

export default function ContentGrid() {
  const featured = MOCK_ARTICLES[0]
  const sidebar = MOCK_ARTICLES.slice(1, 4)
  const secondary = MOCK_ARTICLES.slice(4, 7)

  return (
    <section className="w-full" style={{ background: 'var(--dta-black)', padding: '64px 0' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">

        {/* Section label */}
        <RevealSection className="mb-8">
          <div className="flex items-center gap-4 mb-8">
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
              LATEST STORIES
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--dta-border)' }} />
          </div>
        </RevealSection>

        {/* Featured + Sidebar Row */}
        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            {/* Featured article — 8 cols */}
            <div className="lg:col-span-8">
              <ArticleCard article={featured} size="featured" className="h-full" />
            </div>

            {/* Sidebar — 4 cols, 3 compact cards */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {sidebar.map(article => (
                <ArticleCard key={article.id} article={article} size="compact" />
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Secondary grid — 3 columns */}
        <RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondary.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
