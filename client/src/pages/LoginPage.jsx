import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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

  return (
    <div className="min-h-screen grid md:grid-cols-2" style={{ backgroundColor: 'var(--color-cream)' }}>
      {/* Left Panel: Image + Quote */}
      <div className="hidden md:flex flex-col items-end justify-end relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        {/* Quote */}
        <div className="absolute inset-0 flex items-center justify-center px-12">
          <blockquote className="text-center">
            <p className="font-garamond-italic text-4xl text-white leading-tight mb-6">
              "Style is a way to say who you are without having to speak."
            </p>
            <p className="font-garamond-italic text-sm text-white/70">— Rachel Zoe</p>
          </blockquote>
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="flex items-center justify-center p-8" style={{ backgroundColor: 'var(--color-cream)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-garamond-serif text-4xl font-300 mb-3" style={{ color: 'var(--color-black)' }}>Welcome</h1>
            <p className="text-sm font-sans font-200 tracking-wide" style={{ color: 'var(--color-muted)' }}>Sign in to your Velour account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8 mb-12">
            {/* Email */}
            <div>
              <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4 transition-all" style={{ color: focusedField === 'email' ? 'var(--color-gold)' : 'var(--color-muted)', letterSpacing: '0.2em' }}>
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                style={{
                  borderBottom: focusedField === 'email' ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                  color: 'var(--color-black)',
                }}
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4 transition-all" style={{ color: focusedField === 'password' ? 'var(--color-gold)' : 'var(--color-muted)', letterSpacing: '0.2em' }}>
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                style={{
                  borderBottom: focusedField === 'password' ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                  color: 'var(--color-black)',
                }}
                placeholder="••••••••"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right pt-2">
              <Link to="#" className="text-xs font-sans font-300 tracking-wide hover-underline" style={{ color: 'var(--color-gold)' }}>
                FORGOT PASSWORD?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-none font-sans font-400 text-xs tracking-widest uppercase transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-gold)',
                color: 'var(--color-white)',
                opacity: loading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = 'var(--color-gold-light)')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = 'var(--color-gold)')}
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-8 flex items-center">
            <div className="flex-grow h-px" style={{ backgroundColor: 'var(--color-border)' }} />
            <span className="px-3 text-xs font-sans font-200" style={{ color: 'var(--color-muted)' }}>OR</span>
            <div className="flex-grow h-px" style={{ backgroundColor: 'var(--color-border)' }} />
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full py-4 rounded-none border border-2 font-sans font-400 text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-black)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-gold)'
              e.currentTarget.style.backgroundColor = 'var(--color-cream)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
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
          <p className="text-sm text-center font-sans font-200 mt-10" style={{ color: 'var(--color-muted)' }}>
            Don't have an account?{' '}
            <Link to="/register" className="font-400 hover-underline" style={{ color: 'var(--color-gold)' }}>
              REGISTER
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

