import { FiStar } from 'react-icons/fi'

export default function ReviewStars({ rating, size = 14, showCount, count }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <FiStar
          key={star}
          size={size}
          className={star <= Math.round(rating) ? 'text-velour-accent fill-current' : 'text-gray-300'}
        />
      ))}
      {showCount && <span className="text-xs text-velour-muted ml-1">({count})</span>}
    </div>
  )
}
