import { useEffect, useRef } from 'react'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

// ─── Lenis smooth scroll initialisation ──────────────────────────────────────

function useLenis() {
  const lenisRef = useRef(null)
  const rafIdRef = useRef(null)

  useEffect(() => {
    // Respect the user's motion preference — skip Lenis entirely if reduced-motion
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) return

    let lenis

    // Dynamic import keeps the bundle lean: Lenis is only evaluated client-side
    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      })

      lenisRef.current = lenis

      function raf(time) {
        lenis.raf(time)
        rafIdRef.current = requestAnimationFrame(raf)
      }

      rafIdRef.current = requestAnimationFrame(raf)
    })

    return () => {
      // Cancel the RAF loop
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      // Destroy the Lenis instance (removes its own event listeners)
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [])
}

// ─── Layout component ─────────────────────────────────────────────────────────

export default function Layout({ children }) {
  useLenis()

  return (
    <>
      <Nav />

      {/*
        Push page content below the fixed nav (64px).
        min-height ensures short pages still fill the viewport so the
        footer sits at the bottom.
      */}
      <main
        style={{
          paddingTop: '64px',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </main>

      <Footer />
    </>
  )
}
