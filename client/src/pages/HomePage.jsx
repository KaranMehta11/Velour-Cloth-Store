import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'

const testimonials = [
  {
    name: 'Sophia R.',
    quote: 'The quality is beyond anything I have found at this price point. My Velour blazer gets compliments every time I wear it.',
    rating: 5,
  },
  {
    name: 'James T.',
    quote: 'Finally, a brand that gets what modern minimalism looks like. Every piece is perfectly weighted and incredibly versatile.',
    rating: 5,
  },
  {
    name: 'Amara K.',
    quote: 'I ordered the silk midi dress for a work event and I have never felt more elegant. Velour is my new go-to.',
    rating: 5,
  },
]

export default function HomePage() {
  const [featured, setFeatured] = useState([])
  const [bestsellers, setBestsellers] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')

  useEffect(() => {
    document.title = 'Velour — Luxury Fashion for the Modern Individual'
    Promise.all([
      api.get('/products?limit=8'),
      api.get('/products?limit=4'),
    ])
      .then(([featured, bestsellers]) => {
        setFeatured(featured.data.products || [])
        setBestsellers(bestsellers.data.products || [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <main style={{ marginTop: '9rem' }}>
      {/* ══════════════════════════════════════════════════════════════
          SECTION 1: HERO — TWO PANEL SPLIT
          ══════════════════════════════════════════════════════════════ */}
      <section className="w-full h-screen flex">
        {/* LEFT PANEL - 55% */}
        <div
          className="relative overflow-hidden"
          style={{
            width: '55%',
            backgroundImage: "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=90')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.45))'
          }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-16 left-16 right-16"
          >
            <p className="text-white text-[10px] tracking-[0.35em] uppercase mb-5" style={{fontFamily:'var(--font-body)', opacity: 0.8}}>
              SS 2024 COLLECTION
            </p>
            <h1 
              className="text-white font-light leading-none mb-6"
              style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(48px,6vw,78px)' }}
            >
              The Art of<br />Refined<br />Dressing.
            </h1>
            <div className="mb-6" style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.5)' }} />
            <p className="text-white text-[13px] font-extralight tracking-wide" style={{fontFamily:'var(--font-body)', opacity: 0.65}}>
              Where heritage meets contemporary vision
            </p>
          </motion.div>
        </div>

        {/* RIGHT PANEL - 45% */}
        <div className="hidden md:flex flex-col items-center justify-center px-16 text-center" style={{ width: '45%', backgroundColor: '#F5F0E8' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-sm"
          >
            <p 
              className="text-lg leading-relaxed mb-12 italic"
              style={{ fontFamily:'var(--font-italic)', color: '#6B6560', lineHeight: 1.75 }}
            >
              "Each piece in our collection is a conversation between tradition and modernity — crafted for those who appreciate the extraordinary."
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-16 w-full">
              <button
                className="btn-gold w-full"
                onClick={() => {}}
              >
                EXPLORE COLLECTION
              </button>
              <button
                className="btn-outline w-full"
              >
                VIEW LOOKBOOK
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 border-t border-border pt-10 w-full justify-center" style={{ borderColor: '#E8E0D0' }}>
              {[
                {num:'200+', label:'Curated Pieces'},
                {num:'48hr', label:'Express Delivery'},
                {num:'30 Days', label:'Free Returns'}
              ].map(s => (
                <div key={s.num} className="text-center">
                  <p className="text-2xl mb-1" style={{fontFamily:'var(--font-heading)'}}>{ s.num}</p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted" style={{fontFamily:'var(--font-body)', color: '#6B6560'}}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ANNOUNCEMENT STRIP */}
      <div className="h-11 flex items-center overflow-hidden" style={{ backgroundColor: '#B8963E' }}>
        <div className="marquee-track">
          {[1,2].map(i => (
            <span key={i} className="whitespace-nowrap pr-16" style={{
              fontFamily:'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: '#FDFCFA',
              fontWeight: 'normal'
            }}>
              NEW ARRIVALS EVERY FRIDAY &nbsp;✦&nbsp; FREE SHIPPING ABOVE ₹4,999 &nbsp;✦&nbsp; SUSTAINABLE FABRICS &nbsp;✦&nbsp; EXCLUSIVE DROPS &nbsp;✦&nbsp; EASY 30-DAY RETURNS &nbsp;✦&nbsp; HANDCRAFTED IN INDIA &nbsp;✦&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* COLLECTIONS SECTION */}
      <section className="py-28 px-10 mx-auto" style={{ maxWidth: '1400px' }}>
        <div className="flex justify-between items-end mb-14 border-b border-border pb-5" style={{ borderColor: '#E8E0D0' }}>
          <div>
            <p className="text-[10px] text-gold tracking-[0.3em] uppercase mb-4" style={{ color: '#B8963E', fontFamily:'var(--font-body)' }}>SHOP BY CATEGORY</p>
            <h2 className="font-light" style={{
              fontFamily:'var(--font-heading)',
              fontSize:'clamp(36px,4vw,54px)',
              color: '#0A0A0A'
            }}>
              Curated for the<br/>Discerning Eye.
            </h2>
          </div>
          <Link to="/shop" className="gold-underline text-gold text-[12px] tracking-[0.15em]" style={{ color: '#B8963E', fontFamily:'var(--font-body)' }}>
            View All Collections →
          </Link>
        </div>

        <div className="grid gap-5 items-end" style={{gridTemplateColumns:'1fr 1.2fr 1fr'}}>
          {[
            { title:"MEN'S EDIT", count:'124 Pieces', h:'520px',
              img:'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=85' },
            { title:"WOMEN'S EDIT", count:'186 Pieces', h:'640px',
              img:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85' },
            { title:'ACCESSORIES', count:'67 Pieces', h:'520px',
              img:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85' }
          ].map(col => (
            <div key={col.title}
              className="relative overflow-hidden cursor-pointer group"
              style={{height: col.h}}
            >
              <img src={col.img} alt={col.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
              <div className="absolute inset-0 transition-all duration-350" style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)'}}/>
              <div className="absolute bottom-8 left-7">
                <p className="text-white text-xl font-light mb-1" style={{fontFamily:'var(--font-heading)'}}>{col.title}</p>
                <p className="text-white text-[10px] tracking-[0.2em] uppercase" style={{fontFamily:'var(--font-body)', opacity: 0.7}}>{col.count}</p>
              </div>
              <p className="absolute bottom-8 right-7 text-gold-light text-[11px] tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-350" style={{ color: '#D4AF6A', fontFamily:'var(--font-body)' }}>
                EXPLORE →
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="py-24 px-10 mx-auto" style={{ maxWidth: '1400px', backgroundColor: '#F5F0E8' }}>
        <div className="flex justify-between items-baseline mb-12 pb-5" style={{ borderBottom: '1px solid #E8E0D0' }}>
          <h2 className="font-light" style={{
            fontFamily:'var(--font-heading)',
            fontSize:'clamp(32px,4vw,50px)',
            color: '#0A0A0A'
          }}>New Arrivals</h2>
          <Link to="/shop" className="gold-underline text-[11px] text-gold tracking-[0.15em]" style={{ color: '#B8963E', fontFamily:'var(--font-body)' }}>
            VIEW ALL →
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-16"><LoadingSpinner /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
            {featured.slice(0, 8).map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* EDITORIAL BANNER */}
      <section className="relative w-full overflow-hidden flex items-center justify-center" style={{ height:'500px' }}>
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=90"
          alt="Winter Atelier"
          className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0" style={{backgroundColor:'rgba(0,0,0,0.5)'}}/>
        <div className="relative text-center px-5">
          <p className="text-gold-light text-[10px] tracking-[0.35em] uppercase mb-5" style={{ fontFamily:'var(--font-body)', color: '#D4AF6A' }}>LIMITED EDITION</p>
          <h2 className="text-white font-light italic mb-5" style={{
            fontFamily:'var(--font-heading)',
            fontSize:'clamp(40px,6vw,68px)',
            fontStyle: 'italic'
          }}>The Winter Atelier</h2>
          <p className="text-white text-[13px] font-extralight mb-10" style={{fontFamily:'var(--font-body)', opacity: 0.75}}>
            A collection of 40 exclusive pieces, available for 30 days only
          </p>
          <button className="btn-white">SHOP THE EDIT</button>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="py-24 px-10 mx-auto" style={{ maxWidth: '1400px', backgroundColor: '#F5F0E8' }}>
        <div className="flex justify-between items-baseline mb-12 pb-5" style={{ borderBottom: '1px solid #E8E0D0' }}>
          <h2 className="font-light" style={{
            fontFamily:'var(--font-heading)',
            fontSize:'clamp(32px,4vw,50px)',
            color: '#0A0A0A'
          }}>Bestsellers</h2>
          <Link to="/shop" className="gold-underline text-[11px] text-gold tracking-[0.15em]" style={{ color: '#B8963E', fontFamily:'var(--font-body)' }}>
            VIEW ALL →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
          {bestsellers.slice(0, 4).map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* BRAND PHILOSOPHY */}
      <section className="grid" style={{ gridTemplateColumns:'1.4fr 1fr', backgroundColor: '#1C1C1C' }}>
        <div className="py-28 px-20">
          <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-7" style={{ color: '#B8963E', fontFamily:'var(--font-body)' }}>
            OUR PHILOSOPHY
          </p>
          <h2 className="text-off-white font-light leading-tight mb-8" style={{
            fontFamily:'var(--font-heading)',
            fontSize:'clamp(36px,4vw,54px)',
            color: '#FDFCFA'
          }}>
            Crafted with<br/>intention.<br/>Worn with purpose.
          </h2>
          <p className="text-white text-sm leading-[1.9] font-extralight max-w-md mb-12" style={{fontFamily:'var(--font-body)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.9}}>
            At Velour, we believe that true luxury lies not in excess, but in the perfection of the details. Every stitch, every fabric, every silhouette is chosen with purpose.
          </p>
          <div className="flex gap-12 border-t border-white border-opacity-10 pt-8 mb-12" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            {[{num:'Est. 2024',label:'Founded'},{num:'India',label:'Made In'}]
              .map(s => (
              <div key={s.num}>
                <p className="text-off-white text-2xl mb-1" style={{fontFamily:'var(--font-heading)', color: '#FDFCFA'}}>{ s.num}</p>
                <p className="text-muted text-[10px] tracking-[0.2em] uppercase" style={{fontFamily:'var(--font-body)', color: '#6B6560'}}>{ s.label}</p>
              </div>
            ))}
          </div>
          <Link to="/about" className="gold-underline text-gold text-[12px] tracking-[0.2em]" style={{ color: '#B8963E', fontFamily:'var(--font-body)' }}>
            OUR STORY →
          </Link>
        </div>
        <div className="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85"
            alt="Philosophy"
            className="w-full h-full object-cover"/>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 8: TESTIMONIALS
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--color-charcoal)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-garamond-serif italic text-center mb-16"
            style={{ fontSize: '48px', fontWeight: 300, color: '#FDFCFA', fontStyle: 'italic', lineHeight: 1.1 }}
          >
            Voices of Our Community
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Quote mark */}
                <p className="font-garamond-serif text-6xl leading-none mb-4" style={{ color: 'var(--color-gold)', opacity: 0.3 }}>
                  "
                </p>
                {/* Quote */}
                <p 
                  className="font-garamond-italic text-lg leading-relaxed mb-6"
                  style={{ color: '#FDFCFA', fontStyle: 'italic', lineHeight: 1.7 }}
                >
                  {t.quote}
                </p>
                {/* Line */}
                <div className="w-8 h-px mb-6" style={{ backgroundColor: 'var(--color-gold)' }} />
                {/* Name */}
                <p className="text-xs font-sans font-400 tracking-widest uppercase mb-1" style={{ color: '#FDFCFA', letterSpacing: '0.2em' }}>
                  {t.name}
                </p>
                <p className="text-xs font-sans font-200 mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Verified Buyer
                </p>
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} style={{ color: 'var(--color-gold)' }}>★</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 9: FEATURED IN PRESS
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-sans font-200 tracking-widest uppercase text-center mb-10" style={{ color: 'var(--color-muted)', letterSpacing: '0.3em' }}>
            AS FEATURED IN
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            {['Vogue', 'GQ', "Harper's Bazaar", 'Elle', 'Hypebeast'].map(brand => (
              <a key={brand} href="#" className="transition-colors duration-300 text-center" style={{ color: 'var(--color-muted)' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-muted)'}>
                <span className="font-garamond-italic text-2xl font-300" style={{ fontStyle: 'italic', display: 'block' }}>
                  {brand}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 10: NEWSLETTER
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 flex items-center justify-center" style={{ backgroundColor: 'var(--color-black)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto px-6 text-center"
        >
          <p className="text-xs font-sans font-400 tracking-widest uppercase mb-4" style={{ color: 'var(--color-gold)', letterSpacing: '0.3em' }}>
            JOIN THE INNER CIRCLE
          </p>
          <h2 
            className="font-garamond-serif italic text-white mb-4"
            style={{ fontSize: '52px', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1 }}
          >
            Be the First to Know.
          </h2>
          <p className="text-sm font-sans font-200 mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Exclusive drops, early access, and style notes — directly to you.
          </p>
          
          {/* Newsletter Form */}
          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); setEmail('') }} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto mb-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 bg-transparent border-b text-luxury-white placeholder-gray-500 px-0 py-3 text-sm focus:outline-none transition-colors font-200"
              style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-white)' }}
              onFocus={(e) => e.target.style.borderBottom = '1px solid var(--color-gold)'}
              onBlur={(e) => e.target.style.borderBottom = '1px solid var(--color-border)'}
            />
            <button 
              type="submit" 
              className="px-6 py-3 text-xs font-sans font-400 tracking-widest uppercase transition-all duration-300 whitespace-nowrap"
              style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-white)' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-gold-light)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-gold)'}
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="text-xs font-sans font-200" style={{ color: 'rgba(255,255,255,0.4)' }}>
            We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>
      </section>
    </main>
  )
}

