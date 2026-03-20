import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A0A0A', color: 'rgba(255,255,255,0.4)' }}>
      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: '64px 24px 0',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '48px'
      }}>
        {/* Brand */}
        <div>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '20px', fontWeight: 900, color: 'white', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>VELOUR</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: 'rgba(255,255,255,0.3)', maxWidth: '240px', marginBottom: '24px' }}>
            Luxury clothing for the modern individual. Crafted with intention, worn with purpose.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[FiInstagram, FiTwitter, FiYoutube].map((Icon, i) => (
              <button key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 300ms ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(184,150,62,0.15)'; e.currentTarget.style.borderColor = '#B8963E'; e.currentTarget.style.color = '#B8963E' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
              ><Icon size={15} /></button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {[
          { title: 'Shop', links: ['Men', 'Women', 'Kids', 'Accessories', 'Sale', 'New In'] },
          { title: 'Help', links: ['FAQ', 'Shipping', 'Returns', 'Size Guide', 'Contact'] },
          { title: 'Company', links: ['Our Story', 'Sustainability', 'Press', 'Careers'] }
        ].map(col => (
          <div key={col.title}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'white', marginBottom: '20px' }}>{col.title}</p>
            {col.links.map(link => (
              <a key={link} href="#" style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.35)', marginBottom: '12px', transition: 'color 300ms ease', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
              >{link}</a>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: '1400px', margin: '48px auto 0', padding: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>© 2024 Velour. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy Policy', 'Terms', 'Cookies'].map(l => (
            <a key={l} href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.25)', transition: 'color 300ms ease', textDecoration: 'none' }}
              onMouseEnter={e => e.target.style.color = 'white'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
