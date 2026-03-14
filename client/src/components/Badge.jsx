const variants = {
  default: 'bg-gray-100 text-velour-text',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-yellow-50 text-yellow-700',
  danger: 'bg-red-50 text-red-600',
  gold: 'bg-velour-accent text-white',
}

const statusMap = {
  Processing: 'warning',
  Shipped: 'default',
  Delivered: 'success',
  Cancelled: 'danger',
  Paid: 'success',
}

export default function Badge({ label, variant, status }) {
  const v = variant || statusMap[status] || 'default'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${variants[v]}`}>
      {label || status}
    </span>
  )
}
