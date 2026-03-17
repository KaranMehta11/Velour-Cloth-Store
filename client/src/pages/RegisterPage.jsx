import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '../store/useAuthStore'
import useScrollReveal from '../hooks/useScrollReveal'
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

  useScrollReveal()

  return (
    <div className="min-h-screen grid md:grid-cols-2" style={{ backgroundColor: '#0F0D0B' }}>
      {/* Left Panel: Image + Quote */}
      <div className="hidden md:flex md:h-screen flex-col items-center justify-center relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay 50% */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Quote */}
        <div className="absolute inset-0 flex items-center justify-center px-12 z-10">
          <blockquote className="text-center">
            <p className="text-base md:text-2xl text-white leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(20px, 4vw, 28px)' }}>
              "Fashion is self-expression. Join the circle of modern luxury today."
            </p>
            <p className="text-sm text-white/70" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>— The Velour Collective</p>
          </blockquote>
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="flex h-screen items-center justify-center px-16" style={{ backgroundColor: '#0F0D0B' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Logo */}
          <h1 className="text-center mb-12" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '28px', color: '#FDFCFA', letterSpacing: '0.35em' }}>VELOUR</h1>

          {/* Header */}
          <div className="mb-12">
            <p className="text-sm font-200 tracking-wide" style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.35)' }}>
              Join Velour for exclusive access and early drops
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-10">
            {/* Full Name */}
            <div>
              <label className="text-10px font-400 uppercase block mb-2 transition-all" style={{ fontFamily: 'var(--font-body)', color: focusedField === 'name' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>
                FULL NAME
              </label>
              <input
                type="text"
                value={form.name}
                onChange={set('name')}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-transparent pb-3 pt-1 text-sm font-300 focus:outline-none transition-all"
                style={{
                  fontFamily: 'var(--font-body)',
                  borderBottom: focusedField === 'name' ? '1px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                  color: '#FDFCFA',
                }}
                placeholder="Jane Smith"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-10px font-400 uppercase block mb-2 transition-all" style={{ fontFamily: 'var(--font-body)', color: focusedField === 'email' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>
                EMAIL
              </label>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-transparent pb-3 pt-1 text-sm font-300 focus:outline-none transition-all"
                style={{
                  fontFamily: 'var(--font-body)',
                  borderBottom: focusedField === 'email' ? '1px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                  color: '#FDFCFA',
                }}
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-10px font-400 uppercase block mb-2 transition-all" style={{ fontFamily: 'var(--font-body)', color: focusedField === 'password' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>
                PASSWORD
              </label>
              <input
                type="password"
                value={form.password}
                onChange={set('password')}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-transparent pb-3 pt-1 text-sm font-300 focus:outline-none transition-all"
                style={{
                  fontFamily: 'var(--font-body)',
                  borderBottom: focusedField === 'password' ? '1px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                  color: '#FDFCFA',
                }}
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-10px font-400 uppercase block mb-2 transition-all" style={{ fontFamily: 'var(--font-body)', color: focusedField === 'confirm' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                value={form.confirm}
                onChange={set('confirm')}
                onFocus={() => setFocusedField('confirm')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-transparent pb-3 pt-1 text-sm font-300 focus:outline-none transition-all"
                style={{
                  fontFamily: 'var(--font-body)',
                  borderBottom: focusedField === 'confirm' ? '1px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                  color: '#FDFCFA',
                }}
                placeholder="••••••••"
              />
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer py-2">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={set('terms')}
                style={{ accentColor: '#B8963E' }}
              />
              <span className="text-11px font-200 leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.35)' }}>
                I agree to the{' '}
                <a href="#" className="font-400 transition-colors" style={{ color: '#B8963E' }}>
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="font-400 transition-colors" style={{ color: '#B8963E' }}>
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-3 text-11px font-400 tracking-widest uppercase rounded-none transition-all duration-300"
              style={{
                fontFamily: 'var(--font-body)',
                backgroundColor: '#B8963E',
                color: '#0F0D0B',
                opacity: loading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#D4AF6A')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#B8963E')}
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-center font-200" style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.35)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-400 transition-colors" style={{ color: '#B8963E' }}>
              SIGN IN
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

