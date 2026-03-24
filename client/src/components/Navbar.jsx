import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiSearch, FiHeart, FiShoppingBag,
  FiUser, FiMenu, FiX
} from 'react-icons/fi'
import useAuthStore from '../store/useAuthStore'
import useCartStore from '../store/useCartStore'
import useWishlistStore from '../store/useWishlistStore'
import SearchModal from './SearchModal'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  const { user } = useAuthStore()
  const cartCount = useCartStore(s => s.itemCount())
  const wishlistCount = useWishlistStore(s => s.items.length)

  const linkStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.6)',
    textDecoration: 'none',
    transition: 'color 300ms ease'
  }

  const iconBtnStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    transition: 'color 300ms ease'
  }

  const badge = count => count > 0 ? (
    <span style={{
      position: 'absolute', top: '-5px', right: '-5px',
      width: '15px', height: '15px', borderRadius: '50%',
      backgroundColor: '#B8963E', color: 'white',
      fontSize: '9px', fontFamily: "'Inter', sans-serif",
      fontWeight: 600, display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    }}>{count}</span>
  ) : null

  return (
    <>
      {/* MAIN NAVBAR */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '68px',
        zIndex: 9999,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '0 56px'
      }}>

        {/* LEFT LINKS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px', justifySelf: 'start' }}>
          {[
            { label: 'MEN', path: '/shop?category=Men' },
            { label: 'WOMEN', path: '/shop?category=Women' },
            { label: 'ACCESSORIES', path: '/shop?category=Accessories' }
          ].map(link => (
            <Link
              key={link.label}
              to={link.path}
              style={linkStyle}
              onMouseEnter={e => e.target.style.color = '#0A0A0A'}
              onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,0.6)'}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CENTER LOGO */}
        <Link
          to="/"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '17px',
            fontWeight: 800,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#0A0A0A',
            textDecoration: 'none',
            justifySelf: 'center'
          }}
        >
          VELOUR
        </Link>

        {/* RIGHT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifySelf: 'end' }}>
          {[
            { label: 'SALE', path: '/shop?sale=true' },
            { label: 'NEW IN', path: '/shop?sort=newest' }
          ].map(link => (
            <Link
              key={link.label}
              to={link.path}
              style={linkStyle}
              onMouseEnter={e => e.target.style.color = '#0A0A0A'}
              onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,0.6)'}
            >
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(0,0,0,0.1)' }} />

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            style={iconBtnStyle}
            onMouseEnter={e => e.currentTarget.style.color = '#0A0A0A'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.6)'}
          >
            <FiSearch size={19} />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => navigate('/account')}
            style={iconBtnStyle}
            onMouseEnter={e => e.currentTarget.style.color = '#0A0A0A'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.6)'}
          >
            <FiHeart size={19} />
            {badge(wishlistCount)}
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate('/cart')}
            style={iconBtnStyle}
            onMouseEnter={e => e.currentTarget.style.color = '#0A0A0A'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.6)'}
          >
            <FiShoppingBag size={19} />
            {badge(cartCount)}
          </button>

          {/* User */}
          <button
            onClick={() => navigate(user ? '/account' : '/login')}
            style={iconBtnStyle}
            onMouseEnter={e => e.currentTarget.style.color = '#0A0A0A'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.6)'}
          >
            <FiUser size={19} />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center' }}
          >
            <FiMenu size={22} />
          </button>
        </div>
      </nav>

      {/* MOBILE FULL SCREEN MENU */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: '#FFFFFF',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px'
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#0A0A0A', cursor: 'pointer' }}
          >
            <FiX size={28} />
          </button>
          {[
            { label: 'Men', path: '/shop?category=Men' },
            { label: 'Women', path: '/shop?category=Women' },
            { label: 'Accessories', path: '/shop?category=Accessories' },
            { label: 'Sale', path: '/shop?sale=true' },
            { label: 'New In', path: '/shop?sort=newest' },
            { label: 'Account', path: '/account' },
          ].map(link => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '40px',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#0A0A0A',
                textDecoration: 'none',
                transition: 'color 300ms ease'
              }}
              onMouseEnter={e => e.target.style.color = '#B8963E'}
              onMouseLeave={e => e.target.style.color = '#0A0A0A'}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
