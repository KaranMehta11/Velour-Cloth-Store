import useRecentlyViewed from '../hooks/useRecentlyViewed'
import ProductCard from './ProductCard'

export default function RecentlyViewed() {
  const { recentlyViewed } = useRecentlyViewed()
  if (!recentlyViewed.length) return null

  return (
    <section style={{ marginTop: '40px' }}>
      <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '16px' }}>
        Recently Viewed
      </h2>
      <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '6px' }}>
        {recentlyViewed.slice(0, 6).map((p) => (
          <div key={p._id} style={{ minWidth: '220px' }}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
