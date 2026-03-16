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
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h1 className="font-garamond-serif text-5xl font-300 mb-2" style={{ color: 'var(--color-black)' }}>
            YOUR CART
          </h1>
          <div className="h-px" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <FiShoppingBag size={80} strokeWidth={0.5} style={{ color: 'var(--color-border)', marginBottom: '32px' }} />
            <h2 className="font-garamond-serif text-3xl font-300 mb-3" style={{ color: 'var(--color-black)' }}>
              Your cart is empty
            </h2>
            <p className="text-sm font-sans font-200 mb-8 max-w-md" style={{ color: 'var(--color-muted)' }}>
              Explore our luxury collections and discover pieces that speak to your refined taste.
            </p>
            <Link
              to="/shop"
              className="px-8 py-4 text-xs font-sans font-400 tracking-widest uppercase rounded-none transition-all duration-300"
              style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-white)' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-gold-light)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-gold)'}
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items Table */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="grid grid-cols-5 gap-4 mb-8 pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <span className="text-xs font-sans font-400 uppercase tracking-widest" style={{ color: 'var(--color-black)', letterSpacing: '0.2em' }}>PRODUCT</span>
                <span className="text-xs font-sans font-400 uppercase tracking-widest" style={{ color: 'var(--color-black)', letterSpacing: '0.2em' }}>PRICE</span>
                <span className="text-xs font-sans font-400 uppercase tracking-widest" style={{ color: 'var(--color-black)', letterSpacing: '0.2em' }}>QTY</span>
                <span className="text-xs font-sans font-400 uppercase tracking-widest" style={{ color: 'var(--color-black)', letterSpacing: '0.2em' }}>TOTAL</span>
                <span className="text-xs font-sans font-400 uppercase tracking-widest" style={{ color: 'var(--color-black)', letterSpacing: '0.2em' }}></span>
              </div>

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
                    className="grid grid-cols-5 gap-4 py-6 items-center"
                    style={{ borderBottom: idx !== items.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                  >
                    {/* Product */}
                    <Link to={`/product/${product._id}`} className="flex gap-3 items-center col-span-1">
                      <img
                        src={imgUrl}
                        alt={product.name}
                        className="w-16 h-20 object-cover"
                        style={{ backgroundColor: '#F0EBE3' }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-sans font-300 line-clamp-2 hover:text-gold transition-colors" style={{ color: 'var(--color-black)' }}>
                          {product.name || item.name}
                        </p>
                        {item.size && (
                          <p className="text-xs font-sans font-200 mt-1" style={{ color: 'var(--color-muted)' }}>
                            Size: {item.size}
                          </p>
                        )}
                        {item.color && (
                          <p className="text-xs font-sans font-200" style={{ color: 'var(--color-muted)' }}>
                            Color: {item.color}
                          </p>
                        )}
                      </div>
                    </Link>

                    {/* Unit Price */}
                    <p className="text-sm font-sans font-300" style={{ color: 'var(--color-black)' }}>
                      {itemPrice}
                    </p>

                    {/* Quantity Control */}
                    <div className="flex items-center border rounded-none w-fit" style={{ borderColor: 'var(--color-border)' }}>
                      <button
                        onClick={() => item.qty > 1 ? updateItem(item._id, item.qty - 1) : removeItem(item._id)}
                        className="w-8 h-8 flex items-center justify-center text-xs font-200"
                        style={{ color: 'var(--color-black)', borderRight: '1px solid var(--color-border)' }}
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-sans font-300" style={{ color: 'var(--color-black)' }}>
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

                    {/* Total */}
                    <p className="text-sm font-sans font-400" style={{ color: 'var(--color-black)' }}>
                      {itemTotal}
                    </p>

                    {/* Delete */}
                    <button
                      onClick={() => removeItem(item._id)}
                      className="transition-all duration-300"
                      style={{ color: 'var(--color-muted)' }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
                      onMouseLeave={(e) => e.target.style.color = 'var(--color-muted)'}
                    >
                      <FiTrash2 size={16} strokeWidth={1.5} />
                    </button>
                  </motion.div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div>
              <div className="sticky top-28">
                <h2 className="font-garamond-serif text-2xl font-300 mb-8" style={{ color: 'var(--color-black)' }}>
                  ORDER SUMMARY
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm font-sans font-200" style={{ color: 'var(--color-muted)' }}>
                    <span>SUBTOTAL</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-sans font-200" style={{ color: 'var(--color-muted)' }}>
                    <span>SHIPPING</span>
                    <span style={{ color: shipping === 0 ? 'var(--color-gold)' : 'var(--color-muted)' }}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-sans font-200" style={{ color: 'var(--color-muted)' }}>
                    <span>TAX (8%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between pb-8 mb-8" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <span className="font-sans font-400 text-sm" style={{ color: 'var(--color-black)' }}>TOTAL</span>
                  <span className="font-sans font-400 text-lg" style={{ color: 'var(--color-gold)' }}>
                    {formatPrice(orderTotal)}
                  </span>
                </div>

                {/* Promo Code */}
                <div className="flex gap-3 mb-8">
                  <input
                    type="text"
                    placeholder="PROMO CODE"
                    className="flex-1 bg-transparent py-3 px-0 text-sm font-sans font-300 focus:outline-none placeholder:text-gray-300 placeholder:text-xs"
                    style={{
                      borderBottom: '1px solid var(--color-border)',
                      color: 'var(--color-black)',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  />
                  <button
                    className="px-4 text-xs font-sans font-400 uppercase tracking-widest transition-all duration-300"
                    style={{ color: 'var(--color-gold)' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-gold-light)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-gold)'}
                  >
                    APPLY
                  </button>
                </div>

                {/* Checkout Button */}
                <Link
                  to={user ? '/checkout' : '/login'}
                  className="block w-full py-4 text-center text-xs font-sans font-400 tracking-widest uppercase rounded-none transition-all duration-300 mb-4"
                  style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-white)' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-gold-light)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-gold)'}
                >
                  {user ? 'PROCEED TO CHECKOUT' : 'LOGIN TO CHECKOUT'}
                </Link>

                {/* Free Shipping Info */}
                {cartTotal < 100 && (
                  <p className="text-xs font-sans font-200 text-center" style={{ color: 'var(--color-muted)' }}>
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

