import { Link } from 'react-router-dom'
import { FiShoppingBag, FiHeart, FiSearch, FiUser, FiGrid } from 'react-icons/fi'

export default function LeftSidebar() {
  const tabs = [
    { icon: <FiGrid size={18}/>, label: 'Shop', path: '/shop' },
    { icon: <FiHeart size={18}/>, label: 'Wishlist', path: '/account' },
    { icon: <FiShoppingBag size={18}/>, label: 'Cart', path: '/cart' },
    { icon: <FiSearch size={18}/>, label: 'Search', path: '/shop' },
    { icon: <FiUser size={18}/>, label: 'Account', path: '/account' },
  ]

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 
                    hidden lg:flex flex-col items-center gap-3
                    py-6 px-3 ml-4"
         style={{
           background: 'rgba(28,24,20,0.88)',
           border: '1px solid rgba(184,150,62,0.2)',
           borderRadius: '20px',
           backdropFilter: 'blur(12px)'
         }}>
      {tabs.map((tab, i) => (
        <Link key={i} to={tab.path}
          title={tab.label}
          className="w-10 h-10 flex items-center justify-center rounded-xl
                     transition-all duration-300 group"
          style={{color: 'rgba(255,255,255,0.5)'}}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(184,150,62,0.15)'
            e.currentTarget.style.color = '#B8963E'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
          }}
        >
          {tab.icon}
        </Link>
      ))}
      {/* Gold dot divider */}
      <div style={{
        width: '4px', height: '4px', borderRadius: '50%',
        backgroundColor: 'rgba(184,150,62,0.4)', margin: '4px 0'
      }}/>
      {/* Vertical "VELOUR" text */}
      <p style={{
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        fontFamily: "'Jost', sans-serif",
        fontSize: '9px',
        letterSpacing: '0.25em',
        color: 'rgba(255,255,255,0.25)',
        textTransform: 'uppercase',
        marginTop: '4px'
      }}>VELOUR</p>
    </div>
  )
}
