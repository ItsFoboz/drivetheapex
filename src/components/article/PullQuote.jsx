import React from 'react'

/**
 * PullQuote
 * A styled editorial pull-quote with an optional attribution line.
 *
 * Props:
 *   text        {string} — The quote text (required)
 *   attribution {string} — Optional source / speaker name
 */
export function PullQuote({ text, attribution }) {
  return (
    <blockquote
      style={{
        borderLeft: '3px solid var(--dta-red)',
        paddingLeft: '24px',
        margin: '32px 0',
      }}
    >
      <p
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontStyle: 'italic',
          fontWeight: 600,
          fontSize: '22px',
          lineHeight: 1.35,
          color: 'var(--dta-white)',
          margin: 0,
        }}
      >
        {text}
      </p>

      {attribution && (
        <cite
          style={{
            display: 'block',
            fontFamily: "'Inter', sans-serif",
            fontStyle: 'normal',
            fontSize: '13px',
            color: 'var(--dta-muted)',
            marginTop: '8px',
          }}
        >
          — {attribution}
        </cite>
      )}
    </blockquote>
  )
}

export default PullQuote
