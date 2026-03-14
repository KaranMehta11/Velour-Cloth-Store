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
    <footer className="bg-velour-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand */}
          <div>
            <span className="font-serif italic text-2xl font-semibold text-white mb-2 block">Velour</span>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Curated fashion for the modern individual. Timeless pieces, effortless style.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-velour-accent transition-colors duration-300">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-velour-accent transition-colors duration-300">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-velour-accent transition-colors duration-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.994 7.002h-2.01c-.235 0-.497.31-.497.724v1.45h2.507l-.33 2.532h-2.177V18h-2.61v-6.292H11v-2.532h1.877V7.51c0-2.174 1.33-3.355 3.262-3.355.928 0 1.855.07 2.855.14v2.707z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Men', 'Women', 'Accessories', 'Sale', 'New Arrivals'].map(item => (
                <li key={item}>
                  <Link to={`/shop?category=${item}`} className="hover:text-velour-accent transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Help */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Help</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {['FAQ', 'Shipping', 'Returns', 'Size Guide', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-velour-accent transition-colors duration-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Stay in the loop</h4>
            <p className="text-gray-400 text-sm mb-4">Get first access to new drops, exclusive offers, and style inspiration.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-2 text-sm w-full focus:outline-none focus:border-velour-accent transition-colors"
              />
              <button type="submit" className="bg-velour-accent text-white text-sm px-4 py-2 hover:opacity-90 transition-opacity font-medium">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Velour. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-velour-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-velour-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
