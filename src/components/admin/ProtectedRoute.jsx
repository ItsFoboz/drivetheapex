import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading, role } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--dta-black)' }}>
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--dta-red)', borderTopColor: 'transparent' }}
        />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  if (requiredRole && role !== requiredRole && role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4" style={{ background: 'var(--dta-black)' }}>
        <span style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontSize: 48, color: 'var(--dta-red)' }}>403</span>
        <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--dta-muted)' }}>You don't have permission to access this page.</p>
      </div>
    )
  }

  return children
}
