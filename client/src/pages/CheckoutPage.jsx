import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../api/axios'
import useCartStore from '../store/useCartStore'
import useAuthStore from '../store/useAuthStore'
import useScrollReveal from '../hooks/useScrollReveal'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'

const steps = ['CART', 'SHIPPING', 'PAYMENT', 'CONFIRM']

const formatPrice = (price) => {
  if (!price) return '₹0'
  return '₹' + Math.round(price * 83).toLocaleString('en-IN')
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [focusedField, setFocusedField] = useState(null)
  const [shipping, setShipping] = useState({
    fullName: '', email: '', phone: '', address: '', address2: '',
    city: '', state: '', postal: '', country: 'IN',
  })
  const [loading, setLoading] = useState(false)
  const { items, total: getTotal, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useScrollReveal()

  const cartTotal = getTotal()
  const shippingCost = cartTotal >= 100 ? 0 : 10
  const tax = cartTotal * 0.08
  const orderTotal = cartTotal + shippingCost + tax

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      const orderItems = items.map(item => ({
        name: item.product?.name || item.name,
        qty: item.qty,
        image: item.product?.images?.[0]?.url || '',
        price: item.product?.discountPrice || item.product?.price || 0,
        size: item.size,
        color: item.color,
        product: item.product?._id,
      }))

      const res = await api.post('/orders', {
        orderItems,
        shippingAddress: {
          address: shipping.address + (shipping.address2 ? `, ${shipping.address2}` : ''),
          city: shipping.city,
          postalCode: shipping.postal,
          country: shipping.country,
        },
        paymentMethod: 'stripe',
        itemsPrice: cartTotal,
        shippingPrice: shippingCost,
        taxPrice: tax,
        totalPrice: orderTotal,
      })

      await clearCart()
      navigate(`/order-success?orderId=${res.data.order._id}`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  const setField = (key) => (e) => setShipping(s => ({ ...s, [key]: e.target.value }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 pb-20"
      style={{ backgroundColor: '#0F0D0B' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-20">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex items-center gap-2 px-3" style={{ color: i <= step ? '#B8963E' : 'rgba(255,255,255,0.35)' }}>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans font-400 transition-all"
                  style={{
                    backgroundColor: i < step ? '#B8963E' : i === step ? '#B8963E' : 'rgba(184,150,62,0.2)',
                    color: i < step || i === step ? '#0F0D0B' : 'rgba(255,255,255,0.35)',
                  }}
                >
                  {i < step ? '✓' : i + 1}
                </span>
                <span className="text-xs font-sans font-300 hidden sm:inline" style={{ color: '#FDFCFA' }}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="w-12 h-px mx-1"
                  style={{ backgroundColor: i < step ? '#B8963E' : 'rgba(184,150,62,0.2)' }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <h2 className="font-garamond-serif text-3xl font-300 mb-12" style={{ color: '#FDFCFA' }}>
                  SHIPPING INFORMATION
                </h2>

                <div className="space-y-8">
                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4" style={{ color: focusedField === 'fullName' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
                      Full Name
                    </label>
                    <input
                      className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                      style={{
                        borderBottom: focusedField === 'fullName' ? '2px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                        color: '#FDFCFA',
                      }}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField(null)}
                      value={shipping.fullName}
                      onChange={setField('fullName')}
                      placeholder="Jane Smith"
                      required
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4" style={{ color: focusedField === 'email' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                        style={{
                          borderBottom: focusedField === 'email' ? '2px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                          color: '#FDFCFA',
                        }}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        value={shipping.email}
                        onChange={setField('email')}
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4" style={{ color: focusedField === 'phone' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
                        Phone
                      </label>
                      <input
                        className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                        style={{
                          borderBottom: focusedField === 'phone' ? '2px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                          color: '#FDFCFA',
                        }}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        value={shipping.phone}
                        onChange={setField('phone')}
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4" style={{ color: focusedField === 'address' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
                      Address
                    </label>
                    <input
                      className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                      style={{
                        borderBottom: focusedField === 'address' ? '2px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                        color: '#FDFCFA',
                      }}
                      onFocus={() => setFocusedField('address')}
                      onBlur={() => setFocusedField(null)}
                      value={shipping.address}
                      onChange={setField('address')}
                      placeholder="123 MG Road"
                      required
                    />
                  </div>

                  {/* Address 2 */}
                  <div>
                    <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4" style={{ color: focusedField === 'address2' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
                      Apartment, Suite, etc. (Optional)
                    </label>
                    <input
                      className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                      style={{
                        borderBottom: focusedField === 'address2' ? '2px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                        color: '#FDFCFA',
                      }}
                      onFocus={() => setFocusedField('address2')}
                      onBlur={() => setFocusedField(null)}
                      value={shipping.address2}
                      onChange={setField('address2')}
                      placeholder="Apt 4B"
                    />
                  </div>

                  {/* City, State, Postal */}
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4" style={{ color: focusedField === 'city' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
                        City
                      </label>
                      <input
                        className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                        style={{
                          borderBottom: focusedField === 'city' ? '2px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                          color: '#FDFCFA',
                        }}
                        onFocus={() => setFocusedField('city')}
                        onBlur={() => setFocusedField(null)}
                        value={shipping.city}
                        onChange={setField('city')}
                        placeholder="Bangalore"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4" style={{ color: focusedField === 'state' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
                        State
                      </label>
                      <input
                        className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                        style={{
                          borderBottom: focusedField === 'state' ? '2px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                          color: '#FDFCFA',
                        }}
                        onFocus={() => setFocusedField('state')}
                        onBlur={() => setFocusedField(null)}
                        value={shipping.state}
                        onChange={setField('state')}
                        placeholder="KA"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4" style={{ color: focusedField === 'postal' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
                        Postal Code
                      </label>
                      <input
                        className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                        style={{
                          borderBottom: focusedField === 'postal' ? '2px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                          color: '#FDFCFA',
                        }}
                        onFocus={() => setFocusedField('postal')}
                        onBlur={() => setFocusedField(null)}
                        value={shipping.postal}
                        onChange={setField('postal')}
                        placeholder="560001"
                        required
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4" style={{ color: focusedField === 'country' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
                      Country
                    </label>
                    <select
                      className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                      style={{
                        borderBottom: focusedField === 'country' ? '2px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                        color: '#FDFCFA',
                      }}
                      onFocus={() => setFocusedField('country')}
                      onBlur={() => setFocusedField(null)}
                      value={shipping.country}
                      onChange={setField('country')}
                    >
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={() => {
                    if (!shipping.fullName || !shipping.address || !shipping.city || !shipping.postal) {
                      toast.error('Please fill in all required fields')
                      return
                    }
                    setStep(2)
                  }}
                  className="w-full py-4 mt-12 text-xs font-sans font-400 tracking-widest uppercase rounded-none transition-all duration-300"
                  style={{ backgroundColor: '#B8963E', color: '#0F0D0B' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#D4AF6A'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#B8963E'}
                >
                  CONTINUE TO PAYMENT
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <h2 className="font-garamond-serif text-3xl font-300 mb-12" style={{ color: '#FDFCFA' }}>
                  PAYMENT METHOD
                </h2>

                <div
                  className="p-8 mb-12"
                  style={{
                    backgroundColor: '#141210',
                    border: '1px solid rgba(184,150,62,0.15)',
                  }}
                >
                  <p className="text-sm font-sans font-200 mb-6" style={{ color: '#FDFCFA' }}>
                    This is a demo store. Use test card details:
                  </p>
                  <div className="space-y-3 text-sm font-sans font-300">
                    <p style={{ color: '#B8963E' }}>
                      <span style={{ color: '#FDFCFA' }}>Card:</span> 4242 4242 4242 4242
                    </p>
                    <p style={{ color: '#B8963E' }}>
                      <span style={{ color: '#FDFCFA' }}>Expiry:</span> Any future date
                    </p>
                    <p style={{ color: '#B8963E' }}>
                      <span style={{ color: '#FDFCFA' }}>CVV:</span> Any 3 digits
                    </p>
                  </div>
                </div>

                <div className="space-y-8 mb-12">
                  <div>
                    <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4" style={{ color: focusedField === 'card' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
                      Card Number
                    </label>
                    <input
                      className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                      style={{
                        borderBottom: focusedField === 'card' ? '2px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                        color: '#FDFCFA',
                      }}
                      onFocus={() => setFocusedField('card')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4" style={{ color: focusedField === 'expiry' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
                        Expiry Date
                      </label>
                      <input
                        className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                        style={{
                          borderBottom: focusedField === 'expiry' ? '2px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                          color: '#FDFCFA',
                        }}
                        onFocus={() => setFocusedField('expiry')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="MM / YY"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4" style={{ color: focusedField === 'cvv' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
                        CVV
                      </label>
                      <input
                        className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                        style={{
                          borderBottom: focusedField === 'cvv' ? '2px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                          color: '#FDFCFA',
                        }}
                        onFocus={() => setFocusedField('cvv')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-sans font-400 uppercase tracking-widest block mb-4" style={{ color: focusedField === 'namecard' ? '#B8963E' : 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
                      Name on Card
                    </label>
                    <input
                      className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                      style={{
                        borderBottom: focusedField === 'namecard' ? '2px solid #B8963E' : '1px solid rgba(184,150,62,0.2)',
                        color: '#FDFCFA',
                      }}
                      onFocus={() => setFocusedField('namecard')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Jane Smith"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="py-4 text-xs font-sans font-400 tracking-widest uppercase rounded-none transition-all duration-300 border"
                    style={{
                      borderColor: 'rgba(184,150,62,0.2)',
                      color: '#FDFCFA',
                    }}
                    onMouseEnter={(e) => e.target.style.borderColor = '#B8963E'}
                    onMouseLeave={(e) => e.target.style.borderColor = 'rgba(184,150,62,0.2)'}
                  >
                    BACK
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="py-4 text-xs font-sans font-400 tracking-widest uppercase rounded-none transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: loading ? 'rgba(184,150,62,0.4)' : '#B8963E',
                      color: '#0F0D0B',
                    }}
                    onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#D4AF6A')}
                    onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#B8963E')}
                  >
                    {loading ? <><LoadingSpinner size="sm" /> PLACING...</> : `PLACE ORDER — ${formatPrice(orderTotal)}`}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:sticky lg:top-28 self-start">
            <div
              className="p-8"
              style={{
                backgroundColor: '#141210',
                border: '1px solid rgba(184,150,62,0.15)',
              }}
            >
              <h3 className="font-garamond-serif text-2xl font-300 mb-8" style={{ color: '#FDFCFA' }}>
                ORDER SUMMARY
              </h3>

              {/* Items */}
              <div className="space-y-4 mb-8 max-h-80 overflow-y-auto">
                {items.map(item => {
                  const product = item.product || {}
                  const price = product.discountPrice || product.price || 0
                  return (
                    <div key={item._id} className="flex gap-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={product.images?.[0]?.url}
                          alt={product.name}
                          className="w-12 h-16 object-cover"
                          style={{ backgroundColor: '#1A1612' }}
                        />
                        <span
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-sans font-400"
                          style={{ backgroundColor: '#B8963E', color: '#0F0D0B' }}
                        >
                          {item.qty}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-sans font-300 line-clamp-2" style={{ color: '#FDFCFA' }}>
                          {product.name}
                        </p>
                        {item.size && (
                          <p className="text-xs font-sans font-200 mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                            {item.size} · {item.color}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-sans font-300 flex-shrink-0" style={{ color: '#FDFCFA' }}>
                        {formatPrice(price * item.qty)}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Summary totals */}
              <div className="space-y-4 pb-8 mb-8" style={{ borderBottom: '1px solid rgba(184,150,62,0.15)' }}>
                <div className="flex justify-between text-xs font-sans font-200" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <span>SUBTOTAL</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-xs font-sans font-200" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <span>SHIPPING</span>
                  <span style={{ color: shippingCost === 0 ? '#B8963E' : 'rgba(255,255,255,0.35)' }}>
                    {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-sans font-200" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <span>TAX (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-xs font-sans font-400" style={{ color: 'rgba(255,255,255,0.5)' }}>TOTAL</span>
                <span className="text-lg font-sans font-400" style={{ color: '#B8963E' }}>
                  {formatPrice(orderTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
