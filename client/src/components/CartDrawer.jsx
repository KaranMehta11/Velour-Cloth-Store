import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore'

export default function CartDrawer() {
  const { items, isOpen, setOpen, updateItem, removeItem, total } = useCartStore()
  const cartTotal = total()
  const shipping = cartTotal > 4999 ? 0 : 299

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 40 }}
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: '400px', backgroundColor: '#FFFFFF', zIndex: 50, display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 48px rgba(0,0,0,0.1)' }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '18px', fontWeight: 900, color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Your Bag ({items.length})
              </h2>
              <button onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px', color: '#0A0A0A', transition: 'color 200ms' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(0,0,0,0.45)'}
                onMouseLeave={e => e.currentTarget.style.color = '#0A0A0A'}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column' }}>
              {items.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '16px', textAlign: 'center' }}>
                  <FiShoppingBag size={48} style={{ color: 'rgba(0,0,0,0.15)' }} />
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(0,0,0,0.4)' }}>Your bag is empty</p>
                  <Link to="/shop" onClick={() => setOpen(false)}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#B8963E', textDecoration: 'none' }}>
                    Continue Shopping →
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {items.map(item => {
                    const product = item.product || {}
                    const imgUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200'
                    const price = product.discountPrice || product.price || item.price || 0
                    return (
                      <div key={item._id} style={{ display: 'flex', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                        <div className="dark-card" style={{ width: '80px', height: '96px', flexShrink: 0, borderRadius: '12px' }}>
                          <img src={imgUrl} alt={product.name || item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#0A0A0A', lineHeight: 1.3, marginBottom: '4px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {product.name || item.name}
                          </p>
                          {item.size && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(0,0,0,0.4)', marginBottom: '8px' }}>Size: {item.size}{item.color ? ` · ${item.color}` : ''}</p>}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '9999px', overflow: 'hidden' }}>
                              <button onClick={() => item.qty > 1 ? updateItem(item._id, item.qty - 1) : removeItem(item._id)}
                                style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#0A0A0A' }}>−</button>
                              <span style={{ width: '24px', textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#0A0A0A' }}>{item.qty}</span>
                              <button onClick={() => updateItem(item._id, item.qty + 1)}
                                style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#0A0A0A' }}>+</button>
                            </div>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>₹{(price * item.qty).toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                        <button onClick={() => removeItem(item._id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.25)', transition: 'color 200ms', alignSelf: 'flex-start', padding: '2px' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#0A0A0A'}
                          onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.25)'}
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(0,0,0,0.06)', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.45)' }}>Subtotal</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: '#0A0A0A' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.45)' }}>Shipping</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: shipping === 0 ? '#B8963E' : '#0A0A0A' }}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A' }}>TOTAL</span>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: '18px', fontWeight: 900, color: '#0A0A0A' }}>₹{(cartTotal + shipping).toLocaleString('en-IN')}</span>
                </div>
                <Link to="/checkout" onClick={() => setOpen(false)} className="btn-black"
                  style={{ display: 'block', width: '100%', textAlign: 'center', textDecoration: 'none' }}>
                  CHECKOUT
                </Link>
                <button onClick={() => setOpen(false)}
                  style={{ display: 'block', width: '100%', textAlign: 'center', marginTop: '8px', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
