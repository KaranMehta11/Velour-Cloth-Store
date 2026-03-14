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
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-widest mb-3">Category</h3>
        <div className="space-y-2">
          {CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={category === cat}
                onChange={() => setParam('category', cat === 'All' ? '' : cat)}
                className="accent-velour-accent"
              />
              <span className={`text-sm group-hover:text-velour-accent transition-colors ${category === cat ? 'font-medium text-velour-text' : 'text-velour-muted'}`}>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-widest mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map(s => (
            <button
              key={s}
              onClick={() => setParam('size', size === s ? '' : s)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                size === s
                  ? 'bg-velour-text text-white border-velour-text'
                  : 'border-gray-300 text-velour-muted hover:border-velour-text hover:text-velour-text'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-widest mb-3">Price Range</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min="0"
            max="500"
            value={minPrice}
            onChange={e => setParam('minPrice', e.target.value)}
            className="w-20 border border-gray-200 px-2 py-1 text-sm"
            placeholder="Min"
          />
          <span className="text-velour-muted text-sm">–</span>
          <input
            type="number"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={e => setParam('maxPrice', e.target.value)}
            className="w-20 border border-gray-200 px-2 py-1 text-sm"
            placeholder="Max"
          />
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full bg-velour-accent text-white py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Clear Filters
      </button>
    </div>
  )

  return (
    <div className="bg-velour-bg min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs text-velour-muted tracking-widest uppercase mb-1">
            <span>Home</span> / <span>Shop</span> {category !== 'All' && <span>/ {category}</span>}
          </p>
          <h1 className="font-serif text-4xl text-velour-text">
            {category === 'All' ? 'All Collections' : category}
          </h1>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <Filters />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <p className="text-velour-muted text-sm">
                {loading ? 'Loading...' : `${count} product${count !== 1 ? 's' : ''} found`}
              </p>
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm hover:border-velour-text transition-colors"
                >
                  <FiFilter size={14} /> Filter
                </button>
                <select
                  value={sort}
                  onChange={e => setParam('sort', e.target.value)}
                  className="border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-velour-text"
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10">
                  {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                  <div className="flex justify-center gap-2 mt-12">
                    {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                      <button
                        key={p}
                        onClick={() => setParam('page', String(p))}
                        className={`w-9 h-9 text-sm flex items-center justify-center transition-colors ${
                          page === p
                            ? 'bg-velour-text text-white'
                            : 'border border-gray-200 text-velour-muted hover:border-velour-text hover:text-velour-text'
                        }`}
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
      {mobileFilter && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileFilter(false)} />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl">Filters</h2>
              <button onClick={() => setMobileFilter(false)}><FiX size={22} /></button>
            </div>
            <Filters />
          </motion.div>
        </>
      )}
    </div>
  )
}
