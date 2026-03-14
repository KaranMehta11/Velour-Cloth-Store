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
      <div
        className="relative overflow-hidden bg-gray-100"
        style={{ aspectRatio: '3 / 4' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Main image */}
        <img
          src={mainImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovered ? 'opacity-0' : 'opacity-100'}`}
        />
        {/* Hover image */}
        <img
          src={hoverImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            liked ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          <FiHeart size={14} fill={liked ? 'currentColor' : 'none'} />
        </button>

        {/* Sale badge */}
        {product.discountPrice && (
          <div className="absolute top-3 left-3 bg-velour-accent text-white text-xs px-2 py-1 font-medium">
            SALE
          </div>
        )}

        {/* Add to cart overlay */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: hovered ? 0 : '100%' }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-3"
        >
          <button
            onClick={handleAddToCart}
            className="w-full bg-velour-text text-white py-2.5 text-sm font-medium hover:bg-velour-accent transition-colors duration-300"
          >
            Add to Cart
          </button>
        </motion.div>
      </div>

      {/* Product info */}
      <div className="pt-3 pb-1">
        <p className="text-xs text-velour-muted tracking-widest uppercase mb-1">{product.category}</p>
        <h3 className="font-serif text-velour-text font-medium line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className={`font-medium ${product.discountPrice ? 'text-velour-accent' : 'text-velour-text'}`}>
            ${displayPrice}
          </span>
          {originalPrice && (
            <span className="text-velour-muted text-sm line-through">${originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
