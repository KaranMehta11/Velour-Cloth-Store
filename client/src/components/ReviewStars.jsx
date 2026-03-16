import { FiStar } from 'react-icons/fi'

export default function ReviewStars({ rating, size = 14, showCount, count }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:'4px',
      fontFamily:"'Jost', sans-serif"
    }}>
      {[1, 2, 3, 4, 5].map(star => (
        <FiStar
          key={star}
          size={size}
          style={{
            color: star <= Math.round(rating) ? '#B8963E' : '#D4D4D8',
            transition:'color 200ms ease'
          }}
          fill={star <= Math.round(rating) ? 'currentColor' : 'none'}
        />
      ))}
      {showCount && (
        <span style={{
          fontSize:'12px', color:'#6B6560',
          marginLeft:'8px', fontWeight:300
        }}>
          ({count})
        </span>
      )}
    </div>
  )
}
