import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../api/axios'
import useCartStore from '../store/useCartStore'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'

const steps = ['Cart', 'Shipping', 'Payment', 'Confirm']

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [shipping, setShipping] = useState({
    fullName: '', email: '', phone: '', address: '', address2: '',
    city: '', state: '', postal: '', country: 'US',
  })
  const [loading, setLoading] = useState(false)
  const { items, total: getTotal, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()

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

  const inputCls = "w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-velour-text transition-colors bg-white"
  const labelCls = "text-xs uppercase tracking-widest font-medium text-velour-muted block mb-1"

  return (
    <div className="bg-velour-bg min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                i <= step ? 'text-velour-accent' : 'text-velour-muted'
              }`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  i < step ? 'bg-velour-accent text-white' :
                  i === step ? 'bg-velour-accent text-white' :
                  'bg-gray-200 text-gray-400'
                }`}>{i < step ? '✓' : i + 1}</span>
                <span className="hidden sm:inline">{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-8 h-px ${i < step ? 'bg-velour-accent' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="font-serif text-2xl mb-6">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className={labelCls}>Full Name</label>
                    <input className={inputCls} value={shipping.fullName} onChange={setField('fullName')} placeholder="Jane Smith" required />
                  </div>
                  <div>
                    <label className={labelCls}>Email</label>
                    <input type="email" className={inputCls} value={shipping.email} onChange={setField('email')} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input className={inputCls} value={shipping.phone} onChange={setField('phone')} placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Address</label>
                    <input className={inputCls} value={shipping.address} onChange={setField('address')} placeholder="123 Main Street" required />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Apartment, suite, etc. (optional)</label>
                    <input className={inputCls} value={shipping.address2} onChange={setField('address2')} placeholder="Apt 4B" />
                  </div>
                  <div>
                    <label className={labelCls}>City</label>
                    <input className={inputCls} value={shipping.city} onChange={setField('city')} placeholder="New York" required />
                  </div>
                  <div>
                    <label className={labelCls}>State / Province</label>
                    <input className={inputCls} value={shipping.state} onChange={setField('state')} placeholder="NY" />
                  </div>
                  <div>
                    <label className={labelCls}>Postal Code</label>
                    <input className={inputCls} value={shipping.postal} onChange={setField('postal')} placeholder="10001" required />
                  </div>
                  <div>
                    <label className={labelCls}>Country</label>
                    <select className={inputCls} value={shipping.country} onChange={setField('country')}>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!shipping.fullName || !shipping.address || !shipping.city || !shipping.postal) {
                      toast.error('Please fill in required fields')
                      return
                    }
                    setStep(2)
                  }}
                  className="mt-8 w-full bg-velour-accent text-white py-4 font-medium hover:opacity-90 transition-opacity"
                >
                  Continue to Payment →
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="font-serif text-2xl mb-6">Payment</h2>
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <p className="text-sm text-velour-muted mb-4">This is a demo store. Use test card details:</p>
                  <div className="bg-gray-50 p-4 text-sm font-mono space-y-1">
                    <p><span className="text-velour-muted">Card:</span> 4242 4242 4242 4242</p>
                    <p><span className="text-velour-muted">Expiry:</span> Any future date</p>
                    <p><span className="text-velour-muted">CVV:</span> Any 3 digits</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls}>Card Number</label>
                      <input className={inputCls} placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Expiry Date</label>
                        <input className={inputCls} placeholder="MM / YY" />
                      </div>
                      <div>
                        <label className={labelCls}>CVV</label>
                        <input className={inputCls} placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Name on Card</label>
                      <input className={inputCls} placeholder="Jane Smith" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 py-4 text-sm font-medium hover:bg-gray-50 transition-colors">
                    ← Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 bg-velour-accent text-white py-4 font-medium hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? <><LoadingSpinner size="sm" /> Placing Order...</> : `Place Order — $${orderTotal.toFixed(2)}`}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary sidebar */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="bg-white border border-gray-100 p-6">
              <h3 className="font-serif text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-56 overflow-y-auto">
                {items.map(item => {
                  const product = item.product || {}
                  const price = product.discountPrice || product.price || 0
                  return (
                    <div key={item._id} className="flex gap-3 text-sm">
                      <div className="relative flex-shrink-0">
                        <img
                          src={product.images?.[0]?.url}
                          alt={product.name}
                          className="w-12 h-14 object-cover bg-gray-100"
                        />
                        <span className="absolute -top-1.5 -right-1.5 bg-velour-text text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                          {item.qty}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium line-clamp-1 text-xs">{product.name}</p>
                        {item.size && <p className="text-velour-muted text-xs">{item.size} · {item.color}</p>}
                      </div>
                      <span className="font-medium text-xs">${(price * item.qty).toFixed(2)}</span>
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-velour-muted">Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-velour-muted">Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost}`}</span></div>
                <div className="flex justify-between"><span className="text-velour-muted">Tax</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between font-semibold text-base border-t border-gray-100 pt-2 mt-1">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
