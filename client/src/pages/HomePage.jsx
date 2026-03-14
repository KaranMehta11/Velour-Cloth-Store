import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

const benefits = [
  { icon: '🚚', title: 'Free Shipping', desc: 'On all orders over $100' },
  { icon: '🔄', title: 'Easy Returns', desc: 'Hassle-free 30-day returns' },
  { icon: '🌿', title: 'Sustainable', desc: 'Ethically sourced materials' },
  { icon: '✨', title: 'Exclusive', desc: 'Member-only drops and early access' },
]

const collections = [
  {
    title: "Men's Edit",
    link: '/shop?category=Men',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=900&q=80',
  },
  {
    title: "Women's Edit",
    link: '/shop?category=Women',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&q=80',
  },
  {
    title: 'Accessories',
    link: '/shop?category=Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80',
  },
]

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
  {
    name: 'Oliver M.',
    quote: 'Impeccable packaging, lightning-fast delivery, and clothes that feel twice the price. Completely won me over.',
    rating: 5,
  },
]

export default function HomePage() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')

  useEffect(() => {
    document.title = 'Velour — Luxury Fashion for the Modern Individual'
    api.get('/products/featured')
      .then(res => setFeatured(res.data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <main>
      {/* ── SECTION 1: HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=1800&q=80')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Hero content */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-velour-accent tracking-[0.3em] text-xs mb-4 font-medium uppercase"
          >
            New Collection 2024
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="font-serif text-5xl md:text-7xl font-semibold text-white leading-tight mb-6"
          >
            Dress the Story<br />You Want to Tell
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="text-white/75 text-base md:text-lg max-w-md mx-auto mb-8 font-light"
          >
            Curated fashion for the modern individual. Timeless pieces, effortless style.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.45 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link to="/shop" className="bg-velour-accent text-white px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-all duration-300 hover:scale-105">
              Shop Now
            </Link>
            <Link to="/shop?category=Women" className="border border-white text-white px-8 py-3.5 rounded-full font-medium hover:bg-white hover:text-velour-text transition-all duration-300">
              View Lookbook
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <FiChevronDown size={28} />
        </motion.div>
      </section>

      {/* ── SECTION 2: MARQUEE ── */}
      <div className="bg-velour-dark py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(4).fill('FREE SHIPPING OVER $100 · EASY 30-DAY RETURNS · SUSTAINABLE FABRICS · EXCLUSIVE MEMBER DROPS · NEW ARRIVALS EVERY FRIDAY · ').map((text, i) => (
            <span key={i} className="text-white/60 text-xs tracking-widest uppercase mr-0">{text}</span>
          ))}
        </div>
      </div>

      {/* ── SECTION 3: WHY VELOUR ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-center text-velour-text mb-12"
          >
            Why Choose Velour
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-3">{b.icon}</div>
                <h3 className="font-serif text-lg font-semibold mb-1">{b.title}</h3>
                <p className="text-velour-muted text-sm">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: FEATURED COLLECTIONS ── */}
      <section className="bg-velour-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-velour-text mb-10"
          >
            Shop by Collection
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {collections.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative overflow-hidden group cursor-pointer"
                style={{ aspectRatio: '4/5' }}
              >
                <Link to={col.link}>
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="font-serif text-white text-2xl font-semibold mb-1">{col.title}</h3>
                    <span className="text-white/80 text-sm font-medium tracking-wider group-hover:text-velour-accent transition-colors">
                      Explore →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: NEW ARRIVALS ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl text-velour-text"
            >
              New Arrivals
            </motion.h2>
            <Link to="/shop" className="text-velour-accent font-medium text-sm hover:underline">
              View All →
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-16"><LoadingSpinner /></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
              {featured.slice(0, 8).map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 6: FEATURED PRODUCT ── */}
      {featured.length > 0 && (
        <section className="bg-velour-bg py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden"
                style={{ aspectRatio: '4/5' }}
              >
                <img
                  src={featured[0]?.images?.[0]?.url}
                  alt={featured[0]?.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-velour-accent text-xs tracking-widest uppercase font-medium">Staff Favourite</span>
                <h2 className="font-serif text-4xl md:text-5xl mt-3 mb-4 text-velour-text">{featured[0]?.name}</h2>
                <p className="text-velour-muted leading-relaxed mb-6">{featured[0]?.description?.slice(0, 200)}...</p>
                <div className="text-2xl font-semibold text-velour-accent mb-8">
                  ${featured[0]?.discountPrice || featured[0]?.price}
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Link to={`/product/${featured[0]?._id}`} className="bg-velour-accent text-white px-8 py-3 rounded-none font-medium hover:opacity-90 transition-opacity">
                    View Details
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 7: TESTIMONIALS ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-center text-velour-text mb-12"
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} className="text-velour-accent text-sm">★</span>
                  ))}
                </div>
                <p className="text-velour-text text-sm leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-velour-accent/20 flex items-center justify-center text-velour-accent font-semibold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-velour-muted">Verified Buyer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: TRUST BAR ── */}
      <section className="bg-white border-y border-gray-100 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-velour-muted text-xs tracking-widest uppercase mb-6">As featured in</p>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {['Vogue', 'GQ', 'Elle', "Harper's Bazaar", 'Hypebeast'].map(brand => (
              <span key={brand} className="font-serif text-gray-400 text-lg font-semibold italic hover:text-velour-text transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: NEWSLETTER ── */}
      <section className="bg-velour-dark py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-white mb-4"
          >
            Get First Access to New Drops
          </motion.h2>
          <p className="text-gray-400 mb-8">Join the Velour circle. Be the first to know about new arrivals, exclusive sales, and editorial inspiration.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!') }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 focus:outline-none focus:border-velour-accent transition-colors"
            />
            <button type="submit" className="bg-velour-accent text-white px-8 py-3 font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-gray-500 text-xs mt-4">No spam, ever. Unsubscribe at any time.</p>
        </div>
      </section>
    </main>
  )
}
