import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter } from 'react-icons/fi'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    toast.success('Subscribed! Welcome to the Velour circle.')
    setEmail('')
  }

  return (
    <footer className="bg-luxury-black text-luxury-white" style={{ backgroundColor: 'var(--color-black)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Col 1: Brand */}
          <div>
            <span className="font-garamond-serif italic text-3xl font-300 text-luxury-white mb-4 block" style={{ letterSpacing: '0.2em', color: 'var(--color-white)' }}>
              VELOUR
            </span>
            <p className="text-sm leading-relaxed mb-8 font-sans font-200" style={{ color: 'rgba(255, 252, 250, 0.6)' }}>
              Curated luxury fashion for the modern individual. Timeless pieces, effortless style — crafted with intention, worn with purpose.
            </p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors duration-300 hover:text-luxury-gold" style={{ color: 'rgba(255, 252, 250, 0.7)' }}>
                <FiInstagram size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="transition-colors duration-300 hover:text-luxury-gold" style={{ color: 'rgba(255, 252, 250, 0.7)' }}>
                <FiTwitter size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="transition-colors duration-300 hover:text-luxury-gold" style={{ color: 'rgba(255, 252, 250, 0.7)' }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.994 7.002h-2.01c-.235 0-.497.31-.497.724v1.45h2.507l-.33 2.532h-2.177V18h-2.61v-6.292H11v-2.532h1.877V7.51c0-2.174 1.33-3.355 3.262-3.355.928 0 1.855.07 2.855.14v2.707z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div>
            <h4 className="text-luxury-white font-sans font-400 mb-6 text-xs tracking-widest uppercase" style={{ color: 'var(--color-white)' }}>Shop</h4>
            <ul className="space-y-3 text-xs font-sans font-200">
              {['Men', 'Women', 'Accessories', 'Sale', 'New Arrivals'].map(item => (
                <li key={item}>
                  <Link to={`/shop?category=${item}`} className="transition-colors duration-300 hover:text-luxury-gold" style={{ color: 'rgba(255, 252, 250, 0.6)' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Help */}
          <div>
            <h4 className="text-luxury-white font-sans font-400 mb-6 text-xs tracking-widest uppercase" style={{ color: 'var(--color-white)' }}>Help</h4>
            <ul className="space-y-3 text-xs font-sans font-200">
              {['FAQ', 'Shipping', 'Returns', 'Size Guide', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="transition-colors duration-300 hover:text-luxury-gold" style={{ color: 'rgba(255, 252, 250, 0.6)' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-luxury-white font-sans font-400 mb-2 text-xs tracking-widest uppercase" style={{ color: 'var(--color-gold)', letterSpacing: '0.2em' }}>
              JOIN THE INNER CIRCLE
            </h4>
            <p className="text-xs font-sans font-200 mb-6" style={{ color: 'rgba(255, 252, 250, 0.6)' }}>
              Exclusive drops, early access, and style notes — directly to you.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="bg-transparent border-b text-luxury-white placeholder-gray-500 px-0 py-2 text-sm w-full focus:outline-none transition-colors font-200"
                style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-white)' }}
                onFocus={(e) => e.target.style.borderBottom = '1px solid var(--color-gold)'}
                onBlur={(e) => e.target.style.borderBottom = '1px solid var(--color-border)'}
              />
              <button 
                type="submit" 
                className="text-xs font-sans font-400 tracking-widest uppercase py-2.5 transition-all duration-300"
                style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-white)' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-gold-light)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-gold)'}
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-luxury-border my-12" style={{ borderColor: 'rgba(255, 252, 250, 0.1)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans font-200" style={{ color: 'rgba(255, 252, 250, 0.5)' }}>
          <p>© {new Date().getFullYear()} VELOUR. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="transition-colors duration-300" style={{ color: 'rgba(255, 252, 250, 0.5)' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 252, 250, 0.5)'}>Privacy Policy</a>
            <a href="#" className="transition-colors duration-300" style={{ color: 'rgba(255, 252, 250, 0.5)' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 252, 250, 0.5)'}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

