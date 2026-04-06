import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Lock } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { MOCK_ARTICLES } from '@/lib/mockData'

const FEATURES_MONTHLY = [
  'Unlimited premium articles',
  'Exclusive race analysis',
  'Early access to new content',
  'Ad-free experience',
  'Monthly roundup newsletter',
]

const FEATURES_ANNUAL = [
  ...FEATURES_MONTHLY,
  'Priority support',
  'Exclusive digital magazine',
]

const FAQ = [
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel whenever you like from your account settings. You retain access until the end of your billing period.' },
  { q: 'What counts as premium content?', a: 'In-depth race analysis, technical breakdowns, exclusive interviews, and our long-form features are marked with a PREMIUM badge.' },
  { q: 'Is there a free trial?', a: 'Yes — your first 7 days are completely free. No payment taken until day 8.' },
  { q: 'Can I switch plans?', a: 'Absolutely. Upgrade from monthly to annual at any time and we\'ll prorate the difference.' },
  { q: 'What payment methods do you accept?', a: 'All major cards via Stripe. Apple Pay and Google Pay also supported.' },
]

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--dta-border)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 15, color: 'var(--dta-white)' }}>{question}</span>
        <span style={{ color: open ? 'var(--dta-red)' : 'var(--dta-muted)', fontSize: 22, lineHeight: 1, transition: 'color 150ms ease-out, transform 220ms ease-out', transform: open ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block', flexShrink: 0, marginLeft: 16 }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: 'hidden', transition: 'max-height 320ms cubic-bezier(0.4,0,0.2,1)' }}>
        <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--dta-muted)', lineHeight: 1.7, paddingBottom: 20 }}>{answer}</p>
      </div>
    </div>
  )
}

