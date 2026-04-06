import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from './Badge'

/**
 * ArticleCard — used in content grids
 * Props: article { slug, title, excerpt, category, author, publishedAt, readTime, premium, heroImage }
 * size: 'default' | 'featured' | 'compact'
 */
export function ArticleCard({ article, size = 'default', className = '' }) {
  const imgRef = useRef(null)

  return (
    <Link
      to={`/article/${article.slug}`}
      className={[
        'group relative flex flex-col',
        'bg-[#1E1E1E] border border-[rgba(255,255,255,0.08)]',
        'rounded-[6px] overflow-hidden',
        'transition-all duration-[220ms] ease-out',
        'hover:-translate-y-[3px] hover:border-[rgba(255,255,255,0.14)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#CE4F37] focus-visible:outline-offset-2',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Red accent border */}
      <span
        className="absolute left-0 top-0 w-[3px] bg-[#CE4F37] z-10 transition-all duration-200 ease-out"
        style={{ height: 0 }}
        aria-hidden="true"
        onMouseEnter={e => { e.currentTarget.closest('a').style.setProperty('--accent-h', '100%') }}
        ref={el => {
          if (el) {
            const link = el.closest('a')
            link.addEventListener('mouseenter', () => { el.style.height = '100%' })
            link.addEventListener('mouseleave', () => { el.style.height = '0%' })
          }
        }}
      />

      {/* Image */}
      {article.heroImage && (
        <div className="overflow-hidden" style={{ height: size === 'featured' ? 280 : size === 'compact' ? 120 : 180 }}>
          <img
            ref={imgRef}
            src={article.heroImage}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
            style={{ display: 'block' }}
          />
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="category">{article.category}</Badge>
          {article.premium && <Badge variant="premium">PREMIUM</Badge>}
        </div>
        <h3 className={[
          'font-[\'Barlow_Condensed\'] font-bold text-[#E0DDD6] leading-tight',
          size === 'featured' ? 'text-2xl' : 'text-lg',
        ].join(' ')}>
          {article.title}
        </h3>
        {size !== 'compact' && (
          <p className="text-[#888580] text-[14px] leading-[1.6] line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center gap-3 text-[11px] text-[#888580]">
          <span>{article.author}</span>
          <span>·</span>
          <span>{article.readTime} min read</span>
        </div>
      </div>
    </Link>
  )
}

/**
 * NewsCard — compact news blurb card
 */
export function NewsCard({ item, className = '' }) {
  return (
    <article
      className={[
        'group relative',
        'bg-[#1E1E1E] border border-[rgba(255,255,255,0.08)]',
        'rounded-[6px] overflow-hidden p-4',
        'transition-all duration-[220ms] ease-out',
        'hover:-translate-y-[3px] hover:border-[rgba(255,255,255,0.14)]',
        className,
      ].filter(Boolean).join(' ')}
      ref={el => {
        if (el) {
          const accent = el.querySelector('.accent-bar')
          el.addEventListener('mouseenter', () => { if (accent) accent.style.height = '100%' })
          el.addEventListener('mouseleave', () => { if (accent) accent.style.height = '0%' })
        }
      }}
    >
      <span className="accent-bar absolute left-0 top-0 w-[3px] bg-[#CE4F37] transition-all duration-200 ease-out" style={{ height: 0 }} />
      <div className="font-[Inter] font-bold text-[10px] tracking-[0.14em] uppercase text-[#CE4F37] mb-2">
        {item.tag}
      </div>
      <h4 className="text-[#E0DDD6] font-semibold text-[13px] leading-snug mb-1">{item.headline}</h4>
      <p className="text-[#888580] text-[12px] leading-relaxed line-clamp-2">{item.body}</p>
      <div className="mt-3 text-[10px] text-[#888580]">{item.publishedAt}</div>
    </article>
  )
}
