import { useNavigate } from 'react-router-dom'
import { FiHeart, FiArrowRight } from 'react-icons/fi'
import useCartStore from '../store/useCartStore'
import useWishlistStore from '../store/useWishlistStore'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addItem } = useCartStore()
  const { toggle, isInWishlist } = useWishlistStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const isWishlisted = isInWishlist(product._id)

  const addToCart = async (e) => {
    e.stopPropagation()
    if (!user) { toast.error('Please login to add items to cart'); return }
    const size = product.sizes?.[0]
    const color = product.colors?.[0]?.name
    await addItem(product._id, 1, size, color)
    toast.success('Added to cart')
  }

  const toggleWishlist = async (id) => {
    await toggle(id)
  }

  return (
    <div
      className="dark-card hover-lift cursor-pointer group"
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ position: 'relative' }}
    >
      {/* IMAGE */}
      <div style={{
        position: 'relative', aspectRatio: '3/4',
        overflow: 'hidden', backgroundColor: '#2A2A2A'
      }}>
        <img
          src={product.images?.[0]?.url || product.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'}
          alt={product.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 600ms ease',
          }}
          className="group-hover:[transform:scale(1.05)]"
        />
        {product.images?.[1] && (
          <img
            src={product.images[1].url}
            alt={product.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              position: 'absolute', inset: 0,
              opacity: 0, transition: 'opacity 500ms ease'
            }}
            className="group-hover:opacity-100"
          />
        )}

        {/* TOP ROW — pill tag + wishlist */}
        <div style={{
          position: 'absolute', top: '12px',
          left: '12px', right: '12px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', zIndex: 2
        }}>
          <span className="pill-tag">{product.category || 'New'}</span>
          <button
            onClick={e => { e.stopPropagation(); toggleWishlist(product._id) }}
            style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              border: 'none', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 300ms ease'
            }}
            className="hover:scale-110"
          >
            <FiHeart size={13}
              style={{
                color: isWishlisted ? '#B8963E' : '#0A0A0A',
                fill: isWishlisted ? '#B8963E' : 'none'
              }} />
          </button>
        </div>

        {product.stock <= 5 && (
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            backgroundColor: '#f97316', color: 'white', fontSize: '9px',
            padding: '3px 8px', borderRadius: 0, fontFamily: "'Inter', sans-serif",
            fontWeight: 700, letterSpacing: '0.03em'
          }}>
            Low Stock
          </span>
        )}

        {/* SALE badge */}
        {product.discountPrice && (
          <div style={{
            position: 'absolute', bottom: '76px', left: '12px',
            background: '#B8963E', color: 'white',
            borderRadius: '9999px', padding: '3px 10px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.05em'
          }}>SALE</div>
        )}
      </div>

      {/* BOTTOM INFO BAR */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        padding: '14px 16px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px', fontWeight: 600,
            color: '#FFFFFF', marginBottom: '2px',
            lineHeight: 1.3
          }}>{product.name}</p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.9)'
            }}>
              ₹{(product.discountPrice || product.price)?.toLocaleString('en-IN')}
            </span>
            {product.discountPrice && (
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px', color: 'rgba(255,255,255,0.35)',
                textDecoration: 'line-through'
              }}>
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={addToCart}
          style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white',
            transition: 'all 300ms ease'
          }}
          className="hover:bg-white hover:!text-black"
        >
          <FiArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
