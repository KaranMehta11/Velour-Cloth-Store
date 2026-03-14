import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import api from '../../api/axios'
import Badge from '../../components/Badge'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'

const ORDER_STATUSES = ['Processing', 'Shipped', 'Delivered', 'Cancelled']

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await api.get('/orders')
      setOrders(res.data.orders || [])
    } catch {}
    setLoading(false)
  }

  useEffect(() => {
    document.title = 'Admin Orders — Velour'
    fetchOrders()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status })
      toast.success(`Status updated to ${status}`)
      setOrders(orders.map(o => o._id === id ? { ...o, status } : o))
      if (selected?._id === id) setSelected(s => ({ ...s, status }))
    } catch {
      toast.error('Failed to update status')
    }
  }

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-white mb-8">Orders</h1>

      {loading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : (
        <div className="bg-gray-900 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                {['Order', 'Customer', 'Date', 'Total', 'Status', 'Action'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-gray-400 font-medium text-xs uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr
                  key={order._id}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors cursor-pointer"
                  onClick={() => setSelected(order)}
                >
                  <td className="px-4 py-3 font-mono text-xs text-gray-300">#{order._id.slice(-8).toUpperCase()}</td>
                  <td className="px-4 py-3">
                    <p className="text-white text-xs">{order.user?.name}</p>
                    <p className="text-gray-500 text-xs">{order.user?.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-white font-semibold">${order.totalPrice?.toFixed(2)}</td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <select
                      value={order.status}
                      onChange={e => updateStatus(order._id, e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-gray-300 text-xs px-2 py-1 focus:outline-none focus:border-velour-accent"
                    >
                      {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelected(order) }}
                      className="text-velour-accent text-xs hover:underline"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="text-gray-400 text-center py-12 text-sm">No orders yet.</p>
          )}
        </div>
      )}

      {/* Order Detail Panel */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-40" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-gray-900 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-white font-semibold">
                  Order #{selected._id.slice(-8).toUpperCase()}
                </h2>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white"><FiX size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Customer</p>
                    <p className="text-white">{selected.user?.name}</p>
                    <p className="text-gray-400 text-xs">{selected.user?.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Status</p>
                    <select
                      value={selected.status}
                      onChange={e => updateStatus(selected._id, e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-gray-300 text-sm px-2 py-1.5 focus:outline-none focus:border-velour-accent w-full"
                    >
                      {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Date</p>
                    <p className="text-white text-sm">{new Date(selected.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Payment</p>
                    <span className={`text-xs ${selected.isPaid ? 'text-green-400' : 'text-yellow-400'}`}>
                      {selected.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-xs mb-3">Shipping Address</p>
                  <p className="text-white text-sm">{selected.shippingAddress?.address}</p>
                  <p className="text-gray-400 text-sm">{selected.shippingAddress?.city}, {selected.shippingAddress?.postalCode}</p>
                  <p className="text-gray-400 text-sm">{selected.shippingAddress?.country}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs mb-3">Items ({selected.orderItems?.length})</p>
                  <div className="space-y-3">
                    {selected.orderItems?.map((item, i) => (
                      <div key={i} className="flex gap-3 items-center">
                        <img src={item.image} alt={item.name} className="w-10 h-12 object-cover bg-gray-800" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-medium line-clamp-1">{item.name}</p>
                          <p className="text-gray-400 text-xs">Qty: {item.qty}{item.size ? ` · ${item.size}` : ''}</p>
                        </div>
                        <p className="text-white text-sm">${item.price?.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>${selected.itemsPrice?.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-400"><span>Shipping</span><span>${selected.shippingPrice?.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-400"><span>Tax</span><span>${selected.taxPrice?.toFixed(2)}</span></div>
                  <div className="flex justify-between text-white font-semibold border-t border-gray-800 pt-2"><span>Total</span><span>${selected.totalPrice?.toFixed(2)}</span></div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
