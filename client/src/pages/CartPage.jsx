import { Link } from 'react-router-dom'
import { FiTrash2, FiShoppingBag } from 'react-icons/fi'
import useCartStore from '../store/useCartStore'
import useAuthStore from '../store/useAuthStore'
import useScrollReveal from '../hooks/useScrollReveal'
import { useState } from 'react'
import api from '../api/axios'

const formatPrice = (price) => {
  if (!price) return '₹0'
  return '₹' + Math.round(price).toLocaleString('en-IN')
}

export default function CartPage() {
  const { items, updateItem, removeItem, total } = useCartStore()
  const { user } = useAuthStore()
  const [couponCode, setCouponCode] = useState('')
  const [couponData, setCouponData] = useState(null)
  const [couponError, setCouponError] = useState('')
  const cartTotal = total()
  const shipping = cartTotal > 0 ? (cartTotal >= 4999 ? 0 : 299) : 0
  const tax = cartTotal * 0.18
  const discount = couponData?.discountAmount || 0
  const orderTotal = Math.max(0, cartTotal + shipping + tax - discount)

  useScrollReveal()

  const handleApplyCoupon = async () => {
    setCouponError('')
    try {
      const res = await api.post('/coupon/validate', { code: couponCode, cartTotal })
      setCouponData(res.data)
      localStorage.setItem('velour_coupon', JSON.stringify(res.data))
    } catch (err) {
      setCouponData(null)
      setCouponError(err.response?.data?.message || 'Invalid/expired coupon')
      localStorage.removeItem('velour_coupon')
    }
  }

  return (
    <div style={{ backgroundColor: '#ECEEF0', minHeight: '100vh', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>

        <h1 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(32px,6vw,64px)', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: '8px' }}>YOUR CART</h1>
        <div style={{ height: '1px', backgroundColor: 'rgba(0,0,0,0.08)', marginBottom: '40px' }} />

        {items.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '96px 0', textAlign: 'center' }}>
            <FiShoppingBag size={72} style={{ color: 'rgba(0,0,0,0.15)', marginBottom: '24px' }} />
            <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '8px' }}>Your cart is empty</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.45)', marginBottom: '32px', maxWidth: '320px', lineHeight: 1.6 }}>
              Explore our luxury collections and find something you love.
            </p>
            <Link to="/shop" className="btn-black">CONTINUE SHOPPING</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px' }}>
            {/* Items */}
            <div>
              {items.map((item, idx) => {
                const product = item.product || {}
                const price = product.discountPrice || product.price || item.price || 0
                const imgUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'

                return (
                  <div key={item._id} style={{ display: 'flex', gap: '16px', padding: '24px 0', borderBottom: idx !== items.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
                    <Link to={`/product/${product._id}`} style={{ flexShrink: 0 }}>
                      <div className="dark-card" style={{ width: '96px', height: '120px', borderRadius: '12px' }}>
                        <img src={imgUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </Link>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '4px' }}>{product.name || item.name}</p>
                        {item.size && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.4)' }}>Size: {item.size}</p>}
                        {item.color && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.4)' }}>Color: {item.color}</p>}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '9999px', overflow: 'hidden' }}>
                          <button onClick={() => item.qty > 1 ? updateItem(item._id, item.qty - 1) : removeItem(item._id)}
                            style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#0A0A0A' }}>−</button>
                          <span style={{ width: '32px', textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{item.qty}</span>
                          <button onClick={() => updateItem(item._id, item.qty + 1)}
                            style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#0A0A0A' }}>+</button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: '#0A0A0A' }}>{formatPrice(price * item.qty)}</p>
                          <button onClick={() => removeItem(item._id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.3)', transition: 'color 200ms ease' }}
                            onMouseEnter={e => e.target.style.color = '#0A0A0A'}
                            onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,0.3)'}
                          ><FiTrash2 size={15} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div>
              <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '28px', border: '1px solid rgba(0,0,0,0.08)', position: 'sticky', top: '88px' }}>
                <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '20px' }}>Order Summary</h2>

                {[
                  { label: 'Subtotal', val: formatPrice(cartTotal) },
                  { label: couponData ? `Discount (${couponData.code})` : 'Discount', val: couponData ? `- ${formatPrice(discount)}` : '—', gold: !!couponData },
                  { label: 'Shipping', val: shipping === 0 ? 'FREE' : formatPrice(shipping), gold: shipping === 0 },
                  { label: 'GST (18%)', val: formatPrice(tax) },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.45)' }}>{row.label}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: row.gold ? '#B8963E' : '#0A0A0A' }}>{row.val}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', marginBottom: '20px' }}>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A' }}>TOTAL</span>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: '18px', fontWeight: 900, color: '#0A0A0A' }}>{formatPrice(orderTotal)}</span>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Promo code"
                      style={{ flex: 1, border: '1px solid rgba(0,0,0,0.12)', padding: '10px', fontFamily: "'Inter', sans-serif", fontSize: '12px' }}
                    />
                    <button onClick={handleApplyCoupon} className="btn-black" style={{ padding: '10px 14px' }}>APPLY</button>
                  </div>
                  {couponData && (
                    <p style={{ color: '#22c55e', fontFamily: "'Inter', sans-serif", fontSize: '11px', marginTop: '8px' }}>
                      Coupon applied! You save {formatPrice(discount)}
                      <button onClick={() => { setCouponData(null); setCouponCode(''); localStorage.removeItem('velour_coupon') }} style={{ marginLeft: '8px', border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}>x</button>
                    </p>
                  )}
                  {couponError && <p style={{ color: '#ef4444', fontFamily: "'Inter', sans-serif", fontSize: '11px', marginTop: '8px' }}>{couponError}</p>}
                </div>

                <Link to={user ? '/checkout' : '/login'} className="btn-black" style={{ display: 'block', width: '100%', textAlign: 'center', marginBottom: '12px', padding: '16px' }}>
                  {user ? 'PROCEED TO CHECKOUT' : 'LOGIN TO CHECKOUT'}
                </Link>
                <Link to="/shop" style={{ display: 'block', textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
