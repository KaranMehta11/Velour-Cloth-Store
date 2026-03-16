export default function SizeSelector({ sizes = [], selected, onSelect, outOfStock = [] }) {
  return (
    <div style={{
      display:'flex', flexWrap:'wrap', gap:'8px'
    }}>
      {sizes.map(size => {
        const unavailable = outOfStock.includes(size)
        const isSelected = selected === size
        
        return (
          <button
            key={size}
            onClick={() => !unavailable && onSelect(size)}
            disabled={unavailable}
            style={{
              padding:'10px 16px', fontSize:'12px', fontWeight:400,
              fontFamily:"'Jost', sans-serif", letterSpacing:'0.1em',
              border:'1px solid ' + (isSelected ? '#B8963E' : '#E8E0D0'),
              backgroundColor:isSelected ? '#B8963E' : 'transparent',
              color:isSelected ? '#FDFCFA' : unavailable ? '#C9B0A3' : '#0A0A0A',
              cursor:unavailable ? 'not-allowed' : 'pointer',
              opacity:unavailable ? 0.4 : 1,
              transition:'all 300ms ease',
              textTransform:'uppercase'
            }}
            onMouseEnter={e => {
              if(!unavailable && !isSelected) {
                e.currentTarget.style.borderColor = '#B8963E'
              }
            }}
            onMouseLeave={e => {
              if(!unavailable && !isSelected) {
                e.currentTarget.style.borderColor = '#E8E0D0'
              }
            }}
          >
            {size}
          </button>
        )
      })}
    </div>
  )
}

