import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../api/axios'
import toast from 'react-hot-toast'

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      fetchWishlist: async () => {
        try {
          const res = await api.get('/wishlist')
          set({ items: res.data.wishlist || [] })
        } catch {
          // Silent
        }
      },

      isInWishlist: (productId) => {
        return get().items.some(item => (item._id || item) === productId)
      },

      toggle: async (productId) => {
        const inWishlist = get().isInWishlist(productId)
        try {
          if (inWishlist) {
            await api.delete(`/wishlist/${productId}`)
            set({ items: get().items.filter(item => (item._id || item) !== productId) })
            toast.success('Removed from wishlist')
          } else {
            await api.post(`/wishlist/${productId}`)
            set({ items: [...get().items, productId] })
            toast.success('Added to wishlist')
          }
        } catch (err) {
          if (err.response?.status === 401) {
            toast.error('Please login to use wishlist')
          } else {
            toast.error('Failed to update wishlist')
          }
        }
      },
    }),
    {
      name: 'velour-wishlist',
      partialize: (state) => ({ items: state.items }),
    }
  )
)

export default useWishlistStore
