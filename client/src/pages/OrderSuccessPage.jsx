import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

export default function OrderSuccessPage() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId')

  useEffect(() => {
    document.title = 'Order Confirmed — Velour'
  }, [])

  useScrollReveal()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 pt-20 pb-20"
      style={{ backgroundColor: '#0F0D0B' }}
    >
      <div className="text-center max-w-xl">
        {/* Animated Checkmark */}
        <div className="flex items-center justify-center mb-16">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: '#B8963E', opacity: 0.15 }}
          >
            <motion.svg
              width="72"
              height="72"
              viewBox="0 0 48 48"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.path
                d="M10 24 L20 34 L38 14"
                fill="none"
                stroke="#B8963E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ stroke: '#B8963E' }}
              />
            </motion.svg>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Heading */}
          <h1 className="font-garamond-serif text-5xl font-300 mb-4" style={{ color: '#FDFCFA' }}>
            Order Confirmed
          </h1>

          {/* Subheading */}
          <p className="text-sm font-sans font-200 mb-8" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Thank you for your purchase. We're preparing your order with care and attention to detail.
          </p>

          {/* Order ID */}
          {orderId && (
            <div className="mb-12 p-6 rounded-none" style={{ backgroundColor: '#141210', border: '1px solid rgba(184,150,62,0.15)' }}>
              <p className="text-xs font-sans font-400 uppercase tracking-widest mb-2" style={{ color: '#B8963E', letterSpacing: '0.2em' }}>
                ORDER NUMBER
              </p>
              <p className="font-garamond-serif text-2xl font-300" style={{ color: '#FDFCFA' }}>
                {orderId.slice(-12).toUpperCase()}
              </p>
            </div>
          )}

          {/* Delivery Info */}
          <div className="mb-16 space-y-3">
            <p className="text-sm font-sans font-200" style={{ color: '#FDFCFA' }}>
              <span className="text-xs font-sans font-400 uppercase tracking-widest block mb-1" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
                ESTIMATED DELIVERY
              </span>
              <span className="text-lg font-garamond-serif font-300" style={{ color: '#B8963E' }}>
                3–5 Business Days
              </span>
            </p>
            <p className="text-xs font-sans font-200" style={{ color: 'rgba(255,255,255,0.35)' }}>
              You will receive a tracking link via email
            </p>
          </div>

          {/* Divider */}
          <div className="h-px mb-12" style={{ backgroundColor: 'rgba(184,150,62,0.15)' }} />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/account?tab=orders"
              className="flex-1 py-4 text-xs font-sans font-400 tracking-widest uppercase rounded-none transition-all duration-300"
              style={{ backgroundColor: '#B8963E', color: '#0F0D0B' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#D4AF6A'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#B8963E'}
            >
              TRACK ORDER
            </Link>
            <Link
              to="/shop"
              className="flex-1 py-4 text-xs font-sans font-400 tracking-widest uppercase rounded-none border transition-all duration-300"
              style={{
                borderColor: 'rgba(184,150,62,0.2)',
                color: '#FDFCFA',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#B8963E'
                e.target.style.backgroundColor = 'rgba(184,150,62,0.08)'
                e.target.style.color = '#FDFCFA'
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(184,150,62,0.2)'
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#FDFCFA'
              }}
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

