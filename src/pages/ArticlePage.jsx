import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MOCK_ARTICLES } from '@/lib/mockData'
import { ReadingProgressBar } from '@/components/article/ReadingProgressBar'
import { PullQuote } from '@/components/article/PullQuote'
import { ArticleCard } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useParallax } from '@/hooks/useParallax'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ---------------------------------------------------------------------------
// Reveal-on-scroll wrapper
// ---------------------------------------------------------------------------

function RevealOnScroll({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 520ms ease-out, transform 520ms ease-out',
      }}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// JSON-LD injection
// ---------------------------------------------------------------------------

function useJsonLd(article) {
  useEffect(() => {
    if (!article) return

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'article-jsonld'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.publishedAt,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'DriveTheApex',
        logo: {
          '@type': 'ImageObject',
          url: 'https://drivetheapex.com/logo.png',
        },
      },
      image: article.heroImage,
      url: `https://drivetheapex.com/article/${article.slug}`,
    })

    // Remove any previous injection
    const existing = document.getElementById('article-jsonld')
    if (existing) existing.remove()
    document.head.appendChild(script)

    return () => {
      const el = document.getElementById('article-jsonld')
      if (el) el.remove()
    }
  }, [article])
}

// ---------------------------------------------------------------------------
// ArticlePage
// ---------------------------------------------------------------------------

