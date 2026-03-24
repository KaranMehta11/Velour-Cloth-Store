import { useState } from 'react'
import api from '../api/axios'
import useCartStore from '../store/useCartStore'
import useScrollReveal from '../hooks/useScrollReveal'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'

const STEPS = ['SHIPPING', 'PAYMENT', 'CONFIRM']

const formatPrice = (price) => {
  if (!price) return '₹0'
  return '₹' + Math.round(price).toLocaleString('en-IN')
}

export default function CheckoutPage() {
  const [step, setStep] = useState(0)
  const [focusedField, setFocusedField] = useState(null)
  const [shipping, setShipping] = useState({ fullName: '', email: '', phone: '', address: '', address2: '', city: '', state: '', postal: '', country: 'IN' })
  const [loading, setLoading] = useState(false)
  const [couponData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('velour_coupon') || 'null')
    } catch {
      return null
    }
  })
  const { items, total: getTotal } = useCartStore()
  useScrollReveal()

  const cartTotal = getTotal()
  const shippingCost = cartTotal >= 4999 ? 0 : 299
  const tax = cartTotal * 0.18
  const orderTotal = cartTotal + shippingCost + tax

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      const sessionItems = items.map(item => ({
        name: item.product?.name || item.name,
        qty: item.qty,
        image: item.product?.images?.[0]?.url || '',
        // backend expects paise for Stripe line items
        price: Math.round((item.product?.discountPrice || item.product?.price || 0) * 100),
        size: item.size, color: item.color,
        productId: item.product?._id,
      }))
      const res = await api.post('/payment/create-checkout-session', {
        items: sessionItems,
        couponCode: couponData?.code,
        shippingAddress: {
          fullName: shipping.fullName,
          email: shipping.email,
          phone: shipping.phone,
          address: shipping.address + (shipping.address2 ? `, ${shipping.address2}` : ''),
          city: shipping.city,
          postalCode: shipping.postal,
          country: shipping.country,
        },
      })

      if (!res.data?.url) {
        throw new Error('No checkout URL returned')
      }
      window.location.href = res.data.url
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to start checkout')
      setLoading(false)
      return
    } finally {
      // Keep loading true while browser navigates to Stripe.
    }
  }

  const setField = (key) => (e) => setShipping(s => ({ ...s, [key]: e.target.value }))

  const inputStyle = (field) => ({
    width: '100%', padding: '12px 14px', backgroundColor: 'white',
    border: `1px solid ${focusedField === field ? '#0A0A0A' : 'rgba(0,0,0,0.12)'}`,
    borderRadius: '12px', fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#0A0A0A', outline: 'none', transition: 'border-color 200ms ease',
  })

  const FieldGroup = ({ field, label, type = 'text', placeholder }) => (
    <div>
      <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>{label}</label>
      <input type={type} value={shipping[field]} onChange={setField(field)}
        onFocus={() => setFocusedField(field)} onBlur={() => setFocusedField(null)}
        style={inputStyle(field)} placeholder={placeholder} />
    </div>
  )

  return (
    <div style={{ backgroundColor: '#ECEEF0', minHeight: '100vh', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>

        <h1 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(32px,6vw,56px)', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: '32px' }}>CHECKOUT</h1>

        {/* Progress Steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, backgroundColor: i <= step ? '#0A0A0A' : 'white', color: i <= step ? 'white' : 'rgba(0,0,0,0.35)', border: '1px solid rgba(0,0,0,0.1)', transition: 'all 300ms ease' }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: i <= step ? '#0A0A0A' : 'rgba(0,0,0,0.35)' }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ width: '32px', height: '1px', backgroundColor: i < step ? '#0A0A0A' : 'rgba(0,0,0,0.15)', transition: 'background 300ms ease' }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px' }}>
          {/* Form */}
          <div>
            {step === 0 && (
              <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '24px' }}>Shipping Information</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <FieldGroup field="fullName" label="Full Name" placeholder="Jane Smith" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <FieldGroup field="email" label="Email" type="email" placeholder="you@example.com" />
                    <FieldGroup field="phone" label="Phone" placeholder="+91 9876543210" />
                  </div>
                  <FieldGroup field="address" label="Address" placeholder="123 MG Road" />
                  <FieldGroup field="address2" label="Apartment, Suite (Optional)" placeholder="Apt 4B" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <FieldGroup field="city" label="City" placeholder="Bangalore" />
                    <FieldGroup field="state" label="State" placeholder="KA" />
                    <FieldGroup field="postal" label="Postal Code" placeholder="560001" />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>COUNTRY</label>
                    <select value={shipping.country} onChange={setField('country')} style={inputStyle('country')}>
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                  <button className="btn-black" style={{ width: '100%', marginTop: '8px' }}
                    onClick={() => { if (!shipping.fullName || !shipping.address || !shipping.city || !shipping.postal) { toast.error('Please fill all required fields'); return } setStep(1) }}>
                    CONTINUE TO PAYMENT
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '24px' }}>Payment Method</h2>

                <div style={{ backgroundColor: '#F0F2F4', borderRadius: '14px', padding: '16px', marginBottom: '24px', border: '1px solid rgba(0,0,0,0.08)' }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#0A0A0A', marginBottom: '8px' }}>Demo store — use test card:</p>
                  {[['Card', '4242 4242 4242 4242'], ['Expiry', 'Any future date'], ['CVV', 'Any 3 digits']].map(([k, v]) => (
                    <p key={k} style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.55)', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, color: '#0A0A0A' }}>{k}:</span> {v}
                    </p>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  {[['card', 'CARD NUMBER', '4242 4242 4242 4242'], ['expiry', 'EXPIRY', 'MM / YY'], ['cvv', 'CVV', '123'], ['namecard', 'NAME ON CARD', 'Jane Smith']].map(([f, l, p]) => (
                    <div key={f}>
                      <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>{l}</label>
                      <input placeholder={p} onFocus={() => setFocusedField(f)} onBlur={() => setFocusedField(null)} style={inputStyle(f)} />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button className="btn-white" style={{ border: '1px solid rgba(0,0,0,0.12)' }} onClick={() => setStep(0)}>BACK</button>
                  <button className="btn-black" onClick={handlePlaceOrder} disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
                    {loading ? <><LoadingSpinner /> REDIRECTING...</> : `PLACE ORDER`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', position: 'sticky', top: '88px' }}>
              <h3 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '20px' }}>Order Summary</h3>
              <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {items.map(item => {
                  const product = item.product || {}
                  const price = product.discountPrice || product.price || 0
                  return (
                    <div key={item._id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img src={product.images?.[0]?.url} alt={product.name} style={{ width: '44px', height: '56px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#E4E6E8' }} />
                        <span style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#0A0A0A', color: 'white', fontFamily: "'Inter', sans-serif", fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.qty}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: '#0A0A0A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</p>
                        {item.size && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(0,0,0,0.4)' }}>{item.size}</p>}
                      </div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#0A0A0A', flexShrink: 0 }}>{formatPrice(price * item.qty)}</span>
                    </div>
                  )
                })}
              </div>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[{ label: 'Subtotal', val: formatPrice(cartTotal) }, { label: 'Shipping', val: shippingCost === 0 ? 'FREE' : formatPrice(shippingCost), gold: shippingCost === 0 }, { label: 'GST (18%)', val: formatPrice(tax) }].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.45)' }}>{row.label}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: row.gold ? '#B8963E' : '#0A0A0A' }}>{row.val}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.08)', marginTop: '4px' }}>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A' }}>TOTAL</span>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: '18px', fontWeight: 900, color: '#0A0A0A' }}>{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
