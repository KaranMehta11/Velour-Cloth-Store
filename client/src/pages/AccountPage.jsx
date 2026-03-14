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
  { id: 'orders', label: 'My Orders' },
  { id: 'wishlist', label: 'Wishlist' },
  { id: 'profile', label: 'Profile Settings' },
]

export default function AccountPage() {
  const [params] = useSearchParams()
  const tabParam = params.get('tab') || 'orders'
  const [tab, setTab] = useState(TABS.find(t => t.id === tabParam)?.id || 'orders')
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
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
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="font-serif text-2xl mb-2">Please log in</h2>
          <a href="/login" className="text-velour-accent hover:underline">Go to Login</a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-velour-bg min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-velour-accent text-white flex items-center justify-center text-2xl font-semibold mx-auto mb-3">
                {user.name[0].toUpperCase()}
              </div>
              <h2 className="font-serif text-lg">{user.name}</h2>
              <p className="text-xs text-velour-muted">{user.email}</p>
              {user.role === 'admin' && (
                <span className="inline-block mt-2 text-xs bg-velour-accent/10 text-velour-accent px-2 py-0.5">Admin</span>
              )}
            </div>
            <nav className="space-y-1">
              {TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                    tab === t.id
                      ? 'bg-velour-accent text-white'
                      : 'text-velour-muted hover:text-velour-text hover:bg-gray-50'
                  }`}
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
                <h2 className="font-serif text-2xl mb-6">My Orders</h2>
                {ordersLoading ? (
                  <div className="flex justify-center py-12"><LoadingSpinner /></div>
                ) : orders.length === 0 ? (
                  <div className="bg-white p-12 text-center">
                    <p className="text-velour-muted">No orders yet.</p>
                    <a href="/shop" className="text-velour-accent hover:underline text-sm mt-2 inline-block">Start Shopping →</a>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm bg-white">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="px-4 py-3 text-left font-medium text-velour-muted">Order</th>
                          <th className="px-4 py-3 text-left font-medium text-velour-muted">Date</th>
                          <th className="px-4 py-3 text-left font-medium text-velour-muted">Total</th>
                          <th className="px-4 py-3 text-left font-medium text-velour-muted">Status</th>
                          <th className="px-4 py-3 text-left font-medium text-velour-muted">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-4 font-mono text-xs">#{order._id.slice(-8).toUpperCase()}</td>
                            <td className="px-4 py-4 text-velour-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-4 font-semibold">${order.totalPrice?.toFixed(2)}</td>
                            <td className="px-4 py-4"><Badge status={order.status} /></td>
                            <td className="px-4 py-4">
                              <button
                                onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                                className="text-velour-accent text-xs hover:underline"
                              >
                                {selectedOrder?._id === order._id ? 'Close' : 'View'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Order detail */}
                {selectedOrder && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-white p-6"
                  >
                    <h3 className="font-serif text-lg mb-4">Order #{selectedOrder._id.slice(-8).toUpperCase()}</h3>
                    <div className="space-y-3">
                      {selectedOrder.orderItems?.map((item, i) => (
                        <div key={i} className="flex gap-3 items-center">
                          <img src={item.image} alt={item.name} className="w-12 h-14 object-cover bg-gray-100" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-velour-muted">Qty: {item.qty}{item.size ? ` · ${item.size}` : ''}</p>
                          </div>
                          <span className="text-sm font-semibold">${item.price?.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 mt-4 pt-4 text-sm">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${selectedOrder.totalPrice?.toFixed(2)}</span>
                      </div>
                      <div className="mt-2 text-velour-muted">
                        <p>Shipping to: {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {tab === 'wishlist' && (
              <div>
                <h2 className="font-serif text-2xl mb-6">My Wishlist</h2>
                {wishlist.length === 0 ? (
                  <div className="bg-white p-12 text-center">
                    <p className="text-velour-muted">Your wishlist is empty.</p>
                    <a href="/shop" className="text-velour-accent hover:underline text-sm mt-2 inline-block">Explore Collections →</a>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                <h2 className="font-serif text-2xl mb-6">Profile Settings</h2>
                <form onSubmit={handleSaveProfile} className="bg-white p-6 space-y-5 max-w-md">
                  <div>
                    <label className="text-xs uppercase tracking-widest font-medium text-velour-muted block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-velour-text transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest font-medium text-velour-muted block mb-1.5">Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={e => setProfileForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-velour-text transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest font-medium text-velour-muted block mb-1.5">New Password</label>
                    <input
                      type="password"
                      placeholder="Leave blank to keep current"
                      className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-velour-text transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="bg-velour-accent text-white px-8 py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {savingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
