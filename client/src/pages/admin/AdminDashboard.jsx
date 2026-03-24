import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import api from '../../api/axios'
import Badge from '../../components/Badge'
import LoadingSpinner from '../../components/LoadingSpinner'

const StatCard = ({ label, value, icon }) => (
  <div style={{
    background:'rgba(28,24,20,0.92)', padding:'24px', border:'1px solid rgba(184,150,62,0.15)'
  }}>
    <p style={{
      fontFamily:"'Jost', sans-serif",
      fontSize:'10px', textTransform:'uppercase', letterSpacing:'0.25em',
      color:'rgba(255,255,255,0.4)', marginBottom:'8px'
    }}>
      {label}
    </p>
    <p style={{
      fontFamily:"'Cormorant Garamond', serif",
      fontSize:'32px', fontWeight:400, color:'#FDFCFA'
    }}>
      {value}
    </p>
    <div style={{
      fontSize:'32px', marginTop:'8px', opacity:0.15
    }}>
      {icon}
    </div>
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
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'center',
      height:'100%'
    }}>
      <LoadingSpinner size="lg" />
    </div>
  )

  if (!stats) return (
    <div style={{padding:'32px', color:'#B8963E', fontFamily:"'Jost', sans-serif"}}>
      <p>Could not load stats. Make sure MongoDB is connected and seed data is loaded.</p>
    </div>
  )

  return (
    <div style={{
      padding:'32px 48px',
      fontFamily:"'Jost', sans-serif"
    }}>
      <h1 style={{
        fontFamily:"'Cormorant Garamond', serif",
        fontSize:'32px', fontWeight:300, color:'#FDFCFA',
        marginBottom:'32px'
      }}>
        Dashboard
      </h1>

      {/* Stat Cards */}
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',
        gap:'16px', marginBottom:'32px'
      }}>
        <StatCard label="Total Revenue" value={`₹${(stats.totalRevenue || 0).toLocaleString('en-IN')}`} icon="↗" />
        <StatCard label="Total Orders" value={`${stats.totalOrders || 0} orders`} icon="↗" />
        <StatCard label="Total Customers" value={stats.totalCustomers || 0} icon="↗" />
        <StatCard label="Products in Stock" value={stats.productsInStock || 0} icon="↗" />
      </div>

      {/* Revenue Last 7 Days */}
      <div style={{ background:'rgba(28,24,20,0.92)', padding:'24px', border:'1px solid rgba(184,150,62,0.15)', marginBottom:'32px' }}>
        <h2 style={{
          color:'#FDFCFA', fontWeight:400, marginBottom:'16px',
          fontFamily:"'Cormorant Garamond', serif", fontSize:'18px'
        }}>
          Revenue Last 7 Days
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={stats.revenueByDay || stats.revenueChart || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="date" tick={{ fill: '#B8963E', fontSize: 11 }} />
            <YAxis tick={{ fill: '#B8963E', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(28,24,20,0.95)', border:'1px solid #B8963E', borderRadius: '4px' }}
              labelStyle={{ color: '#B8963E' }}
              itemStyle={{ color: '#D4AF6A' }}
              formatter={(value) => `₹${Math.round(value).toLocaleString('en-IN')}`}
            />
            <Line type="monotone" dataKey="revenue" stroke="#B8963E" strokeWidth={2} dot={{ fill: '#B8963E' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',
        gap:'32px'
      }}>
        {/* Orders by status */}
        <div style={{ background:'rgba(28,24,20,0.92)', padding:'24px', border:'1px solid rgba(184,150,62,0.15)' }}>
          <h2 style={{ color:'#FDFCFA', fontWeight:400, marginBottom:'16px', fontFamily:"'Cormorant Garamond', serif", fontSize:'18px' }}>
            Orders by Status
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={Object.entries(stats.ordersByStatus || {}).map(([name, value]) => ({ name, value }))}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={80}
              >
                {['#f97316', '#3b82f6', '#22c55e', '#ef4444'].map((c, i) => <Cell key={c + i} fill={c} />)}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div style={{
          background:'rgba(28,24,20,0.92)', padding:'24px',
          border:'1px solid rgba(184,150,62,0.15)'
        }}>
          <h2 style={{
            color:'#FDFCFA', fontWeight:400, marginBottom:'16px',
            fontFamily:"'Cormorant Garamond', serif", fontSize:'18px'
          }}>
            Recent Orders
          </h2>
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            {(stats.recentOrders || []).map(order => (
              <div key={order._id} style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                paddingBottom:'12px', borderBottom:'1px solid rgba(184,150,62,0.1)'
              }}>
                <div>
                  <p style={{
                    fontFamily:"'Jost', sans-serif", fontSize:'11px', fontWeight:500,
                    color:'#FDFCFA', marginBottom:'4px'
                  }}>
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p style={{
                    color:'#B8963E', fontSize:'11px', fontWeight:300
                  }}>
                    {order.user?.name}
                  </p>
                </div>
                <div style={{textAlign:'right'}}>
                  <p style={{
                    color:'#FDFCFA', fontSize:'12px', fontWeight:500, marginBottom:'4px'
                  }}>
                    ₹{(order.totalPrice || 0).toLocaleString('en-IN')}
                  </p>
                  <Badge status={order.status} variant="gold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background:'rgba(28,24,20,0.92)', padding:'24px', border:'1px solid rgba(184,150,62,0.15)', marginTop:'32px' }}>
        <h2 style={{ color:'#FDFCFA', fontWeight:400, marginBottom:'16px', fontFamily:"'Cormorant Garamond', serif", fontSize:'18px' }}>Top Products</h2>
        <table style={{ width:'100%', fontSize:'12px', color:'#FDFCFA' }}>
          <thead>
            <tr>
              <th style={{ textAlign:'left', paddingBottom:'10px' }}>Product</th>
              <th style={{ textAlign:'left', paddingBottom:'10px' }}>Units Sold</th>
              <th style={{ textAlign:'left', paddingBottom:'10px' }}>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {(stats.topProducts || []).slice(0, 5).map((p) => (
              <tr key={p._id}>
                <td style={{ padding:'8px 0' }}>{p.name}</td>
                <td style={{ padding:'8px 0' }}>{p.sold}</td>
                <td style={{ padding:'8px 0', color:'#B8963E' }}>₹{Math.round(p.revenue || 0).toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
