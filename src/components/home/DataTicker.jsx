import React from 'react'
import { MOCK_STANDINGS } from '@/lib/mockData'

const TICKER_ITEMS = [
  { label: 'P1', value: 'VER', detail: '+0.0s', color: '#3671C6' },
  { label: 'P2', value: 'PER', detail: '+3.421s', color: '#3671C6' },
  { label: 'P3', value: 'LEC', detail: '+7.884s', color: '#E8002D' },
  { label: 'P4', value: 'SAI', detail: '+12.104s', color: '#E8002D' },
  { label: 'P5', value: 'HAM', detail: '+15.732s', color: '#27F4D2' },
  { label: 'P6', value: 'RUS', detail: '+18.901s', color: '#27F4D2' },
  { label: 'P7', value: 'NOR', detail: '+22.441s', color: '#FF8000' },
  { label: 'P8', value: 'PIA', detail: '+25.109s', color: '#FF8000' },
  { label: 'LAP', value: '47/57', detail: '', color: '#CE4F37' },
  { label: 'SC', value: 'CLEAR', detail: '', color: '#888580' },
  { label: 'FASTEST', value: 'LEC 1:29.421', detail: '', color: '#B144E8' },
]

const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]

export default function DataTicker() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: 'var(--dta-surface)',
        borderTop: '1px solid var(--dta-border)',
        borderBottom: '1px solid var(--dta-border)',
      }}
    >
      <div className="flex items-center h-10">
        {/* Label */}
        <div className="flex-shrink-0 flex items-center h-full px-4 gap-3">
          <span className="relative inline-flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[#CE4F37] animate-[pulse-dot_1.8s_ease-out_infinite]" />
            <span className="relative rounded-full w-2 h-2 bg-[#CE4F37]" />
          </span>
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
            RACE LIVE
          </span>
          <div className="w-px h-4" style={{ background: 'var(--dta-border-mid)' }} />
        </div>

        {/* Scrolling data */}
        <div className="flex-1 overflow-hidden">
          <div className="ticker-track flex items-center whitespace-nowrap">
            {doubled.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 mx-6 flex-shrink-0"
              >
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--dta-muted)',
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 700,
                    fontSize: 14,
                    color: item.color,
                    letterSpacing: '0.02em',
                  }}
                >
                  {item.value}
                </span>
                {item.detail && (
                  <span style={{ fontSize: 11, color: 'var(--dta-muted)' }}>
                    {item.detail}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
