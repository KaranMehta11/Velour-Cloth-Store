import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function OrderSuccessPage() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId')

  useEffect(() => {
    document.title = 'Order Confirmed — Velour'
  }, [])

  return (
    <div className="min-h-screen bg-velour-bg flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-md">
        {/* Animated checkmark */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-velour-accent/10 flex items-center justify-center">
            <motion.svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.path
                d="M10 24 L20 34 L38 14"
                fill="none"
                stroke="#C9A96E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.svg>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="font-serif text-4xl mb-3">Order Confirmed!</h1>
          <p className="text-velour-muted mb-2">Thank you for your order. We're preparing it with care.</p>
          {orderId && (
            <p className="text-sm text-velour-muted mb-1">
              Order ID: <span className="font-mono text-velour-text">{orderId.slice(-8).toUpperCase()}</span>
            </p>
          )}
          <p className="text-sm text-velour-muted mb-10">
            Estimated delivery: <span className="font-medium text-velour-text">3–5 business days</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/account?tab=orders" className="bg-velour-accent text-white px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity">
              Track Order
            </Link>
            <Link to="/shop" className="border border-velour-text text-velour-text px-8 py-3.5 rounded-full font-medium hover:bg-velour-text hover:text-white transition-all duration-300">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
