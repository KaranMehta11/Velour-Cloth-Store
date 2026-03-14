import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false })
  const [loading, setLoading] = useState(false)
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
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
          alt="Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-end p-12">
          <div>
            <span className="font-serif italic text-4xl text-white">Velour</span>
            <p className="text-white/70 mt-2 text-sm">Join the circle of modern luxury.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 bg-velour-bg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8">
            <span className="font-serif italic text-3xl text-velour-text">Velour</span>
            <h1 className="font-serif text-2xl mt-4 mb-1">Create an account</h1>
            <p className="text-velour-muted text-sm">Join Velour for exclusive access and early drops</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Jane Smith' },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'you@example.com' },
              { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
              { label: 'Confirm Password', key: 'confirm', type: 'password', placeholder: '••••••••' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-xs uppercase tracking-widest font-medium text-velour-muted block mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={set(field.key)}
                  required
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-velour-text transition-colors"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={set('terms')}
                className="mt-0.5 accent-velour-accent"
              />
              <span className="text-xs text-velour-muted">
                I agree to the{' '}
                <a href="#" className="text-velour-accent hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-velour-accent hover:underline">Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-velour-accent text-white py-3.5 rounded-full font-medium hover:opacity-90 transition-all disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-sm text-center text-velour-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-velour-accent font-medium hover:underline">Login</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
