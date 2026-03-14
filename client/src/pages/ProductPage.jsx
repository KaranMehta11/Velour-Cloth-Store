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

const AccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-sm font-medium text-left"
      >
        {title}
        {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>
      {open && <div className="pb-4 text-sm text-velour-muted leading-relaxed">{children}</div>}
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
        // Fetch related
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
    <div className="min-h-screen flex items-center justify-center pt-20">
      <LoadingSpinner size="lg" />
    </div>
  )

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <h2 className="font-serif text-2xl mb-2">Product not found</h2>
        <Link to="/shop" className="text-velour-accent hover:underline">Back to Shop</Link>
      </div>
    </div>
  )

  const displayPrice = product.discountPrice || product.price

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-velour-bg min-h-screen pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <p className="text-xs text-velour-muted tracking-wide mb-8">
          <Link to="/" className="hover:text-velour-accent">Home</Link> /{' '}
          <Link to={`/shop?category=${product.category}`} className="hover:text-velour-accent">{product.category}</Link> /{' '}
          <span className="text-velour-text">{product.name}</span>
        </p>

        {/* Product detail grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div>
            <div className="overflow-hidden bg-gray-100 mb-3" style={{ aspectRatio: '4/5' }}>
              <img
                src={mainImage || product.images?.[0]?.url}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img.url)}
                  className={`flex-shrink-0 w-16 h-20 overflow-hidden ${mainImage === img.url ? 'ring-2 ring-velour-text' : 'opacity-60 hover:opacity-100'} transition-all`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="text-velour-accent text-xs tracking-widest uppercase">{product.category}</span>
            <h1 className="font-serif text-3xl md:text-4xl mt-2 mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <ReviewStars rating={product.rating} showCount count={product.numReviews} />
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-2xl font-semibold ${product.discountPrice ? 'text-velour-accent' : 'text-velour-text'}`}>
                ${displayPrice}
              </span>
              {product.discountPrice && (
                <span className="text-velour-muted line-through">${product.price}</span>
              )}
            </div>

            <p className="text-velour-muted text-sm leading-relaxed mb-6">{product.description?.slice(0, 250)}</p>

            {/* Color */}
            {product.colors?.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-medium mb-2">Color</p>
                <ColorSelector colors={product.colors} selected={selectedColor} onSelect={setSelectedColor} />
              </div>
            )}

            {/* Size */}
            {product.sizes?.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Size</p>
                  <button className="text-xs text-velour-accent underline">Size Guide</button>
                </div>
                <SizeSelector sizes={product.sizes} selected={selectedSize} onSelect={setSelectedSize} />
              </div>
            )}

            {/* Qty */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Quantity</p>
              <div className="flex items-center border border-gray-200 w-fit">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >-</button>
                <span className="w-12 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >+</button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-velour-accent text-white py-4 font-medium text-sm tracking-wide hover:opacity-90 transition-opacity"
              >
                Add to Cart — ${(displayPrice * qty).toFixed(2)}
              </button>
              <button
                onClick={() => toggle(product._id)}
                className={`w-full border py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                  liked ? 'border-red-300 text-red-500 bg-red-50' : 'border-velour-text text-velour-text hover:bg-gray-50'
                }`}
              >
                <FiHeart fill={liked ? 'currentColor' : 'none'} size={16} />
                {liked ? 'In Wishlist' : 'Add to Wishlist'}
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
              <p>Standard 3-5 business day shipping. Free on orders over $100. Easy 30-day returns on all unworn, tagged items.</p>
            </AccordionItem>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
            <button
              onClick={() => setReviewTab(false)}
              className={`text-sm font-medium pb-4 -mb-4 border-b-2 transition-colors ${!reviewTab ? 'border-velour-text text-velour-text' : 'border-transparent text-velour-muted'}`}
            >Reviews ({product.numReviews})</button>
          </div>

          {/* Review list */}
          {product.reviews?.length === 0 && (
            <p className="text-velour-muted text-sm">No reviews yet. Be the first to review this product.</p>
          )}
          <div className="space-y-6 mb-10">
            {product.reviews?.map(r => (
              <div key={r._id} className="border-b border-gray-100 pb-6">
                <div className="flex items-center gap-2 mb-1">
                  <ReviewStars rating={r.rating} size={12} />
                  <span className="font-medium text-sm">{r.name}</span>
                  <span className="text-xs text-velour-muted">{new Date(r.date).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-velour-muted">{r.comment}</p>
              </div>
            ))}
          </div>

          {/* Add review form */}
          {user && (
            <div className="max-w-lg">
              <h3 className="font-serif text-xl mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Rating</label>
                  <select
                    value={reviewForm.rating}
                    onChange={e => setReviewForm(f => ({ ...f, rating: Number(e.target.value) }))}
                    className="border border-gray-200 px-3 py-2 text-sm w-full"
                  >
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Comment</label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                    rows={4}
                    className="border border-gray-200 px-3 py-2 text-sm w-full focus:outline-none focus:border-velour-text"
                    placeholder="Share your thoughts on this product..."
                  />
                </div>
                <button type="submit" disabled={submittingReview} className="bg-velour-text text-white px-8 py-3 text-sm font-medium hover:bg-velour-accent transition-colors disabled:opacity-60">
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-serif text-3xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
              {related.slice(0, 4).map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
