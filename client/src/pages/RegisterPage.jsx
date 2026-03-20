import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false })
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const { register } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return }
    if (!form.terms) { toast.error('Please accept the terms of service'); return }
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      toast.success('Account created! Welcome to Velour.')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const inputStyle = (field) => ({
    width: '100%', padding: '12px 14px',
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
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80" alt="Fashion"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
          <blockquote style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 800, color: 'white', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '16px' }}>
              "Fashion is self-expression.<br />Join the circle of<br />modern luxury."
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>— The Velour Collective</p>
          </blockquote>
        </div>
      </div>

      {/* Right: form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <h1 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', letterSpacing: '0.2em', textAlign: 'center', marginBottom: '4px' }}>VELOUR</h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.4)', textAlign: 'center', marginBottom: '28px' }}>Create your account</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              {[
                { key: 'name', label: 'FULL NAME', type: 'text', placeholder: 'Jane Smith' },
                { key: 'email', label: 'EMAIL', type: 'email', placeholder: 'you@example.com' },
                { key: 'password', label: 'PASSWORD', type: 'password', placeholder: '••••••••' },
                { key: 'confirm', label: 'CONFIRM PASSWORD', type: 'password', placeholder: '••••••••' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>{label}</label>
                  <input type={type} required value={form[key]} onChange={set(key)}
                    onFocus={() => setFocusedField(key)} onBlur={() => setFocusedField(null)}
                    style={inputStyle(key)} placeholder={placeholder} />
                </div>
              ))}

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', paddingTop: '4px' }}>
                <input type="checkbox" checked={form.terms} onChange={set('terms')} style={{ accentColor: '#0A0A0A', marginTop: '2px' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.5)', lineHeight: 1.5 }}>
                  I agree to the <a href="#" style={{ color: '#0A0A0A', fontWeight: 600 }}>Terms</a> and <a href="#" style={{ color: '#0A0A0A', fontWeight: 600 }}>Privacy Policy</a>
                </span>
              </label>

              <button type="submit" disabled={loading} className="btn-black" style={{ width: '100%', marginTop: '8px', opacity: loading ? 0.6 : 1 }}>
                {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
              </button>
            </form>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.4)', textAlign: 'center' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ fontWeight: 600, color: '#0A0A0A', textDecoration: 'none' }}>SIGN IN</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
