import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import { useStickyNav } from '@/hooks/useStickyNav'

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'News',      to: '/news' },
  { label: 'Formula 1', to: '/formula-1' },
  { label: 'Videos',    to: '/videos' },
  { label: 'Race Hub',  to: '/race-hub' },
  { label: 'Merch',     to: '/merch' },
]

// ─── Sub-component: desktop nav link with animated underline ─────────────────

function DesktopNavLink({ to, label }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        paddingBottom: '2px',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: isActive ? 'var(--dta-white)' : 'var(--dta-muted)',
        textDecoration: 'none',
        transition: 'color 150ms ease',
        whiteSpace: 'nowrap',
      })}
      className="dta-nav-link"
    >
      {({ isActive }) => (
        <>
          {label}
          {/* Active indicator bar — always rendered, animates in via CSS */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'var(--dta-red)',
              transformOrigin: 'left center',
              transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 200ms ease-out',
              borderRadius: '1px',
            }}
          />
        </>
      )}
    </NavLink>
  )
}

// ─── Sub-component: mobile menu overlay ──────────────────────────────────────

function MobileMenu({ isOpen, onClose }) {
  // Trap focus inside menu when open
  const menuRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    // Prevent body scroll while overlay is open
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus first link for accessibility
    const firstLink = menuRef.current?.querySelector('a')
    firstLink?.focus()

    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop — fades in behind the drawer */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 998,
          background: 'rgba(14,14,14,0.7)',
          backdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 320ms ease-out',
        }}
      />

      {/* Drawer panel — slides from top */}
      <nav
        ref={menuRef}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: 'var(--dta-surface)',
          borderBottom: '1px solid var(--dta-border-mid)',
          transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 320ms ease-out',
          paddingTop: '80px',   // below the nav bar
          paddingBottom: '32px',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--dta-muted)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            transition: 'color 150ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--dta-white)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dta-muted)')}
        >
          <X size={22} strokeWidth={2} />
        </button>

        {/* Nav links list */}
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {NAV_LINKS.map(({ label, to }, i) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={onClose}
                style={({ isActive }) => ({
                  display: 'block',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontStyle: 'italic',
                  fontSize: 'clamp(36px, 8vw, 52px)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: isActive ? 'var(--dta-white)' : 'var(--dta-muted)',
                  textDecoration: 'none',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--dta-border)',
                  transition: 'color 150ms ease',
                  // Staggered entry when drawer opens
                  animation: isOpen
                    ? `fade-up 300ms ease-out ${80 + i * 50}ms both`
                    : 'none',
                })}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--dta-white)')}
                onMouseLeave={(e) => {
                  // Only reset if not active — NavLink handles active colour via style prop
                  // We re-read the element's data-active attribute after NavLink sets it.
                  // Simplest: let NavLink's style prop handle active re-paint on next render.
                  // For non-active links this works fine:
                  const link = e.currentTarget
                  if (!link.getAttribute('aria-current')) {
                    link.style.color = 'var(--dta-muted)'
                  }
                }}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA inside mobile menu */}
        <div style={{ marginTop: '28px' }}>
          <Link
            to="/subscribe"
            onClick={onClose}
            style={{
              display: 'inline-block',
              background: 'var(--dta-red)',
              color: 'var(--dta-white)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '12px 28px',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'background 150ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--dta-red-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--dta-red)')}
          >
            Subscribe
          </Link>
        </div>
      </nav>
    </>
  )
}

// ─── Main Nav component ───────────────────────────────────────────────────────

export default function Nav() {
  const { isSticky } = useStickyNav(80)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMenu = useCallback(() => setMobileOpen(false), [])

  // Close mobile menu on viewport resize past breakpoint
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = ({ matches }) => { if (matches) setMobileOpen(false) }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <header
        className="nav-entry"   // mount animation defined in globals.css
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          // Sticky transition
          background: isSticky ? 'rgba(14,14,14,0.88)' : 'transparent',
          backdropFilter: isSticky ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isSticky ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: isSticky
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid transparent',
          transition:
            'background 300ms ease-out, backdrop-filter 300ms ease-out, ' +
            '-webkit-backdrop-filter 300ms ease-out, border-color 300ms ease-out',
        }}
      >
        {/* Inner constraint */}
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
          }}
        >
          {/* ── Left: Logo ─────────────────────────────────────── */}
          <Link
            to="/"
            aria-label="DriveTheApex — home"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              textDecoration: 'none',
            }}
          >
            <Logo height={32} variant="full" />
          </Link>

          {/* ── Center: desktop nav links ───────────────────────── */}
          <nav
            aria-label="Primary navigation"
            style={{
              display: 'none',
              // Show on desktop via media query — we inline a <style> tag below
            }}
            className="dta-desktop-nav"
          >
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <DesktopNavLink to={to} label={label} />
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Right: Subscribe CTA + Hamburger ──────────────── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0,
            }}
          >
            {/* Subscribe button — always visible */}
            <Link
              to="/subscribe"
              style={{
                background: 'var(--dta-red)',
                color: 'var(--dta-white)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '8px 16px',
                borderRadius: '4px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 150ms ease',
                display: 'inline-block',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'var(--dta-red-hover)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'var(--dta-red)')
              }
            >
              Subscribe
            </Link>

            {/* Hamburger — mobile only, hidden on desktop via class */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu-panel"
              className="dta-hamburger"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--dta-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                transition: 'color 150ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--dta-white)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dta-muted)')}
            >
              <Menu size={22} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Responsive visibility rules — injected once, no runtime overhead */}
      <style>{`
        .dta-desktop-nav { display: none !important; }
        .dta-hamburger   { display: flex !important; }

        @media (min-width: 1024px) {
          .dta-desktop-nav { display: flex !important; }
          .dta-hamburger   { display: none !important; }
        }

        /* Hover colour for desktop nav links */
        .dta-nav-link:hover {
          color: var(--dta-white) !important;
        }
      `}</style>

      {/* Mobile menu overlay */}
      <MobileMenu isOpen={mobileOpen} onClose={closeMenu} />
    </>
  )
}
