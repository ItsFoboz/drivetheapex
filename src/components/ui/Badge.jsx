import React from 'react'

const variants = {
  live: 'bg-[rgba(206,79,55,0.18)] text-[#CE4F37] border border-[rgba(206,79,55,0.3)]',
  category: 'bg-[rgba(224,221,214,0.07)] text-[#E0DDD6] border border-[rgba(255,255,255,0.08)]',
  premium: 'bg-[rgba(186,148,40,0.14)] text-[#D4A82A] border border-[rgba(186,148,40,0.22)]',
  muted: 'bg-transparent text-[#888580] border border-[rgba(255,255,255,0.14)]',
}

export function Badge({ variant = 'category', children, className = '' }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5',
        'px-2.5 py-0.5',
        'rounded-[2px]',
        'font-[Inter] font-bold text-[10px] tracking-[0.12em] uppercase',
        variants[variant] || variants.category,
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </span>
  )
}

export function LiveBadge({ className = '' }) {
  return (
    <Badge variant="live" className={className}>
      <span className="relative inline-flex w-1.5 h-1.5">
        <span className="absolute inset-0 rounded-full bg-[#CE4F37] animate-[pulse-dot_1.8s_ease-out_infinite]" />
        <span className="relative rounded-full w-1.5 h-1.5 bg-[#CE4F37]" />
      </span>
      LIVE
    </Badge>
  )
}

export function TagPill({ children, active = false, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={[
        'inline-flex items-center px-3 py-1',
        'rounded-[2px] border',
        'font-[Inter] font-bold text-[10px] tracking-[0.1em] uppercase',
        'transition-colors duration-150',
        'cursor-pointer',
        active
          ? 'border-[#CE4F37] text-[#CE4F37]'
          : 'border-[rgba(255,255,255,0.14)] text-[#888580] hover:border-[rgba(255,255,255,0.28)] hover:text-[#E0DDD6]',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  )
}
