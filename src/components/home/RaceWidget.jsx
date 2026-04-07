import React, { useState, useEffect, useRef } from 'react'
import { Timer, MapPin, Trophy, TrendingUp } from 'lucide-react'
import { MOCK_RACE_WEEKEND, MOCK_STANDINGS, MOCK_LAST_PODIUM } from '@/lib/mockData'

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const target = new Date(targetDate)
      const diff = target - now
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[48px]">
      <span
        style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 800,
          fontSize: 32,
          letterSpacing: '-0.02em',
          color: 'var(--dta-white)',
          lineHeight: 1,
        }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--dta-muted)',
          marginTop: 2,
        }}
      >
        {label}
      </span>
    </div>
  )
}

function SectionTab({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: active ? 'var(--dta-white)' : 'var(--dta-muted)',
        paddingBottom: 6,
        transition: 'color 150ms ease-out, border-color 150ms ease-out',
        background: 'none',
        border: 'none',
        borderBottom: active ? '2px solid var(--dta-red)' : '2px solid transparent',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

const POSITION_COLORS = {
  1: '#D4A82A',
  2: '#9E9E9E',
  3: '#CD7F32',
}

export default function RaceWidget() {
  const [activeTab, setActiveTab] = useState('next')
  const race = MOCK_RACE_WEEKEND
  const countdown = useCountdown(race.date)
  const widgetRef = useRef(null)

  // Slide-in animation
  useEffect(() => {
    if (!widgetRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          widgetRef.current.style.opacity = '1'
          widgetRef.current.style.transform = 'translateX(0)'
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(widgetRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      style={{
        background: 'var(--dta-surface)',
        borderTop: '1px solid var(--dta-border)',
        borderBottom: '1px solid var(--dta-border)',
        padding: '48px 0',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--dta-red)',
            }}
          >
            RACE HUB
          </span>
          <div className="flex-1 h-px" style={{ background: 'var(--dta-border)' }} />
        </div>

        <div
          ref={widgetRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          style={{
            opacity: 0,
            transform: 'translateX(24px)',
            transition: 'opacity 320ms cubic-bezier(0,0,0.2,1), transform 320ms cubic-bezier(0,0,0.2,1)',
          }}
        >
          {/* Next Race */}
          <div
            style={{
              background: 'var(--dta-card)',
              border: '1px solid var(--dta-border)',
              borderRadius: 6,
              padding: 24,
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} color="var(--dta-red)" />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--dta-muted)',
                }}
              >
                NEXT RACE
              </span>
            </div>

            <div className="mb-2">
              <h3
                style={{
                  fontFamily: '"Barlow Condensed", sans-serif',
                  fontWeight: 700,
                  fontSize: 22,
                  color: 'var(--dta-white)',
                  letterSpacing: '-0.01em',
                }}
              >
                {race.raceName}
              </h3>
              <p style={{ color: 'var(--dta-muted)', fontSize: 13, marginTop: 2 }}>
                {race.circuit}, {race.country}
              </p>
            </div>

            <div
              style={{
                height: 1,
                background: 'var(--dta-border)',
                margin: '16px 0',
              }}
            />

            {/* Countdown */}
            <div className="flex items-center gap-3">
              <Timer size={14} color="var(--dta-muted)" />
              <div className="flex items-center gap-3">
                <CountdownUnit value={countdown.days} label="Days" />
                <span style={{ color: 'var(--dta-muted)', fontSize: 20, fontWeight: 300 }}>:</span>
                <CountdownUnit value={countdown.hours} label="Hrs" />
                <span style={{ color: 'var(--dta-muted)', fontSize: 20, fontWeight: 300 }}>:</span>
                <CountdownUnit value={countdown.minutes} label="Min" />
                <span style={{ color: 'var(--dta-muted)', fontSize: 20, fontWeight: 300 }}>:</span>
                <CountdownUnit value={countdown.seconds} label="Sec" />
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                padding: '8px 12px',
                background: 'rgba(206,79,55,0.08)',
                borderRadius: 4,
                border: '1px solid rgba(206,79,55,0.2)',
              }}
            >
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--dta-muted)' }}>
                Round {race.round} · {race.season} Season
              </span>
            </div>
          </div>

          {/* Driver Standings */}
          <div
            style={{
              background: 'var(--dta-card)',
              border: '1px solid var(--dta-border)',
              borderRadius: 6,
              padding: 24,
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={14} color="var(--dta-red)" />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--dta-muted)',
                }}
              >
                DRIVER STANDINGS
              </span>
            </div>

            <div className="space-y-3">
              {MOCK_STANDINGS.map(driver => (
                <div key={driver.position} className="flex items-center gap-3">
                  <span
                    style={{
                      fontFamily: '"Barlow Condensed", sans-serif',
                      fontWeight: 800,
                      fontSize: 18,
                      color: driver.position <= 3 ? POSITION_COLORS[driver.position] : 'var(--dta-muted)',
                      minWidth: 24,
                      textAlign: 'right',
                    }}
                  >
                    {driver.position}
                  </span>
                  <div
                    className="w-1 h-8 rounded-[1px] flex-shrink-0"
                    style={{ background: driver.teamColor }}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: 13,
                        color: 'var(--dta-white)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {driver.driver}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--dta-muted)', marginTop: 1 }}>
                      {driver.team}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: '"Barlow Condensed", sans-serif',
                      fontWeight: 700,
                      fontSize: 16,
                      color: 'var(--dta-white)',
                    }}
                  >
                    {driver.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Last Race Podium */}
          <div
            style={{
              background: 'var(--dta-card)',
              border: '1px solid var(--dta-border)',
              borderRadius: 6,
              padding: 24,
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={14} color="var(--dta-red)" />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--dta-muted)',
                }}
              >
                LAST RACE PODIUM
              </span>
            </div>

            <div className="space-y-4">
              {MOCK_LAST_PODIUM.map(finisher => (
                <div key={finisher.position} className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-[4px] flex-shrink-0"
                    style={{
                      background: `rgba(${finisher.position === 1 ? '212,168,42' : finisher.position === 2 ? '158,158,158' : '205,127,50'},0.15)`,
                      border: `1px solid rgba(${finisher.position === 1 ? '212,168,42' : finisher.position === 2 ? '158,158,158' : '205,127,50'},0.3)`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: '"Barlow Condensed", sans-serif',
                        fontWeight: 800,
                        fontSize: 16,
                        color: POSITION_COLORS[finisher.position],
                      }}
                    >
                      P{finisher.position}
                    </span>
                  </div>
                  <div
                    className="w-0.5 h-8 flex-shrink-0"
                    style={{ background: finisher.teamColor }}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: 13,
                        color: 'var(--dta-white)',
                      }}
                    >
                      {finisher.driver}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--dta-muted)', marginTop: 1 }}>
                      {finisher.team} · {finisher.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
