import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Trash2, ExternalLink, Search, Plus } from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'
import Button from '@/components/ui/Button'
import { MOCK_ARTICLES } from '@/lib/mockData'

const STATUS_LIST = ['All', 'Published', 'Draft', 'Pending']
const CATEGORY_LIST = ['All', 'Race Report', 'Analysis', 'Formula 1', 'Culture', 'Cars', 'News']

const MOCK_STATUSES = ['published', 'draft', 'published', 'pending', 'published', 'draft', 'published', 'pending']

function StatusBadge({ status }) {
  const map = {
    published: { color: '#27F4D2', bg: 'rgba(39,244,210,0.1)', border: 'rgba(39,244,210,0.2)' },
    draft: { color: '#888580', bg: 'rgba(136,133,128,0.1)', border: 'rgba(136,133,128,0.2)' },
    pending: { color: '#D4A82A', bg: 'rgba(212,168,42,0.1)', border: 'rgba(212,168,42,0.2)' },
  }
  const s = map[status] || map.draft
  return (
    <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: s.color, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 2, padding: '2px 7px' }}>
      {status}
    </span>
  )
}

const inputStyle = {
  background: 'var(--dta-surface)',
  border: '1px solid var(--dta-border)',
  borderRadius: 4,
  padding: '8px 12px',
  fontFamily: 'Inter',
  fontSize: 13,
  color: 'var(--dta-white)',
  outline: 'none',
  transition: 'border-color 150ms ease-out',
}

export default function ArticlesListPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(1)
  const perPage = 6

  const filtered = MOCK_ARTICLES.filter(a => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.author.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || MOCK_STATUSES[MOCK_ARTICLES.indexOf(a)]?.toLowerCase() === statusFilter.toLowerCase()
    const matchCat = categoryFilter === 'All' || a.category === categoryFilter
    return matchSearch && matchStatus && matchCat
  })

  const pages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const toggleAll = () => setSelected(s => s.length === paginated.length ? [] : paginated.map(a => a.id))

  return (
    <AdminLayout>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <h1 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontSize: 28, color: 'var(--dta-white)' }}>Articles</h1>
          <Link to="/admin/articles/new">
            <Button variant="primary" size="sm">
              <Plus size={14} />
              New Article
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div style={{ background: 'var(--dta-card)', border: '1px solid var(--dta-border)', borderRadius: 6, padding: '16px 20px', marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--dta-muted)', pointerEvents: 'none' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles…"
              style={{ ...inputStyle, paddingLeft: 34, width: '100%' }}
              onFocus={e => e.target.style.borderColor = 'var(--dta-red)'}
              onBlur={e => e.target.style.borderColor = 'var(--dta-border)'}
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer', width: 'auto' }}
            onFocus={e => e.target.style.borderColor = 'var(--dta-red)'}
            onBlur={e => e.target.style.borderColor = 'var(--dta-border)'}
          >
            {STATUS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer', width: 'auto' }}
            onFocus={e => e.target.style.borderColor = 'var(--dta-red)'}
            onBlur={e => e.target.style.borderColor = 'var(--dta-border)'}
          >
            {CATEGORY_LIST.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ background: 'var(--dta-card)', border: '1px solid var(--dta-border)', borderRadius: 6, overflow: 'hidden' }}>
          {/* Head */}
          <div className="grid" style={{ gridTemplateColumns: '40px 1fr 100px 80px 60px 80px 80px', padding: '10px 20px', background: 'var(--dta-surface)', borderBottom: '1px solid var(--dta-border)' }}>
            <input type="checkbox" checked={selected.length === paginated.length} onChange={toggleAll} style={{ cursor: 'pointer', accentColor: 'var(--dta-red)' }} />
            {['Title', 'Category', 'Status', 'Premium', 'Date', 'Actions'].map(h => (
              <span key={h} style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dta-muted)' }}>{h}</span>
            ))}
          </div>

          {paginated.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--dta-muted)', fontFamily: 'Inter', fontSize: 14 }}>No articles found.</div>
          ) : paginated.map((article, i) => {
            const status = MOCK_STATUSES[MOCK_ARTICLES.indexOf(article)] || 'draft'
            return (
              <div
                key={article.id}
                className="grid items-center"
                style={{
                  gridTemplateColumns: '40px 1fr 100px 80px 60px 80px 80px',
                  padding: '13px 20px',
                  borderBottom: i < paginated.length - 1 ? '1px solid var(--dta-border)' : 'none',
                  background: selected.includes(article.id) ? 'rgba(206,79,55,0.04)' : 'transparent',
                  transition: 'background 150ms ease-out',
                }}
                onMouseEnter={e => { if (!selected.includes(article.id)) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                onMouseLeave={e => { e.currentTarget.style.background = selected.includes(article.id) ? 'rgba(206,79,55,0.04)' : 'transparent' }}
              >
                <input type="checkbox" checked={selected.includes(article.id)} onChange={() => toggleSelect(article.id)} style={{ cursor: 'pointer', accentColor: 'var(--dta-red)' }} />
                <span style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--dta-white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 16 }}>{article.title}</span>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--dta-muted)' }}>{article.category}</span>
                <StatusBadge status={status} />
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: article.premium ? '#D4A82A' : 'var(--dta-muted)' }}>{article.premium ? 'Yes' : 'No'}</span>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--dta-muted)' }}>{new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                <div className="flex items-center gap-2">
                  <Link to={`/admin/articles/${article.slug}/edit`} title="Edit">
                    <Pencil size={14} style={{ color: 'var(--dta-muted)', cursor: 'pointer', transition: 'color 150ms' }}
                      onMouseEnter={e => e.target.style.color = 'var(--dta-white)'}
                      onMouseLeave={e => e.target.style.color = 'var(--dta-muted)'}
                    />
                  </Link>
                  <Link to={`/article/${article.slug}`} target="_blank" title="Preview">
                    <ExternalLink size={14} style={{ color: 'var(--dta-muted)', cursor: 'pointer', transition: 'color 150ms' }}
                      onMouseEnter={e => e.target.style.color = 'var(--dta-white)'}
                      onMouseLeave={e => e.target.style.color = 'var(--dta-muted)'}
                    />
                  </Link>
                  <Trash2 size={14} style={{ color: 'var(--dta-muted)', cursor: 'pointer', transition: 'color 150ms' }}
                    onMouseEnter={e => e.style.color = 'var(--dta-red)'}
                    onMouseLeave={e => e.style.color = 'var(--dta-muted)'}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20 }}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{ ...inputStyle, width: 36, padding: '7px', opacity: page === 1 ? 0.4 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
            >←</button>
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                style={{ ...inputStyle, width: 36, padding: '7px', background: page === i + 1 ? 'rgba(206,79,55,0.15)' : 'var(--dta-surface)', borderColor: page === i + 1 ? 'var(--dta-red)' : 'var(--dta-border)', color: page === i + 1 ? 'var(--dta-red)' : 'var(--dta-white)', cursor: 'pointer' }}
              >{i + 1}</button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(pages, p + 1))}
              disabled={page === pages}
              style={{ ...inputStyle, width: 36, padding: '7px', opacity: page === pages ? 0.4 : 1, cursor: page === pages ? 'not-allowed' : 'pointer' }}
            >→</button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
