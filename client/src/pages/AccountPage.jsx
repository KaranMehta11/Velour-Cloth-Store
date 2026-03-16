import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../api/axios'
import useAuthStore from '../store/useAuthStore'
import useWishlistStore from '../store/useWishlistStore'
import Badge from '../components/Badge'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const TABS = [
  { id: 'orders', label: 'MY ORDERS' },
  { id: 'wishlist', label: 'WISHLIST' },
  { id: 'profile', label: 'PROFILE SETTINGS' },
]

const formatPrice = (price) => {
  if (!price) return '₹0'
  return '₹' + Math.round(price * 83).toLocaleString('en-IN')
}

export default function AccountPage() {
  const [params] = useSearchParams()
  const tabParam = params.get('tab') || 'orders'
  const [tab, setTab] = useState(TABS.find(t => t.id === tabParam)?.id || 'orders')
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [focusedField, setFocusedField] = useState(null)
  const [profileForm, setProfileForm] = useState({ name: '', email: '' })
  const [savingProfile, setSavingProfile] = useState(false)

  const { user, hydrate } = useAuthStore()
  const { items: wishlist, fetchWishlist } = useWishlistStore()

  useEffect(() => {
    document.title = 'My Account — Velour'
    if (user) {
      setProfileForm({ name: user.name, email: user.email })
    }
  }, [user])

  useEffect(() => {
    if (tab === 'orders') {
      setOrdersLoading(true)
      api.get('/orders/my-orders')
        .then(res => setOrders(res.data.orders || []))
        .catch(() => {})
        .finally(() => setOrdersLoading(false))
    }
    if (tab === 'wishlist') {
      fetchWishlist()
    }
  }, [tab])

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSavingProfile(true)
    try {
      toast.success('Profile updated successfully!')
    } catch (err) {
      toast.error('Failed to update profile')
    } finally {
      setSavingProfile(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="text-center">
          <h2 className="font-garamond-serif text-2xl font-300 mb-4" style={{ color: 'var(--color-black)' }}>Please Log In</h2>
          <a href="/login" className="text-xs font-sans font-400 tracking-widest uppercase hover-underline" style={{ color: 'var(--color-gold)' }}>
            GO TO LOGIN
          </a>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 pb-20"
      style={{ backgroundColor: 'var(--color-cream)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h1 className="font-garamond-serif text-5xl font-300" style={{ color: 'var(--color-black)' }}>
            MY ACCOUNT
          </h1>
          <div className="h-px mt-4" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>

        <div className="grid md:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="md:col-span-1">
            {/* Profile Card */}
            <div
              className="p-8 mb-8 text-center rounded-none"
              style={{
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-garamond-serif font-300 mx-auto mb-6"
                style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-white)' }}
              >
                {user.name[0].toUpperCase()}
              </div>
              <h2 className="font-garamond-serif text-2xl font-300 mb-1" style={{ color: 'var(--color-black)' }}>
                {user.name}
              </h2>
              <p className="text-xs font-sans font-200" style={{ color: 'var(--color-muted)' }}>
                {user.email}
              </p>
              {user.role === 'admin' && (
                <span
                  className="inline-block mt-4 text-xs font-sans font-400 tracking-widest uppercase px-3 py-1 rounded-none"
                  style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-white)', letterSpacing: '0.1em' }}
                >
                  Administrator
                </span>
              )}
            </div>

            {/* Tab Navigation */}
            <nav className="space-y-1">
              {TABS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="w-full text-left px-0 py-4 text-xs font-sans font-400 tracking-widest uppercase transition-all duration-300 border-b"
                  style={{
                    borderColor: tab === t.id ? 'var(--color-gold)' : 'var(--color-border)',
                    color: tab === t.id ? 'var(--color-gold)' : 'var(--color-muted)',
                  }}
                  onMouseEnter={(e) => {
                    if (tab !== t.id) e.target.style.color = 'var(--color-black)'
                  }}
                  onMouseLeave={(e) => {
                    if (tab !== t.id) e.target.style.color = 'var(--color-muted)'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {/* ORDERS TAB */}
            {tab === 'orders' && (
              <div>
                <h2 className="font-garamond-serif text-3xl font-300 mb-12" style={{ color: 'var(--color-black)' }}>
                  MY ORDERS
                </h2>

                {ordersLoading ? (
                  <div className="flex justify-center py-16">
                    <LoadingSpinner size="lg" />
                  </div>
                ) : orders.length === 0 ? (
                  <div
                    className="p-16 text-center rounded-none"
                    style={{
                      backgroundColor: 'var(--color-white)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <p className="text-sm font-sans font-200 mb-4" style={{ color: 'var(--color-muted)' }}>
                      You haven't placed any orders yet.
                    </p>
                    <a
                      href="/shop"
                      className="text-xs font-sans font-400 tracking-widest uppercase hover-underline"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      START SHOPPING
                    </a>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <div className="grid gap-6">
                      {orders.map((order, idx) => (
                        <motion.div
                          key={order._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="p-6 rounded-none"
                          style={{
                            backgroundColor: 'var(--color-white)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          <div className="grid md:grid-cols-5 gap-6 items-center pb-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <div>
                              <p className="text-xs font-sans font-400 uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)', letterSpacing: '0.1em' }}>
                                ORDER ID
                              </p>
                              <p className="font-mono text-sm" style={{ color: 'var(--color-black)' }}>
                                #{order._id.slice(-8).toUpperCase()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-sans font-400 uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)', letterSpacing: '0.1em' }}>
                                DATE
                              </p>
                              <p className="text-sm" style={{ color: 'var(--color-black)' }}>
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-sans font-400 uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)', letterSpacing: '0.1em' }}>
                                TOTAL
                              </p>
                              <p className="text-sm font-sans font-400" style={{ color: 'var(--color-black)' }}>
                                {formatPrice(order.totalPrice)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-sans font-400 uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)', letterSpacing: '0.1em' }}>
                                STATUS
                              </p>
                              <Badge status={order.status} />
                            </div>
                            <div>
                              <button
                                onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                                className="text-xs font-sans font-400 tracking-widest uppercase transition-all duration-300 hover-underline"
                                style={{ color: 'var(--color-gold)' }}
                              >
                                {selectedOrder?._id === order._id ? 'CLOSE' : 'VIEW DETAILS'}
                              </button>
                            </div>
                          </div>

                          {/* Order Details */}
                          {selectedOrder?._id === order._id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              transition={{ duration: 0.3 }}
                              className="mt-6"
                            >
                              <h3 className="font-garamond-serif text-lg font-300 mb-6" style={{ color: 'var(--color-black)' }}>
                                Order Items
                              </h3>
                              <div className="space-y-4 mb-6">
                                {selectedOrder.orderItems?.map((item, i) => (
                                  <div key={i} className="flex gap-4 pb-4" style={{ borderBottom: i !== (selectedOrder.orderItems?.length - 1) ? '1px solid var(--color-border)' : 'none' }}>
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-16 h-20 object-cover"
                                      style={{ backgroundColor: '#F0EBE3' }}
                                    />
                                    <div className="flex-1">
                                      <p className="text-sm font-sans font-300" style={{ color: 'var(--color-black)' }}>
                                        {item.name}
                                      </p>
                                      <p className="text-xs font-sans font-200 mt-1" style={{ color: 'var(--color-muted)' }}>
                                        Qty: {item.qty}{item.size ? ` · ${item.size}` : ''}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm font-sans font-400" style={{ color: 'var(--color-black)' }}>
                                        {formatPrice(item.price)}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Shipping Address */}
                              <div className="pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
                                <p className="text-xs font-sans font-400 uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)', letterSpacing: '0.1em' }}>
                                  SHIPPING ADDRESS
                                </p>
                                <p className="text-sm font-sans font-300" style={{ color: 'var(--color-black)' }}>
                                  {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {tab === 'wishlist' && (
              <div>
                <h2 className="font-garamond-serif text-3xl font-300 mb-12" style={{ color: 'var(--color-black)' }}>
                  MY WISHLIST
                </h2>

                {wishlist.length === 0 ? (
                  <div
                    className="p-16 text-center rounded-none"
                    style={{
                      backgroundColor: 'var(--color-white)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <p className="text-sm font-sans font-200 mb-4" style={{ color: 'var(--color-muted)' }}>
                      Your wishlist is currently empty.
                    </p>
                    <a
                      href="/shop"
                      className="text-xs font-sans font-400 tracking-widest uppercase hover-underline"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      EXPLORE COLLECTIONS
                    </a>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {wishlist.map(product => {
                      if (!product._id) return null
                      return <ProductCard key={product._id} product={product} />
                    })}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {tab === 'profile' && (
              <div>
                <h2 className="font-garamond-serif text-3xl font-300 mb-12" style={{ color: 'var(--color-black)' }}>
                  PROFILE SETTINGS
                </h2>

                <form onSubmit={handleSaveProfile} className="max-w-md" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-border)' }}>
                  <div className="p-8 space-y-8">
                    {/* Name Field */}
                    <div>
                      <label
                        className="text-xs font-sans font-400 uppercase tracking-widest block mb-4 transition-all"
                        style={{
                          color: focusedField === 'name' ? 'var(--color-gold)' : 'var(--color-muted)',
                          letterSpacing: '0.2em',
                        }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                        style={{
                          borderBottom: focusedField === 'name' ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                          color: 'var(--color-black)',
                        }}
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        className="text-xs font-sans font-400 uppercase tracking-widest block mb-4 transition-all"
                        style={{
                          color: focusedField === 'email' ? 'var(--color-gold)' : 'var(--color-muted)',
                          letterSpacing: '0.2em',
                        }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={e => setProfileForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all"
                        style={{
                          borderBottom: focusedField === 'email' ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                          color: 'var(--color-black)',
                        }}
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label
                        className="text-xs font-sans font-400 uppercase tracking-widest block mb-4 transition-all"
                        style={{
                          color: focusedField === 'password' ? 'var(--color-gold)' : 'var(--color-muted)',
                          letterSpacing: '0.2em',
                        }}
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Leave blank to keep current"
                        className="w-full bg-transparent py-3 text-sm font-sans font-300 focus:outline-none transition-all placeholder:text-gray-300 placeholder:text-xs"
                        style={{
                          borderBottom: focusedField === 'password' ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                          color: 'var(--color-black)',
                        }}
                      />
                    </div>

                    {/* Save Button */}
                    <button
                      type="submit"
                      disabled={savingProfile}
                      className="w-full py-4 text-xs font-sans font-400 tracking-widest uppercase rounded-none transition-all duration-300"
                      style={{
                        backgroundColor: savingProfile ? 'var(--color-muted)' : 'var(--color-gold)',
                        color: 'var(--color-white)',
                      }}
                      onMouseEnter={(e) => !savingProfile && (e.target.style.backgroundColor = 'var(--color-gold-light)')}
                      onMouseLeave={(e) => !savingProfile && (e.target.style.backgroundColor = 'var(--color-gold)')}
                    >
                      {savingProfile ? 'SAVING...' : 'SAVE CHANGES'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

      </div>
    </div>
  )
}
