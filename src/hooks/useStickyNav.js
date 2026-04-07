import { useState, useEffect } from 'react'

/**
 * useStickyNav
 * Returns `isSticky: true` once the page has been scrolled past `threshold` px.
 * Default threshold is 80px (matches the Nav spec).
 */
export function useStickyNav(threshold = 80) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY > threshold)
    }

    // Passive listener — no layout penalty
    window.addEventListener('scroll', onScroll, { passive: true })

    // Sync on mount in case the page loads mid-scroll (e.g. browser back)
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { isSticky }
}
