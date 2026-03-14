export default function LoadingSpinner({ size = 'md', color = 'velour-accent' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-10 h-10', lg: 'w-16 h-16' }
  return (
    <div className={`${sizes[size]} border-2 border-gray-200 border-t-velour-accent rounded-full animate-spin`} />
  )
}
