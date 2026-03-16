export default function ColorSelector({ colors = [], selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      {colors.map(color => (
        <button
          key={color.name}
          onClick={() => onSelect(color.name)}
          title={color.name}
          className={`relative w-8 h-8 rounded-full transition-all duration-300 hover:scale-125 border-2`}
          style={{
            backgroundColor: color.hex,
            borderColor: selected === color.name ? 'var(--color-gold)' : 'var(--color-border)',
          }}
        />
      ))}
      {selected && <span className="text-sm font-sans font-200" style={{ color: 'var(--color-muted)' }}>{selected}</span>}
    </div>
  )
}

