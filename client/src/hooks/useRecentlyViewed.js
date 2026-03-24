import { useState, useEffect } from 'react'

export default function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('velour_recently_viewed')
    if (stored) setRecentlyViewed(JSON.parse(stored))
  }, [])

  const addToRecentlyViewed = (product) => {
    if (!product?._id) return
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p._id !== product._id)
      const updated = [product, ...filtered].slice(0, 6)
      localStorage.setItem('velour_recently_viewed', JSON.stringify(updated))
      return updated
    })
  }

  return { recentlyViewed, addToRecentlyViewed }
}
