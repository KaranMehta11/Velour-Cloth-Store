import { FiX, FiCircle } from 'react-icons/fi'

const rows = [
  ['XS', '32-34', '26-28', '34-36', '155-160'],
  ['S', '34-36', '28-30', '36-38', '160-165'],
  ['M', '36-38', '30-32', '38-40', '165-170'],
  ['L', '38-40', '32-34', '40-42', '170-175'],
  ['XL', '40-42', '34-36', '42-44', '175-180'],
  ['XXL', '42-44', '36-38', '44-46', '180-185'],
]

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '16px', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto', padding: '40px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontFamily: "'Barlow', sans-serif", fontSize: '30px', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A' }}>Size Guide</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FiX size={22} /></button>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(0,0,0,0.45)', marginBottom: '16px' }}>All measurements in inches</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
          <thead>
            <tr style={{ background: '#0A0A0A', color: 'white' }}>
              {['Size', 'Chest', 'Waist', 'Hips', 'Height'].map((h) => <th key={h} style={{ padding: '10px', fontFamily: "'Inter', sans-serif", fontSize: '12px', textAlign: 'left' }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r[0]} style={{ background: i % 2 === 0 ? 'white' : '#F8F6F2' }}>
                {r.map((c) => <td key={c} style={{ padding: '10px', fontFamily: "'Inter', sans-serif", fontSize: '12px' }}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          {[
            'Chest: Measure around fullest part',
            'Waist: Measure around natural waist',
            'Hips: Measure around fullest part of hips',
          ].map((txt) => (
            <div key={txt} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#0A0A0A' }}>
              <FiCircle size={12} /> {txt}
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px' }}>Still not sure? <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer" style={{ color: '#B8963E' }}>Chat on WhatsApp</a></p>
      </div>
    </div>
  )
}
