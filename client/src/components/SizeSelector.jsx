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
            className={`px-4 py-2 text-sm font-sans font-400 border rounded-none transition-all duration-300 ${
              unavailable
                ? 'opacity-40 cursor-not-allowed'
                : selected === size
                  ? ''
                  : 'hover:border-gold'
            }`}
            style={{
              fontFamily: 'var(--font-body)',
              borderColor: selected === size ? 'var(--color-gold)' : unavailable ? 'var(--color-border)' : 'var(--color-border)',
              backgroundColor: selected === size ? 'var(--color-gold)' : 'transparent',
              color: selected === size ? 'var(--color-off-white)' : unavailable ? 'var(--color-muted)' : 'var(--color-black)',
            }}
          >
            {size}
          </button>
        )
      })}
    </div>
  )
}

