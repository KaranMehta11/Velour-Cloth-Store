import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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

  return (
    <div className="min-h-screen grid md:grid-cols-2" style={{ backgroundColor: 'var(--color-cream)' }}>
      {/* Left Panel: Image + Quote */}
      <div className="hidden md:flex flex-col items-end justify-end relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        {/* Quote */}
        <div className="absolute inset-0 flex items-center justify-center px-12">
          <blockquote className="text-center">
            <p className="font-garamond-italic text-4xl text-white leading-tight mb-6">
              "Fashion is self-expression. Join the circle of modern luxury today."
            </p>
            <p className="font-garamond-italic text-sm text-white/70">— The Velour Collective</p>
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
            <h1 className="font-garamond-serif text-4xl font-300 mb-3" style={{ color: 'var(--color-black)' }}>
              Create Account
            </h1>
            <p className="text-sm font-sans font-200 tracking-wide" style={{ color: 'var(--color-muted)' }}>
              Join Velour for exclusive access and early drops
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8 mb-10">
            {/* Full Name */}
            <div>
              <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4 transition-all" style={{ color: focusedField === 'name' ? 'var(--color-gold)' : 'var(--color-muted)', letterSpacing: '0.2em' }}>
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={set('name')}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                style={{
                  borderBottom: focusedField === 'name' ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                  color: 'var(--color-black)',
                }}
                placeholder="Jane Smith"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4 transition-all" style={{ color: focusedField === 'email' ? 'var(--color-gold)' : 'var(--color-muted)', letterSpacing: '0.2em' }}>
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
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
                onChange={set('password')}
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

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4 transition-all" style={{ color: focusedField === 'confirm' ? 'var(--color-gold)' : 'var(--color-muted)', letterSpacing: '0.2em' }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={form.confirm}
                onChange={set('confirm')}
                onFocus={() => setFocusedField('confirm')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                style={{
                  borderBottom: focusedField === 'confirm' ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                  color: 'var(--color-black)',
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
                className="mt-1 w-4 h-4 accent-gold"
              />
              <span className="text-xs font-sans font-200 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                I agree to the{' '}
                <a href="#" className="font-400 hover-underline" style={{ color: 'var(--color-gold)' }}>
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="font-400 hover-underline" style={{ color: 'var(--color-gold)' }}>
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-none font-sans font-400 text-xs tracking-widest uppercase transition-all duration-300 mt-8"
              style={{
                backgroundColor: 'var(--color-gold)',
                color: 'var(--color-white)',
                opacity: loading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = 'var(--color-gold-light)')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = 'var(--color-gold)')}
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-center font-sans font-200" style={{ color: 'var(--color-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-400 hover-underline" style={{ color: 'var(--color-gold)' }}>
              SIGN IN
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

