import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../api/axios'
import toast from 'react-hot-toast'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      setOpen: (open) => set({ isOpen: open }),

      total: () => {
        return get().items.reduce((sum, item) => {
          const price = item.product?.discountPrice || item.product?.price || item.price || 0
          return sum + price * item.qty
        }, 0)
      },

      itemCount: () => get().items.reduce((sum, item) => sum + item.qty, 0),

      fetchCart: async () => {
        try {
          const res = await api.get('/cart')
          set({ items: res.data.cart?.items || [] })
        } catch (err) {
          // Silent fail — user may not be logged in
        }
      },

      addItem: async (productId, qty = 1, size, color) => {
        try {
          const res = await api.post('/cart', { productId, qty, size, color })
          set({ items: res.data.cart?.items || [], isOpen: true })
          toast.success('Added to cart')
        } catch (err) {
          const msg = err.response?.data?.message || 'Failed to add to cart'
          toast.error(msg)
          throw err
        }
      },

      updateItem: async (itemId, qty) => {
        try {
          const res = await api.put(`/cart/${itemId}`, { qty })
          set({ items: res.data.cart?.items || [] })
        } catch (err) {
          toast.error('Failed to update cart')
        }
      },

      removeItem: async (itemId) => {
        try {
          const res = await api.delete(`/cart/${itemId}`)
          set({ items: res.data.cart?.items || [] })
          toast.success('Removed from cart')
        } catch (err) {
          toast.error('Failed to remove item')
        }
      },

      clearCart: async () => {
        try {
          await api.delete('/cart')
          set({ items: [] })
        } catch (err) {
          set({ items: [] })
        }
      },

      // Local-only operations (before API sync)
      addItemLocal: (item) => {
        const items = get().items
        const existing = items.find(i => i.product?._id === item.product?._id && i.size === item.size && i.color === item.color)
        if (existing) {
          set({ items: items.map(i => i === existing ? { ...i, qty: i.qty + 1 } : i) })
        } else {
          set({ items: [...items, { ...item, qty: 1 }] })
        }
      },
    }),
    {
      name: 'velour-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)

export default useCartStore
