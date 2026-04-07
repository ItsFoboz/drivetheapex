import React, { useState } from 'react'
import { TagPill } from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

const CATEGORIES = ['All', 'Apparel', 'Headwear', 'Accessories']

const PRODUCTS = [
  { id: 1, name: 'Apex Racing Tee', category: 'Apparel', price: '£34.99', image: 'https://picsum.photos/seed/merch-tee/600/600', description: 'Premium heavyweight cotton. Embroidered apex mark.' },
  { id: 2, name: 'Paddock Snapback', category: 'Headwear', price: '£28.99', image: 'https://picsum.photos/seed/merch-cap/600/600', description: 'Structured 6-panel cap. Red undervisor.' },
  { id: 3, name: 'DTA Hoodie', category: 'Apparel', price: '£64.99', image: 'https://picsum.photos/seed/merch-hoodie/600/600', description: '380gsm French terry. Embroidered logo on chest.' },
  { id: 4, name: 'Motorsport Beanie', category: 'Headwear', price: '£22.99', image: 'https://picsum.photos/seed/merch-beanie/600/600', description: 'Double-knit cuffed beanie. Woven label.' },
  { id: 5, name: 'Apex Keyring', category: 'Accessories', price: '£14.99', image: 'https://picsum.photos/seed/merch-key/600/600', description: 'Die-cast zinc alloy. Enamel fill in race red.' },
  { id: 6, name: 'Track Sticker Pack', category: 'Accessories', price: '£8.99', image: 'https://picsum.photos/seed/merch-sticker/600/600', description: '8-sticker set. UV-resistant matte vinyl.' },
]

function ProductCard({ product }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <article
      className="group"
      style={{
        background: 'var(--dta-card)',
        border: '1px solid var(--dta-border)',
        borderRadius: 6,
        overflow: 'hidden',
        transition: 'transform 220ms ease-out, border-color 220ms ease-out',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--dta-border-mid)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--dta-border)' }}
    >
      <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: '#2a2a2a' }}>
        {!loaded && <div className="shimmer w-full h-full" />}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 300ms ease-out, transform 400ms ease-out', display: loaded ? 'block' : 'none' }}
        />
      </div>
      <div style={{ padding: '16px 20px 20px' }}>
        <h3 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontSize: 18, color: 'var(--dta-white)', marginBottom: 4 }}>{product.name}</h3>
        <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--dta-muted)', lineHeight: 1.5, marginBottom: 12 }}>{product.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontSize: 22, color: 'var(--dta-white)' }}>{product.price}</span>
          <Button variant="primary" size="sm">Shop Now</Button>
        </div>
      </div>
    </article>
  )
}

export default function MerchPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory)

  return (
    <div style={{ background: 'var(--dta-black)', minHeight: '100vh' }}>
      {/* Header */}
      <div
        className="relative"
        style={{ background: 'var(--dta-surface)', borderBottom: '1px solid var(--dta-border)', padding: '96px 0 48px', overflow: 'hidden' }}
      >
        <div className="grain-overlay" aria-hidden="true" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <h1 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em', fontSize: 'clamp(48px, 8vw, 80px)', color: 'var(--dta-white)', lineHeight: 1 }}>
            Merch
          </h1>
          <p style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontStyle: 'italic', fontSize: 22, color: 'var(--dta-muted)', marginTop: 8 }}>
            Rep the apex.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(c => (
            <TagPill key={c} active={activeCategory === c} onClick={() => setActiveCategory(c)}>{c}</TagPill>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* Shopify embed placeholder */}
        <div
          style={{ border: '1px dashed var(--dta-border-mid)', borderRadius: 6, padding: 48, textAlign: 'center', background: 'var(--dta-surface)' }}
          className="mb-16"
        >
          <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dta-muted)', display: 'block', marginBottom: 8 }}>
            SHOPIFY INTEGRATION
          </span>
          <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--dta-muted)' }}>
            Shopify Buy Button will load here once store is configured.
          </p>
        </div>

        {/* Featured item banner */}
        <div
          className="relative overflow-hidden rounded-[6px] flex items-center"
          style={{ minHeight: 240, background: 'var(--dta-card)', border: '1px solid var(--dta-border)' }}
        >
          <img
            src="https://picsum.photos/seed/featured-merch/1200/400"
            alt="Featured item"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.3 }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(14,14,14,0.95) 40%, rgba(14,14,14,0.3) 100%)' }} />
          <div className="relative z-10 p-10">
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dta-red)', display: 'block', marginBottom: 12 }}>
              NEW DROP
            </span>
            <h2 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--dta-white)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 12 }}>
              Season 2025<br />Collection
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--dta-muted)', marginBottom: 20, maxWidth: 340 }}>
              Premium race-inspired apparel and accessories. Limited quantities — drops every race weekend.
            </p>
            <Button variant="primary">Coming Soon</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
