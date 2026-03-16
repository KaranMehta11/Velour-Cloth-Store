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
    <main className="mt-12">
      {/* ══════════════════════════════════════════════════════════════
          SECTION 1: HERO — TWO PANEL SPLIT
          ══════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen flex" style={{ marginTop: '-3rem' }}>
        {/* LEFT PANEL - 55% */}
        <div
          className="w-full md:w-7/12 relative overflow-hidden flex items-end"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=90')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))'
          }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 p-16 md:p-20"
            style={{ maxWidth: '500px' }}
          >
            <p className="text-luxury-white text-xs font-sans font-400 tracking-widest mb-6 uppercase" style={{ letterSpacing: '0.3em' }}>
              SS 2024 COLLECTION
            </p>
            <h1 
              className="font-garamond-serif text-white mb-6 leading-none"
              style={{ fontSize: '72px', fontWeight: 300, lineHeight: 1.0 }}
            >
              The Art of<br />Refined<br />Dressing.
            </h1>
            <div className="mb-6" style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-white)' }} />
            <p className="text-luxury-white text-sm font-sans font-200" style={{ opacity: 0.7 }}>
              Where heritage meets contemporary vision
            </p>
          </motion.div>
        </div>

        {/* RIGHT PANEL - 45% */}
        <div className="hidden md:flex w-5/12 py-20 px-16 flex-col items-center justify-center" style={{ backgroundColor: 'var(--color-cream)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-md"
          >
            <p 
              className="font-garamond-italic text-lg leading-relaxed mb-8"
              style={{ color: 'var(--color-muted)', fontStyle: 'italic', lineHeight: 1.7 }}
            >
              Each piece in our collection is a conversation between tradition and modernity — crafted for those who appreciate the extraordinary.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 mb-12">
              <button
                className="w-full py-3.5 text-xs font-sans font-400 tracking-widest uppercase transition-all duration-300"
                style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-white)' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-gold-light)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-gold)'}
              >
                EXPLORE COLLECTION
              </button>
              <button
                className="w-full py-3.5 text-xs font-sans font-400 tracking-widest uppercase border transition-all duration-300"
                style={{ borderColor: 'var(--color-gold)', color: 'var(--color-gold)' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--color-gold)'; e.target.style.color = 'var(--color-white)'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--color-gold)'; }}
              >
                VIEW LOOKBOOK
              </button>
            </div>

            {/* Stats */}
            <div className="flex justify-between">
              <div className="text-center">
                <p className="font-garamond-serif text-2xl font-300" style={{ color: 'var(--color-black)' }}>200+</p>
                <p className="text-xs font-sans font-400 tracking-widest uppercase mt-1" style={{ color: 'var(--color-muted)', letterSpacing: '0.15em' }}>Curated Pieces</p>
              </div>
              <div className="text-center">
                <p className="font-garamond-serif text-2xl font-300" style={{ color: 'var(--color-black)' }}>48hr</p>
                <p className="text-xs font-sans font-400 tracking-widest uppercase mt-1" style={{ color: 'var(--color-muted)', letterSpacing: '0.15em' }}>Express Delivery</p>
              </div>
              <div className="text-center">
                <p className="font-garamond-serif text-2xl font-300" style={{ color: 'var(--color-black)' }}>30 Days</p>
                <p className="text-xs font-sans font-400 tracking-widest uppercase mt-1" style={{ color: 'var(--color-muted)', letterSpacing: '0.15em' }}>Free Returns</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2: SCROLLING ANNOUNCEMENT STRIP
          ══════════════════════════════════════════════════════════════ */}
      <section className="h-11 flex items-center overflow-hidden" style={{ backgroundColor: 'var(--color-gold)' }}>
        <div className="flex animate-marquee w-full whitespace-nowrap">
          {Array(3).fill('NEW ARRIVALS EVERY FRIDAY  ✦  FREE SHIPPING ABOVE ₹4,999  ✦  SUSTAINABLE FABRICS  ✦  EXCLUSIVE MEMBER DROPS  ✦  EASY 30-DAY RETURNS  ✦  HANDCRAFTED IN INDIA  ✦  ').map((text, i) => (
            <span key={i} className="text-luxury-white text-xs font-sans font-400 tracking-widest mr-0" style={{ letterSpacing: '0.2em' }}>
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3: EDITORIAL COLLECTIONS
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <p className="text-xs font-sans font-400 tracking-widest uppercase mb-4" style={{ color: 'var(--color-gold)', letterSpacing: '0.3em' }}>
                SHOP BY CATEGORY
              </p>
              <h2 
                className="font-garamond-serif leading-tight mb-0"
                style={{ fontSize: '52px', fontWeight: 300, color: 'var(--color-black)', lineHeight: 1.1 }}
              >
                Curated for the<br />Discerning Eye.
              </h2>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-sm font-sans font-200 leading-relaxed mb-4" style={{ color: 'var(--color-black)' }}>
                Explore our meticulously curated collections, each designed to celebrate individual style and elevate everyday moments.
              </p>
              <a href="/shop" className="text-xs font-sans font-400 tracking-widest uppercase hover-underline transition-all" style={{ color: 'var(--color-gold)', letterSpacing: '0.15em' }}>
                VIEW ALL COLLECTIONS →
              </a>
            </div>
          </div>

          {/* 3 Collection Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden group"
              style={{ aspectRatio: '3/4', cursor: 'pointer' }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'
                e.currentTarget.querySelector('.overlay').style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('img').style.transform = 'scale(1)'
                e.currentTarget.querySelector('.overlay').style.opacity = '0.6'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=85"
                alt="Men's Edit"
                className="w-full h-full object-cover transition-transform duration-500"
              />
              <div
                className="overlay absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300"
                style={{
                  backgroundImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)',
                  opacity: 0.6,
                }}
              >
                <p className="text-luxury-white text-xs font-sans font-400 tracking-widest uppercase mb-1" style={{ letterSpacing: '0.15em' }}>EXPLORE →</p>
                <h3 className="font-garamond-serif text-2xl font-300 text-luxury-white mb-2">MEN'S EDIT</h3>
                <p className="text-luxury-white text-xs font-sans font-200">124 Pieces</p>
              </div>
            </motion.div>

            {/* Card 2 - TALLER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden group md:row-span-1"
              style={{ aspectRatio: '3/5', cursor: 'pointer' }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'
                e.currentTarget.querySelector('.overlay').style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('img').style.transform = 'scale(1)'
                e.currentTarget.querySelector('.overlay').style.opacity = '0.6'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85"
                alt="Women's Edit"
                className="w-full h-full object-cover transition-transform duration-500"
              />
              <div
                className="overlay absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300"
                style={{
                  backgroundImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)',
                  opacity: 0.6,
                }}
              >
                <p className="text-luxury-white text-xs font-sans font-400 tracking-widest uppercase mb-1" style={{ letterSpacing: '0.15em' }}>EXPLORE →</p>
                <h3 className="font-garamond-serif text-2xl font-300 text-luxury-white mb-2">WOMEN'S EDIT</h3>
                <p className="text-luxury-white text-xs font-sans font-200">186 Pieces</p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden group"
              style={{ aspectRatio: '3/4', cursor: 'pointer' }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'
                e.currentTarget.querySelector('.overlay').style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('img').style.transform = 'scale(1)'
                e.currentTarget.querySelector('.overlay').style.opacity = '0.6'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85"
                alt="Accessories"
                className="w-full h-full object-cover transition-transform duration-500"
              />
              <div
                className="overlay absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300"
                style={{
                  backgroundImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)',
                  opacity: 0.6,
                }}
              >
                <p className="text-luxury-white text-xs font-sans font-400 tracking-widest uppercase mb-1" style={{ letterSpacing: '0.15em' }}>EXPLORE →</p>
                <h3 className="font-garamond-serif text-2xl font-300 text-luxury-white mb-2">ACCESSORIES</h3>
                <p className="text-luxury-white text-xs font-sans font-200">67 Pieces</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4: NEW ARRIVALS
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <h2 
              className="font-garamond-serif"
              style={{ fontSize: '48px', fontWeight: 300, color: 'var(--color-black)', lineHeight: 1.1 }}
            >
              New Arrivals
            </h2>
            <Link 
              to="/shop" 
              className="text-xs font-sans font-400 tracking-widest uppercase hover-underline transition-all"
              style={{ color: 'var(--color-gold)', letterSpacing: '0.15em' }}
            >
              VIEW ALL →
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-16"><LoadingSpinner /></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featured.slice(0, 8).map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 5: EDITORIAL BANNER
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-screen h-96 md:h-screen max-h-screen flex items-center justify-center overflow-hidden md:h-96 xl:h-screen"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=90')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-center text-luxury-white"
        >
          <p className="text-xs font-sans font-400 tracking-widest uppercase mb-4" style={{ letterSpacing: '0.3em' }}>
            LIMITED EDITION
          </p>
          <h2 
            className="font-garamond-serif italic text-5xl md:text-6xl mb-6"
            style={{ fontStyle: 'italic', lineHeight: 1.1 }}
          >
            The Winter Atelier
          </h2>
          <p className="text-sm font-sans font-200 max-w-md mx-auto mb-8">
            A collection of 40 exclusive pieces, available for 30 days only
          </p>
          <button
            className="px-10 py-3.5 text-xs font-sans font-400 tracking-widest uppercase transition-all duration-300"
            style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-black)' }}
            onMouseEnter={(e) => { e.target.style.opacity = '0.9' }}
            onMouseLeave={(e) => { e.target.style.opacity = '1' }}
          >
            SHOP THE EDIT
          </button>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 6: BESTSELLERS
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <h2 
              className="font-garamond-serif"
              style={{ fontSize: '48px', fontWeight: 300, color: 'var(--color-black)', lineHeight: 1.1 }}
            >
              Bestsellers
            </h2>
            <Link 
              to="/shop" 
              className="text-xs font-sans font-400 tracking-widest uppercase hover-underline transition-all"
              style={{ color: 'var(--color-gold)', letterSpacing: '0.15em' }}
            >
              VIEW ALL →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestsellers.slice(0, 4).map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 7: BRAND PHILOSOPHY
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 flex items-center" style={{ backgroundColor: 'var(--color-charcoal)' }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <p className="text-xs font-sans font-400 tracking-widest uppercase mb-6" style={{ color: 'var(--color-gold)', letterSpacing: '0.3em' }}>
              OUR PHILOSOPHY
            </p>
            <h2 
              className="font-garamond-serif text-white mb-8 leading-tight"
              style={{ fontSize: '48px', fontWeight: 300, lineHeight: 1.1 }}
            >
              Crafted with<br />intention.<br />Worn with purpose.
            </h2>
            <p className="text-sm font-sans font-200 leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              At Velour, we believe that true luxury lies not in excess, but in the perfection of the details. Every stitch, every fabric, every silhouette is chosen with purpose.
            </p>
            <div className="flex gap-12 mb-8">
              <div>
                <p className="font-garamond-serif text-2xl font-300 text-luxury-white">Est. 2024</p>
              </div>
              <div>
                <p className="font-garamond-serif text-2xl font-300 text-luxury-white">Made in India</p>
              </div>
            </div>
            <a href="#" className="text-xs font-sans font-400 tracking-widest uppercase hover-underline transition-all" style={{ color: 'var(--color-gold)', letterSpacing: '0.15em' }}>
              OUR STORY →
            </a>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
            style={{ aspectRatio: '3/4' }}
          >
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85"
              alt="Our Philosophy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 8: TESTIMONIALS
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-garamond-serif italic text-center mb-16"
            style={{ fontSize: '48px', fontWeight: 300, color: 'var(--color-black)', fontStyle: 'italic', lineHeight: 1.1 }}
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
                  style={{ color: 'var(--color-black)', fontStyle: 'italic', lineHeight: 1.7 }}
                >
                  {t.quote}
                </p>
                {/* Line */}
                <div className="w-8 h-px mb-6" style={{ backgroundColor: 'var(--color-gold)' }} />
                {/* Name */}
                <p className="text-xs font-sans font-400 tracking-widest uppercase mb-1" style={{ color: 'var(--color-black)', letterSpacing: '0.2em' }}>
                  {t.name}
                </p>
                <p className="text-xs font-sans font-200 mb-3" style={{ color: 'var(--color-muted)' }}>
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

