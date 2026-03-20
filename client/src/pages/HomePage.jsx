import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight, FiTruck, FiRefreshCw, FiPackage, FiStar, FiUser } from 'react-icons/fi'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import useScrollReveal from '../hooks/useScrollReveal'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useScrollReveal()

  useEffect(() => {
    document.title = 'Velour — Luxury Fashion for the Modern Individual'
    api.get('/products?limit=8')
      .then(res => setProducts(res.data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <main style={{ marginTop: 0 }}>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section style={{
        minHeight: '100vh',
        backgroundColor: '#ECEEF0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* SCROLLING BG TEXT ROW 1 */}
        <div style={{ position: 'absolute', top: '15%', left: 0, right: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <div className="bg-scroll-left">
            {[1, 2].map(i => (
              <span key={i} className="bg-text" style={{ paddingRight: '60px' }}>
                FRESH FITS FOR YOUR WORKOUT &nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* SCROLLING BG TEXT ROW 2 */}
        <div style={{ position: 'absolute', bottom: '15%', left: 0, right: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <div className="bg-scroll-right">
            {[1, 2].map(i => (
              <span key={i} className="bg-text" style={{ paddingRight: '60px' }}>
                NEXT LEVEL WORKOUT STYLE &nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '40px 24px', maxWidth: '900px', margin: '0 auto' }}>

          {/* Announcement pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px',
            background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)',
            borderRadius: '9999px', padding: '8px 20px',
            border: '1px solid rgba(0,0,0,0.06)'
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#B8963E' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: '#0A0A0A' }}>
              FREE SHIPPING ABOVE ₹4,999 · NEW COLLECTION NOW LIVE
            </span>
          </div>

          {/* MASSIVE HEADING */}
          <h1 style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 'clamp(52px, 10vw, 120px)',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: '#0A0A0A',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: '32px'
          }}>
            DRESS THE<br />
            STORY<span style={{ color: '#B8963E', fontStyle: 'italic' }}>.</span>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px', fontWeight: 400,
            color: 'rgba(0,0,0,0.5)',
            maxWidth: '400px', margin: '0 auto 40px',
            lineHeight: 1.6
          }}>
            Curated luxury fashion for the modern individual.
            Timeless pieces, effortless style.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-black" onClick={() => navigate('/shop')}>SHOP NOW</button>
            <button className="btn-white" onClick={() => navigate('/shop')}>EXPLORE ALL</button>
          </div>

          {/* Social proof */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '40px' }}>
            <div style={{ display: 'flex' }}>
              {['https://i.pravatar.cc/32?img=1', 'https://i.pravatar.cc/32?img=2', 'https://i.pravatar.cc/32?img=3'].map((src, i) => (
                <img key={i} src={src} alt="customer"
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #ECEEF0', marginLeft: i > 0 ? '-8px' : '0', objectFit: 'cover' }} />
              ))}
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.5)', fontWeight: 500 }}>
              2,400+ happy customers
            </span>
          </div>
        </div>

        {/* FLOATING HERO CARD — LEFT */}
        <div style={{ position: 'absolute', left: '5%', top: '50%', transform: 'translateY(-50%)', width: 'clamp(180px, 18vw, 260px)', zIndex: 3 }}
          className="card-float hidden lg:block">
          <div className="dark-card" style={{ padding: 0 }}>
            <div style={{ width: '100%', aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=85" alt="collection"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%)' }} />
              <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>VELOUR</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>SS 2024</span>
              </div>
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '16px', fontWeight: 800, color: 'white', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '4px' }}>SILK<br />EVENING<br />GOWN</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>₹12,499</p>
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING HERO CARD — RIGHT */}
        <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', width: 'clamp(160px, 16vw, 240px)', zIndex: 3, animationDelay: '2s' }}
          className="card-float hidden lg:block">
          <div className="dark-card">
            <div style={{ width: '100%', aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=85" alt="men collection"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%)' }} />
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '14px', fontWeight: 800, color: 'white', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '4px' }}>OXFORD<br />SUIT</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>₹18,999</p>
              </div>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: '0', width: '100%', maxWidth: '700px', borderTop: '1px solid rgba(0,0,0,0.08)', marginTop: '48px' }}>
          {[{ num: '200+', label: 'Curated Pieces' }, { num: '48hr', label: 'Express Delivery' }, { num: '30', label: 'Day Returns' }].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', padding: '24px 16px', borderRight: i < 2 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '28px', fontWeight: 900, color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: '4px' }}>{s.num}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ NEW ARRIVALS ══════════════════════ */}
      <section style={{ backgroundColor: '#ECEEF0', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <div className="bg-scroll-left">
            {[1, 2].map(i => (
              <span key={i} className="bg-text" style={{ paddingRight: '80px' }}>NEW ARRIVALS &nbsp;&nbsp;</span>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>NEW ARRIVAL</p>
              <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, color: '#0A0A0A', textTransform: 'uppercase', lineHeight: 0.95 }}>
                FRESH FITS<br />FOR YOUR<span style={{ color: '#B8963E' }}> STYLE</span>
              </h2>
            </div>
            <a href="/shop" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', textDecoration: 'none' }}>
              ALL BRANDS <FiArrowUpRight size={14} />
            </a>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '64px 0' }}><LoadingSpinner /></div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
              {products.map((p, i) => (
                <div key={p._id} className="reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}

          <div className="reveal" style={{ textAlign: 'center', marginTop: '48px' }}>
            <button className="btn-black" onClick={() => navigate('/shop')} style={{ gap: '8px' }}>
              SEE ALL PRODUCTS <FiArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════ COLLECTIONS ══════════════════════ */}
      <section style={{ backgroundColor: '#E4E6E8', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A' }}>
              SHOP BY<br /><span style={{ color: '#B8963E' }}>CATEGORY</span>
            </h2>
            <a href="/shop" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>VIEW ALL →</a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr 1fr', gap: '16px', alignItems: 'end' }}>
            {[
              { title: "MEN'S", count: '124', h: '460px', img: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=85', path: '/shop?category=Men', delay: '0s' },
              { title: "WOMEN'S", count: '186', h: '560px', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85', path: '/shop?category=Women', delay: '0.12s' },
              { title: 'ACCESS.', count: '67', h: '460px', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85', path: '/shop?category=Accessories', delay: '0.24s' }
            ].map(col => (
              <div key={col.title}
                className="dark-card hover-lift reveal group"
                style={{ height: col.h, transitionDelay: col.delay, cursor: 'pointer' }}
                onClick={() => navigate(col.path)}>
                <img src={col.img} alt={col.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 700ms ease', position: 'absolute', inset: 0 }}
                  className="group-hover:[transform:scale(1.05)]" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.7),transparent 60%)' }} />
                <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                  <span className="pill-tag">{col.count} Pieces</span>
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '18px', right: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '22px', fontWeight: 900, color: 'white', textTransform: 'uppercase' }}>{col.title}</p>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <FiArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ EDITORIAL BANNER ══════════════════════ */}
      <section className="reveal" style={{ position: 'relative', width: '100%', height: '460px', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=90" alt="editorial"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(0,0,0,0.65),rgba(0,0,0,0.3))' }} />
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', overflow: 'hidden', pointerEvents: 'none' }}>
          <span className="bg-text" style={{ color: 'rgba(255,255,255,0.04)', fontSize: 'clamp(60px,12vw,160px)' }}>
            LIMITED EDITION COLLECTION
          </span>
        </div>
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <span className="pill-tag" style={{ marginBottom: '20px', color: '#B8963E' }}>LIMITED EDITION</span>
          <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900, color: 'white', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '20px', letterSpacing: '-0.02em' }}>
            THE WINTER<br /><span style={{ fontStyle: 'italic', fontWeight: 700 }}>ATELIER</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontWeight: 400, marginBottom: '36px' }}>
            40 exclusive pieces · Available for 30 days only
          </p>
          <button className="btn-white">SHOP THE EDIT</button>
        </div>
      </section>

      {/* ══════════════════════ STATS / WHY VELOUR ══════════════════════ */}
      <section style={{ backgroundColor: '#0A0A0A', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <span className="bg-text" style={{ color: 'rgba(255,255,255,0.025)', fontSize: 'clamp(80px,18vw,220px)', whiteSpace: 'nowrap' }}>
            VELOUR VELOUR VELOUR
          </span>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', overflow: 'hidden' }}>
            {[
              { icon: <FiTruck size={22} />, num: '200+', label: 'Curated Pieces' },
              { icon: <FiRefreshCw size={22} />, num: '30', label: 'Day Easy Returns' },
              { icon: <FiPackage size={22} />, num: '48hr', label: 'Express Delivery' },
              { icon: <FiStar size={22} />, num: '4.9', label: 'Average Rating' }
            ].map((s, i) => (
              <div key={i} style={{ padding: '40px 32px', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.02)', transition: 'background 300ms ease' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
              >
                <div style={{ color: '#B8963E', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '42px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: '6px' }}>{s.num}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIALS ══════════════════════ */}
      <section style={{ backgroundColor: '#ECEEF0', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A' }}>
              WHAT THEY<br /><span style={{ color: '#B8963E' }}>SAY</span>
            </h2>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.35)', fontWeight: 500 }}>2,400+ Reviews</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '16px' }}>
            {[
              { quote: "The quality is unmatched. Every piece feels like it was made specifically for me. Completely changed how I dress.", name: "Priya S.", city: "Mumbai", rating: 5 },
              { quote: "Never felt so confident. The attention to detail is extraordinary. Worth every single rupee spent on Velour.", name: "Arjun M.", city: "Delhi", rating: 5 },
              { quote: "Finally a brand that understands timeless style. My Velour pieces still look perfect after two years of wearing.", name: "Kavya N.", city: "Bangalore", rating: 5 }
            ].map((t, i) => (
              <div key={i} className="dark-card reveal hover-lift" style={{ padding: '28px', transitionDelay: `${i * 0.12}s` }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '20px' }}>
                  {Array(t.rating).fill(0).map((_, j) => (
                    <FiStar key={j} size={13} style={{ color: '#B8963E', fill: '#B8963E' }} />
                  ))}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', marginBottom: '24px' }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(184,150,62,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FiUser size={14} style={{ color: '#B8963E' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'white', marginBottom: '2px' }}>{t.name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{t.city} · Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ PRESS BAR ══════════════════════ */}
      <section style={{ backgroundColor: '#E4E6E8', padding: '48px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: 'rgba(0,0,0,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '28px' }}>AS FEATURED IN</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {['Vogue', 'GQ', "Harper's Bazaar", 'Elle', 'Hypebeast'].map(b => (
            <span key={b} style={{ fontFamily: "'Barlow', sans-serif", fontSize: '20px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(0,0,0,0.18)', cursor: 'default', letterSpacing: '-0.01em', transition: 'color 300ms ease' }}
              onMouseEnter={e => e.target.style.color = '#0A0A0A'}
              onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,0.18)'}
            >{b}</span>
          ))}
        </div>
      </section>

      {/* ══════════════════════ NEWSLETTER ══════════════════════ */}
      <section style={{ backgroundColor: '#0A0A0A', padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <span className="bg-text" style={{ color: 'rgba(255,255,255,0.02)', fontSize: 'clamp(60px,14vw,180px)' }}>INNER CIRCLE</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '560px', margin: '0 auto' }}>
          <span className="pill-tag reveal" style={{ marginBottom: '24px', display: 'inline-flex', background: 'rgba(184,150,62,0.15)', color: '#B8963E', border: '1px solid rgba(184,150,62,0.2)' }}>
            JOIN THE INNER CIRCLE
          </span>
          <h2 className="reveal" style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(36px,6vw,64px)', fontWeight: 900, color: 'white', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '16px', transitionDelay: '0.1s' }}>
            BE THE FIRST<br />TO KNOW.
          </h2>
          <p className="reveal" style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '40px', lineHeight: 1.6, transitionDelay: '0.2s' }}>
            Exclusive drops, early access and style notes — directly to you.
          </p>
          <div className="reveal" style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden', padding: '4px', transitionDelay: '0.3s' }}>
            <input type="email" placeholder="Your email address"
              value={email} onChange={e => setEmail(e.target.value)}
              style={{ flex: 1, padding: '12px 20px', backgroundColor: 'transparent', border: 'none', color: 'white', fontFamily: "'Inter', sans-serif", fontSize: '13px', outline: 'none' }} />
            <button className="btn-gold" onClick={() => { if (email) { alert('Thank you for subscribing!'); setEmail('') } }}
              style={{ borderRadius: '9999px', padding: '12px 24px', fontSize: '12px' }}>
              SUBSCRIBE
            </button>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '16px', letterSpacing: '0.05em' }}>No spam, unsubscribe anytime.</p>
        </div>
      </section>

    </main>
  )
}
