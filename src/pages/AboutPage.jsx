import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PullQuote } from '@/components/article/PullQuote'
import Button from '@/components/ui/Button'

const TIMELINE = [
  { year: '2023', title: 'The idea was born', body: 'Frustrated by coverage that missed the soul of the sport, we started DriveTheApex with a single mission: authentic motorsport storytelling from people who live it.' },
  { year: '2024', title: 'First editorial published', body: 'Our debut season-opener analysis reached 50,000 readers in its first week. The response told us the audience was ready for something different.' },
  { year: '2025', title: 'Growing toward paddock access', body: 'Now building the editorial brand, audience, and partnerships needed to earn accreditation. The paddock is the goal.' },
]

const TEAM = [
  { name: 'James Mitchell', role: 'Editor-in-Chief', image: 'https://picsum.photos/seed/team-1/200/200', bio: '15 years covering motorsport. Former pit-lane reporter for Sky Sports.' },
  { name: 'Sofia Reyes', role: 'Senior Writer', image: 'https://picsum.photos/seed/team-2/200/200', bio: 'Technical analyst and data journalist. WEC and F1 specialist.' },
  { name: 'Kai Nakamura', role: 'Video Producer', image: 'https://picsum.photos/seed/team-3/200/200', bio: 'Cinematographer. Previously worked on Amazon F1 documentary.' },
]

function RevealSection({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current.classList.add('is-visible') },
      { threshold: 0.1 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--dta-black)', minHeight: '100vh' }}>
      {/* Hero */}
      <div
        className="relative text-center"
        style={{ background: 'var(--dta-surface)', borderBottom: '1px solid var(--dta-border)', padding: '96px 24px 80px', overflow: 'hidden' }}
      >
        <div className="grain-overlay" aria-hidden="true" />
        <div className="relative z-10">
          <h1 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em', fontSize: 'clamp(48px, 8vw, 80px)', color: 'var(--dta-white)', lineHeight: 1, marginBottom: 16 }}>
            The Journey
          </h1>
          <p style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontStyle: 'italic', fontSize: 28, color: 'var(--dta-muted)' }}>
            From the stands to the paddock.
          </p>
        </div>
      </div>

      {/* Brand story */}
      <div className="max-w-[720px] mx-auto px-6 py-20">
        <RevealSection>
          <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'rgba(224,221,214,0.85)', lineHeight: 1.75, marginBottom: 24 }}>
            DriveTheApex was built on a simple belief: motorsport deserves better coverage. The kind that respects the intelligence of the fan, digs into the technical details that matter, and tells the stories that don't make the official press releases. We're not here to aggregate — we're here to report.
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'rgba(224,221,214,0.85)', lineHeight: 1.75, marginBottom: 24 }}>
            Every race weekend, we're watching the same screens you are. But we're also pouring over the timing data, the team radio transcripts, the tyre degradation curves. We want to give you the story behind the story — the one that explains why Lap 34 was the inflection point, why that particular strategy gamble was the decision of the season.
          </p>

          <PullQuote text="We're not building a website. We're building the editorial brand that earns a seat at the table — in the paddock, in the press room, in the sport." />

          <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'rgba(224,221,214,0.85)', lineHeight: 1.75, marginBottom: 24 }}>
            The long-term goal is straightforward: paddock accreditation. That means building an audience, an editorial reputation, and the commercial foundations that make a serious media operation possible. Every article we publish, every video we produce, every race we cover — it's all evidence. Evidence that we belong in that room.
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'rgba(224,221,214,0.85)', lineHeight: 1.75 }}>
            We're independent. We answer to our readers, not sponsors. That independence is the thing we protect above all else — it's what makes the journalism worth reading. Join us for the journey.
          </p>
        </RevealSection>
      </div>

      {/* Timeline */}
      <div style={{ background: 'var(--dta-surface)', borderTop: '1px solid var(--dta-border)', borderBottom: '1px solid var(--dta-border)', padding: '64px 0' }}>
        <div className="max-w-[720px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dta-red)' }}>MILESTONES</span>
            <div className="flex-1 h-px" style={{ background: 'var(--dta-border)' }} />
          </div>
          <div className="relative">
            <div style={{ position: 'absolute', left: 52, top: 0, bottom: 0, width: 1, background: 'var(--dta-border)' }} />
            <div className="space-y-12">
              {TIMELINE.map(item => (
                <RevealSection key={item.year} className="flex gap-8 items-start">
                  <div style={{ flexShrink: 0, width: 48, textAlign: 'right' }}>
                    <span style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontSize: 18, color: 'var(--dta-red)' }}>{item.year}</span>
                  </div>
                  <div style={{ flexShrink: 0, width: 10, height: 10, borderRadius: '50%', background: 'var(--dta-red)', marginTop: 6, zIndex: 1, position: 'relative', marginLeft: -1 }} />
                  <div>
                    <h3 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontSize: 20, color: 'var(--dta-white)', marginBottom: 6 }}>{item.title}</h3>
                    <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--dta-muted)', lineHeight: 1.7 }}>{item.body}</p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div style={{ padding: '64px 0' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dta-red)' }}>THE TEAM</span>
            <div className="flex-1 h-px" style={{ background: 'var(--dta-border)' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map(member => (
              <RevealSection key={member.name}>
                <div className="flex flex-col items-center text-center">
                  <img src={member.image} alt={member.name} className="rounded-[6px] mb-4" style={{ width: 96, height: 96, objectFit: 'cover' }} />
                  <h3 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontSize: 18, color: 'var(--dta-white)', marginBottom: 2 }}>{member.name}</h3>
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dta-red)', display: 'block', marginBottom: 8 }}>{member.role}</span>
                  <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--dta-muted)', lineHeight: 1.65 }}>{member.bio}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>

      {/* Partnership CTA */}
      <div style={{ background: 'var(--dta-surface)', borderTop: '1px solid var(--dta-border)', padding: '80px 24px' }}>
        <div className="max-w-[640px] mx-auto text-center">
          <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dta-red)', display: 'block', marginBottom: 16 }}>
            PARTNER WITH US
          </span>
          <h2 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.02em', fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--dta-white)', lineHeight: 1.05, marginBottom: 16 }}>
            Drive Your Brand to the Apex
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--dta-muted)', lineHeight: 1.7, marginBottom: 32 }}>
            We're building an engaged audience of motorsport enthusiasts, analysts, and fans. If your brand is aligned with performance, precision, and the culture of racing — we'd love to talk. Sponsorship opportunities, branded content, and media partnerships available.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button variant="primary" size="lg">Get In Touch</Button>
            <Button variant="secondary" size="lg">Media Kit</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
