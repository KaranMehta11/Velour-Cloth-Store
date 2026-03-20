import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '14px 16px',
    backgroundColor: 'white',
    border: `1px solid ${focusedField === field ? '#0A0A0A' : 'rgba(0,0,0,0.12)'}`,
    borderRadius: '12px',
    fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#0A0A0A',
    outline: 'none', transition: 'border-color 200ms ease',
  })

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', backgroundColor: '#ECEEF0' }}>
      {/* Left: image */}
      <div className="hidden md:block" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80" alt="Fashion"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
          <blockquote style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, color: 'white', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '16px' }}>
              "Style is a way to say<br />who you are without<br />having to speak."
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>— Rachel Zoe</p>
          </blockquote>
        </div>
      </div>

      {/* Right: form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

            <h1 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', letterSpacing: '0.2em', textAlign: 'center', marginBottom: '8px' }}>VELOUR</h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.4)', textAlign: 'center', marginBottom: '32px' }}>Sign in to your account</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>EMAIL</label>
                <input type="email" required value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                  style={inputStyle('email')} placeholder="you@example.com" />
              </div>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>PASSWORD</label>
                <input type="password" required value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)}
                  style={inputStyle('password')} placeholder="••••••••" />
              </div>
              <div style={{ textAlign: 'right' }}>
                <Link to="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#B8963E', textDecoration: 'none' }}>FORGOT PASSWORD?</Link>
              </div>
              <button type="submit" disabled={loading} className="btn-black"
                style={{ width: '100%', marginTop: '8px', opacity: loading ? 0.6 : 1 }}>
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>
            </form>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,0,0,0.08)' }} />
              <span style={{ padding: '0 12px', fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(0,0,0,0.35)' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,0,0,0.08)' }} />
            </div>

            <button type="button"
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#0A0A0A', cursor: 'pointer', transition: 'border-color 200ms ease' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#0A0A0A'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              CONTINUE WITH GOOGLE
            </button>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.4)', textAlign: 'center', marginTop: '24px' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: '#0A0A0A', textDecoration: 'none' }}>REGISTER</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
