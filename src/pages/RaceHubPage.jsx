import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Flag, Trophy, TrendingUp } from 'lucide-react'
import DataTicker from '@/components/home/DataTicker'
import { ArticleCard } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MOCK_ARTICLES, MOCK_STANDINGS } from '@/lib/mockData'

const SEASON_CALENDAR = [
  { round: 1, name: 'Bahrain Grand Prix', circuit: 'Bahrain International Circuit', country: 'Bahrain', date: '2 Mar 2025', status: 'completed', winner: 'M. Verstappen', team: 'Red Bull Racing', teamColor: '#3671C6' },
  { round: 2, name: 'Saudi Arabian Grand Prix', circuit: 'Jeddah Corniche Circuit', country: 'Saudi Arabia', date: '9 Mar 2025', status: 'completed', winner: 'M. Verstappen', team: 'Red Bull Racing', teamColor: '#3671C6' },
  { round: 3, name: 'Australian Grand Prix', circuit: 'Albert Park Circuit', country: 'Australia', date: '23 Mar 2025', status: 'completed', winner: 'C. Sainz', team: 'Ferrari', teamColor: '#E8002D' },
  { round: 4, name: 'Japanese Grand Prix', circuit: 'Suzuka International Racing Course', country: 'Japan', date: '6 Apr 2025', status: 'next', winner: null, team: null, teamColor: null },
  { round: 5, name: 'Chinese Grand Prix', circuit: 'Shanghai International Circuit', country: 'China', date: '20 Apr 2025', status: 'upcoming', winner: null, team: null, teamColor: null },
  { round: 6, name: 'Miami Grand Prix', circuit: 'Miami International Autodrome', country: 'USA', date: '4 May 2025', status: 'upcoming', winner: null, team: null, teamColor: null },
  { round: 7, name: 'Emilia Romagna Grand Prix', circuit: 'Autodromo Enzo e Dino Ferrari', country: 'Italy', date: '18 May 2025', status: 'upcoming', winner: null, team: null, teamColor: null },
  { round: 8, name: 'Monaco Grand Prix', circuit: 'Circuit de Monaco', country: 'Monaco', date: '25 May 2025', status: 'upcoming', winner: null, team: null, teamColor: null },
]

const CONSTRUCTORS = [
  { position: 1, team: 'Red Bull Racing', color: '#3671C6', points: 124, wins: 2 },
  { position: 2, team: 'Ferrari', color: '#E8002D', points: 108, wins: 1 },
  { position: 3, team: 'McLaren', color: '#FF8000', points: 89, wins: 0 },
  { position: 4, team: 'Mercedes', color: '#27F4D2', points: 67, wins: 0 },
  { position: 5, team: 'Aston Martin', color: '#358C75', points: 44, wins: 0 },
]

const STATUS_STYLES = {
  completed: { label: 'COMPLETED', bg: 'rgba(255,255,255,0.04)', color: 'var(--dta-muted)', border: 'var(--dta-border)' },
  next: { label: 'NEXT', bg: 'rgba(206,79,55,0.1)', color: 'var(--dta-red)', border: 'rgba(206,79,55,0.3)' },
  upcoming: { label: 'UPCOMING', bg: 'rgba(255,255,255,0.04)', color: 'var(--dta-muted)', border: 'var(--dta-border)' },
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dta-red)' }}>
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: 'var(--dta-border)' }} />
    </div>
  )
}

function Tab({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'Inter', fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: active ? 'var(--dta-white)' : 'var(--dta-muted)',
        paddingBottom: 8,
        background: 'none', border: 'none', cursor: 'pointer',
        borderBottom: active ? '2px solid var(--dta-red)' : '2px solid transparent',
        transition: 'color 150ms ease-out',
      }}
    >
      {children}
    </button>
  )
}

