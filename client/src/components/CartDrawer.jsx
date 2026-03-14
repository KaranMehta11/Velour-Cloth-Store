import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore'

export default function CartDrawer() {
  const { items, isOpen, setOpen, updateItem, removeItem, total } = useCartStore()
  const cartTotal = total()
  const shipping = cartTotal > 100 ? 0 : 10

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white z-50 flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="font-serif text-xl font-semibold">Your Cart ({items.length})</h2>
              <button onClick={() => setOpen(false)} className="p-1 hover:text-velour-accent transition-colors">
                <FiX size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <FiShoppingBag size={48} className="text-gray-300" />
                  <p className="text-velour-muted">Your cart is empty</p>
                  <Link
                    to="/shop"
                    onClick={() => setOpen(false)}
                    className="text-velour-accent font-medium text-sm hover:underline"
                  >
                    Continue Shopping →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const product = item.product || {}
                    const imgUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200'
                    const price = product.discountPrice || product.price || item.price || 0
                    return (
                      <div key={item._id} className="flex gap-3 pb-4 border-b border-gray-100">
                        <img
                          src={imgUrl}
                          alt={product.name || item.name}
                          className="w-20 h-24 object-cover bg-gray-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-sm font-medium line-clamp-2">{product.name || item.name}</p>
                          {item.size && <p className="text-xs text-velour-muted mt-0.5">Size: {item.size}</p>}
                          {item.color && <p className="text-xs text-velour-muted">Color: {item.color}</p>}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-gray-200">
                              <button
                                onClick={() => item.qty > 1 ? updateItem(item._id, item.qty - 1) : removeItem(item._id)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                              >-</button>
                              <span className="w-8 text-center text-sm">{item.qty}</span>
                              <button
                                onClick={() => updateItem(item._id, item.qty + 1)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                              >+</button>
                            </div>
                            <span className="text-sm font-semibold">${(price * item.qty).toFixed(2)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-gray-300 hover:text-red-400 transition-colors self-start mt-1"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-velour-muted">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-velour-muted">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between font-semibold mb-4">
                  <span>Total</span>
                  <span>${(cartTotal + shipping).toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setOpen(false)}
                  className="block w-full bg-velour-accent text-white text-center py-3 font-medium hover:opacity-90 transition-opacity"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
