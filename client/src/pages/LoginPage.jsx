import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '../store/useAuthStore'
import useScrollReveal from '../hooks/useScrollReveal'
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

  useScrollReveal()

  return (
    <div className="min-h-screen grid md:grid-cols-2" style={{ backgroundColor: '#0F0D0B' }}>
      {/* Left Panel: Image + Quote */}
      <div className="hidden md:flex md:h-screen flex-col items-center justify-center relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay 50% */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Quote */}
        <div className="absolute inset-0 flex items-center justify-center px-12 z-10">
          <blockquote className="text-center">
            <p className="text-base md:text-2xl text-white leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(20px, 4vw, 28px)' }}>
              "Style is a way to say who you are without having to speak."
            </p>
            <p className="text-sm text-white/70" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>— Rachel Zoe</p>
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
            <p className="text-sm font-200 tracking-wide" style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.35)' }}>Sign in to your Velour account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-12">
            {/* Email */}
            <div>
              <label className="text-10px font-400 uppercase block mb-2 transition-all" style={{ fontFamily: 'var(--font-body)', color: focusedField === 'email' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>
                EMAIL
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-transparent pb-3 pt-1 text-sm font-300 focus:outline-none transition-all" style={{
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
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
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

            {/* Forgot Password Link */}
            <div className="text-right pt-2">
              <Link to="#" className="text-11px font-300 tracking-wide transition-colors" style={{ fontFamily: 'var(--font-body)', color: '#B8963E' }}>
                FORGOT PASSWORD?
              </Link>
            </div>

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
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-8 flex items-center">
            <div className="flex-grow h-px" style={{ backgroundColor: 'rgba(184,150,62,0.2)' }} />
            <span className="px-3 text-11px font-200" style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.35)' }}>OR</span>
            <div className="flex-grow h-px" style={{ backgroundColor: 'rgba(184,150,62,0.2)' }} />
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full py-4 rounded-none border border-2 font-400 text-11px tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
            style={{
              fontFamily: 'var(--font-body)',
              borderColor: 'rgba(184,150,62,0.2)',
              color: '#FDFCFA',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#B8963E'
              e.currentTarget.style.backgroundColor = 'rgba(184,150,62,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(184,150,62,0.2)'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            CONTINUE WITH GOOGLE
          </button>

          {/* Register Link */}
          <p className="text-sm text-center font-200 mt-10" style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.35)' }}>
            Don't have an account?{' '}
            <Link to="/register" className="font-400 transition-colors" style={{ color: '#B8963E' }}>
              REGISTER
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

