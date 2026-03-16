import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTrash2, FiShoppingBag } from 'react-icons/fi'
import useCartStore from '../store/useCartStore'
import useAuthStore from '../store/useAuthStore'

const formatPrice = (price) => {
  if (!price) return '₹0'
  return '₹' + Math.round(price * 83).toLocaleString('en-IN')
}

export default function CartPage() {
  const { items, updateItem, removeItem, total } = useCartStore()
  const { user } = useAuthStore()
  const cartTotal = total()
  const shipping = cartTotal > 0 ? (cartTotal >= 100 ? 0 : 10) : 0
  const tax = cartTotal * 0.08
  const orderTotal = cartTotal + shipping + tax

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 pb-20"
      style={{ backgroundColor: 'var(--color-cream)' }}
    >
      <div className="max-w-1400px mx-auto px-10 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="font-300 mb-2" style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', color: 'var(--color-black)' }}>
            YOUR CART
          </h1>
          <div className="h-px" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <FiShoppingBag size={80} strokeWidth={0.5} style={{ color: 'var(--color-border)', marginBottom: '32px' }} />
            <h2 className="font-300 mb-3" style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', color: 'var(--color-black)' }}>
              Your cart is empty
            </h2>
            <p className="text-sm font-200 mb-8 max-w-md" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}>
              Explore our luxury collections and discover pieces that speak to your refined taste.
            </p>
            <Link
              to="/shop"
              className="px-8 py-4 text-11px font-400 tracking-widest uppercase rounded-none transition-all duration-300 btn-gold"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Items */}
              {items.map((item, idx) => {
                const product = item.product || {}
                const price = product.discountPrice || product.price || item.price || 0
                const imgUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
                const itemTotal = formatPrice(price * item.qty)
                const itemPrice = formatPrice(price)

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-6 py-8"
                    style={{ borderBottom: idx !== items.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                  >
                    {/* Product Image */}
                    <Link to={`/product/${product._id}`} className="flex-shrink-0">
                      <img
                        src={imgUrl}
                        alt={product.name}
                        className="w-24 aspect-square object-cover"
                        style={{ backgroundColor: '#F0EBE3' }}
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <Link to={`/product/${product._id}`}>
                        <p className="font-300 line-clamp-2 hover:text-gold transition-colors" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--color-black)' }}>
                          {product.name || item.name}
                        </p>
                      </Link>
                      <div>
                        {item.size && (
                          <p className="text-11px font-200" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}>
                            Size: {item.size}
                          </p>
                        )}
                        {item.color && (
                          <p className="text-11px font-200" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}>
                            Color: {item.color}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Qty & Price */}
                    <div className="flex gap-4 items-start">
                      {/* Quantity Control */}
                      <div className="flex items-center border rounded-none" style={{ borderColor: 'var(--color-border)' }}>
                        <button
                          onClick={() => item.qty > 1 ? updateItem(item._id, item.qty - 1) : removeItem(item._id)}
                          className="w-8 h-8 flex items-center justify-center text-xs font-200"
                          style={{ color: 'var(--color-black)', borderRight: '1px solid var(--color-border)' }}
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-sm font-300" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-black)' }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateItem(item._id, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center text-xs font-200"
                          style={{ color: 'var(--color-black)', borderLeft: '1px solid var(--color-border)' }}
                        >
                          +
                        </button>
                      </div>

                      {/* Total Price & Remove */}
                      <div className="flex flex-col items-end gap-4">
                        <p className="text-sm font-400" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-black)' }}>
                          {itemTotal}
                        </p>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="transition-all duration-300"
                          style={{ color: 'var(--color-muted)' }}
                          onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
                          onMouseLeave={(e) => e.target.style.color = 'var(--color-muted)'}
                        >
                          <FiTrash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div>
              <div className="sticky" style={{ top: '32px' }}>
                <h2 className="font-300 mb-8" style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', color: 'var(--color-black)' }}>
                  Order Summary
                </h2>

                <div className="space-y-0 mb-8">
                  <div className="flex justify-between text-sm font-200 py-3 border-b" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', borderColor: 'var(--color-border)' }}>
                    <span>SUBTOTAL</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-200 py-3 border-b" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', borderColor: 'var(--color-border)' }}>
                    <span>SHIPPING</span>
                    <span style={{ color: shipping === 0 ? 'var(--color-gold)' : 'var(--color-muted)' }}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-200 py-3 border-b" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', borderColor: 'var(--color-border)' }}>
                    <span>TAX (8%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <span className="font-400 text-base" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-black)' }}>TOTAL</span>
                  <span className="font-400 text-base" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gold)' }}>
                    {formatPrice(orderTotal)}
                  </span>
                </div>

                {/* Promo Code */}
                <div className="flex gap-3 mb-8 mt-8">
                  <input
                    type="text"
                    placeholder="PROMO CODE"
                    className="flex-1 bg-transparent py-3 px-0 text-sm font-300 focus:outline-none placeholder:text-gray-300 placeholder:text-xs"
                    style={{
                      fontFamily: 'var(--font-body)',
                      borderBottom: '1px solid var(--color-border)',
                      color: 'var(--color-black)',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  />
                  <button
                    className="btn-outline text-11px"
                    style={{ fontFamily: 'var(--font-body)', padding: '8px 12px' }}
                  >
                    APPLY
                  </button>
                </div>

                {/* Checkout Button */}
                <Link
                  to={user ? '/checkout' : '/login'}
                  className="block w-full py-5 text-center text-11px font-400 tracking-widest uppercase rounded-none transition-all duration-300 mb-4 btn-gold"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {user ? 'PROCEED TO CHECKOUT' : 'LOGIN TO CHECKOUT'}
                </Link>

                {/* Free Shipping Info */}
                {cartTotal < 100 && (
                  <p className="text-11px font-200 text-center" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}>
                    Add {formatPrice(100 - cartTotal)} for free shipping
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

