import React from 'react'

export function ShimmerCard({ className = '' }) {
  return (
    <div className={`bg-[#1E1E1E] rounded-[6px] overflow-hidden ${className}`}>
      <div className="h-44 shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-16 rounded-[2px] shimmer" />
        <div className="h-5 w-full rounded-[2px] shimmer" />
        <div className="h-4 w-3/4 rounded-[2px] shimmer" />
        <div className="h-3 w-1/2 rounded-[2px] shimmer mt-4" />
      </div>
    </div>
  )
}

export function ShimmerText({ className = '', lines = 3 }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded-[2px] shimmer"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  )
}

export function ShimmerImage({ className = '', style }) {
  return (
    <div className={`shimmer ${className}`} style={style} />
  )
}
