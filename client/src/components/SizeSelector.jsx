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
              border:'1px solid ' + (isSelected ? '#B8963E' : 'rgba(184,150,62,0.2)'),
              backgroundColor:isSelected ? 'rgba(184,150,62,0.08)' : 'transparent',
              color:isSelected ? '#B8963E' : unavailable ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)',
              cursor:unavailable ? 'not-allowed' : 'pointer',
              opacity:unavailable ? 0.4 : 1,
              transition:'all 300ms ease',
              textTransform:'uppercase'
            }}
            onMouseEnter={e => {
              if(!unavailable && !isSelected) {
                e.currentTarget.style.borderColor = '#B8963E'
                e.currentTarget.style.backgroundColor = 'rgba(184,150,62,0.05)'
              }
            }}
            onMouseLeave={e => {
              if(!unavailable && !isSelected) {
                e.currentTarget.style.borderColor = 'rgba(184,150,62,0.2)'
                e.currentTarget.style.backgroundColor = 'transparent'
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

