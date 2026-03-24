import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import api from '../api/axios'

const TRENDING = ['Suits', 'Dresses', 'Accessories', 'Sale']

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const normalizedQuery = useMemo(() => query.trim(), [query])

  useEffect(() => {
    if (!isOpen) return undefined
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return
    if (!normalizedQuery) {
      setResults([])
      setLoading(false)
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await api.get('/products', { params: { search: normalizedQuery, limit: 6 } })
        setResults(res.data.products || [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [normalizedQuery, isOpen])

  const handleResultClick = (id) => {
    onClose()
    navigate(`/product/${id}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(10px)',
            zIndex: 99999,
            padding: '32px',
            overflowY: 'auto',
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                style={{
                  flex: 1,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '20px',
                  border: 'none',
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                  background: 'transparent',
                  outline: 'none',
                  padding: '12px 0',
                }}
              />
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0A0A0A' }}>
                <FiX size={28} />
              </button>
            </div>

            {!normalizedQuery && (
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginBottom: '12px' }}>
                  Trending Searches
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {TRENDING.map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      style={{ border: '1px solid rgba(0,0,0,0.12)', background: 'white', padding: '8px 14px', fontFamily: "'Inter', sans-serif", fontSize: '12px', cursor: 'pointer' }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {normalizedQuery && !loading && results.length === 0 && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(0,0,0,0.55)' }}>
                No products found for '{normalizedQuery}'
              </p>
            )}

            {results.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
                {results.map((p) => (
                  <button
                    key={p._id}
                    onClick={() => handleResultClick(p._id)}
                    style={{ border: '1px solid rgba(0,0,0,0.08)', background: 'white', textAlign: 'left', padding: '10px', cursor: 'pointer' }}
                  >
                    <img src={p.images?.[0]?.url} alt={p.name} style={{ width: '100%', height: '180px', objectFit: 'cover', marginBottom: '8px' }} />
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#0A0A0A', marginBottom: '2px' }}>{p.name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>₹{Math.round(p.discountPrice || p.price).toLocaleString('en-IN')}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
