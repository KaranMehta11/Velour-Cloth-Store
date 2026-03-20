import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import api from '../api/axios'
import useAuthStore from '../store/useAuthStore'
import useWishlistStore from '../store/useWishlistStore'
import useScrollReveal from '../hooks/useScrollReveal'
import Badge from '../components/Badge'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const TABS = [
  { id: 'orders', label: 'MY ORDERS' },
  { id: 'wishlist', label: 'WISHLIST' },
  { id: 'profile', label: 'PROFILE' },
]

const formatPrice = (price) => {
  if (!price) return '₹0'
  return '₹' + Math.round(price).toLocaleString('en-IN')
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

  const { user } = useAuthStore()
  const { items: wishlist, fetchWishlist } = useWishlistStore()

  useEffect(() => {
    document.title = 'My Account — Velour'
    if (user) setProfileForm({ name: user.name, email: user.email })
  }, [user])

  useScrollReveal()

  useEffect(() => {
    if (tab === 'orders') {
      setOrdersLoading(true)
      api.get('/orders/my-orders').then(res => setOrders(res.data.orders || [])).catch(() => {}).finally(() => setOrdersLoading(false))
    }
    if (tab === 'wishlist') fetchWishlist()
  }, [tab])

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSavingProfile(true)
    try { toast.success('Profile updated successfully!') } catch { toast.error('Failed to update profile') } finally { setSavingProfile(false) }
  }

  if (!user) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECEEF0' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '12px' }}>Please Sign In</h2>
        <Link to="/login" className="btn-black">GO TO LOGIN</Link>
      </div>
    </div>
  )

  const inputStyle = (field) => ({
    width: '100%', padding: '12px 14px', backgroundColor: 'white',
    border: `1px solid ${focusedField === field ? '#0A0A0A' : 'rgba(0,0,0,0.12)'}`,
    borderRadius: '12px', fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#0A0A0A', outline: 'none',
  })

  return (
    <div style={{ backgroundColor: '#ECEEF0', minHeight: '100vh', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(32px,6vw,64px)', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: '8px' }}>MY ACCOUNT</h1>
        <div style={{ height: '1px', backgroundColor: 'rgba(0,0,0,0.08)', marginBottom: '40px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px' }}>
          {/* Sidebar */}
          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontFamily: "'Barlow', sans-serif", fontSize: '24px', fontWeight: 900, color: 'white' }}>
                {user.name[0].toUpperCase()}
              </div>
              <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '4px' }}>{user.name}</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.4)' }}>{user.email}</p>
              {user.role === 'admin' && (
                <span style={{ display: 'inline-block', marginTop: '10px', padding: '4px 12px', borderRadius: '9999px', backgroundColor: '#B8963E', color: 'white', fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700 }}>ADMIN</span>
              )}
            </div>
            <nav style={{ backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px 20px', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', border: 'none', transition: 'all 200ms ease', backgroundColor: tab === t.id ? '#0A0A0A' : 'transparent', color: tab === t.id ? 'white' : 'rgba(0,0,0,0.55)' }}>
                  {t.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div>
            {/* ORDERS TAB */}
            {tab === 'orders' && (
              <div>
                <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '24px' }}>My Orders</h2>
                {ordersLoading ? <div style={{ display: 'flex', justifyContent: 'center', padding: '64px 0' }}><LoadingSpinner /></div> :
                  orders.length === 0 ? (
                    <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.4)', marginBottom: '16px' }}>No orders yet.</p>
                      <Link to="/shop" className="btn-black">START SHOPPING</Link>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {orders.map(order => (
                        <div key={order._id} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', alignItems: 'center', paddingBottom: '16px', borderBottom: selectedOrder?._id === order._id ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
                            <div>
                              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.4)', marginBottom: '4px' }}>Order ID</p>
                              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>#{order._id.slice(-8).toUpperCase()}</p>
                            </div>
                            <div>
                              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.4)', marginBottom: '4px' }}>Date</p>
                              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#0A0A0A' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.4)', marginBottom: '4px' }}>Total</p>
                              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{formatPrice(order.totalPrice)}</p>
                            </div>
                            <div><Badge status={order.status} /></div>
                            <div>
                              <button onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                                style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#B8963E', background: 'none', border: 'none', cursor: 'pointer' }}>
                                {selectedOrder?._id === order._id ? 'CLOSE' : 'DETAILS'}
                              </button>
                            </div>
                          </div>
                          {selectedOrder?._id === order._id && (
                            <div style={{ paddingTop: '16px' }}>
                              {selectedOrder.orderItems?.map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: i !== selectedOrder.orderItems.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                                  <img src={item.image} alt={item.name} style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#E4E6E8' }} />
                                  <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#0A0A0A' }}>{item.name}</p>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.4)' }}>Qty: {item.qty}{item.size ? ` · ${item.size}` : ''}</p>
                                  </div>
                                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{formatPrice(item.price)}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )
                }
              </div>
            )}

            {/* WISHLIST TAB */}
            {tab === 'wishlist' && (
              <div>
                <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '24px' }}>My Wishlist</h2>
                {wishlist.length === 0 ? (
                  <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.4)', marginBottom: '16px' }}>Your wishlist is empty.</p>
                    <Link to="/shop" className="btn-black">EXPLORE COLLECTIONS</Link>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                    {wishlist.map(product => product._id ? <ProductCard key={product._id} product={product} /> : null)}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {tab === 'profile' && (
              <div>
                <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '24px' }}>Profile Settings</h2>
                <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '32px', maxWidth: '480px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[['name', 'FULL NAME', 'text'], ['email', 'EMAIL', 'email']].map(([key, label, type]) => (
                      <div key={key}>
                        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>{label}</label>
                        <input type={type} value={profileForm[key]} onChange={e => setProfileForm(f => ({ ...f, [key]: e.target.value }))}
                          onFocus={() => setFocusedField(key)} onBlur={() => setFocusedField(null)}
                          style={inputStyle(key)} />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>NEW PASSWORD</label>
                      <input type="password" placeholder="Leave blank to keep current"
                        onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)}
                        style={inputStyle('password')} />
                    </div>
                    <button type="submit" disabled={savingProfile} className="btn-black" style={{ opacity: savingProfile ? 0.6 : 1 }}>
                      {savingProfile ? 'SAVING...' : 'SAVE CHANGES'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
