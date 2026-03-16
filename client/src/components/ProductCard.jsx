import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import useCartStore from '../store/useCartStore'
import useWishlistStore from '../store/useWishlistStore'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addItem } = useCartStore()
  const { toggle, isInWishlist } = useWishlistStore()
  const { user } = useAuthStore()
  const isWishlisted = isInWishlist(product._id)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      toast.error('Please login to add items to cart')
      return
    }
    const size = product.sizes?.[0]
    const color = product.colors?.[0]?.name
    await addItem(product._id, 1, size, color)
    toast.success('Added to cart')
  }

  const handleWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await toggle(product._id)
  }

  return (
    <div className="group cursor-pointer"
         onClick={() => window.location.href = `/product/${product._id}`}>
      
      {/* Image wrapper */}
      <div className="relative overflow-hidden"
           style={{aspectRatio:'3/4', backgroundColor:'#F0EBE3'}}>
        
        {/* Primary image */}
        <img
          src={product.images?.[0]?.url || product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover
                     transition-all duration-600 group-hover:scale-105"
          style={{opacity: product.images?.[1] ? undefined : 1}}
        />
        
        {/* Secondary image fade */}
        {product.images?.[1] && (
          <img
            src={product.images[1].url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover
                       opacity-0 group-hover:opacity-100
                       transition-opacity duration-500"
          />
        )}

        {/* Top badge — SALE */}
        {product.discountPrice && (
          <div style={{
            position:'absolute', top:'12px', left:'12px',
            backgroundColor:'#B8963E', color:'#FDFCFA',
            fontFamily:"'Jost', sans-serif", fontSize:'9px',
            fontWeight:600, letterSpacing:'0.15em',
            padding:'4px 10px', textTransform:'uppercase', zIndex:2
          }}>SALE</div>
        )}

        {/* Wishlist btn */}
        <button
          onClick={e => { e.stopPropagation(); handleWishlist(e) }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center 
                     justify-center opacity-0 group-hover:opacity-100
                     transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor:'rgba(255,255,255,0.9)',
            border:'none', borderRadius:'50%', zIndex:2
          }}>
          <FiHeart size={13}
            style={{color: isWishlisted ? '#B8963E' : '#0A0A0A',
                    fill: isWishlisted ? '#B8963E' : 'none'}}/>
        </button>

        {/* Add to cart — slides up */}
        <button
          onClick={e => { e.stopPropagation(); handleAddToCart(e) }}
          className="btn-gold absolute bottom-0 left-0 right-0 w-full
                     py-4 translate-y-full group-hover:translate-y-0
                     transition-transform duration-400 text-[10px]"
          style={{zIndex:2}}>
          ADD TO CART
        </button>
      </div>

      {/* Product info */}
      <div className="pt-4 pb-2">
        <p style={{
          fontFamily:"'Jost', sans-serif", fontSize:'10px',
          color:'#B8963E', letterSpacing:'0.2em',
          textTransform:'uppercase', marginBottom:'5px'
        }}>{product.category}</p>
        <p style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontSize:'18px', fontWeight:400, marginBottom:'6px',
          color:'#0A0A0A', lineHeight:1.2
        }}>{product.name}</p>
        <div className="flex items-center gap-3">
          <span style={{
            fontFamily:"'Jost', sans-serif",
            fontSize:'14px', fontWeight:300
          }}>
            ₹{(product.discountPrice || product.price)
              ?.toLocaleString('en-IN')}
          </span>
          {product.discountPrice && (
            <span style={{
              fontFamily:"'Jost', sans-serif",
              fontSize:'12px', color:'#6B6560',
              textDecoration:'line-through'
            }}>
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
    </Link>
  )
}

