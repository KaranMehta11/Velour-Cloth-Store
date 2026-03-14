import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart, FiShoppingBag, FiMenu, FiX, FiUser, FiLogOut, FiPackage } from 'react-icons/fi'
import useAuthStore from '../store/useAuthStore'
import useCartStore from '../store/useCartStore'
import useWishlistStore from '../store/useWishlistStore'

const navLinks = [
  { label: 'Collections', to: '/shop' },
  { label: 'Men', to: '/shop?category=Men' },
  { label: 'Women', to: '/shop?category=Women' },
  { label: 'Sale', to: '/shop?sort=price_asc' },
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

  const isTransparent = !scrolled && location.pathname === '/'

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-sm shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className={`font-serif italic text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-velour-text'
              }`}
            >
              Velour
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-velour-accent ${
                    isTransparent ? 'text-white/90' : 'text-velour-text'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Wishlist */}
              <Link
                to="/account?tab=wishlist"
                className={`relative p-1 transition-colors duration-300 hover:text-velour-accent ${
                  isTransparent ? 'text-white' : 'text-velour-text'
                }`}
              >
                <FiHeart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-velour-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className={`relative p-1 transition-colors duration-300 hover:text-velour-accent ${
                  isTransparent ? 'text-white' : 'text-velour-text'
                }`}
              >
                <FiShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-velour-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* User */}
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-velour-accent ${
                      isTransparent ? 'text-white' : 'text-velour-text'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-velour-accent text-white flex items-center justify-center text-sm font-semibold">
                      {user.name[0].toUpperCase()}
                    </div>
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-12 bg-white shadow-lg border border-gray-100 rounded-none w-48 py-2 z-50"
                      >
                        <Link to="/account" className="flex items-center gap-2 px-4 py-2 text-sm text-velour-text hover:bg-velour-bg transition-colors">
                          <FiUser size={14} /> My Account
                        </Link>
                        <Link to="/account?tab=orders" className="flex items-center gap-2 px-4 py-2 text-sm text-velour-text hover:bg-velour-bg transition-colors">
                          <FiPackage size={14} /> Orders
                        </Link>
                        {user.role === 'admin' && (
                          <Link to="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-velour-accent hover:bg-velour-bg transition-colors font-medium">
                            Admin Panel
                          </Link>
                        )}
                        <hr className="my-1 border-gray-100" />
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
                  className={`hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    isTransparent
                      ? 'border-white text-white hover:bg-white hover:text-velour-text'
                      : 'border-velour-text text-velour-text hover:bg-velour-text hover:text-white'
                  }`}
                >
                  Login
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-1 transition-colors ${isTransparent ? 'text-white' : 'text-velour-text'}`}
              >
                {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
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
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 flex flex-col pt-20 pb-8 px-6"
            >
              <Link to="/" className="font-serif italic text-2xl text-velour-text mb-8">Velour</Link>
              <div className="flex flex-col gap-4">
                {navLinks.map(link => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-lg font-medium text-velour-text hover:text-velour-accent transition-colors border-b border-gray-100 pb-4"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto">
                {!user ? (
                  <Link to="/login" className="btn-primary w-full text-center block">
                    Login
                  </Link>
                ) : (
                  <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-medium">
                    <FiLogOut /> Logout
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
