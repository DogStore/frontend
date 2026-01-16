import { userApi } from './api'

// Get wishlist
export const getWishlist = () => {
  return userApi.get('/wishLists')
}

// Add product to wishlist
export const addToWishlist = (productId: string) => {
  return userApi.post('/wishLists', { productId })
}

// Remove product from wishlist
export const removeFromWishlist = (productId: string) => {
  return userApi.delete(`/wishLists/${productId}`)
}

// Clear wishlist (optional)
export const clearWishlist = () => {
  return userApi.delete('/wishLists')
}
