import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState({ code: '', discountType: 'percentage', discountValue: 10, minOrderValue: 0, maxUses: 100, expiresAt: '' })

  const fetchCoupons = async () => {
    const res = await api.get('/coupon/admin/coupons')
    setCoupons(res.data.coupons || [])
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  const createCoupon = async () => {
    await api.post('/coupon/admin/coupons', form)
    setFormOpen(false)
    fetchCoupons()
  }

  const deleteCoupon = async (id) => {
    await api.delete(`/coupon/admin/coupons/${id}`)
    fetchCoupons()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl">Coupon Management</h1>
        <button onClick={() => setFormOpen(!formOpen)} className="bg-velour-accent text-white px-4 py-2 text-sm">Create Coupon</button>
      </div>

      {formOpen && (
        <div className="bg-gray-900 p-4 mb-6 grid grid-cols-3 gap-3">
          <input className="bg-gray-800 text-white p-2 text-sm" placeholder="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
          <select className="bg-gray-800 text-white p-2 text-sm" value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })}>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
          <input className="bg-gray-800 text-white p-2 text-sm" type="number" placeholder="Value" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })} />
          <input className="bg-gray-800 text-white p-2 text-sm" type="number" placeholder="Min Order" value={form.minOrderValue} onChange={(e) => setForm({ ...form, minOrderValue: Number(e.target.value) })} />
          <input className="bg-gray-800 text-white p-2 text-sm" type="number" placeholder="Max Uses" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: Number(e.target.value) })} />
          <input className="bg-gray-800 text-white p-2 text-sm" type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} />
          <button onClick={createCoupon} className="bg-velour-accent text-white px-4 py-2 text-sm col-span-3">Save Coupon</button>
        </div>
      )}

      <div className="bg-gray-900 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="px-4 py-3 text-left text-gray-400">Code</th>
              <th className="px-4 py-3 text-left text-gray-400">Type</th>
              <th className="px-4 py-3 text-left text-gray-400">Value</th>
              <th className="px-4 py-3 text-left text-gray-400">Uses</th>
              <th className="px-4 py-3 text-left text-gray-400">Expires</th>
              <th className="px-4 py-3 text-left text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c._id} className="border-b border-gray-800">
                <td className="px-4 py-3 text-white">{c.code}</td>
                <td className="px-4 py-3 text-gray-300">{c.discountType}</td>
                <td className="px-4 py-3 text-gray-300">{c.discountValue}</td>
                <td className="px-4 py-3 text-gray-300">{c.usedCount}/{c.maxUses}</td>
                <td className="px-4 py-3 text-gray-300">{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : '—'}</td>
                <td className="px-4 py-3"><button onClick={() => deleteCoupon(c._id)} className="text-red-400">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
