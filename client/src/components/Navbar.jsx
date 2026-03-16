import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart, FiShoppingBag, FiMenu, FiX, FiUser, FiLogOut, FiPackage, FiSearch } from 'react-icons/fi'
import useAuthStore from '../store/useAuthStore'
import useCartStore from '../store/useCartStore'
import useWishlistStore from '../store/useWishlistStore'

const leftNav = [
  { label: 'MEN', to: '/shop?category=Men' },
  { label: 'WOMEN', to: '/shop?category=Women' },
  { label: 'ACCESSORIES', to: '/shop?category=Accessories' },
]

const rightNav = [
  { label: 'SALE', to: '/shop?sort=price_asc' },
  { label: 'NEW IN', to: '/shop?sort=newest' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const itemCount = useCartStore(s => s.itemCount())
  const wishlistCount = useWishlistStore(s => s.items.length)
  const setCartOpen = useCartStore(s => s.setOpen)
  const navigate = useNavigate()
  const location = useLocation()
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setUserMenuOpen(false)
  }, [location])

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <>
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-luxury-charcoal h-9 flex items-center overflow-hidden">
        <div className="flex animate-marquee w-full whitespace-nowrap">
          {Array(3).fill('FREE SHIPPING ON ORDERS ABOVE ₹4,999  ·  NEW COLLECTION NOW LIVE  ·  ').map((text, i) => (
            <span key={i} className="text-luxury-white text-xs font-sans font-200 tracking-widest mr-0">{text}</span>
          ))}
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className={`fixed top-9 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-luxury-cream border-b border-luxury-border backdrop-blur-md'
          : 'bg-transparent'
      }`} style={{ backdropFilter: scrolled ? 'blur(10px)' : 'none' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* LEFT NAVIGATION */}
            <div className="hidden md:flex items-center gap-12">
              {leftNav.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-xs font-sans font-400 tracking-widest uppercase hover-underline transition-colors duration-300"
                  style={{ color: 'var(--color-black)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CENTER LOGO */}
            <Link
              to="/"
              className="font-garamond-serif italic text-3xl font-300 tracking-wider flex-shrink-0"
              style={{ color: 'var(--color-black)', letterSpacing: '0.3em' }}
            >
              VELOUR
            </Link>

            {/* RIGHT NAVIGATION */}
            <div className="hidden md:flex items-center gap-12">
              {rightNav.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-xs font-sans font-400 tracking-widest uppercase hover-underline transition-colors duration-300"
                  style={{ color: 'var(--color-black)' }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Icons - Search */}
              <button className="p-1 hover:text-luxury-gold transition-colors duration-300" style={{ color: 'var(--color-black)' }}>
                <FiSearch size={18} strokeWidth={1.5} />
              </button>

              {/* Wishlist */}
              <Link
                to="/account?tab=wishlist"
                className="relative p-1 transition-colors duration-300"
                style={{ color: 'var(--color-black)' }}
              >
                <FiHeart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-luxury-gold text-luxury-white text-xs flex items-center justify-center" style={{ fontSize: '8px', lineHeight: '1' }}>
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-1 transition-colors duration-300"
                style={{ color: 'var(--color-black)' }}
              >
                <FiShoppingBag size={18} strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-luxury-gold text-luxury-white text-xs flex items-center justify-center" style={{ fontSize: '8px', lineHeight: '1' }}>
                    {itemCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="p-1 transition-colors duration-300"
                    style={{ color: 'var(--color-black)' }}
                  >
                    <div className="w-6 h-6 rounded-full bg-luxury-gold text-luxury-white flex items-center justify-center text-xs font-600">
                      {user.name[0].toUpperCase()}
                    </div>
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-12 bg-luxury-white shadow-lg border border-luxury-border rounded-none w-48 py-2 z-50"
                      >
                        <Link to="/account" className="flex items-center gap-2 px-4 py-2 text-sm text-luxury-black hover:bg-luxury-cream transition-colors">
                          <FiUser size={14} /> My Account
                        </Link>
                        <Link to="/account?tab=orders" className="flex items-center gap-2 px-4 py-2 text-sm text-luxury-black hover:bg-luxury-cream transition-colors">
                          <FiPackage size={14} /> Orders
                        </Link>
                        {user.role === 'admin' && (
                          <Link to="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-luxury-gold hover:bg-luxury-cream transition-colors font-500">
                            Admin Panel
                          </Link>
                        )}
                        <hr className="my-1 border-luxury-border" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <FiLogOut size={14} /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-xs font-sans font-400 tracking-widest uppercase hover-underline transition-colors duration-300"
                  style={{ color: 'var(--color-black)' }}
                >
                  LOGIN
                </Link>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1"
              style={{ color: 'var(--color-black)' }}
            >
              {mobileOpen ? <FiX size={24} strokeWidth={1.5} /> : <FiMenu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-9 left-0 right-0 bottom-0 bg-luxury-cream z-50 flex flex-col pt-12 pb-8 px-6 overflow-y-auto"
            >
              <Link to="/" className="font-garamond-serif italic text-3xl font-300 mb-12" style={{ color: 'var(--color-black)', letterSpacing: '0.3em' }}>
                VELOUR
              </Link>
              <div className="flex flex-col gap-6">
                {[...leftNav, ...rightNav].map(link => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-lg font-garamond-serif font-300 uppercase border-b border-luxury-border pb-4 transition-colors duration-300 hover:text-luxury-gold"
                    style={{ color: 'var(--color-black)' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto space-y-4">
                {!user ? (
                  <Link to="/login" className="block w-full bg-luxury-gold text-luxury-white py-3 text-center text-sm font-400 tracking-widest uppercase">
                    LOGIN
                  </Link>
                ) : (
                  <>
                    <Link to="/account" className="block text-luxury-black text-sm font-400 tracking-widest uppercase hover:text-luxury-gold transition-colors">
                      MY ACCOUNT
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-500 text-sm">
                      <FiLogOut size={16} /> Logout
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

