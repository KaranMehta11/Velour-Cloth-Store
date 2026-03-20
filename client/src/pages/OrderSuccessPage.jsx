import { useSearchParams, Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function OrderSuccessPage() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId')

  useEffect(() => {
    document.title = 'Order Confirmed — Velour'
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECEEF0', padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>

        {/* Checkmark */}
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <path d="M10 24 L20 34 L38 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(32px,6vw,56px)', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', lineHeight: 0.95, marginBottom: '16px' }}>ORDER<br />CONFIRMED</h1>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(0,0,0,0.5)', marginBottom: '32px', lineHeight: 1.6 }}>
          Thank you for your purchase. We're preparing your order with care.
        </p>

        {orderId && (
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', marginBottom: '32px', border: '1px solid rgba(0,0,0,0.08)' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.4)', marginBottom: '4px' }}>ORDER NUMBER</p>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '20px', fontWeight: 900, color: '#0A0A0A' }}>#{orderId.slice(-12).toUpperCase()}</p>
          </div>
        )}

        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', marginBottom: '32px', border: '1px solid rgba(0,0,0,0.08)' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.4)', marginBottom: '4px' }}>ESTIMATED DELIVERY</p>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '20px', fontWeight: 900, color: '#B8963E' }}>3–5 Business Days</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.4)', marginTop: '4px' }}>Tracking via email</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/account?tab=orders" className="btn-black" style={{ flex: 1, justifyContent: 'center' }}>TRACK ORDER</Link>
          <Link to="/shop" className="btn-white" style={{ flex: 1, justifyContent: 'center', border: '1px solid rgba(0,0,0,0.12)' }}>CONTINUE SHOPPING</Link>
        </div>
      </div>
    </div>
  )
}
