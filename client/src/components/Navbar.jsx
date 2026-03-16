import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi'
import useAuthStore from '../store/useAuthStore'
import useCartStore from '../store/useCartStore'
import useWishlistStore from '../store/useWishlistStore'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const cartCount = useCartStore(s => s.itemCount?.())
  const wishlistCount = useWishlistStore(s => s.items?.length || 0)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setUserDropdown(false)
  }

  // LEFT SECTION - Category links
  const categoryLinks = [
    { label: 'MEN', path: '/shop?category=Men' },
    { label: 'WOMEN', path: '/shop?category=Women' },
    { label: 'ACCESSORIES', path: '/shop?category=Accessories' },
  ]

  // RIGHT SECTION - Text links
  const textLinks = [
    { label: 'SALE', path: '/shop?sale=true' },
    { label: 'NEW IN', path: '/shop?sort=newest' },
  ]

  return (
    <>
      {/* TOP NAVBAR */}
      <nav
        style={{
          position: 'fixed',
          top: '36px',
          left: 0,
          right: 0,
          height: '64px',
          background: scrolled ? 'rgba(12,10,8,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(184,150,62,0.15)' : 'none',
          zIndex: 9999,
          transition: 'all 500ms ease',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 'clamp(32px, 8vw, 56px)',
          paddingRight: 'clamp(32px, 8vw, 56px)',
        }}
        className="navbar"
      >
        {/* LEFT SECTION - Category links (hidden on mobile) */}
        <div style={{
          display: 'flex',
          gap: '32px',
          flex: 1,
          alignItems: 'center'
        }} className="navbar-left">
          {categoryLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                transition: 'all 300ms ease',
                paddingBottom: '2px',
                borderBottom: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#B8963E'
                e.target.style.borderBottomColor = '#B8963E'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255,255,255,0.7)'
                e.target.style.borderBottomColor = 'transparent'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CENTER SECTION - Logo */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Link
            to="/"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '22px',
              fontStyle: 'italic',
              letterSpacing: '0.4em',
              color: '#FDFCFA',
              textDecoration: 'none',
              userSelect: 'none'
            }}
          >
            VELOUR
          </Link>
        </div>

        {/* RIGHT SECTION - Text links + icons (hidden on mobile) */}
        <div style={{
          display: 'flex',
          gap: '32px',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end'
        }} className="navbar-right">
          {/* Text links */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {textLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  transition: 'all 300ms ease',
                  paddingBottom: '2px',
                  borderBottom: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#B8963E'
                  e.target.style.borderBottomColor = '#B8963E'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255,255,255,0.7)'
                  e.target.style.borderBottomColor = 'transparent'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider line */}
          <div style={{
            width: '1px',
            height: '16px',
            backgroundColor: 'rgba(184,150,62,0.2)'
          }} />

          {/* Icon buttons */}
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center'
          }}>
            {/* Search */}
            <Link
              to="/shop"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)',
                transition: 'color 300ms ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.color = '#B8963E'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
            >
              <FiSearch size={18} />
            </Link>

            {/* Wishlist with badge */}
            <Link
              to="/account"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)',
                transition: 'color 300ms ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.color = '#B8963E'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
            >
              <FiHeart size={18} />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#B8963E',
                  color: 'white',
                  borderRadius: '50%',
                  fontSize: '9px',
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart with badge */}
            <Link
              to="/cart"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)',
                transition: 'color 300ms ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.color = '#B8963E'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
            >
              <FiShoppingBag size={18} />
              {(cartCount || 0) > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#B8963E',
                  color: 'white',
                  borderRadius: '50%',
                  fontSize: '9px',
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {cartCount || 0}
                </span>
              )}
            </Link>

            {/* User icon with dropdown */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button
                onClick={() => {
                  if (user) {
                    setUserDropdown(!userDropdown)
                  } else {
                    navigate('/login')
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  transition: 'color 300ms ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#B8963E'}
                onMouseLeave={(e) => {
                  if (!userDropdown) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                  }
                }}
              >
                <FiUser size={18} />
              </button>

              {/* User dropdown menu */}
              <AnimatePresence>
                {user && userDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      right: 0,
                      background: 'rgba(18,15,12,0.96)',
                      border: '1px solid rgba(184,150,62,0.2)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(16px)',
                      minWidth: '180px',
                      zIndex: 100000,
                      overflow: 'hidden',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
                    }}
                  >
                    <Link
                      to="/account"
                      onClick={() => setUserDropdown(false)}
                      style={{
                        display: 'block',
                        padding: '10px 16px',
                        fontFamily: "'Jost', sans-serif",
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.6)',
                        textDecoration: 'none',
                        transition: 'all 200ms ease',
                        borderBottom: '1px solid rgba(184,150,62,0.1)',
                        textTransform: 'capitalize'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#B8963E'
                        e.target.style.backgroundColor = 'rgba(184,150,62,0.12)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'rgba(255,255,255,0.6)'
                        e.target.style.backgroundColor = 'transparent'
                      }}
                    >
                      My Account
                    </Link>
                    <Link
                      to="/account?tab=orders"
                      onClick={() => setUserDropdown(false)}
                      style={{
                        display: 'block',
                        padding: '10px 16px',
                        fontFamily: "'Jost', sans-serif",
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.6)',
                        textDecoration: 'none',
                        transition: 'all 200ms ease',
                        borderBottom: '1px solid rgba(184,150,62,0.1)',
                        textTransform: 'capitalize'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#B8963E'
                        e.target.style.backgroundColor = 'rgba(184,150,62,0.12)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'rgba(255,255,255,0.6)'
                        e.target.style.backgroundColor = 'transparent'
                      }}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        fontFamily: "'Jost', sans-serif",
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.6)',
                        cursor: 'pointer',
                        transition: 'all 200ms ease',
                        textAlign: 'left',
                        textTransform: 'capitalize'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#ff6b6b'
                        e.currentTarget.style.backgroundColor = 'rgba(255,100,100,0.1)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MOBILE HAMBURGER (shown only on mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            marginLeft: '16px',
            transition: 'color 300ms ease'
          }}
          className="mobile-menu-btn"
          onMouseEnter={(e) => e.currentTarget.style.color = '#B8963E'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
        >
          <FiMenu size={20} />
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '100px',
              left: 0,
              right: 0,
              bottom: 0,
              background: '#0A0A0A',
              zIndex: 99998,
              display: 'flex',
              flexDirection: 'column',
              padding: '40px 24px',
              overflow: 'auto'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                fontSize: '24px'
              }}
            >
              <FiX size={24} />
            </button>

            {/* Mobile menu links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '20px' }}>
              {[
                ...categoryLinks,
                ...textLinks,
                { label: 'My Account', path: '/account' },
                { label: 'My Orders', path: '/account?tab=orders' },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '42px',
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    transition: 'color 300ms ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#B8963E'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <button
                  onClick={handleLogout}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '42px',
                    fontStyle: 'italic',
                    color: 'rgba(255,100,100,0.8)',
                    textDecoration: 'none',
                    transition: 'color 300ms ease',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ff6b6b'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,100,100,0.8)'
                  }}
                >
                  <FiLogOut size={32} /> Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 768px) {
          .navbar-left, .navbar-right {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  )
}
