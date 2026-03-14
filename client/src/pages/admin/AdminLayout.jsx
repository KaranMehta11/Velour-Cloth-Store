import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FiGrid, FiPackage, FiShoppingBag, FiLogOut, FiHome } from 'react-icons/fi'
import useAuthStore from '../../store/useAuthStore'

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/products', label: 'Products', icon: FiShoppingBag },
  { to: '/admin/orders', label: 'Orders', icon: FiPackage },
]

export default function AdminLayout() {
  const { logout, user } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-gray-800">
          <span className="font-serif italic text-xl text-white">Velour</span>
          <p className="text-gray-500 text-xs mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {adminLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-none text-sm transition-colors ${
                  isActive
                    ? 'bg-velour-accent text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              <link.icon size={16} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <FiHome size={16} /> Back to Store
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors w-full text-left"
          >
            <FiLogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto bg-gray-950 text-white">
        <Outlet />
      </main>
    </div>
  )
}
