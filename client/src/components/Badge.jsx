const variants = {
  default: { bg:'#F5F0E8', text:'#0A0A0A', border:'1px solid #E8E0D0' },
  success: { bg:'#ECFDF5', text:'#047857', border:'1px solid #DBEAFE' },
  warning: { bg:'#FFFBEB', text:'#D97706', border:'1px solid #FDE68A' },
  danger: { bg:'#FEF2F2', text:'#DC2626', border:'1px solid #FECACA' },
  gold: { bg:'rgba(184,150,62,0.1)', text:'#B8963E', border:'1px solid rgba(184,150,62,0.2)' },
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
  const style = variants[v]
  
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:'6px',
      padding:'6px 12px', fontSize:'11px', fontWeight:500,
      letterSpacing:'0.05em', borderRadius:'20px',
      backgroundColor:style.bg, color:style.text, border:style.border,
      fontFamily:"'Jost', sans-serif", transition:'all 300ms ease'
    }}>
      {label || status}
    </span>
  )
}
