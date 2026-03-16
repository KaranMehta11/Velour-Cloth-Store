import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FiGrid, FiHeart, FiShoppingBag, 
  FiSearch, FiUser, FiLogOut
} from 'react-icons/fi'
import useAuthStore from '../store/useAuthStore'
import useCartStore from '../store/useCartStore'
import useWishlistStore from '../store/useWishlistStore'

export default function VerticalNav() {
  const [activeTooltip, setActiveTooltip] = useState(null)
  const { user, logout } = useAuthStore()
  const cartCount = useCartStore(s => s.itemCount?.())
  const wishlistCount = useWishlistStore(s => s.items?.length || 0)
  const navigate = useNavigate()

  const navItems = [
    { icon: <FiGrid size={17}/>, label: 'MEN', path: '/shop?category=Men' },
    { icon: <FiGrid size={17}/>, label: 'WOMEN', path: '/shop?category=Women' },
    { icon: <FiGrid size={17}/>, label: 'ACCESSORIES', path: '/shop?category=Accessories' },
    { icon: <FiGrid size={17}/>, label: 'SALE', path: '/shop?sale=true' },
    { icon: <FiGrid size={17}/>, label: 'NEW IN', path: '/shop?sort=newest' },
    { icon: <FiSearch size={17}/>, label: 'SEARCH', path: '/shop' },
    { 
      icon: <FiHeart size={17}/>, 
      label: 'WISHLIST', 
      path: '/account',
      badge: wishlistCount 
    },
    { 
      icon: <FiShoppingBag size={17}/>, 
      label: 'CART', 
      path: '/cart',
      badge: cartCount || 0
    },
    { 
      icon: <FiUser size={17}/>, 
      label: user ? user.name?.split(' ')[0].toUpperCase() : 'LOGIN', 
      path: user ? '/account' : '/login' 
    },
  ]

  return (
    <>
      {/* VERTICAL NAV PILL */}
      <div
        style={{
          position: 'fixed',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '20px 10px',
          background: 'rgba(18, 15, 12, 0.92)',
          border: '1px solid rgba(184,150,62,0.25)',
          borderRadius: '24px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          minWidth: 'auto',
          transition: 'all 400ms ease'
        }}
      >
        {/* VELOUR logo at top */}
        <Link to="/" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '11px',
          fontStyle: 'italic',
          letterSpacing: '0.25em',
          color: '#B8963E',
          textDecoration: 'none',
          marginBottom: '12px',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
          userSelect: 'none'
        }}>VELOUR</Link>

        {/* Gold divider */}
        <div style={{
          width: '20px', height: '1px',
          backgroundColor: 'rgba(184,150,62,0.3)',
          marginBottom: '8px'
        }}/>

        {/* Nav items */}
        {navItems.map((item, i) => (
          <div key={i} style={{position: 'relative', width: '100%'}}>
            <Link
              to={item.path}
              title={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                transition: 'all 300ms ease',
                position: 'relative',
                margin: '0 auto',
                backgroundColor: activeTooltip === i 
                  ? 'rgba(184,150,62,0.12)' : 'transparent'
              }}
              onMouseEnter={e => {
                setActiveTooltip(i)
                e.currentTarget.style.color = '#B8963E'
                e.currentTarget.style.backgroundColor = 'rgba(184,150,62,0.12)'
              }}
              onMouseLeave={e => {
                setActiveTooltip(null)
                e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {item.icon}

              {/* Badge for cart/wishlist */}
              {item.badge > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '4px', right: '4px',
                  width: '14px', height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#B8963E',
                  color: 'white',
                  fontSize: '8px',
                  fontFamily: "'Jost', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600
                }}>{item.badge}</span>
              )}
            </Link>

            {/* Tooltip label on hover — appears to the RIGHT */}
            {activeTooltip === i && (
              <div style={{
                position: 'absolute',
                left: 'calc(100% + 12px)',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(18,15,12,0.95)',
                border: '1px solid rgba(184,150,62,0.2)',
                borderRadius: '8px',
                padding: '6px 12px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 99999
              }}>
                <span style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  color: '#B8963E',
                  textTransform: 'uppercase'
                }}>{item.label}</span>
              </div>
            )}
          </div>
        ))}

        {/* Gold divider */}
        <div style={{
          width: '20px', height: '1px',
          backgroundColor: 'rgba(184,150,62,0.3)',
          marginTop: '8px'
        }}/>

        {/* Logout if logged in */}
        {user && (
          <button
            onClick={() => { logout(); navigate('/') }}
            title="Logout"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px', height: '38px',
              borderRadius: '12px',
              color: 'rgba(255,255,255,0.35)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 300ms ease',
              marginTop: '4px'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#ff6b6b'
              e.currentTarget.style.backgroundColor = 'rgba(255,100,100,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <FiLogOut size={15}/>
          </button>
        )}
      </div>

      {/* MOBILE — bottom bar instead of sidebar */}
      <div style={{
        display: 'none',
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        height: '64px',
        background: 'rgba(18,15,12,0.96)',
        borderTop: '1px solid rgba(184,150,62,0.2)',
        backdropFilter: 'blur(16px)',
        zIndex: 9999,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px'
      }} className="mobile-nav-bar">
        {[
          { icon: <FiGrid size={20}/>, path: '/shop' },
          { icon: <FiHeart size={20}/>, path: '/account', badge: wishlistCount },
          { icon: <FiShoppingBag size={20}/>, path: '/cart', badge: cartCount || 0 },
          { icon: <FiUser size={20}/>, path: user ? '/account' : '/login' },
        ].map((item, i) => (
          <Link key={i} to={item.path} style={{
            position: 'relative',
            color: 'rgba(255,255,255,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '48px', height: '48px'
          }}>
            {item.icon}
            {item.badge > 0 && (
              <span style={{
                position: 'absolute', top: '6px', right: '6px',
                width: '14px', height: '14px', borderRadius: '50%',
                backgroundColor: '#B8963E', color: 'white',
                fontSize: '8px', display: 'flex',
                alignItems: 'center', justifyContent: 'center'
              }}>{item.badge}</span>
            )}
          </Link>
        ))}
      </div>

      {/* Mobile nav CSS */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-nav-bar { display: flex !important; }
        }
      `}</style>
    </>
  )
}
