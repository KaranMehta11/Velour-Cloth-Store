import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import api from '../api/axios'
import useCartStore from '../store/useCartStore'
import useWishlistStore from '../store/useWishlistStore'
import useAuthStore from '../store/useAuthStore'
import ReviewStars from '../components/ReviewStars'
import SizeSelector from '../components/SizeSelector'
import ColorSelector from '../components/ColorSelector'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const formatPrice = (price) => {
  if (!price) return '₹0'
  return '₹' + Math.round(price * 83).toLocaleString('en-IN')
}

const AccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b" style={{ borderColor: 'var(--color-border)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-sm font-400 text-left font-sans"
        style={{ color: 'var(--color-black)' }}
      >
        {title}
        {open ? <FiChevronUp size={16} strokeWidth={1.5} /> : <FiChevronDown size={16} strokeWidth={1.5} />}
      </button>
      {open && <div className="pb-4 text-sm font-sans font-200 leading-relaxed" style={{ color: 'var(--color-muted)' }}>{children}</div>}
    </div>
  )
}

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [mainImage, setMainImage] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [qty, setQty] = useState(1)
  const [reviewTab, setReviewTab] = useState(false)
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [submittingReview, setSubmittingReview] = useState(false)

  const { addItem } = useCartStore()
  const { toggle, isInWishlist } = useWishlistStore()
  const { user } = useAuthStore()
  const liked = product ? isInWishlist(product._id) : false

  useEffect(() => {
    setLoading(true)
    api.get(`/products/${id}`)
      .then(res => {
        const p = res.data.product
        setProduct(p)
        setMainImage(p.images?.[0]?.url)
        setSelectedSize(p.sizes?.[0] || '')
        setSelectedColor(p.colors?.[0]?.name || '')
        document.title = `${p.name} — Velour`
        return api.get('/products', { params: { category: p.category, limit: 4 } })
      })
      .then(res => setRelated(res.data.products.filter(p => p._id !== id)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = async () => {
    if (!user) { toast.error('Please login to add to cart'); return }
    if (!selectedSize) { toast.error('Please select a size'); return }
    await addItem(product._id, qty, selectedSize, selectedColor)
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!reviewForm.comment) { toast.error('Please write a comment'); return }
    setSubmittingReview(true)
    try {
      await api.post(`/products/${id}/review`, reviewForm)
      toast.success('Review submitted!')
      setReviewForm({ rating: 5, comment: '' })
      const res = await api.get(`/products/${id}`)
      setProduct(res.data.product)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review')
    } finally {
      setSubmittingReview(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-20" style={{ backgroundColor: 'var(--color-cream)' }}>
      <LoadingSpinner size="lg" />
    </div>
  )

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center pt-20" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="text-center">
        <h2 className="font-garamond-serif text-2xl mb-2" style={{ color: 'var(--color-black)' }}>Product not found</h2>
        <Link to="/shop" className="text-xs font-sans font-400 tracking-widest uppercase hover-underline" style={{ color: 'var(--color-gold)' }}>Back to Shop</Link>
      </div>
    </div>
  )

  const displayPrice = product.discountPrice || product.price
  const totalPrice = formatPrice(displayPrice * qty)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 pb-20"
      style={{ backgroundColor: 'var(--color-cream)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb */}
        <p className="text-xs font-sans font-200 tracking-widest mb-12" style={{ color: 'var(--color-muted)' }}>
          <Link to="/" className="hover:text-luxury-gold transition-colors" style={{ color: 'var(--color-muted)' }}>HOME</Link> /
          <Link to={`/shop?category=${product.category}`} className="hover:text-luxury-gold transition-colors" style={{ color: 'var(--color-muted)' }}> {product.category.toUpperCase()}</Link> /
          <span style={{ color: 'var(--color-black)' }}> {product.name}</span>
        </p>

        {/* Product detail grid */}
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          {/* Images */}
          <div>
            <div className="overflow-hidden mb-4" style={{ aspectRatio: '3/4', backgroundColor: '#F0EBE3' }}>
              <img
                src={mainImage || product.images?.[0]?.url}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img.url)}
                  className={`flex-shrink-0 w-20 h-24 overflow-hidden border-2 transition-all`}
                  style={{
                    borderColor: mainImage === img.url ? 'var(--color-gold)' : 'var(--color-border)',
                    opacity: mainImage === img.url ? 1 : 0.6,
                  }}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-10px font-400 tracking-0.25em uppercase mb-4" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gold)', letterSpacing: '0.25em' }}>
              {product.category}
            </p>
            <h1 className="font-garamond-serif font-300 mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 5vw, 42px)', color: 'var(--color-black)' }}>
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <ReviewStars rating={product.rating} showCount count={product.numReviews} />
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ backgroundColor: 'var(--color-border)' }} />

            {/* Price */}
            <div className="mb-6">
              <span className="font-sans text-lg font-light" style={{ fontFamily: 'var(--font-body)', color: product.discountPrice ? 'var(--color-gold)' : 'var(--color-black)' }}>
                {formatPrice(displayPrice)}
              </span>
              {product.discountPrice && (
                <span className="text-sm line-through ml-3 font-san font-200" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}>
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <p className="text-sm font-light leading-relaxed mb-8" style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', color: 'var(--color-muted)' }}>
              {product.description?.slice(0, 300)}
            </p>

            {/* Divider */}
            <div className="h-px mb-8" style={{ backgroundColor: 'var(--color-border)' }} />

            {/* Color */}
            {product.colors?.length > 0 && (
              <div className="mb-8">
                <p className="text-xs font-sans font-400 tracking-widest uppercase mb-3" style={{ color: 'var(--color-black)', letterSpacing: '0.2em' }}>Color</p>
                <ColorSelector colors={product.colors} selected={selectedColor} onSelect={setSelectedColor} />
              </div>
            )}

            {/* Size */}
            {product.sizes?.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-sans font-400 tracking-widest uppercase" style={{ color: 'var(--color-black)', letterSpacing: '0.2em' }}>Size</p>
                  <button className="text-xs font-sans font-200" style={{ color: 'var(--color-gold)' }}>SIZE GUIDE</button>
                </div>
                <SizeSelector sizes={product.sizes} selected={selectedSize} onSelect={setSelectedSize} />
              </div>
            )}

            {/* Qty */}
            <div className="mb-8">
              <p className="text-xs font-sans font-400 tracking-widest uppercase mb-3" style={{ color: 'var(--color-black)', letterSpacing: '0.2em' }}>Quantity</p>
              <div className="flex items-center border rounded-none w-fit" style={{ borderColor: 'var(--color-border)' }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center transition-colors font-200"
                  style={{ color: 'var(--color-black)', borderRight: '1px solid var(--color-border)' }}
                >−</button>
                <span className="w-16 text-center text-sm font-sans font-300" style={{ color: 'var(--color-black)' }}>{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-12 h-12 flex items-center justify-center transition-colors font-200"
                  style={{ color: 'var(--color-black)', borderLeft: '1px solid var(--color-border)' }}
                >+</button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 mb-12">
              <button
                onClick={handleAddToCart}
                className="btn-gold w-full py-5"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                ADD TO CART — {totalPrice}
              </button>
              <button
                onClick={() => toggle(product._id)}
                className="btn-outline w-full py-4 flex items-center justify-center gap-2"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <FiHeart fill={liked ? 'currentColor' : 'none'} size={16} strokeWidth={1.5} />
                {liked ? 'IN WISHLIST' : 'ADD TO WISHLIST'}
              </button>
            </div>

            {/* Accordion */}
            <AccordionItem title="Full Description">
              <p>{product.description}</p>
            </AccordionItem>
            <AccordionItem title="Material & Care">
              <p>Our garments are crafted from premium materials. For care instructions, follow the label or dry clean only for wool and silk pieces. Machine wash cold with like colors for cotton garments.</p>
            </AccordionItem>
            <AccordionItem title="Shipping & Returns">
              <p>Standard 3-5 business day shipping. Free on orders above ₹4,999. Easy 30-day returns on all unworn, tagged items.</p>
            </AccordionItem>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-24">
          <h2 className="font-garamond-serif text-3xl font-300 mb-12" style={{ color: 'var(--color-black)' }}>
            Reviews ({product.numReviews})
          </h2>

          {/* Review list */}
          {product.reviews?.length === 0 && (
            <p className="text-sm font-sans font-200" style={{ color: 'var(--color-muted)' }}>No reviews yet. Be the first to review this product.</p>
          )}
          <div className="space-y-8 mb-16">
            {product.reviews?.map(r => (
              <div key={r._id} className="border-b" style={{ borderColor: 'var(--color-border)', paddingBottom: '32px' }}>
                <div className="flex items-center gap-3 mb-2">
                  <ReviewStars rating={r.rating} size={12} />
                  <span className="font-sans font-400 text-sm" style={{ color: 'var(--color-black)' }}>{r.name}</span>
                  <span className="text-xs font-sans font-200" style={{ color: 'var(--color-muted)' }}>{new Date(r.date).toLocaleDateString()}</span>
                </div>
                <p className="text-sm font-sans font-200" style={{ color: 'var(--color-muted)' }}>{r.comment}</p>
              </div>
            ))}
          </div>

          {/* Add review form */}
          {user && (
            <div className="max-w-2xl border-t" style={{ borderColor: 'var(--color-border)', paddingTop: '32px' }}>
              <h3 className="font-garamond-serif text-2xl font-300 mb-6" style={{ color: 'var(--color-black)' }}>Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div>
                  <label className="text-xs font-sans font-400 tracking-widest uppercase block mb-2" style={{ color: 'var(--color-black)', letterSpacing: '0.2em' }}>Rating</label>
                  <select
                    value={reviewForm.rating}
                    onChange={e => setReviewForm(f => ({ ...f, rating: Number(e.target.value) }))}
                    className="border px-4 py-2 text-sm w-full rounded-none font-sans"
                    style={{ borderColor: 'var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-black)' }}
                  >
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-sans font-400 tracking-widest uppercase block mb-2" style={{ color: 'var(--color-black)', letterSpacing: '0.2em' }}>Comment</label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                    rows={4}
                    className="border px-4 py-3 text-sm w-full rounded-none font-sans focus:outline-none"
                    style={{ borderColor: 'var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-black)' }}
                    placeholder="Share your thoughts on this product..."
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={submittingReview} 
                  className="px-8 py-3.5 text-xs font-sans font-400 tracking-widest uppercase rounded-none transition-all duration-300"
                  style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}
                  onMouseEnter={(e) => e.button.disabled || (e.target.style.backgroundColor = 'var(--color-gold)')}
                  onMouseLeave={(e) => e.button.disabled || (e.target.style.backgroundColor = 'var(--color-black)')}
                >
                  {submittingReview ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-garamond-serif text-3xl font-300 mb-12" style={{ color: 'var(--color-black)' }}>You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-7">
              {related.slice(0, 4).map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

