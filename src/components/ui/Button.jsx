import React from 'react'

const variants = {
  primary: {
    base: 'bg-[#CE4F37] text-white border-transparent',
    hover: 'hover:bg-[#D95C42] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(206,79,55,0.3)]',
    active: 'active:translate-y-0 active:shadow-none',
  },
  secondary: {
    base: 'bg-transparent text-[#E0DDD6] border-[rgba(255,255,255,0.14)]',
    hover: 'hover:border-[rgba(255,255,255,0.28)] hover:-translate-y-px',
    active: 'active:translate-y-0',
  },
  ghost: {
    base: 'bg-transparent text-[#CE4F37] border-transparent',
    hover: 'hover:text-[#D95C42]',
    active: '',
  },
}

const sizes = {
  sm: 'h-8 px-4 text-[11px]',
  md: 'h-10 px-5 text-[13px]',
  lg: 'h-12 px-6 text-[14px]',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  as: Tag = 'button',
  href,
  ...props
}) {
  const v = variants[variant] || variants.primary
  const s = sizes[size] || sizes.md

  const classes = [
    'inline-flex items-center justify-center gap-2',
    'font-[Inter] font-bold tracking-[0.06em] uppercase',
    'rounded-[4px] border',
    'transition-all duration-150 ease-out',
    'select-none cursor-pointer',
    v.base,
    v.hover,
    v.active,
    s,
    disabled ? 'opacity-40 pointer-events-none' : '',
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Tag type={type} className={classes} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </Tag>
  )
}
