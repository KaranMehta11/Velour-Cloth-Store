import { Link } from 'react-router-dom'

export default function EmptyState({ icon, title, desc, linkTo, linkLabel }) {
  return (
    <div style={{
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      paddingTop:'80px', paddingBottom:'80px', textAlign:'center', paddingLeft:'16px', paddingRight:'16px',
      minHeight:'400px'
    }}>
      {icon && (
        <div style={{
          fontSize:'56px', marginBottom:'24px', opacity:0.7
        }}>
          {icon}
        </div>
      )}
      <h3 style={{
        fontFamily:"'Cormorant Garamond', serif",
        fontSize:'28px', fontWeight:400,
        color:'#0A0A0A', marginBottom:'12px'
      }}>
        {title}
      </h3>
      {desc && (
        <p style={{
          fontFamily:"'Jost', sans-serif",
          fontSize:'14px', fontWeight:200,
          color:'#6B6560', marginBottom:'32px',
          maxWidth:'320px', lineHeight:1.6
        }}>
          {desc}
        </p>
      )}
      {linkTo && (
        <Link to={linkTo} className="btn-gold-pill" style={{
          fontFamily:"'Jost', sans-serif",
          fontSize:'12px', letterSpacing:'0.15em',
          textTransform:'uppercase'
        }}>
          {linkLabel || 'Go Back'}
        </Link>
      )}
    </div>
  )
}
