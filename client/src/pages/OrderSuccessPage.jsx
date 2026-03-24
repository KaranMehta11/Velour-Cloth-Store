import { useSearchParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from '../api/axios'
import LoadingSpinner from '../components/LoadingSpinner'

export default function OrderSuccessPage() {
  const [params] = useSearchParams()
  const sessionId = params.get('session_id')
  const [sessionData, setSessionData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Order Confirmed — Velour'
  }, [])

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) {
        setLoading(false)
        return
      }

      try {
        const res = await api.get(`/payment/session/${sessionId}`)
        setSessionData(res.data.session)
      } catch (err) {
        setSessionData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [sessionId])

  const orderNumber = sessionData?.id ? sessionData.id.slice(-12).toUpperCase() : null

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECEEF0', padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>

        {/* Checkmark */}
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <motion.path
              d="M10 24 L20 34 L38 14"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          </svg>
        </div>

        <h1 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(32px,6vw,56px)', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', lineHeight: 0.95, marginBottom: '16px' }}>ORDER<br />CONFIRMED</h1>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(0,0,0,0.5)', marginBottom: '32px', lineHeight: 1.6 }}>
          Thank you for your purchase. We're preparing your order with care.
        </p>

        {orderNumber && (
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', marginBottom: '32px', border: '1px solid rgba(0,0,0,0.08)' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.4)', marginBottom: '4px' }}>ORDER NUMBER</p>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '20px', fontWeight: 900, color: '#0A0A0A' }}>#{orderNumber}</p>
          </div>
        )}

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {sessionData?.items?.length > 0 && (
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', marginBottom: '20px', border: '1px solid rgba(0,0,0,0.08)', textAlign: 'left' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.4)', marginBottom: '10px' }}>ITEMS ORDERED</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {sessionData.items.map((item, idx) => (
                    <div key={`${item.name}-${idx}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#0A0A0A' }}>{item.name} x{item.quantity}</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#0A0A0A' }}>₹{Math.round(item.amount).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', marginBottom: '32px', border: '1px solid rgba(0,0,0,0.08)' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.4)', marginBottom: '4px' }}>TOTAL PAID</p>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '20px', fontWeight: 900, color: '#0A0A0A', marginBottom: '10px' }}>
                ₹{Math.round(sessionData?.amountTotal || 0).toLocaleString('en-IN')}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.4)', marginBottom: '4px' }}>ESTIMATED DELIVERY</p>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '20px', fontWeight: 900, color: '#B8963E' }}>3-5 Business Days</p>
            </div>
          </>
        )}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/account" className="btn-black" style={{ flex: 1, justifyContent: 'center' }}>VIEW MY ORDERS</Link>
          <Link to="/shop" className="btn-white" style={{ flex: 1, justifyContent: 'center', border: '1px solid rgba(0,0,0,0.12)' }}>CONTINUE SHOPPING</Link>
        </div>
      </div>
    </div>
  )
}
