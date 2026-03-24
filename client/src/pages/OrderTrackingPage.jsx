import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'

export default function OrderTrackingPage() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    api.get(`/orders/${orderId}/tracking`).then((res) => setOrder(res.data.order)).catch(() => setOrder(null))
  }, [orderId])

  if (!order) return <div style={{ minHeight: '100vh', background: '#ECEEF0', padding: '60px 24px' }}>Loading...</div>

  return (
    <div style={{ minHeight: '100vh', background: '#ECEEF0', padding: '40px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '34px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A' }}>
          Order #{order._id.slice(-8).toUpperCase()}
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.45)', marginBottom: '28px' }}>
          {new Date(order.createdAt).toLocaleDateString()}
        </p>

        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          {(order.trackingSteps || []).map((step, idx) => (
            <div key={step.status} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: '12px', marginBottom: idx === order.trackingSteps.length - 1 ? 0 : '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: step.completed ? '#B8963E' : '#d1d5db',
                  boxShadow: step.completed && idx === (order.trackingSteps.findIndex(s => !s.completed) - 1) ? '0 0 0 6px rgba(184,150,62,0.2)' : 'none',
                }} />
                {idx < order.trackingSteps.length - 1 && <div style={{ width: '2px', flex: 1, background: step.completed ? '#B8963E' : '#e5e7eb', minHeight: '28px' }} />}
              </div>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{step.status}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.5)' }}>
                  {step.description}{step.status === 'Shipped' && order.trackingNumber ? ` · ${order.trackingNumber}` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)' }}>Estimated delivery</p>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '24px', fontWeight: 900, color: '#0A0A0A' }}>3-5 business days</p>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          {(order.orderItems || []).map((item) => (
            <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <img src={item.image} alt={item.name} style={{ width: '42px', height: '52px', objectFit: 'cover' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px' }}>{item.name} x {item.qty}</span>
            </div>
          ))}
        </div>

        <Link to="/contact" className="btn-black">NEED HELP?</Link>
      </div>
    </div>
  )
}
