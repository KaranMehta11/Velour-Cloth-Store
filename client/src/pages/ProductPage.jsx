import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiHeart, FiChevronDown, FiChevronUp, FiStar } from 'react-icons/fi'
import api from '../api/axios'
import useCartStore from '../store/useCartStore'
import useWishlistStore from '../store/useWishlistStore'
import useAuthStore from '../store/useAuthStore'
import ReviewStars from '../components/ReviewStars'
import SizeSelector from '../components/SizeSelector'
import ColorSelector from '../components/ColorSelector'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import useScrollReveal from '../hooks/useScrollReveal'
import toast from 'react-hot-toast'
import useRecentlyViewed from '../hooks/useRecentlyViewed'
import RecentlyViewed from '../components/RecentlyViewed'

const formatPrice = (price) => {
  if (!price) return '₹0'
  return '₹' + Math.round(price).toLocaleString('en-IN')
}

const AccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
      <button onClick={() => setOpen(!open)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '16px 0', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#0A0A0A', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        {title}
        {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>
      {open && <div style={{ paddingBottom: '16px', fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: 1.7, color: 'rgba(0,0,0,0.55)' }}>{children}</div>}
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
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [hoverRating, setHoverRating] = useState(0)
  const [submittingReview, setSubmittingReview] = useState(false)
  const [reviewPosted, setReviewPosted] = useState(false)
  const { addToRecentlyViewed } = useRecentlyViewed()

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
        addToRecentlyViewed(p)
        setSelectedSize(p.sizes?.[0] || '')
        setSelectedColor(p.colors?.[0]?.name || '')
        document.title = `${p.name} — Velour`
        return api.get('/products', { params: { category: p.category, limit: 4 } })
      })
      .then(res => setRelated(res.data.products.filter(p => p._id !== id)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  useScrollReveal()

  const handleAddToCart = async () => {
    if (!user) { toast.error('Please login to add to cart'); return }
    if (!selectedSize) { toast.error('Please select a size'); return }
    await addItem(product._id, qty, selectedSize, selectedColor)
    toast.success('Added to cart!')
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!reviewForm.comment || reviewForm.comment.trim().length < 10) {
      toast.error('Comment must be at least 10 characters')
      return
    }
    setSubmittingReview(true)
    try {
      await api.post(`/products/${id}/review`, reviewForm)
      toast.success('Review posted!')
      setReviewForm({ rating: 5, comment: '' })
      const res = await api.get(`/products/${id}`)
      setProduct(res.data.product)
      setReviewPosted(true)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review')
    } finally {
      setSubmittingReview(false)
    }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECEEF0' }}>
      <LoadingSpinner />
    </div>
  )

  if (!product) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECEEF0' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '28px', fontWeight: 900, color: '#0A0A0A', marginBottom: '12px', textTransform: 'uppercase' }}>Product not found</h2>
        <Link to="/shop" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#B8963E' }}>Back to Shop</Link>
      </div>
    </div>
  )

  const displayPrice = product.discountPrice || product.price
  const alreadyReviewed = !!user && product.reviews?.some(r => (r.user?._id || r.user)?.toString() === user._id?.toString())
  const effectiveRating = hoverRating || reviewForm.rating
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = (product.reviews || []).filter((r) => Math.round(r.rating) === star).length
    const pct = product.numReviews ? (count / product.numReviews) * 100 : 0
    return { star, count, pct }
  })

  return (
    <div style={{ backgroundColor: '#ECEEF0', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Breadcrumb */}
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.4)', marginBottom: '32px' }}>
          <Link to="/" style={{ color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>HOME</Link> /
          <Link to={`/shop?category=${product.category}`} style={{ color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}> {product.category?.toUpperCase()}</Link> /
          <span style={{ color: '#0A0A0A' }}> {product.name}</span>
        </p>

        {/* Product grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '48px', marginBottom: '64px' }}>
          {/* Images */}
          <div>
            <div className="dark-card" style={{ aspectRatio: '3/4', marginBottom: '12px', borderRadius: '16px' }}>
              <img src={mainImage || product.images?.[0]?.url} alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 700ms ease' }}
                className="hover:[transform:scale(1.03)]" />
            </div>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {product.images?.map((img, i) => (
                <button key={i} onClick={() => setMainImage(img.url)}
                  style={{ flexShrink: 0, width: '72px', height: '88px', overflow: 'hidden', borderRadius: '10px', border: `2px solid ${mainImage === img.url ? '#0A0A0A' : 'transparent'}`, opacity: mainImage === img.url ? 1 : 0.6, transition: 'all 300ms ease', cursor: 'pointer' }}>
                  <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#B8963E', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>{product.category}</p>
            <h1 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', lineHeight: 1, marginBottom: '16px' }}>{product.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <ReviewStars rating={product.rating} showCount count={product.numReviews} />
            </div>

            <div style={{ height: '1px', backgroundColor: 'rgba(0,0,0,0.08)', marginBottom: '20px' }} />

            {/* Price */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', fontWeight: 600, color: '#0A0A0A' }}>
                {formatPrice(displayPrice)}
              </span>
              {product.discountPrice && (
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'rgba(0,0,0,0.35)', textDecoration: 'line-through', marginLeft: '10px' }}>
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: 1.7, color: 'rgba(0,0,0,0.55)', marginBottom: '24px' }}>
              {product.description?.slice(0, 280)}
            </p>

            <div style={{ height: '1px', backgroundColor: 'rgba(0,0,0,0.08)', marginBottom: '24px' }} />

            {/* Color */}
            {product.colors?.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', marginBottom: '10px' }}>Color</p>
                <ColorSelector colors={product.colors} selected={selectedColor} onSelect={setSelectedColor} />
              </div>
            )}

            {/* Size */}
            {product.sizes?.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A' }}>Size</p>
                  <button style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#B8963E', background: 'none', border: 'none', cursor: 'pointer' }}>SIZE GUIDE</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)}
                      style={{ padding: '10px 18px', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, backgroundColor: selectedSize === s ? '#0A0A0A' : '#FFFFFF', color: selectedSize === s ? 'white' : '#0A0A0A', transition: 'all 200ms ease' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', marginBottom: '10px' }}>Quantity</p>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '9999px', width: 'fit-content', overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '18px', color: '#0A0A0A' }}>−</button>
                <span style={{ width: '40px', textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: '#0A0A0A' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '18px', color: '#0A0A0A' }}>+</button>
              </div>
            </div>

            {product.stock > 10 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#22c55e', fontWeight: 500 }}>In Stock</span>
              </div>
            )}
            {product.stock <= 10 && product.stock > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f97316' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#f97316', fontWeight: 500 }}>Only {product.stock} left — order soon!</span>
              </div>
            )}
            {product.stock === 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#ef4444', fontWeight: 500 }}>Out of Stock</span>
              </div>
            )}

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              <button onClick={handleAddToCart} disabled={product.stock === 0} className="btn-black" style={{ width: '100%', padding: '18px', fontSize: '14px', opacity: product.stock === 0 ? 0.5 : 1, cursor: product.stock === 0 ? 'not-allowed' : 'pointer' }}>
                ADD TO CART — {formatPrice(displayPrice * qty)}
              </button>
              <button onClick={() => toggle(product._id)} className="btn-white"
                style={{ width: '100%', padding: '16px', border: '1px solid rgba(0,0,0,0.12)' }}>
                <FiHeart size={14} fill={liked ? 'currentColor' : 'none'} style={{ color: liked ? '#B8963E' : undefined }} />
                {liked ? 'IN WISHLIST' : 'ADD TO WISHLIST'}
              </button>
            </div>

            {/* Accordion */}
            <div>
              <AccordionItem title="Full Description">
                <p>{product.description}</p>
              </AccordionItem>
              <AccordionItem title="Material & Care">
                <p>Premium materials, crafted for longevity. Machine wash cold or dry clean for delicate fabrics.</p>
              </AccordionItem>
              <AccordionItem title="Shipping & Returns">
                <p>Standard 3-5 business day shipping. Free on orders above ₹4,999. Easy 30-day returns.</p>
              </AccordionItem>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div style={{ paddingTop: '48px', borderTop: '1px solid rgba(0,0,0,0.08)', marginBottom: '64px' }}>
          <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '32px' }}>
            Reviews ({product.numReviews})
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', marginBottom: '32px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px' }}>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '48px', fontWeight: 900, color: '#0A0A0A', lineHeight: 1 }}>
                {product.rating?.toFixed(1) || '0.0'}
              </p>
              <ReviewStars rating={product.rating || 0} />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.5)', marginTop: '8px' }}>
                {product.numReviews} total reviews
              </p>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {ratingDistribution.map(row => (
                <div key={row.star} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 30px', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#0A0A0A' }}>{row.star}★</span>
                  <div style={{ height: '8px', backgroundColor: '#ECEEF0', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${row.pct}%`, height: '100%', backgroundColor: '#B8963E' }} />
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(0,0,0,0.5)' }}>{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          {product.reviews?.length === 0 && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.4)', marginBottom: '24px' }}>
              Be the first to review this product
            </p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
            {product.reviews?.map(r => (
              <div key={r._id} style={{ padding: '20px', backgroundColor: 'white', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#0A0A0A',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600
                  }}>
                    {(r.name || 'U').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <ReviewStars rating={r.rating} size={12} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{r.name}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(0,0,0,0.35)' }}>
                    {new Date(r.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.55)', lineHeight: 1.6 }}>{r.comment}</p>
              </div>
            ))}
          </div>

          {!user && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.55)', marginBottom: '16px' }}>
              <Link to="/login" style={{ color: '#B8963E', textDecoration: 'none' }}>Login to write a review</Link>
            </p>
          )}

          {user && alreadyReviewed && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.55)', marginBottom: '16px' }}>
              You have already reviewed this product
            </p>
          )}

          {user && !alreadyReviewed && !reviewPosted && (
            <div style={{ maxWidth: '560px', backgroundColor: 'white', borderRadius: '20px', padding: '28px' }}>
              <h3 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '20px' }}>Write a Review</h3>
              <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', display: 'block', marginBottom: '8px' }}>Rating</label>
                  <div style={{ display: 'flex', gap: '8px' }} onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onClick={() => setReviewForm(f => ({ ...f, rating: star }))}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                      >
                        <FiStar
                          size={20}
                          color={star <= effectiveRating ? '#B8963E' : '#D4D4D8'}
                          fill={star <= effectiveRating ? '#B8963E' : 'none'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', display: 'block', marginBottom: '8px' }}>Comment</label>
                  <textarea value={reviewForm.comment} onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                    rows={4} placeholder="Share your thoughts..."
                    style={{ width: '100%', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '12px', padding: '12px 14px', fontFamily: "'Inter', sans-serif", fontSize: '13px', backgroundColor: 'white', color: '#0A0A0A', outline: 'none', resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = '#0A0A0A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.12)'}
                  />
                </div>
                <button type="submit" disabled={submittingReview} className="btn-black" style={{ opacity: submittingReview ? 0.6 : 1 }}>
                  {submittingReview ? 'POSTING...' : 'POST REVIEW'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ paddingTop: '48px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '32px' }}>You May Also Like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '16px' }}>
              {related.slice(0, 4).map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        )}
        <RecentlyViewed />
      </div>
    </div>
  )
}
