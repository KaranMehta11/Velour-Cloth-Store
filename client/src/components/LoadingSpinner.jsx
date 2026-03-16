export default function LoadingSpinner({ size = 'md', color = '#B8963E' }) {
  const sizes = { sm: '20px', md: '40px', lg: '64px' }
  const sizeValue = sizes[size] || sizes['md']
  
  return (
    <div style={{
      width: sizeValue, height: sizeValue,
      border: '2px solid rgba(0,0,0,0.08)',
      borderTopColor: color,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
  )
}
