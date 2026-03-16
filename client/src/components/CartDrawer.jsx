import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore'

export default function CartDrawer() {
  const { items, isOpen, setOpen, updateItem, removeItem, total } = useCartStore()
  const cartTotal = total()
  const shipping = cartTotal > 4999 ? 0 : 200

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.4)',
              zIndex:40
            }}
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            style={{
              position:'fixed', right:0, top:0, bottom:0,
              width:'100%', maxWidth:'400px',
              backgroundColor:'#FDFCFA', zIndex:50,
              display:'flex', flexDirection:'column',
              boxShadow:'0 10px 40px rgba(0,0,0,0.1)'
            }}
          >
            {/* Header */}
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'20px', borderBottom:'1px solid #E8E0D0'
            }}>
              <h2 style={{
                fontFamily:"'Cormorant Garamond', serif",
                fontSize:'20px', fontWeight:400,
                color:'#0A0A0A'
              }}>
                Your Cart ({items.length})
              </h2>
              <button onClick={() => setOpen(false)} style={{
                background:'none', border:'none', cursor:'pointer',
                padding:'4px', color:'#B8963E', transition:'color 200ms'
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#D4AF6A'}
                onMouseLeave={e => e.currentTarget.style.color = '#B8963E'}
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Items */}
            <div style={{
              flex:1, overflowY:'auto', padding:'16px',
              display:'flex', flexDirection:'column'
            }}>
              {items.length === 0 ? (
                <div style={{
                  display:'flex', flexDirection:'column', alignItems:'center',
                  justifyContent:'center', height:'100%', gap:'16px', textAlign:'center'
                }}>
                  <FiShoppingBag size={48} style={{color:'#D4D4D8', opacity:0.5}} />
                  <p style={{
                    fontFamily:"'Jost', sans-serif",
                    fontSize:'14px', color:'#6B6560', fontWeight:200
                  }}>
                    Your cart is empty
                  </p>
                  <Link
                    to="/shop"
                    onClick={() => setOpen(false)}
                    style={{
                      fontFamily:"'Jost', sans-serif",
                      color:'#B8963E', fontWeight:500, fontSize:'12px',
                      letterSpacing:'0.1em', textDecoration:'none',
                      transition:'color 200ms'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#D4AF6A'}
                    onMouseLeave={e => e.currentTarget.style.color = '#B8963E'}
                  >
                    Continue Shopping →
                  </Link>
                </div>
              ) : (
                <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                  {items.map((item) => {
                    const product = item.product || {}
                    const imgUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200'
                    const price = product.discountPrice || product.price || item.price || 0
                    return (
                      <div key={item._id} style={{
                        display:'flex', gap:'12px', paddingBottom:'12px',
                        borderBottom:'1px solid #E8E0D0'
                      }}>
                        <img
                          src={imgUrl}
                          alt={product.name || item.name}
                          style={{
                            width:'80px', height:'96px', objectFit:'cover',
                            backgroundColor:'#F5F0E8', flexShrink:0
                          }}
                        />
                        <div style={{flex:1, minWidth:0}}>
                          <p style={{
                            fontFamily:"'Cormorant Garamond', serif",
                            fontSize:'14px', fontWeight:400,
                            color:'#0A0A0A', overflow:'hidden',
                            display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical'
                          }}>
                            {product.name || item.name}
                          </p>
                          {item.size && (
                            <p style={{
                              fontFamily:"'Jost', sans-serif",
                              fontSize:'11px', color:'#6B6560',
                              marginTop:'4px', fontWeight:200
                            }}>
                              Size: {item.size}
                            </p>
                          )}
                          {item.color && (
                            <p style={{
                              fontFamily:"'Jost', sans-serif",
                              fontSize:'11px', color:'#6B6560', fontWeight:200
                            }}>
                              Color: {item.color}
                            </p>
                          )}
                          <div style={{
                            display:'flex', alignItems:'center', justifyContent:'space-between',
                            marginTop:'8px'
                          }}>
                            <div style={{
                              display:'flex', alignItems:'center',
                              border:'1px solid #E8E0D0'
                            }}>
                              <button
                                onClick={() => item.qty > 1 ? updateItem(item._id, item.qty - 1) : removeItem(item._id)}
                                style={{
                                  width:'28px', height:'28px', display:'flex',
                                  alignItems:'center', justifyContent:'center',
                                  background:'none', border:'none', cursor:'pointer',
                                  fontFamily:"'Jost', sans-serif", fontSize:'12px',
                                  color:'#0A0A0A', transition:'background 200ms'
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5F0E8'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                              >−</button>
                              <span style={{
                                width:'32px', textAlign:'center',
                                fontFamily:"'Jost', sans-serif", fontSize:'12px',
                                color:'#0A0A0A'
                              }}>
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateItem(item._id, item.qty + 1)}
                                style={{
                                  width:'28px', height:'28px', display:'flex',
                                  alignItems:'center', justifyContent:'center',
                                  background:'none', border:'none', cursor:'pointer',
                                  fontFamily:"'Jost', sans-serif", fontSize:'12px',
                                  color:'#0A0A0A', transition:'background 200ms'
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5F0E8'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                              >+</button>
                            </div>
                            <span style={{
                              fontFamily:"'Jost', sans-serif",
                              fontSize:'12px', fontWeight:500, color:'#0A0A0A'
                            }}>
                              ₹{(price * item.qty).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          style={{
                            background:'none', border:'none', cursor:'pointer',
                            color:'#C9B0A3', transition:'color 200ms',
                            alignSelf:'flex-start', marginTop:'4px'
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = '#E57373'}
                          onMouseLeave={e => e.currentTarget.style.color = '#C9B0A3'}
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
              <div style={{
                padding:'16px', borderTop:'1px solid #E8E0D0',
                backgroundColor:'#FDFCFA'
              }}>
                <div style={{
                  display:'flex', justifyContent:'space-between',
                  fontSize:'12px', marginBottom:'8px',
                  fontFamily:"'Jost', sans-serif"
                }}>
                  <span style={{color:'#6B6560'}}>Subtotal</span>
                  <span style={{color:'#0A0A0A', fontWeight:400}}>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{
                  display:'flex', justifyContent:'space-between',
                  fontSize:'12px', marginBottom:'16px',
                  fontFamily:"'Jost', sans-serif"
                }}>
                  <span style={{color:'#6B6560'}}>Shipping</span>
                  <span style={{color:'#0A0A0A', fontWeight:400}}>
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                <div style={{
                  display:'flex', justifyContent:'space-between',
                  fontWeight:500, marginBottom:'16px',
                  fontSize:'14px', fontFamily:"'Jost', sans-serif"
                }}>
                  <span>Total</span>
                  <span>₹{(cartTotal + shipping).toLocaleString('en-IN')}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setOpen(false)}
                  className="btn-gold"
                  style={{
                    display:'block', width:'100%', textAlign:'center',
                    padding:'12px', fontFamily:"'Jost', sans-serif",
                    fontSize:'12px', letterSpacing:'0.15em', textDecoration:'none'
                  }}
                >
                  CHECKOUT
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