export default function RaceHubPage() {
  const [standingsTab, setStandingsTab] = useState('drivers')
  const calendarRef = useRef(null)
  const standingsRef = useRef(null)

  useEffect(() => {
    const refs = [calendarRef, standingsRef]
    const observers = refs.map(ref => {
      if (!ref.current) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) ref.current.classList.add('is-visible') },
        { threshold: 0.05 }
      )
      obs.observe(ref.current)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  return (
    <div style={{ background: 'var(--dta-black)', minHeight: '100vh' }}>
      <DataTicker />

      {/* Header */}
      <div style={{ background: 'var(--dta-surface)', borderBottom: '1px solid var(--dta-border)', padding: '64px 0 48px' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dta-red)', display: 'block', marginBottom: 12 }}>
            2025 SEASON
          </span>
          <h1 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em', fontSize: 'clamp(48px, 8vw, 80px)', color: 'var(--dta-white)', lineHeight: 1 }}>
            Race Hub
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: 'var(--dta-muted)', marginTop: 12 }}>
            FIA Formula One World Championship · Live data, results &amp; standings.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 py-16">

        {/* Season Calendar */}
        <SectionLabel>Season Calendar</SectionLabel>
        <div ref={calendarRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20 reveal">
          {SEASON_CALENDAR.map(race => {
            const s = STATUS_STYLES[race.status]
            return (
              <div
                key={race.round}
                className="group"
                style={{
                  background: race.status === 'next' ? 'rgba(206,79,55,0.06)' : 'var(--dta-card)',
                  border: `1px solid ${race.status === 'next' ? 'rgba(206,79,55,0.25)' : 'var(--dta-border)'}`,
                  borderRadius: 6,
                  padding: 20,
                  transition: 'border-color 220ms ease-out, transform 220ms ease-out',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--dta-border-mid)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = race.status === 'next' ? 'rgba(206,79,55,0.25)' : 'var(--dta-border)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontSize: 28, color: 'var(--dta-muted)', lineHeight: 1 }}>
                    R{race.round}
                  </span>
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: s.color, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 2, padding: '2px 6px' }}>
                    {s.label}
                  </span>
                </div>
                <h3 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontSize: 16, color: 'var(--dta-white)', lineHeight: 1.2, marginBottom: 4 }}>
                  {race.name}
                </h3>
                <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--dta-muted)', marginBottom: 8 }}>
                  {race.circuit}
                </p>
                <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: 'var(--dta-muted)' }}>
                  {race.date}
                </p>
                {race.winner && (
                  <div className="mt-3 pt-3 flex items-center gap-2" style={{ borderTop: '1px solid var(--dta-border)' }}>
                    <div className="w-0.5 h-4" style={{ background: race.teamColor, borderRadius: 1 }} />
                    <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: 'var(--dta-white)' }}>
                      {race.winner}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Standings */}
        <SectionLabel>Championship Standings</SectionLabel>
        <div ref={standingsRef} className="reveal mb-20">
          <div className="flex gap-6 mb-6">
            <Tab active={standingsTab === 'drivers'} onClick={() => setStandingsTab('drivers')}>Drivers</Tab>
            <Tab active={standingsTab === 'constructors'} onClick={() => setStandingsTab('constructors')}>Constructors</Tab>
          </div>

          <div style={{ background: 'var(--dta-card)', border: '1px solid var(--dta-border)', borderRadius: 6, overflow: 'hidden' }}>
            {/* Table header */}
            <div className="grid" style={{ gridTemplateColumns: '48px 1fr 1fr 80px', background: 'var(--dta-surface)', padding: '10px 20px', borderBottom: '1px solid var(--dta-border)' }}>
              {['POS', standingsTab === 'drivers' ? 'DRIVER' : 'TEAM', standingsTab === 'drivers' ? 'TEAM' : '', 'PTS'].map((h, i) => (
                <span key={i} style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dta-muted)' }}>{h}</span>
              ))}
            </div>

            {standingsTab === 'drivers' && MOCK_STANDINGS.map((d, i) => (
              <div key={d.position} className="grid items-center" style={{ gridTemplateColumns: '48px 1fr 1fr 80px', padding: '14px 20px', borderBottom: i < MOCK_STANDINGS.length - 1 ? '1px solid var(--dta-border)' : 'none', transition: 'background 150ms ease-out' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontSize: 20, color: d.position <= 3 ? ['#D4A82A','#9E9E9E','#CD7F32'][d.position-1] : 'var(--dta-muted)' }}>{d.position}</span>
                <div className="flex items-center gap-2">
                  <div className="w-0.5 h-6" style={{ background: d.teamColor, borderRadius: 1 }} />
                  <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 14, color: 'var(--dta-white)' }}>{d.driver}</span>
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--dta-muted)' }}>{d.team}</span>
                <span style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontSize: 18, color: 'var(--dta-white)' }}>{d.points}</span>
              </div>
            ))}

            {standingsTab === 'constructors' && CONSTRUCTORS.map((c, i) => (
              <div key={c.position} className="grid items-center" style={{ gridTemplateColumns: '48px 1fr 1fr 80px', padding: '14px 20px', borderBottom: i < CONSTRUCTORS.length - 1 ? '1px solid var(--dta-border)' : 'none', transition: 'background 150ms ease-out' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontSize: 20, color: c.position <= 3 ? ['#D4A82A','#9E9E9E','#CD7F32'][c.position-1] : 'var(--dta-muted)' }}>{c.position}</span>
                <div className="flex items-center gap-2">
                  <div className="w-0.5 h-6" style={{ background: c.color, borderRadius: 1 }} />
                  <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 14, color: 'var(--dta-white)' }}>{c.team}</span>
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--dta-muted)' }}>{c.wins} wins</span>
                <span style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontSize: 18, color: 'var(--dta-white)' }}>{c.points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Race Report */}
        <SectionLabel>Latest Race Report</SectionLabel>
        <div className="max-w-2xl">
          <ArticleCard article={MOCK_ARTICLES[0]} size="featured" />
        </div>
      </div>
    </div>
  )
}