export default function ArticlePage() {
  const { slug } = useParams()
  const article = MOCK_ARTICLES.find((a) => a.slug === slug) ?? MOCK_ARTICLES[0]
  const { offset } = useParallax(0.5)

  useJsonLd(article)

  // Related: other articles, excluding current
  const related = MOCK_ARTICLES.filter((a) => a.slug !== article?.slug).slice(0, 3)

  if (!article) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--dta-black)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: '64px',
            color: 'var(--dta-white)',
          }}
        >
          404
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", color: 'var(--dta-muted)', fontSize: '18px' }}>
          Article not found.
        </p>
        <Link
          to="/"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            color: 'var(--dta-red)',
            textDecoration: 'underline',
          }}
        >
          Return home
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--dta-black)', minHeight: '100vh' }}>
      {/* Reading progress bar */}
      <ReadingProgressBar />

      {/* ------------------------------------------------------------------ */}
      {/* Hero image — full-width bleed with parallax                         */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          maxHeight: '70vh',
        }}
      >
        <img
          src={article.heroImage}
          alt={article.title}
          style={{
            position: 'absolute',
            inset: '-10% 0',
            width: '100%',
            height: '120%',
            objectFit: 'cover',
            transform: `translateY(${offset}px)`,
            willChange: 'transform',
          }}
        />
        {/* Bottom gradient overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            background:
              'linear-gradient(to top, var(--dta-black) 0%, rgba(14,14,14,0.7) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Article container                                                   */}
      {/* ------------------------------------------------------------------ */}
      <main
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          paddingTop: '0',
          paddingBottom: '64px',
        }}
      >
        {/* ---------------------------------------------------------------- */}
        {/* Article header                                                    */}
        {/* ---------------------------------------------------------------- */}
        <header
          style={{
            padding: '40px 24px 32px',
          }}
        >
          {/* Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Badge variant="category">{article.category}</Badge>
            {article.premium && <Badge variant="premium">PREMIUM</Badge>}
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontStyle: 'italic',
              textTransform: 'uppercase',
              fontSize: 'clamp(44px, 6vw, 64px)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: 'var(--dta-white)',
              margin: '0 0 20px',
            }}
          >
            {article.title}
          </h1>

          {/* Meta row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              color: 'var(--dta-muted)',
              marginBottom: '20px',
            }}
          >
            <span>{article.author}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{article.readTime} min read</span>
          </div>

          {/* Excerpt / subheadline */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: 1.6,
              color: 'var(--dta-muted)',
              margin: '0 0 28px',
            }}
          >
            {article.excerpt}
          </p>

          {/* Divider */}
          <hr
            style={{
              border: 'none',
              borderTop: '1px solid var(--dta-border)',
              margin: 0,
            }}
          />
        </header>

        {/* ---------------------------------------------------------------- */}
        {/* Article body                                                      */}
        {/* ---------------------------------------------------------------- */}
        <div
          style={{
            padding: '0 24px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: 1.65,
            color: 'rgba(224, 221, 214, 0.85)',
          }}
        >
          {/* Drop cap on first paragraph */}
          <p className="drop-cap">
            The 2025 Formula 1 season has already delivered more drama, controversy, and
            outright speed than most observers dared predict. From the sand-blasted straights of
            Bahrain to the rain-soaked drama at Imola, this has been a campaign defined by
            margins measured in hundredths of a second — and decisions made in the heat of the
            moment that will echo through championship standings for months to come.
          </p>

          <p>
            Max Verstappen arrived in Bahrain radiating the quiet confidence of a three-time
            champion who had spent the winter rebuilding something that was already close to
            perfect. Red Bull's engineers had addressed the mid-corner instability that had
            occasionally blunted their pace in 2024, and the result was a machine that felt,
            according to those who analysed its telemetry, almost imperiously balanced through
            every phase of every corner.
          </p>

          <PullQuote
            text="We didn't just improve the car — we re-evaluated every assumption we had about what this car could be. That changes everything."
            attribution="Red Bull Technical Director, post-Bahrain debrief"
          />

          <p>
            McLaren, for their part, had not been idle over the winter months. The Woking
            operation arrived in Bahrain with a car that their engineers described — with
            characteristic British understatement — as "meaningfully evolved." In plain
            language: the MCL39 was faster in almost every metric than the MCL38 that had
            stunned the paddock by winning six grands prix in the second half of 2024.
          </p>

          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '26px',
              color: 'var(--dta-white)',
              margin: '36px 0 16px',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}
          >
            The Ferrari Wildcard
          </h2>

          <p>
            If Verstappen's dominance was the expected headline and McLaren's resurgence the
            anticipated subplot, then the Ferrari story was the one nobody could have scripted.
            Lewis Hamilton, seven-time world champion, arrived in Maranello not as a mercenary
            chasing one last contract, but — by all accounts from those inside the Scuderia —
            as a man genuinely transformed by a new environment, new engineers, and a car that
            felt, he said in testing, "alive in a way I haven't experienced in years."
          </p>

          {/* Inline image */}
          <figure style={{ margin: '32px 0', padding: 0 }}>
            <img
              src="https://picsum.photos/seed/hamilton-ferrari-cockpit/720/405"
              alt="Hamilton in the Ferrari SF-25 cockpit during pre-season testing"
              style={{
                width: '100%',
                borderRadius: '6px',
                display: 'block',
              }}
              loading="lazy"
            />
            <figcaption
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                color: 'var(--dta-muted)',
                marginTop: '10px',
                lineHeight: 1.5,
              }}
            >
              Hamilton cuts a focused figure during pre-season testing at Bahrain International
              Circuit. His integration into the Ferrari camp has been faster than even optimists
              predicted. (Image: DriveTheApex / Getty)
            </figcaption>
          </figure>

          <p>
            Charles Leclerc, meanwhile, navigated the psychological complexity of his new
            situation with admirable composure. To have partnered with Verstappen, Norris, or
            any of the other acknowledged pace-setters of his generation might have felt like
            a direct comparison; to partner Hamilton felt, at least at first, like an exercise
            in comparison across eras. By Bahrain, though, it was clear this was simply going
            to be the fastest driver pairing on the grid — and that both men knew it.
          </p>

          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '26px',
              color: 'var(--dta-white)',
              margin: '36px 0 16px',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}
          >
            Strategy as a Weapon
          </h2>

          <p>
            One of the most striking developments of the early season has been the way teams
            are using the undercut not merely as a defensive tool but as an aggressive one.
            Pit stops that once represented a defensive response to a threat now arrive
            proactively, sometimes nearly twenty laps earlier than any commentator would have
            predicted, as teams seek to manufacture the clean air that remains the single most
            valuable commodity on a Formula 1 racetrack.
          </p>

          {/* Blockquote style section */}
          <div
            style={{
              background: 'var(--dta-card)',
              border: '1px solid var(--dta-border)',
              borderRadius: '6px',
              padding: '24px',
              margin: '32px 0',
            }}
          >
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontStyle: 'italic',
                fontSize: '11px',
                color: 'var(--dta-muted)',
                margin: '0 0 12px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Editor's note
            </p>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.7 }}>
              This article draws on technical telemetry data, exclusive paddock interviews
              conducted across Bahrain, Saudi Arabia, and Australia, and background briefings
              provided by four of the ten teams currently competing in the 2025 Formula 1
              World Championship. Some sources requested anonymity to speak candidly about
              competitors' performance.
            </p>
          </div>

          <p>
            Pirelli's 2025 compound allocations have played a significant role in enabling this
            strategic flexibility. The new C4 compound, softer than its predecessor, degrades
            more predictably in the medium-temperature window that characterises the majority of
            circuits on the calendar. This predictability — counter-intuitive as it sounds — is
            precisely what strategists require to commit to early stops with confidence.
          </p>

          <PullQuote
            text="The tyre is now a chess piece, not just a tool. Teams that understand degradation curves two stints ahead will win championships."
            attribution="Anonymous F1 race strategist"
          />

          <p>
            As the season reaches its European phase, the championship picture remains
            genuinely unresolved. Verstappen leads, as he so often does, but his margin is
            smaller than it has been at this point in any of his three title-winning campaigns.
            Norris is close enough that a single double-DNF for Red Bull would fundamentally
            alter the calculus. Hamilton, improbably, impossibly, is in the fight. And
            Leclerc — the man who has come so heartbreakingly close before — has the fastest
            car on race day by some metrics and the composure of someone who has learned,
            finally, to wait.
          </p>

          <p>
            Silverstone awaits. Monaco looms. And somewhere in the data centres of ten
            factories spread across England, Austria, Italy, and France, engineers are already
            modelling scenarios for Abu Dhabi. The 2025 Formula 1 season has barely reached
            its halfway point, and it is already extraordinary.
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Related articles                                                  */}
        {/* ---------------------------------------------------------------- */}
        <RevealOnScroll>
          <section
            style={{
              padding: '64px 24px 0',
            }}
          >
            {/* Section label */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '3px',
                  height: '20px',
                  background: 'var(--dta-red)',
                  flexShrink: 0,
                }}
              />
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontStyle: 'italic',
                  fontSize: '13px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--dta-muted)',
                  margin: 0,
                }}
              >
                You May Also Like
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px',
              }}
            >
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} size="compact" />
              ))}
            </div>
          </section>
        </RevealOnScroll>
      </main>
    </div>
  )
}
