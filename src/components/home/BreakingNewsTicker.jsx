import React from 'react'

const NEWS_ITEMS = [
  'Verstappen takes pole in Bahrain qualifying',
  'Ferrari confirms major aero upgrade for China GP',
  'Hamilton begins new chapter at Ferrari — first tests complete',
  'Sainz wins in Australia in dramatic final lap',
  'FIA confirms new sprint race format for six rounds',
  'McLaren signs extended partnership with Gulf Oil',
  'Alonso returns to Le Mans with Aston Martin in 2025',
  'Newey completes shock move to Aston Martin F1',
]

export default function BreakingNewsTicker() {
  // Double the array for seamless loop
  const doubled = [...NEWS_ITEMS, ...NEWS_ITEMS]

  return (
    <div
      className="w-full overflow-hidden"
      style={{ background: 'var(--dta-surface)', borderBottom: '1px solid var(--dta-border)' }}
    >
      <div className="flex items-center h-10">
        {/* "LATEST" Label */}
        <div className="flex-shrink-0 flex items-center h-full px-4 gap-3">
          <span
            style={{
              fontFamily: '"Barlow Condensed", sans-serif',
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--dta-red)',
            }}
          >
            LATEST
          </span>
          <div className="w-px h-4" style={{ background: 'var(--dta-border-mid)' }} />
        </div>

        {/* Scrolling ticker */}
        <div className="flex-1 overflow-hidden relative">
          <div className="ticker-track flex items-center whitespace-nowrap" aria-live="polite">
            {doubled.map((item, i) => (
              <span key={i} className="inline-flex items-center">
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    color: 'var(--dta-white)',
                    fontWeight: 400,
                  }}
                >
                  {item}
                </span>
                {/* Separator dot */}
                <span
                  className="mx-6 inline-block w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: 'var(--dta-red)' }}
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
