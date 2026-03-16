import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiYoutube, FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer style={{backgroundColor:'#0A0A0A', color:'rgba(255,255,255,0.45)'}}>
      <div style={{
        maxWidth:'1400px', margin:'0 auto',
        padding:'80px 64px 0',
        display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr',
        gap:'48px'
      }}>
        {/* Brand col */}
        <div>
          <p style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:'26px', fontStyle:'italic',
            color:'#FDFCFA', letterSpacing:'0.3em', marginBottom:'16px'
          }}>VELOUR</p>
          <p style={{
            fontFamily:"'Jost', sans-serif",
            fontSize:'12px', fontWeight:200,
            lineHeight:1.8, color:'rgba(255,255,255,0.35)',
            maxWidth:'260px', marginBottom:'28px'
          }}>
            Luxury clothing for the modern individual. 
            Crafted with intention, worn with purpose.
          </p>
          <div style={{display:'flex', gap:'16px'}}>
            {[
              { Icon: FiInstagram, href: '#' },
              { Icon: FiTwitter, href: '#' },
              { Icon: FiYoutube, href: '#' },
              { Icon: FiMail, href: '#' }
            ].map((item, i) => (
              <a key={i} href={item.href} style={{
                width:'36px', height:'36px', borderRadius:'50%',
                backgroundColor:'rgba(255,255,255,0.05)',
                border:'1px solid rgba(255,255,255,0.08)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'rgba(255,255,255,0.4)',
                transition:'all 300ms ease', cursor:'pointer'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(184,150,62,0.15)'
                  e.currentTarget.style.borderColor = '#B8963E'
                  e.currentTarget.style.color = '#B8963E'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                }}>
                <item.Icon size={15}/>
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {[
          { title:'SHOP', links:['Men','Women','Accessories','Sale','New Arrivals'] },
          { title:'HELP', links:['FAQ','Shipping Info','Returns','Size Guide','Contact'] },
          { title:'COMPANY', links:['Our Story','Sustainability','Press','Careers','Blog'] }
        ].map(col => (
          <div key={col.title}>
            <p style={{
              fontFamily:"'Jost', sans-serif", fontSize:'10px',
              textTransform:'uppercase', letterSpacing:'0.25em',
              color:'#FDFCFA', marginBottom:'20px'
            }}>{col.title}</p>
            {col.links.map(link => (
              <a key={link} href="#" className="block gold-underline"
                 style={{
                   fontFamily:"'Jost', sans-serif",
                   fontSize:'12px', fontWeight:200,
                   color:'rgba(255,255,255,0.4)',
                   marginBottom:'12px',
                   transition:'color 300ms ease'
                 }}
                 onMouseEnter={e => e.target.style.color = '#B8963E'}
                 onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
              >{link}</a>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth:'1400px', margin:'0 auto',
        padding:'28px 64px',
        borderTop:'1px solid rgba(255,255,255,0.06)',
        display:'flex', justifyContent:'space-between', alignItems:'center',
        marginTop:'60px'
      }}>
        <p style={{
          fontFamily:"'Jost', sans-serif",
          fontSize:'10px', letterSpacing:'0.1em'
        }}>© 2024 Velour. All rights reserved.</p>
        <div style={{display:'flex', gap:'24px'}}>
          {['Privacy Policy','Terms of Service','Cookie Policy'].map(l => (
            <a key={l} href="#" style={{
              fontFamily:"'Jost', sans-serif",
              fontSize:'10px', color:'rgba(255,255,255,0.3)',
              letterSpacing:'0.05em',
              transition:'color 300ms ease'
            }}
              onMouseEnter={e => e.target.style.color = '#B8963E'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

