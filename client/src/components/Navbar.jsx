import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiHeart, FiShoppingBag, FiMenu, FiX, FiUser, FiLock } from 'react-icons/fi'
import useAuthStore from '../store/useAuthStore'
import useCartStore from '../store/useCartStore'
import useWishlistStore from '../store/useWishlistStore'

const leftNav = [
  { label: 'SHOP', to: '/shop' },
  { label: 'MEN', to: '/shop?category=Men' },
  { label: 'WOMEN', to: '/shop?category=Women' },
  { label: 'TRENDING', to: '/shop?sort=best_selling' },
]

const rightNav = [
  { label: 'SEASONAL', to: '/shop?sort=newest' },
  { label: 'ACCESSORIES', to: '/shop?category=Accessories' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const itemCount = useCartStore(s => s.itemCount())
  const wishlistCount = useWishlistStore(s => s.items.length)
  const setCartOpen = useCartStore(s => s.setOpen)
  const navigate = useNavigate()
  const userMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = e => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    navigate('/')
  }

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    height: '64px',
    background: 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    borderRadius: '0 0 20px 20px',
    boxShadow: scrolled
      ? '0 8px 32px rgba(0,0,0,0.1)'
      : '0 4px 24px rgba(0,0,0,0.06)',
    transition: 'box-shadow 300ms ease',
  }

  const navLinkStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#0A0A0A',
    textDecoration: 'none',
    transition: 'color 200ms ease',
    cursor: 'pointer',
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:grid" style={{
        ...navStyle,
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '0 32px',
      }}>

        {/* LEFT */}
        <div style={{ justifySelf: 'start', display: 'flex', alignItems: 'center', gap: '28px' }}>
          {leftNav.map(nav => (
            <Link key={nav.to} to={nav.to}
              style={navLinkStyle}
              onMouseEnter={e => e.target.style.color = 'rgba(0,0,0,0.45)'}
              onMouseLeave={e => e.target.style.color = '#0A0A0A'}
            >
              {nav.label}
            </Link>
          ))}
        </div>

        {/* CENTER - Logo */}
        <Link to="/" style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: '18px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.25em',
          color: '#0A0A0A',
          textDecoration: 'none',
        }}>
          VELOUR
        </Link>

        {/* RIGHT */}
        <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '20px' }}>
          {rightNav.map(nav => (
            <Link key={nav.to} to={nav.to}
              style={navLinkStyle}
              onMouseEnter={e => e.target.style.color = 'rgba(0,0,0,0.45)'}
              onMouseLeave={e => e.target.style.color = '#0A0A0A'}
            >
              {nav.label}
            </Link>
          ))}

          {/* Divider */}
          <div style={{ width: '1px', height: '16px', background: 'rgba(0,0,0,0.12)' }} />

          {/* Sign In/Up */}
          <button
            onClick={() => navigate(user ? '/account' : '/login')}
            style={{
              background: '#0A0A0A',
              color: 'white',
              borderRadius: '9999px',
              padding: '8px 18px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'background 200ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#2A2A2A'}
            onMouseLeave={e => e.currentTarget.style.background = '#0A0A0A'}
          >
            {user ? user.name?.split(' ')[0] || 'ACCOUNT' : 'SIGN IN'}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => navigate('/account')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', padding: '4px' }}
          >
            <FiHeart size={18} style={{ color: '#0A0A0A', transition: 'color 200ms ease' }}
              onMouseEnter={e => e.target.style.color = '#B8963E'}
              onMouseLeave={e => e.target.style.color = '#0A0A0A'}
            />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute', top: '-4px', right: '-4px',
                width: '16px', height: '16px', borderRadius: '50%',
                background: '#B8963E', color: 'white',
                fontSize: '9px', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{wishlistCount}</span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#0A0A0A', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', position: 'relative',
              transition: 'background 200ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#2A2A2A'}
            onMouseLeave={e => e.currentTarget.style.background = '#0A0A0A'}
          >
            <FiShoppingBag size={15} style={{ color: 'white' }} />
            {itemCount > 0 && (
              <span style={{
                position: 'absolute', top: '-4px', right: '-4px',
                width: '16px', height: '16px', borderRadius: '50%',
                background: '#B8963E', color: 'white',
                fontSize: '9px', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{itemCount}</span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden" style={{
        ...navStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <button
          onClick={() => setMobileMenuOpen(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <FiMenu size={22} style={{ color: '#0A0A0A' }} />
        </button>
        <Link to="/" style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: '16px', fontWeight: 700,
          letterSpacing: '0.25em', color: '#0A0A0A',
          textTransform: 'uppercase',
        }}>
          VELOUR
        </Link>
        <button
          onClick={() => setCartOpen(true)}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: '#0A0A0A', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', position: 'relative',
          }}
        >
          <FiShoppingBag size={15} style={{ color: 'white' }} />
          {itemCount > 0 && (
            <span style={{
              position: 'absolute', top: '-4px', right: '-4px',
              width: '16px', height: '16px', borderRadius: '50%',
              background: '#B8963E', color: 'white',
              fontSize: '9px', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{itemCount}</span>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'white',
          display: 'flex', flexDirection: 'column',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
            <span style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: '18px', fontWeight: 700,
              letterSpacing: '0.25em', color: '#0A0A0A',
            }}>VELOUR</span>
            <button onClick={() => setMobileMenuOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <FiX size={24} style={{ color: '#0A0A0A' }} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[...leftNav, ...rightNav].map(nav => (
              <Link key={nav.to} to={nav.to}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '42px', fontWeight: 800,
                  textTransform: 'uppercase', color: '#0A0A0A',
                  textDecoration: 'none', letterSpacing: '-0.02em',
                  lineHeight: 1,
                  transition: 'color 200ms ease',
                }}
                onMouseEnter={e => e.target.style.color = '#B8963E'}
                onMouseLeave={e => e.target.style.color = '#0A0A0A'}
              >
                {nav.label}
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 'auto', paddingTop: '32px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <button onClick={() => { navigate(user ? '/account' : '/login'); setMobileMenuOpen(false) }}
              className="btn-black" style={{ width: '100%' }}>
              {user ? 'MY ACCOUNT' : 'SIGN IN'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
