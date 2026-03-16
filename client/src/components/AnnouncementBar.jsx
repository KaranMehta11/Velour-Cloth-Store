export default function AnnouncementBar() {
  return (
    <div style={{
      backgroundColor: '#1C1C1C',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 9998
    }}>
      <div className="marquee-track">
        {[1,2].map(i => (
          <span key={i} style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '10px',
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            letterSpacing: '0.25em',
            whiteSpace: 'nowrap',
            paddingRight: '60px'
          }}>
            FREE SHIPPING ABOVE ₹4,999 &nbsp;·&nbsp; 
            NEW COLLECTION NOW LIVE &nbsp;·&nbsp; 
            SUSTAINABLE FABRICS &nbsp;·&nbsp; 
            HANDCRAFTED IN INDIA &nbsp;·&nbsp; 
            EASY 30-DAY RETURNS &nbsp;·&nbsp;
            <span style={{color:'#B8963E'}}> SHOP NOW →</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        ))}
      </div>
    </div>
  )
}
