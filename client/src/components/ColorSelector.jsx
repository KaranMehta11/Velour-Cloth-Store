export default function ColorSelector({ colors = [], selected, onSelect }) {
  return (
    <div style={{
      display:'flex', flexWrap:'wrap', gap:'16px', alignItems:'center'
    }}>
      {colors.map(color => (
        <button
          key={color.name}
          onClick={() => onSelect(color.name)}
          title={color.name}
          style={{
            width:'32px', height:'32px', borderRadius:'50%',
            backgroundColor:color.hex,
            border:'2px solid ' + (selected === color.name ? '#B8963E' : 'rgba(184,150,62,0.2)'),
            transition:'all 300ms ease', cursor:'pointer',
            transform:selected === color.name ? 'scale(1.2)' : 'scale(1)',
            outline:'none'
          }}
          onMouseEnter={e => {
            if(selected !== color.name) e.currentTarget.style.transform = 'scale(1.1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = selected === color.name ? 'scale(1.2)' : 'scale(1)'
          }}
        />
      ))}
      {selected && (
        <span style={{
          fontFamily:"'Jost', sans-serif",
          fontSize:'12px', fontWeight:300,
          color:'rgba(255,255,255,0.5)'
        }}>
          {selected}
        </span>
      )}
    </div>
  )
}

