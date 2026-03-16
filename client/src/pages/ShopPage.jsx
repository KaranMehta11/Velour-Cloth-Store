import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiFilter, FiX } from 'react-icons/fi'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'

const CATEGORIES = ['All', 'Men', 'Women', 'Accessories']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const SORTS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Best Selling', value: 'best_selling' },
]

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  const [pages, setPages] = useState(1)
  const [mobileFilter, setMobileFilter] = useState(false)

  const category = searchParams.get('category') || 'All'
  const size = searchParams.get('size') || ''
  const sort = searchParams.get('sort') || 'newest'
  const page = parseInt(searchParams.get('page') || '1')
  const minPrice = searchParams.get('minPrice') || '0'
  const maxPrice = searchParams.get('maxPrice') || '500'

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = { page, limit: 12, sort }
      if (category !== 'All') params.category = category
      if (size) params.size = size
      if (minPrice) params.minPrice = minPrice
      if (maxPrice && maxPrice !== '500') params.maxPrice = maxPrice
      const res = await api.get('/products', { params })
      setProducts(res.data.products)
      setCount(res.data.count)
      setPages(res.data.pages)
    } catch {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [category, size, sort, page, minPrice, maxPrice])

  useEffect(() => {
    document.title = 'Shop — Velour'
    fetchProducts()
  }, [fetchProducts])

  const setParam = (key, val) => {
    const params = Object.fromEntries(searchParams)
    if (val === '' || val === null) delete params[key]
    else params[key] = val
    params.page = '1'
    setSearchParams(params)
  }

  const clearFilters = () => setSearchParams({ sort: 'newest' })

  const Filters = () => (
    <div className="space-y-10">
      {/* Category */}
      <div>
        <h3 className="font-sans font-400 text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-gold)', letterSpacing: '0.2em' }}>Category</h3>
        <div className="space-y-3 border-b border-luxury-border pb-6" style={{ borderColor: 'var(--color-border)' }}>
          {CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={category === cat}
                onChange={() => setParam('category', cat === 'All' ? '' : cat)}
                style={{ accentColor: 'var(--color-gold)' }}
              />
              <span className={`text-sm font-sans font-200 transition-colors ${category === cat ? 'font-400' : ''}`} style={{ color: category === cat ? 'var(--color-black)' : 'var(--color-muted)' }}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="font-sans font-400 text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-gold)', letterSpacing: '0.2em' }}>Size</h3>
        <div className="flex flex-wrap gap-3 border-b border-luxury-border pb-6" style={{ borderColor: 'var(--color-border)' }}>
          {SIZES.map(s => (
            <button
              key={s}
              onClick={() => setParam('size', size === s ? '' : s)}
              className={`px-4 py-2 text-xs font-sans font-400 rounded-none border transition-all duration-200 tracking-widest uppercase`}
              style={{
                borderColor: size === s ? 'var(--color-gold)' : 'var(--color-border)',
                backgroundColor: size === s ? 'var(--color-gold)' : 'transparent',
                color: size === s ? 'var(--color-white)' : 'var(--color-gold)',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="font-sans font-400 text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-gold)', letterSpacing: '0.2em' }}>Price Range</h3>
        <div className="flex gap-3 items-center border-b border-luxury-border pb-6" style={{ borderColor: 'var(--color-border)' }}>
          <input
            type="number"
            min="0"
            max="500"
            value={minPrice}
            onChange={e => setParam('minPrice', e.target.value)}
            className="w-24 border px-3 py-2 text-sm rounded-none font-sans font-200"
            placeholder="Min"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-black)' }}
          />
          <span style={{ color: 'var(--color-muted)' }} className="text-sm font-200">–</span>
          <input
            type="number"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={e => setParam('maxPrice', e.target.value)}
            className="w-24 border px-3 py-2 text-sm rounded-none font-sans font-200"
            placeholder="Max"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-black)' }}
          />
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full py-3 text-xs font-sans font-400 tracking-widest uppercase transition-all duration-300 rounded-none"
        style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-white)' }}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-gold-light)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-gold)'}
      >
        CLEAR FILTERS
      </button>
    </div>
  )

  return (
    <div className="pt-20" style={{ backgroundColor: 'var(--color-cream)' }}>
      {/* PAGE HEADER BANNER */}
      <div className="h-48 flex flex-col items-center justify-center mb-16" style={{ backgroundColor: 'var(--color-cream)' }}>
        <p className="text-xs font-sans font-400 tracking-widest uppercase mb-4" style={{ color: 'var(--color-gold)', letterSpacing: '0.3em' }}>
          <span>HOME</span> / <span>SHOP</span>
        </p>
        <h1 className="font-garamond-serif" style={{ fontSize: '64px', fontWeight: 300, color: 'var(--color-black)', textAlign: 'center' }}>
          THE COLLECTION
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <Filters />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-12 gap-4 flex-wrap">
              <p className="text-xs font-sans font-200" style={{ color: 'var(--color-muted)' }}>
                {loading ? 'Loading...' : `${count} product${count !== 1 ? 's' : ''} found`}
              </p>
              <div className="flex items-center gap-6">
                {/* Mobile filter button */}
                <button
                  onClick={() => setMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 text-xs font-sans font-400 tracking-widest uppercase transition-colors"
                  style={{ color: 'var(--color-gold)' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-black)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--color-gold)'}
                >
                  <FiFilter size={16} strokeWidth={1.5} /> FILTER
                </button>
                <select
                  value={sort}
                  onChange={e => setParam('sort', e.target.value)}
                  className="border text-xs font-sans font-200 rounded-none px-4 py-2 bg-transparent focus:outline-none"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-black)' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                >
                  {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center py-24"><LoadingSpinner size="lg" /></div>
            ) : products.length === 0 ? (
              <EmptyState title="No products found" desc="Try adjusting your filters" linkTo="/shop" linkLabel="Clear Filters" />
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                  <div className="flex justify-center gap-3 mt-16">
                    {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                      <button
                        key={p}
                        onClick={() => setParam('page', String(p))}
                        className={`w-10 h-10 text-xs font-sans font-400 flex items-center justify-center rounded-none transition-all duration-300 border`}
                        style={{
                          borderColor: page === p ? 'var(--color-gold)' : 'var(--color-border)',
                          backgroundColor: page === p ? 'var(--color-gold)' : 'transparent',
                          color: page === p ? 'var(--color-white)' : 'var(--color-black)',
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilter && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileFilter(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl p-8 max-h-[85vh] overflow-y-auto"
              style={{ backgroundColor: 'var(--color-cream)' }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-garamond-serif text-2xl font-300" style={{ color: 'var(--color-black)' }}>Filters</h2>
                <button onClick={() => setMobileFilter(false)} style={{ color: 'var(--color-black)' }}>
                  <FiX size={24} strokeWidth={1.5} />
                </button>
              </div>
              <Filters />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

import { AnimatePresence } from 'framer-motion'

