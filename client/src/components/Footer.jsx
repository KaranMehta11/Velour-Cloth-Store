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
    <footer style={{ backgroundColor: '#0A0A0A', color: 'rgba(255,255,255,0.5)' }}>
      <div className="px-10 py-20 mx-auto" style={{maxWidth:'1400px'}}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Col 1: Brand */}
          <div>
            <span className="block mb-4 italic text-off-white" style={{ fontFamily:'var(--font-heading)', fontSize: '22px', fontStyle: 'italic', color: '#FDFCFA' }}>
              VELOUR
            </span>
            <p className="text-xs font-light leading-relaxed text-white mb-6" style={{fontFamily:'var(--font-body)', color: 'rgba(255,255,255,0.4)'}}>
              Luxury fashion for the modern individual. Timeless pieces, effortless style.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-gold transition-colors duration-300" style={{color: 'rgba(255,255,255,0.5)'}}
                onMouseEnter={(e) => e.currentTarget.style.color = '#B8963E'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                <FiInstagram size={18} />
              </a>
              <a href="#" className="text-white hover:text-gold transition-colors duration-300" style={{color: 'rgba(255,255,255,0.5)'}}
                onMouseEnter={(e) => e.currentTarget.style.color = '#B8963E'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                <FiTwitter size={18} />
              </a>
              <a href="#" className="text-white hover:text-gold transition-colors duration-300" style={{color: 'rgba(255,255,255,0.5)'}}
                onMouseEnter={(e) => e.currentTarget.style.color = '#B8963E'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.994 7.002h-2.01c-.235 0-.497.31-.497.724v1.45h2.507l-.33 2.532h-2.177V18h-2.61v-6.292H11v-2.532h1.877V7.51c0-2.174 1.33-3.355 3.262-3.355.928 0 1.855.07 2.855.14v2.707z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2-4: Links */}
          {[
            { heading: 'SHOP', links: ['Men', 'Women', 'Accessories', 'Sale', 'New Arrivals'] },
            { heading: 'HELP', links: ['FAQ', 'Shipping', 'Returns', 'Size Guide', 'Contact'] },
            { heading: 'CONNECT', links: ['About', 'Blog', 'Careers', 'Contact', 'Press'] }
          ].map((col) => (
            <div key={col.heading}>
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-off-white mb-5" style={{fontFamily:'var(--font-body)', color: '#FDFCFA'}}>{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map(item => (
                  <li key={item}>
                    <a href="#" className="text-xs font-light transition-colors duration-300" style={{fontFamily:'var(--font-body)', color: 'rgba(255,255,255,0.5)'}}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#B8963E'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t my-6" style={{borderColor:'rgba(255,255,255,0.1)'}}/>

        {/* Bottom bar */}
        <div className="flex justify-between items-center" style={{borderColor:'rgba(255,255,255,0.1)'}}>  
          <p className="text-xs font-light" style={{fontFamily:'var(--font-body)', color: 'rgba(255,255,255,0.3)'}}>
            © {new Date().getFullYear()} Velour. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-light transition-colors duration-300" style={{fontFamily:'var(--font-body)', color: 'rgba(255,255,255,0.3)'}}
              onMouseEnter={(e) => e.currentTarget.style.color = '#B8963E'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>
              Privacy Policy
            </a>
            <a href="#" className="text-xs font-light transition-colors duration-300" style={{fontFamily:'var(--font-body)', color: 'rgba(255,255,255,0.3)'}}
              onMouseEnter={(e) => e.currentTarget.style.color = '#B8963E'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

