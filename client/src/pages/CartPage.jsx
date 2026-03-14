import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTrash2, FiShoppingBag } from 'react-icons/fi'
import useCartStore from '../store/useCartStore'
import useAuthStore from '../store/useAuthStore'

export default function CartPage() {
  const { items, updateItem, removeItem, total } = useCartStore()
  const { user } = useAuthStore()
  const cartTotal = total()
  const shipping = cartTotal > 0 ? (cartTotal >= 100 ? 0 : 10) : 0
  const tax = cartTotal * 0.08
  const orderTotal = cartTotal + shipping + tax

  return (
    <div className="bg-velour-bg min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-serif text-4xl mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FiShoppingBag size={56} className="text-gray-300 mb-4" />
            <h2 className="font-serif text-2xl mb-2">Your cart is empty</h2>
            <p className="text-velour-muted mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Explore our collections to find something you love.</p>
            <Link to="/shop" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => {
                const product = item.product || {}
                const price = product.discountPrice || product.price || item.price || 0
                const imgUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-4 bg-white p-4"
                  >
                    <Link to={`/product/${product._id}`}>
                      <img src={imgUrl} alt={product.name} className="w-24 h-32 object-cover bg-gray-100 flex-shrink-0" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${product._id}`} className="font-serif font-medium hover:text-velour-accent transition-colors line-clamp-2">
                        {product.name || item.name}
                      </Link>
                      <div className="text-xs text-velour-muted mt-1 space-y-0.5">
                        {item.size && <p>Size: {item.size}</p>}
                        {item.color && <p>Color: {item.color}</p>}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200">
                          <button
                            onClick={() => item.qty > 1 ? updateItem(item._id, item.qty - 1) : removeItem(item._id)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-sm"
                          >-</button>
                          <span className="w-10 text-center text-sm">{item.qty}</span>
                          <button
                            onClick={() => updateItem(item._id, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-sm"
                          >+</button>
                        </div>
                        <span className="font-semibold">${(price * item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-gray-300 hover:text-red-400 transition-colors self-start"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </motion.div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white p-6 sticky top-28">
                <h2 className="font-serif text-xl mb-6">Order Summary</h2>

                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-velour-muted">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-velour-muted">Shipping</span>
                    <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-velour-muted">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-semibold text-base border-t border-gray-100 pt-4 mb-6">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>

                {/* Promo code */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-velour-text"
                  />
                  <button className="px-4 py-2 text-sm border border-gray-200 hover:bg-gray-50 transition-colors font-medium">
                    Apply
                  </button>
                </div>

                <Link
                  to={user ? '/checkout' : '/login'}
                  className="block w-full bg-velour-accent text-white text-center py-4 font-medium hover:opacity-90 transition-opacity"
                >
                  {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                </Link>

                {cartTotal < 100 && (
                  <p className="text-xs text-velour-muted text-center mt-3">
                    Add ${(100 - cartTotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
