import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, TrendingUp, Eye, Clock, Pencil, Trash2, CheckCircle, Upload, Calendar } from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'
import Button from '@/components/ui/Button'
import { MOCK_ARTICLES } from '@/lib/mockData'

const STATS = [
  { label: 'Total Articles', value: '142', icon: FileText, color: '#CE4F37' },
  { label: 'Published This Month', value: '18', icon: TrendingUp, color: '#27F4D2' },
  { label: 'Total Views', value: '284K', icon: Eye, color: '#D4A82A' },
  { label: 'Pending Review', value: '4', icon: Clock, color: '#888580' },
]

const QUEUE_ITEMS = [
  { id: 1, headline: 'FIA releases new technical directive on floor flexibility', source: 'autosport.com', tag: 'Regulation' },
  { id: 2, headline: 'Verstappen on 2025 title chances: "We are in a strong position"', source: 'formula1.com', tag: 'Driver' },
  { id: 3, headline: 'McLaren confirm Woking factory expansion ahead of 2026', source: 'motorsport.com', tag: 'Team News' },
]

const STATUS_STYLES = {
  published: { label: 'Published', bg: 'rgba(39,244,210,0.1)', color: '#27F4D2', border: 'rgba(39,244,210,0.2)' },
  draft: { label: 'Draft', bg: 'rgba(136,133,128,0.1)', color: '#888580', border: 'rgba(136,133,128,0.2)' },
  pending: { label: 'Pending', bg: 'rgba(212,168,42,0.1)', color: '#D4A82A', border: 'rgba(212,168,42,0.2)' },
}

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div style={{ background: 'var(--dta-card)', border: '1px solid var(--dta-border)', borderRadius: 6, padding: 24 }}>
      <div className="flex items-start justify-between mb-4">
        <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dta-muted)' }}>
          {label}
        </span>
        <div style={{ width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}18` }}>
          <Icon size={16} style={{ color }} />
        </div>
      </div>
      <span style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontSize: 48, color: 'var(--dta-white)', lineHeight: 1 }}>
        {value}
      </span>
    </div>
  )
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.draft
  return (
    <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: s.color, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 2, padding: '2px 7px' }}>
      {s.label}
    </span>
  )
}

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="max-w-[1200px] mx-auto">
        <h1 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontSize: 28, color: 'var(--dta-white)', marginBottom: 32 }}>
          Dashboard
        </h1>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent articles */}
            <div style={{ background: 'var(--dta-card)', border: '1px solid var(--dta-border)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--dta-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 12, color: 'var(--dta-white)' }}>Recent Articles</span>
                <Link to="/admin/articles" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 11, color: 'var(--dta-muted)', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 150ms' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--dta-white)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--dta-muted)'}
                >View All →</Link>
              </div>
              {/* Table head */}
              <div className="grid" style={{ gridTemplateColumns: '1fr 100px 80px 80px', padding: '10px 20px', background: 'var(--dta-surface)', borderBottom: '1px solid var(--dta-border)' }}>
                {['Title', 'Status', 'Date', 'Actions'].map(h => (
                  <span key={h} style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dta-muted)' }}>{h}</span>
                ))}
              </div>
              {MOCK_ARTICLES.slice(0, 6).map((article, i) => {
                const statuses = ['published', 'draft', 'published', 'pending', 'published', 'draft']
                const status = statuses[i]
                return (
                  <div
                    key={article.id}
                    className="grid items-center"
                    style={{
                      gridTemplateColumns: '1fr 100px 80px 80px',
                      padding: '12px 20px',
                      borderBottom: i < 5 ? '1px solid var(--dta-border)' : 'none',
                      transition: 'background 150ms ease-out',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--dta-white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 16 }}>
                      {article.title}
                    </span>
                    <StatusBadge status={status} />
                    <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--dta-muted)' }}>
                      {new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/articles/${article.slug}/edit`}>
                        <Pencil size={14} style={{ color: 'var(--dta-muted)', cursor: 'pointer', transition: 'color 150ms' }}
                          onMouseEnter={e => e.target.style.color = 'var(--dta-white)'}
                          onMouseLeave={e => e.target.style.color = 'var(--dta-muted)'}
                        />
                      </Link>
                      <Trash2
                        size={14}
                        style={{ color: 'var(--dta-muted)', cursor: 'pointer', transition: 'color 150ms' }}
                        onMouseEnter={e => e.style.color = 'var(--dta-red)'}
                        onMouseLeave={e => e.style.color = 'var(--dta-muted)'}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Content Queue */}
            <div style={{ background: 'var(--dta-card)', border: '1px solid var(--dta-border)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--dta-border)' }}>
                <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 12, color: 'var(--dta-white)' }}>API Content Queue</span>
              </div>
              {QUEUE_ITEMS.map((item, i) => (
                <div key={item.id} style={{ padding: '16px 20px', borderBottom: i < QUEUE_ITEMS.length - 1 ? '1px solid var(--dta-border)' : 'none' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div style={{ flex: 1 }}>
                      <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dta-red)', display: 'block', marginBottom: 4 }}>{item.tag}</span>
                      <h4 style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: 'var(--dta-white)', lineHeight: 1.4, marginBottom: 4 }}>{item.headline}</h4>
                      <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'var(--dta-muted)' }}>via {item.source}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button variant="secondary" size="sm">Edit &amp; Approve</Button>
                      <Button variant="ghost" size="sm">Discard</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions sidebar */}
          <div className="space-y-4">
            <div style={{ background: 'var(--dta-card)', border: '1px solid var(--dta-border)', borderRadius: 6, padding: 20 }}>
              <h3 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 12, color: 'var(--dta-white)', marginBottom: 16 }}>Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/admin/articles/new" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 4, background: 'var(--dta-surface)', border: '1px solid var(--dta-border)', transition: 'border-color 150ms ease-out', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--dta-border-mid)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--dta-border)'}
                >
                  <FileText size={15} style={{ color: 'var(--dta-red)' }} />
                  <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: 'var(--dta-white)' }}>New Article</span>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 4, background: 'var(--dta-surface)', border: '1px solid var(--dta-border)', transition: 'border-color 150ms ease-out', cursor: 'pointer' }}
                  onMouseEnter={e => e.style.borderColor = 'var(--dta-border-mid)'}
                  onMouseLeave={e => e.style.borderColor = 'var(--dta-border)'}
                >
                  <Upload size={15} style={{ color: 'var(--dta-red)' }} />
                  <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: 'var(--dta-white)' }}>Upload Gallery</span>
                </div>
                <Link to="/admin/social" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 4, background: 'var(--dta-surface)', border: '1px solid var(--dta-border)', transition: 'border-color 150ms ease-out', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--dta-border-mid)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--dta-border)'}
                >
                  <Calendar size={15} style={{ color: 'var(--dta-red)' }} />
                  <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: 'var(--dta-white)' }}>Schedule Post</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
