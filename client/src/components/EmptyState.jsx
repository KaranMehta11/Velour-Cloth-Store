import { Link } from 'react-router-dom'

export default function EmptyState({ icon, title, desc, linkTo, linkLabel }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      {icon && <div className="text-5xl mb-4">{icon}</div>}
      <h3 className="font-serif text-2xl text-velour-text mb-2">{title}</h3>
      {desc && <p className="text-velour-muted mb-6 max-w-sm">{desc}</p>}
      {linkTo && (
        <Link to={linkTo} className="btn-primary">
          {linkLabel || 'Go Back'}
        </Link>
      )}
    </div>
  )
}
