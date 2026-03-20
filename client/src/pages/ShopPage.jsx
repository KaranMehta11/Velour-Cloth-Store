import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiFilter, FiX } from 'react-icons/fi'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'
import useScrollReveal from '../hooks/useScrollReveal'

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

  useScrollReveal()

  const setParam = (key, val) => {
    const params = Object.fromEntries(searchParams)
    if (val === '' || val === null) delete params[key]
    else params[key] = val
    params.page = '1'
    setSearchParams(params)
  }

  const clearFilters = () => setSearchParams({ sort: 'newest' })

  const Filters = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Category */}
      <div>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0A0A0A', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>Category</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat}
              onClick={() => setParam('category', cat === 'All' ? '' : cat)}
              style={{
                textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: category === cat ? 600 : 400,
                color: category === cat ? '#0A0A0A' : 'rgba(0,0,0,0.45)',
                padding: '4px 0', transition: 'color 200ms ease',
              }}
              onMouseEnter={e => e.target.style.color = '#0A0A0A'}
              onMouseLeave={e => e.target.style.color = category === cat ? '#0A0A0A' : 'rgba(0,0,0,0.45)'}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0A0A0A', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>Size</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {SIZES.map(s => (
            <button key={s}
              onClick={() => setParam('size', size === s ? '' : s)}
              style={{
                padding: '8px 14px', borderRadius: '9999px', border: 'none', cursor: 'pointer',
                fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600,
                backgroundColor: size === s ? '#0A0A0A' : '#FFFFFF',
                color: size === s ? 'white' : '#0A0A0A',
                transition: 'all 200ms ease',
              }}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0A0A0A', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>Price Range</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input type="number" min="0" max="50000" value={minPrice}
            onChange={e => setParam('minPrice', e.target.value)}
            style={{ width: '80px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '8px', padding: '8px 10px', fontSize: '12px', fontFamily: "'Inter', sans-serif", backgroundColor: 'white', color: '#0A0A0A', outline: 'none' }}
            placeholder="Min" />
          <span style={{ color: 'rgba(0,0,0,0.3)', fontSize: '12px' }}>–</span>
          <input type="number" min="0" max="100000" value={maxPrice}
            onChange={e => setParam('maxPrice', e.target.value)}
            style={{ width: '80px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '8px', padding: '8px 10px', fontSize: '12px', fontFamily: "'Inter', sans-serif", backgroundColor: 'white', color: '#0A0A0A', outline: 'none' }}
            placeholder="Max" />
        </div>
      </div>

      <button onClick={clearFilters} className="btn-black" style={{ width: '100%', borderRadius: '9999px' }}>
        CLEAR FILTERS
      </button>
    </div>
  )

  return (
    <div style={{ backgroundColor: '#ECEEF0', minHeight: '100vh' }}>
      {/* PAGE HEADER */}
      <div style={{ backgroundColor: '#E4E6E8', padding: '48px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: 'rgba(0,0,0,0.35)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>
          HOME / SHOP
        </p>
        <h1 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(40px,7vw,80px)', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
          THE COLLECTION
        </h1>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 24px 96px' }}>
        <div style={{ display: 'flex', gap: '48px' }}>
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block" style={{ width: '220px', flexShrink: 0 }}>
            <div style={{ position: 'sticky', top: '88px' }}>
              <Filters />
            </div>
          </aside>

          {/* Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Top bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', gap: '16px', flexWrap: 'wrap' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.45)', fontWeight: 400 }}>
                {loading ? 'Loading...' : `${count} product${count !== 1 ? 's' : ''} found`}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button onClick={() => setMobileFilter(true)} className="lg:hidden"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#0A0A0A', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <FiFilter size={14} /> FILTER
                </button>
                <select value={sort} onChange={e => setParam('sort', e.target.value)}
                  style={{ border: '1px solid rgba(0,0,0,0.12)', borderRadius: '9999px', padding: '8px 16px', fontSize: '12px', fontFamily: "'Inter', sans-serif", fontWeight: 600, backgroundColor: 'white', color: '#0A0A0A', cursor: 'pointer', outline: 'none' }}>
                  {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '96px 0' }}><LoadingSpinner /></div>
            ) : products.length === 0 ? (
              <EmptyState title="No products found" desc="Try adjusting your filters" linkTo="/shop" linkLabel="Clear Filters" />
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                  {products.map(product => <ProductCard key={product._id} product={product} />)}
                </div>
                {pages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '48px' }}>
                    {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => setParam('page', String(p))}
                        style={{
                          width: '40px', height: '40px', borderRadius: '50%', border: 'none', cursor: 'pointer',
                          fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600,
                          backgroundColor: page === p ? '#0A0A0A' : 'white',
                          color: page === p ? 'white' : '#0A0A0A',
                          transition: 'all 200ms ease',
                        }}
                      >{p}</button>
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
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 40 }} onClick={() => setMobileFilter(false)} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, borderRadius: '24px 24px 0 0', padding: '32px 24px', maxHeight: '85vh', overflowY: 'auto', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A' }}>Filters</h2>
              <button onClick={() => setMobileFilter(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0A0A0A' }}><FiX size={24} /></button>
            </div>
            <Filters />
          </div>
        </>
      )}
    </div>
  )
}
