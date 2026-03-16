import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import useCartStore from '../store/useCartStore'
import useWishlistStore from '../store/useWishlistStore'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const { addItem } = useCartStore()
  const { toggle, isInWishlist } = useWishlistStore()
  const { user } = useAuthStore()
  const liked = isInWishlist(product._id)

  const mainImage = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  const hoverImage = product.images?.[1]?.url || mainImage

  const formatPrice = (price) => {
    if (!price) return '₹0'
    return '₹' + price.toLocaleString('en-IN')
  }

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

  const displayPrice = product.discountPrice || product.price
  const originalPrice = product.discountPrice ? product.price : null

  return (
    <Link to={`/product/${product._id}`} className="cursor-pointer group">
      {/* Image */}
      <div
        className="relative overflow-hidden bg-[#F0EBE3]"
        style={{aspectRatio:'3/4'}}
      >
        
        <img src={product.images?.[0]?.url || product.image}
          alt={product.name}
          className="w-full h-full object-cover absolute inset-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
          style={{opacity: product.images?.[1] ? undefined : 1}}/>

        {product.images?.[1] && (
          <img src={product.images[1].url} alt={product.name}
            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
        )}

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); handleWishlist(e) }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-0"
          style={{backgroundColor:'rgba(255,255,255,0.85)'}}
        >
          <FiHeart size={14}
            style={{color: liked ? '#B8963E' : '#0A0A0A'}}
            fill={liked ? 'currentColor' : 'none'}/>
        </button>

        {/* Add to cart */}
        <button
          onClick={e => { e.stopPropagation(); handleAddToCart(e) }}
          className="btn-gold absolute bottom-0 left-0 right-0 w-full py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-350 text-[10px]"
        >
          ADD TO CART
        </button>
      </div>

      {/* Info */}
      <div className="pt-4">
        <p className="text-[10px] text-gold tracking-[0.2em] uppercase mb-1.5" style={{fontFamily:'var(--font-body)', color: '#B8963E'}}>{product.category}</p>
        <p className="text-[17px] font-normal mb-1.5 text-black" style={{fontFamily:'var(--font-heading)'}}>{product.name}</p>
        <div className="flex items-center gap-3">
          <span className="text-sm font-light">
            ₹{(product.discountPrice || product.price)
              ?.toLocaleString('en-IN')}
          </span>
          {product.discountPrice && (
            <span className="text-xs text-muted line-through" style={{color: '#6B6560'}}>
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

