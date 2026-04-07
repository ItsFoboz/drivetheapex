import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import Button from '@/components/ui/Button'
import { signIn } from '@/lib/auth'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--dta-surface)',
    border: '1px solid var(--dta-border)',
    borderRadius: 4,
    padding: '10px 14px',
    fontFamily: 'Inter',
    fontSize: 14,
    color: 'var(--dta-white)',
    outline: 'none',
    transition: 'border-color 150ms ease-out',
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{ background: 'var(--dta-black)' }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'var(--dta-card)',
          border: '1px solid var(--dta-border)',
          borderRadius: 10,
          padding: 48,
        }}
      >
        <div className="flex justify-center mb-8">
          <Logo variant="full" height={28} />
        </div>

        <h1
          style={{
            fontFamily: '"Barlow Condensed"',
            fontWeight: 700,
            fontSize: 24,
            color: 'var(--dta-white)',
            textAlign: 'center',
            marginBottom: 8,
            letterSpacing: '-0.01em',
          }}
        >
          Admin Access
        </h1>
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--dta-muted)', textAlign: 'center', marginBottom: 32 }}>
          Sign in to the DriveTheApex CMS
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dta-muted)', display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@drivetheapex.com"
              required
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--dta-red)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--dta-border)' }}
            />
          </div>

          <div>
            <label style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dta-muted)', display: 'block', marginBottom: 6 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ ...inputStyle, paddingRight: 44 }}
                onFocus={e => { e.target.style.borderColor = 'var(--dta-red)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--dta-border)' }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(s => !s)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dta-muted)', display: 'flex', alignItems: 'center' }}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--dta-red)', padding: '8px 12px', background: 'rgba(206,79,55,0.1)', borderRadius: 4, border: '1px solid rgba(206,79,55,0.2)' }}>
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>

        <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--dta-muted)', textAlign: 'center', marginTop: 24 }}>
          Authorised personnel only.
        </p>
      </div>
    </div>
  )
}
