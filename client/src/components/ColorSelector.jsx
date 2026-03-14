export default function ColorSelector({ colors = [], selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {colors.map(color => (
        <button
          key={color.name}
          onClick={() => onSelect(color.name)}
          title={color.name}
          className={`relative w-7 h-7 rounded-full transition-all duration-200 hover:scale-110 ${
            selected === color.name ? 'ring-2 ring-offset-2 ring-velour-text' : ''
          }`}
          style={{ backgroundColor: color.hex }}
        />
      ))}
      {selected && <span className="text-sm text-velour-muted">{selected}</span>}
    </div>
  )
}
