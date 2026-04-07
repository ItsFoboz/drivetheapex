import { Link } from 'react-router-dom'
import { Twitter, Instagram, Youtube } from 'lucide-react'
import Logo from '@/components/shared/Logo'

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'News',      to: '/news' },
  { label: 'Formula 1', to: '/formula-1' },
  { label: 'Race Hub',  to: '/race-hub' },
  { label: 'Videos',    to: '/videos' },
  { label: 'Galleries', to: '/galleries' },
  { label: 'Merch',     to: '/merch' },
  { label: 'About',     to: '/about' },
]

const SOCIAL_LINKS = [
  {
    label: 'Twitter / X',
    handle: '@DriveTheApex',
    href: 'https://twitter.com/drivetheapex',
    Icon: Twitter,
  },
  {
    label: 'Instagram',
    handle: '@drivetheapex',
    href: 'https://instagram.com/drivetheapex',
    Icon: Instagram,
  },
  {
    label: 'YouTube',
    handle: 'DriveTheApex',
    href: 'https://youtube.com/@drivetheapex',
    Icon: Youtube,
  },
]

// ─── Sub-component: section heading label ────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        color: 'var(--dta-red)',
        margin: '0 0 16px 0',
      }}
    >
      {children}
    </p>
  )
}

// ─── Sub-component: muted link with hover ────────────────────────────────────

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        display: 'block',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontSize: '14px',
        color: 'var(--dta-muted)',
        textDecoration: 'none',
        lineHeight: 1.5,
        transition: 'color 150ms ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--dta-white)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dta-muted)')}
    >
      {children}
    </Link>
  )
}

// ─── Sub-component: social icon button ───────────────────────────────────────

function SocialIcon({ href, label, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--dta-muted)',
        transition: 'color 150ms ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--dta-white)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dta-muted)')}
    >
      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
    </a>
  )
}

// ─── Main Footer component ────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--dta-surface)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Main content area */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '64px 24px 0',
        }}
      >
        {/* ── Three-column grid ─────────────────────────────────────────── */}
        <div className="footer-grid">
          {/* ── Col 1: Brand ───────────────────────────────────────────── */}
          <div className="footer-col footer-col--brand">
            <Link
              to="/"
              aria-label="DriveTheApex — home"
              style={{ display: 'inline-flex', marginBottom: '16px' }}
            >
              <Logo height={28} variant="full" />
            </Link>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '14px',
                color: 'var(--dta-muted)',
                lineHeight: 1.6,
                margin: '0 0 24px 0',
                maxWidth: '260px',
              }}
            >
              The definitive voice from the apex.
            </p>

            {/* Social icons row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <SocialIcon key={label} href={href} label={label} Icon={Icon} />
              ))}
            </div>
          </div>

          {/* ── Col 2: Navigate ────────────────────────────────────────── */}
          <div className="footer-col">
            <SectionLabel>Navigate</SectionLabel>
            <nav aria-label="Footer navigation">
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {NAV_LINKS.map(({ label, to }) => (
                  <li key={to}>
                    <FooterLink to={to}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Col 3: Follow ──────────────────────────────────────────── */}
          <div className="footer-col">
            <SectionLabel>Follow</SectionLabel>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              {SOCIAL_LINKS.map(({ label, handle, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: 'var(--dta-muted)',
                      textDecoration: 'none',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      fontWeight: 400,
                      transition: 'color 150ms ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--dta-white)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dta-muted)')}
                  >
                    <Icon size={16} strokeWidth={1.75} aria-hidden="true" style={{ flexShrink: 0 }} />
                    {handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            marginTop: '48px',
            padding: '24px 0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              color: 'var(--dta-muted)',
              margin: 0,
            }}
          >
            © 2025 DriveTheApex. All rights reserved.
          </p>

          <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { label: 'Privacy Policy', to: '/privacy' },
              { label: 'Terms',          to: '/terms' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '12px',
                  color: 'var(--dta-muted)',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--dta-white)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dta-muted)')}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive grid styles */}
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1.4fr 1fr 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </footer>
  )
}
