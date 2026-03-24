import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import useAuthStore from './store/useAuthStore'
import useCartStore from './store/useCartStore'
import useWishlistStore from './store/useWishlistStore'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'))
const AccountPage = lazy(() => import('./pages/AccountPage'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'))
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'))

const NO_FOOTER_ROUTES = ['/login', '/register', '/admin']

function App() {
  const location = useLocation()
  const hydrate = useAuthStore(s => s.hydrate)
  const fetchCart = useCartStore(s => s.fetchCart)
  const fetchWishlist = useWishlistStore(s => s.fetchWishlist)

  useEffect(() => {
    hydrate()
    fetchCart()
    fetchWishlist()
  }, [])

  const isAdminRoute = location.pathname.startsWith('/admin')
  const showFooter = !NO_FOOTER_ROUTES.some(r => location.pathname.startsWith(r))
  const showNavbar = !isAdminRoute

  return (
    <>
      {showNavbar && <Navbar />}
      <CartDrawer />
      <div className="page-enter" style={{ paddingTop: isAdminRoute ? 0 : '68px' }}>
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECEEF0' }}><LoadingSpinner /></div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
      {showFooter && <Footer />}
    </>
  )
}

export default App
