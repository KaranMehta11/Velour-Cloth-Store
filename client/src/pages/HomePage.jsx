import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import useScrollReveal from '../hooks/useScrollReveal'

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const navigate = useNavigate()

  useScrollReveal()

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

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <main style={{ marginTop: '9rem' }}>
      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION — DARK BOLD WITH FLOATING CARDS
          ══════════════════════════════════════════════════════════════ */}
      <section className="hero-bg texture-overlay relative w-full min-h-screen 
                          flex items-center justify-center overflow-hidden">

        {/* Background large faded VELOUR text */}
        <div className="absolute inset-0 flex items-center justify-center 
                        pointer-events-none z-[1]" style={{overflow:'hidden'}}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(120px, 20vw, 280px)',
            fontWeight: 600,
            color: 'rgba(184,150,62,0.04)',
            letterSpacing: '0.2em',
            userSelect: 'none',
            whiteSpace: 'nowrap'
          }}>VELOUR</p>
        </div>

        {/* CENTER CONTENT */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          
          {/* Tag */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div style={{width:'30px', height:'1px', backgroundColor:'#B8963E'}}/>
            <span style={{
              color: '#B8963E',
              fontFamily: "'Jost', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.35em',
              textTransform: 'uppercase'
            }}>NEW COLLECTION SS 2024</span>
            <div style={{width:'30px', height:'1px', backgroundColor:'#B8963E'}}/>
          </div>

          {/* MASSIVE HEADING */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(64px, 11vw, 148px)',
            fontWeight: 500,
            color: '#FDFCFA',
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            marginBottom: '32px'
          }}>
            DRESS<br/>
            <span style={{
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#B8963E'
            }}>THE</span>
            {' '}STORY.
          </h1>

          {/* Subtext */}
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '14px',
            fontWeight: 200,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.08em',
            marginBottom: '48px',
            maxWidth: '420px',
            margin: '0 auto 48px'
          }}>
            Curated luxury fashion for the modern individual.
            Timeless pieces, effortless style.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button className="btn-gold-pill"
              onClick={() => navigate('/shop')}>
              Shop Collection
            </button>
            <button className="btn-white-pill"
              onClick={() => navigate('/shop?category=new')}>
              View Lookbook
            </button>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-12 mt-16"
               style={{borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:'32px'}}>
            {[
              {num:'200+', label:'Curated Pieces'},
              {num:'₹2,499', label:'Starting From'},
              {num:'48hr', label:'Express Delivery'}
            ].map(s => (
              <div key={s.num} className="text-center">
                <p style={{
                  fontFamily:"'Cormorant Garamond', serif",
                  fontSize:'28px', color:'#FDFCFA', marginBottom:'4px'
                }}>{s.num}</p>
                <p style={{
                  fontFamily:"'Jost', sans-serif",
                  fontSize:'10px', color:'rgba(255,255,255,0.35)',
                  letterSpacing:'0.2em', textTransform:'uppercase'
                }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FLOATING CARD — Top Left (product card) */}
        <div className="float-card float-anim absolute hidden lg:block"
             style={{
               '--rot': '-6deg',
               top: '18%', left: '6%',
               width: '180px', padding: '12px',
               transform: `rotate(-6deg) translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
               transition: 'transform 0.1s ease',
               zIndex: 8
             }}>
          <div style={{
            width:'100%', aspectRatio:'3/4',
            borderRadius:'8px', overflow:'hidden', marginBottom:'10px',
            backgroundColor:'#2A2520'
          }}>
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80"
              alt="product"
              style={{width:'100%', height:'100%', objectFit:'cover', opacity:0.85}}
            />
          </div>
          <p style={{
            color:'rgba(255,255,255,0.9)', fontSize:'12px',
            fontFamily:"'Cormorant Garamond', serif"
          }}>Silk Evening Gown</p>
          <p style={{
            color:'#B8963E', fontSize:'11px',
            fontFamily:"'Jost', sans-serif", fontWeight:300
          }}>₹12,499</p>
        </div>

        {/* FLOATING CARD — Top Right (product card) */}
        <div className="float-card float-anim-delay absolute hidden lg:block"
             style={{
               '--rot': '5deg',
               top: '12%', right: '5%',
               width: '160px', padding: '12px',
               transform: `rotate(5deg) translate(${mousePos.x * -0.2}px, ${mousePos.y * 0.2}px)`,
               transition: 'transform 0.1s ease',
               zIndex: 8
             }}>
          <div style={{
            width:'100%', aspectRatio:'3/4',
            borderRadius:'8px', overflow:'hidden', marginBottom:'10px',
            backgroundColor:'#2A2520'
          }}>
            <img
              src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&q=80"
              alt="product"
              style={{width:'100%', height:'100%', objectFit:'cover', opacity:0.85}}
            />
          </div>
          <p style={{
            color:'rgba(255,255,255,0.9)', fontSize:'12px',
            fontFamily:"'Cormorant Garamond', serif"
          }}>Oxford Tailored Suit</p>
          <p style={{
            color:'#B8963E', fontSize:'11px',
            fontFamily:"'Jost', sans-serif", fontWeight:300
          }}>₹18,999</p>
        </div>

        {/* FLOATING CARD — Bottom Left (new arrival badge) */}
        <div className="float-card float-anim-slow absolute hidden lg:block"
             style={{
               bottom: '20%', left: '8%',
               padding: '16px 20px',
               transform: `rotate(-3deg) translate(${mousePos.x * 0.4}px, ${mousePos.y * -0.3}px)`,
               transition: 'transform 0.1s ease',
               zIndex: 8, minWidth:'160px'
             }}>
          <div className="flex items-center gap-3">
            <div style={{
              width:'36px', height:'36px', borderRadius:'50%',
              backgroundColor:'rgba(184,150,62,0.15)',
              display:'flex', alignItems:'center', justifyContent:'center'
            }}>
              <span style={{fontSize:'16px'}}>✨</span>
            </div>
            <div>
              <p style={{
                color:'rgba(255,255,255,0.5)', fontSize:'9px',
                fontFamily:"'Jost', sans-serif", letterSpacing:'0.2em',
                textTransform:'uppercase'
              }}>Just Dropped</p>
              <p style={{
                color:'#FDFCFA', fontSize:'13px',
                fontFamily:"'Cormorant Garamond', serif"
              }}>New Arrivals</p>
            </div>
          </div>
        </div>

        {/* FLOATING CARD — Bottom Right (free shipping) */}
        <div className="float-card float-anim absolute hidden lg:block"
             style={{
               bottom: '22%', right: '7%',
               padding: '14px 18px',
               transform: `rotate(4deg) translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.2}px)`,
               transition: 'transform 0.1s ease',
               zIndex: 8, minWidth:'170px'
             }}>
          <div className="flex items-center gap-3">
            <div style={{
              width:'32px', height:'32px', borderRadius:'50%',
              backgroundColor:'rgba(184,150,62,0.15)',
              display:'flex', alignItems:'center', justifyContent:'center'
            }}>
              <span style={{fontSize:'14px'}}>🚚</span>
            </div>
            <div>
              <p style={{
                color:'#FDFCFA', fontSize:'12px',
                fontFamily:"'Jost', sans-serif", fontWeight:400
              }}>Free Shipping</p>
              <p style={{
                color:'rgba(255,255,255,0.4)', fontSize:'10px',
                fontFamily:"'Jost', sans-serif"
              }}>On orders ₹4,999+</p>
            </div>
          </div>
        </div>

        {/* FLOATING decorative gold star shapes */}
        <div className="absolute hidden lg:block float-anim-slow"
             style={{top:'35%', right:'18%', fontSize:'24px', zIndex:7,
                     transform:`translate(${mousePos.x * -0.1}px, ${mousePos.y * 0.1}px)`}}>
          ✦
        </div>
        <div className="absolute hidden lg:block float-anim"
             style={{bottom:'35%', left:'20%', fontSize:'16px', zIndex:7,
                     color:'rgba(184,150,62,0.5)',
                     transform:`translate(${mousePos.x * 0.15}px, ${mousePos.y * -0.1}px)`}}>
          ✦
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10
                        flex flex-col items-center gap-2">
          <span style={{
            color:'rgba(255,255,255,0.3)', fontSize:'9px',
            fontFamily:"'Jost', sans-serif", letterSpacing:'0.3em',
            textTransform:'uppercase'
          }}>Scroll</span>
          <div style={{
            width:'1px', height:'40px',
            background:'linear-gradient(to bottom, rgba(184,150,62,0.6), transparent)',
            animation:'floatY 2s ease-in-out infinite'
          }}/>
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
      <section className="py-16 px-10 mx-auto" style={{ maxWidth: '1400px', backgroundColor: '#0F0D0B' }}>
        <div className="flex justify-between items-end mb-14 border-b border-border pb-5" style={{ borderColor: 'rgba(184,150,62,0.2)' }}>
          <div>
            <p className="text-[10px] text-gold tracking-[0.3em] uppercase mb-4" style={{ color: '#B8963E', fontFamily:'var(--font-body)' }}>SHOP BY CATEGORY</p>
            <h2 className="font-light" style={{
              fontFamily:'var(--font-heading)',
              fontSize:'clamp(36px,4vw,54px)',
              color: '#FDFCFA'
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
      <section className="py-24 px-10 mx-auto" style={{ maxWidth: '1400px', backgroundColor: '#141210' }}>
        <div className="flex justify-between items-baseline mb-12 pb-5" style={{ borderBottom: '1px solid rgba(184,150,62,0.2)' }}>
          <h2 className="font-light" style={{
            fontFamily:'var(--font-heading)',
            fontSize:'clamp(32px,4vw,50px)',
            color: '#FDFCFA'
          }}>New<span style={{fontStyle:'italic', color:'#B8963E'}}> Arrivals</span></h2>
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
      <section className="py-24 px-10 mx-auto" style={{ maxWidth: '1400px', backgroundColor: '#0F0D0B' }}>
        <div className="flex justify-between items-baseline mb-12 pb-5" style={{ borderBottom: '1px solid rgba(184,150,62,0.2)' }}>
          <h2 className="font-light" style={{
            fontFamily:'var(--font-heading)',
            fontSize:'clamp(32px,4vw,50px)',
            color: '#FDFCFA'
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
      <section className="py-24 md:py-32" style={{ backgroundColor: '#1C1C1C' }}>
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
                <p className="font-garamond-serif text-6xl leading-none mb-4" style={{ color: '#B8963E', opacity: 0.3 }}>
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
                <div className="w-8 h-px mb-6" style={{ backgroundColor: '#B8963E' }} />
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
                    <span key={j} style={{ color: '#B8963E' }}>★</span>
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
      <section className="py-20" style={{ backgroundColor: '#1C1C1C' }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-sans font-200 tracking-widest uppercase text-center mb-10" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3em' }}>
            AS FEATURED IN
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            {['Vogue', 'GQ', "Harper's Bazaar", 'Elle', 'Hypebeast'].map(brand => (
              <a key={brand} href="#" className="transition-colors duration-300 text-center" style={{ color: 'rgba(255,255,255,0.2)' }} onMouseEnter={(e) => e.target.style.color = '#B8963E'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.2)'}>
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
      <section className="py-24 md:py-32 flex items-center justify-center" style={{ backgroundColor: '#1C1C1C' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto px-6 text-center"
        >
          <p className="text-xs font-sans font-400 tracking-widest uppercase mb-4" style={{ color: '#B8963E', letterSpacing: '0.3em' }}>
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
              style={{ borderBottom: '1px solid rgba(184,150,62,0.2)', color: '#FDFCFA' }}
              onFocus={(e) => e.target.style.borderBottom = '1px solid #B8963E'}
              onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(184,150,62,0.2)'}
            />
            <button 
              type="submit" 
              className="px-6 py-3 text-xs font-sans font-400 tracking-widest uppercase transition-all duration-300 whitespace-nowrap"
              style={{ backgroundColor: '#B8963E', color: '#0F0D0B' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#D4AF6A'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#B8963E'}
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

