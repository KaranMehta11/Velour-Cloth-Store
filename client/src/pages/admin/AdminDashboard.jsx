import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import api from '../../api/axios'
import Badge from '../../components/Badge'
import LoadingSpinner from '../../components/LoadingSpinner'

const StatCard = ({ label, value, icon }) => (
  <div className="bg-gray-900 p-6 rounded-none">
    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">{label}</p>
    <p className="text-3xl font-semibold text-white">{value}</p>
    <div className="text-4xl mt-2 opacity-20">{icon}</div>
  </div>
)

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Admin Dashboard — Velour'
    api.get('/admin/stats')
      .then(res => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <LoadingSpinner size="lg" />
    </div>
  )

  if (!stats) return (
    <div className="p-8 text-gray-400">
      <p>Could not load stats. Make sure MongoDB is connected and seed data is loaded.</p>
    </div>
  )

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-white mb-8">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Revenue" value={`$${stats.stats?.totalRevenue?.toFixed(0) || 0}`} icon="💰" />
        <StatCard label="Total Orders" value={stats.stats?.totalOrders || 0} icon="📦" />
        <StatCard label="Customers" value={stats.stats?.totalUsers || 0} icon="👥" />
        <StatCard label="Products" value={stats.stats?.totalProducts || 0} icon="🛍️" />
      </div>

      {/* Chart */}
      <div className="bg-gray-900 p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">Revenue (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={stats.revenueChart || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '4px' }}
              labelStyle={{ color: '#F9FAFB' }}
              itemStyle={{ color: '#C9A96E' }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#C9A96E" strokeWidth={2} dot={{ fill: '#C9A96E' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-gray-900 p-6">
          <h2 className="text-white font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {(stats.recentOrders || []).map(order => (
              <div key={order._id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-white font-mono text-xs">#{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-gray-400 text-xs">{order.user?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-white">${order.totalPrice?.toFixed(2)}</p>
                  <Badge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gray-900 p-6">
          <h2 className="text-white font-semibold mb-4">Top Selling</h2>
          <div className="space-y-3">
            {(stats.topProducts || []).map((p, i) => (
              <div key={p._id} className="flex items-center gap-3 text-sm">
                <span className="text-gray-600 w-4 text-right">{i + 1}</span>
                <img src={p.images?.[0]?.url} alt={p.name} className="w-8 h-10 object-cover bg-gray-800" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs line-clamp-1">{p.name}</p>
                  <p className="text-gray-400 text-xs">{p.sold} sold · ${p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