export default function MembershipPage() {
  const [billing, setBilling] = useState('annual')

  return (
    <div style={{ background: 'var(--dta-black)', minHeight: '100vh' }}>
      {/* Hero */}
      <div
        className="relative text-center"
        style={{ background: 'var(--dta-surface)', borderBottom: '1px solid var(--dta-border)', padding: '96px 24px 80px', overflow: 'hidden' }}
      >
        <div className="grain-overlay" aria-hidden="true" />
        <div className="relative z-10">
          <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dta-red)', display: 'block', marginBottom: 16 }}>
            DRIVETHEAPEX PREMIUM
          </span>
          <h1 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em', fontSize: 'clamp(40px, 7vw, 72px)', color: 'var(--dta-white)', lineHeight: 1, maxWidth: 800, margin: '0 auto 20px' }}>
            Unlock the Full Story
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: 'var(--dta-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
            Get unrestricted access to all premium analysis, exclusive race reports, and behind-the-scenes content from the paddock.
          </p>
        </div>
      </div>

      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3 py-12">
        <span style={{ fontFamily: 'Inter', fontSize: 14, color: billing === 'monthly' ? 'var(--dta-white)' : 'var(--dta-muted)' }}>Monthly</span>
        <button
          onClick={() => setBilling(b => b === 'monthly' ? 'annual' : 'monthly')}
          style={{
            width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
            background: billing === 'annual' ? 'var(--dta-red)' : 'rgba(255,255,255,0.14)',
            position: 'relative', transition: 'background 220ms ease-out',
          }}
          aria-label="Toggle billing period"
        >
          <span style={{
            position: 'absolute', top: 3, left: billing === 'annual' ? 25 : 3,
            width: 20, height: 20, borderRadius: '50%', background: '#fff',
            transition: 'left 220ms cubic-bezier(0.4,0,0.2,1)',
          }} />
        </button>
        <span style={{ fontFamily: 'Inter', fontSize: 14, color: billing === 'annual' ? 'var(--dta-white)' : 'var(--dta-muted)' }}>Annual</span>
        <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4A82A', background: 'rgba(212,168,42,0.12)', border: '1px solid rgba(212,168,42,0.25)', borderRadius: 2, padding: '2px 8px' }}>
          SAVE 37%
        </span>
      </div>

      {/* Pricing cards */}
      <div className="max-w-[900px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly */}
          <div style={{ background: 'var(--dta-card)', border: '1px solid var(--dta-border)', borderRadius: 6, padding: 32 }}>
            <div className="mb-6">
              <h2 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontSize: 22, color: 'var(--dta-white)', marginBottom: 4 }}>Monthly</h2>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontSize: 48, color: 'var(--dta-white)', lineHeight: 1 }}>£7.99</span>
                <span style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--dta-muted)' }}>/month</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {FEATURES_MONTHLY.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <Check size={15} style={{ color: 'var(--dta-red)', marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--dta-muted)' }}>{f}</span>
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="w-full" as={Link} to="/signup?plan=monthly">
              Start Free Trial
            </Button>
            <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--dta-muted)', textAlign: 'center', marginTop: 12 }}>
              No commitment, cancel anytime.
            </p>
          </div>

          {/* Annual — featured */}
          <div style={{ background: 'var(--dta-card)', border: '1px solid rgba(206,79,55,0.35)', borderRadius: 6, padding: 32, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: 'var(--dta-red)' }} />
            <div style={{ position: 'absolute', top: 16, right: 16 }}>
              <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4A82A', background: 'rgba(212,168,42,0.14)', border: '1px solid rgba(212,168,42,0.25)', borderRadius: 2, padding: '3px 8px' }}>
                BEST VALUE
              </span>
            </div>
            <div className="mb-6">
              <h2 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontSize: 22, color: 'var(--dta-white)', marginBottom: 4 }}>Annual</h2>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontSize: 48, color: 'var(--dta-white)', lineHeight: 1 }}>£59.99</span>
                <span style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--dta-muted)' }}>/year</span>
              </div>
              <p style={{ fontFamily: 'Inter', fontSize: 12, color: '#D4A82A', marginTop: 4 }}>Equivalent to £5.00/month</p>
            </div>
            <ul className="space-y-3 mb-8">
              {FEATURES_ANNUAL.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <Check size={15} style={{ color: 'var(--dta-red)', marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--dta-muted)' }}>{f}</span>
                </li>
              ))}
            </ul>
            <Button variant="primary" className="w-full" as={Link} to="/signup?plan=annual">
              Start Free Trial
            </Button>
            <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--dta-muted)', textAlign: 'center', marginTop: 12 }}>
              No commitment, cancel anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Premium preview — blurred articles */}
      <div style={{ background: 'var(--dta-surface)', borderTop: '1px solid var(--dta-border)', borderBottom: '1px solid var(--dta-border)', padding: '64px 0' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center gap-4 mb-8">
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dta-red)' }}>PREMIUM PREVIEW</span>
            <div className="flex-1 h-px" style={{ background: 'var(--dta-border)' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_ARTICLES.filter(a => a.premium).slice(0, 2).map(article => (
              <div key={article.id} className="relative overflow-hidden rounded-[6px]" style={{ background: 'var(--dta-card)' }}>
                {article.heroImage && (
                  <div style={{ height: 160, overflow: 'hidden' }}>
                    <img src={article.heroImage} alt="" className="w-full h-full object-cover" style={{ filter: 'blur(2px)', transform: 'scale(1.05)' }} />
                  </div>
                )}
                <div style={{ padding: '16px 20px', filter: 'blur(4px)', userSelect: 'none' }}>
                  <h3 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontSize: 18, color: 'var(--dta-white)', marginBottom: 8 }}>{article.title}</h3>
                  <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--dta-muted)', lineHeight: 1.6 }}>{article.excerpt}</p>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ background: 'rgba(14,14,14,0.72)', backdropFilter: 'blur(4px)' }}>
                  <Lock size={24} style={{ color: 'var(--dta-red)', marginBottom: 12 }} />
                  <Badge variant="premium">PREMIUM CONTENT</Badge>
                  <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--dta-muted)', margin: '12px 0 20px', maxWidth: 240 }}>Subscribe to unlock this and all premium content.</p>
                  <Button variant="primary" size="sm" as={Link} to="/membership">Unlock Now</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-[720px] mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-8">
          <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dta-red)' }}>FAQ</span>
          <div className="flex-1 h-px" style={{ background: 'var(--dta-border)' }} />
        </div>
        {FAQ.map(({ q, a }) => <FaqItem key={q} question={q} answer={a} />)}
      </div>
    </div>
  )
}
