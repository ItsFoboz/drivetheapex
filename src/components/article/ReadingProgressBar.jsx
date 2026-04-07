import React from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

/**
 * ReadingProgressBar
 * A 2px fixed bar at the very top of the viewport that fills left-to-right
 * as the user scrolls through the document.
 */
export function ReadingProgressBar() {
  const progress = useScrollProgress()

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        height: '2px',
        width: `${progress}%`,
        backgroundColor: 'var(--dta-red)',
        // No CSS transition — width is driven in real-time via JS/rAF
        pointerEvents: 'none',
      }}
    />
  )
}

export default ReadingProgressBar
