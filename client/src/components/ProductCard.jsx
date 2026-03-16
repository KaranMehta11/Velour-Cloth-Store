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
    <Link to={`/product/${product._id}`} className="group block">
      {/* Image container */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '3 / 4', backgroundColor: '#F0EBE3' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Main image */}
        <img
          src={mainImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${hovered ? 'opacity-0' : 'opacity-100'}`}
        />
        {/* Hover image */}
        <img
          src={hoverImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Wishlist button - appears on hover */}
        <motion.button
          onClick={handleWishlist}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-luxury-white flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ color: liked ? '#E63946' : 'var(--color-muted)' }}
        >
          <FiHeart size={18} fill={liked ? 'currentColor' : 'none'} strokeWidth={1.5} />
        </motion.button>

        {/* Add to cart button slides up from bottom on hover */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: hovered ? 0 : '100%' }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-4"
        >
          <button
            onClick={handleAddToCart}
            className="w-full text-luxury-white text-xs font-400 tracking-widest uppercase py-3 transition-all duration-300"
            style={{ backgroundColor: 'var(--color-gold)' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-gold-light)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-gold)'}
          >
            ADD TO CART
          </button>
        </motion.div>
      </div>

      {/* Product info */}
      <div className="pt-4 pb-2">
        <p className="text-xs font-sans font-400 tracking-widest uppercase mb-2" style={{ color: 'var(--color-gold)', letterSpacing: '0.2em' }}>
          {product.category}
        </p>
        <h3 className="font-garamond-serif text-lg font-400 line-clamp-2" style={{ color: 'var(--color-black)' }}>
          {product.name}
        </h3>
        <div className="flex items-center gap-3 mt-3">
          <span className="font-sans text-sm font-300" style={{ color: product.discountPrice ? 'var(--color-gold)' : 'var(--color-black)' }}>
            {formatPrice(displayPrice)}
          </span>
          {originalPrice && (
            <span className="text-xs line-through" style={{ color: 'var(--color-muted)' }}>
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

