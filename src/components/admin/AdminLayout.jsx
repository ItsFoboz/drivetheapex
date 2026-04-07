import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, FileText, Zap, Video, Image, Inbox,
  Calendar, Settings, Menu, X, Bell, Plus,
} from 'lucide-react'
import Logo from '@/components/shared/Logo'
import { signOut, useAuth } from '@/lib/auth'

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/articles', label: 'Articles', icon: FileText },
  { to: '/admin/news', label: 'News Blurbs', icon: Zap },
  { to: '/admin/videos', label: 'Videos', icon: Video },
  { to: '/admin/galleries', label: 'Galleries', icon: Image },
  { to: '/admin/queue', label: 'Content Queue', icon: Inbox },
  { to: '/admin/social', label: 'Social Scheduler', icon: Calendar },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

function SidebarLink({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `admin-sidebar-link${isActive ? ' active' : ''}`}
    >
      <Icon size={16} />
      {label}
    </NavLink>
  )
}

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--dta-black)' }}>
      {/* Sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 240,
          background: 'var(--dta-surface)',
          borderRight: '1px solid var(--dta-border)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 40,
          transform: sidebarOpen ? 'translateX(0)' : undefined,
          transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
        }}
        className="hidden lg:flex"
      >
        {/* Logo area */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--dta-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo variant="mark" height={28} />
          <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--dta-muted)' }}>
            ADMIN
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
          {NAV_ITEMS.map(item => (
            <SidebarLink key={item.to} {...item} />
          ))}
        </nav>

        {/* User info */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--dta-border)' }}>
          <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--dta-muted)', marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.email || 'admin@drivetheapex.com'}
          </p>
          <button
            onClick={handleSignOut}
            style={{
              fontFamily: 'Inter', fontWeight: 600, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--dta-muted)', background: 'none', border: 'none', cursor: 'pointer',
              transition: 'color 150ms ease-out', padding: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--dta-red)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--dta-muted)'}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: 'rgba(14,14,14,0.7)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-40 flex flex-col`}
        style={{
          width: 240,
          background: 'var(--dta-surface)',
          borderRight: '1px solid var(--dta-border)',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--dta-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo variant="mark" height={28} />
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--dta-muted)' }}>ADMIN</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dta-muted)' }}>
            <X size={18} />
          </button>
        </div>
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
          {NAV_ITEMS.map(item => (
            <SidebarLink key={item.to} {...item} />
          ))}
        </nav>
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--dta-border)' }}>
          <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--dta-muted)', marginBottom: 8 }}>{user?.email}</p>
          <button onClick={handleSignOut} style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--dta-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: 0, display: 'flex', flexDirection: 'column' }} className="lg:ml-[240px]">
        {/* Top bar */}
        <header style={{ height: 64, background: 'var(--dta-card)', borderBottom: '1px solid var(--dta-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 20 }}>
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dta-muted)', display: 'flex', alignItems: 'center' }}
            >
              <Menu size={20} />
            </button>
            <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: 'var(--dta-muted)' }}>
              DriveTheApex CMS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dta-muted)', display: 'flex', alignItems: 'center', padding: 8, borderRadius: 4, transition: 'color 150ms ease-out' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--dta-white)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--dta-muted)'}
              aria-label="Notifications"
            >
              <Bell size={18} />
            </button>
            <Link
              to="/admin/articles/new"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'var(--dta-red)', color: '#fff',
                fontFamily: 'Inter', fontWeight: 700, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '0 14px', height: 34, borderRadius: 4, textDecoration: 'none',
                transition: 'background 150ms ease-out',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--dta-red-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--dta-red)'}
            >
              <Plus size={14} />
              New Article
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
