export default function SizeSelector({ sizes = [], selected, onSelect, outOfStock = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map(size => {
        const unavailable = outOfStock.includes(size)
        return (
          <button
            key={size}
            onClick={() => !unavailable && onSelect(size)}
            disabled={unavailable}
            className={`w-12 h-10 text-sm font-medium border transition-all duration-200 rounded-full ${
              unavailable
                ? 'border-gray-200 text-gray-300 cursor-not-allowed line-through'
                : selected === size
                  ? 'border-velour-text bg-velour-text text-white'
                  : 'border-gray-300 text-velour-text hover:border-velour-text'
            }`}
          >
            {size}
          </button>
        )
      })}
    </div>
  )
}
