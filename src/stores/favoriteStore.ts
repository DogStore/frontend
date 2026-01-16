import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/types/product'
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '@/services/wishlist.service'

export type FavoriteProduct = Product & {
  addedAt: number
}

// Helper function to get product ID (handles both _id and id)
function getProductId(product: any): string {
  return product.id || product._id || ''
}

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref<FavoriteProduct[]>([])
  const isLoading = ref(false)

  const isLoggedIn = () => !!localStorage.getItem('authToken')

  /* ---------------- LOAD ---------------- */
  async function load() {
    try {
      isLoading.value = true

      // 👤 Guest → localStorage
      if (!isLoggedIn()) {
        const storedFavorites = localStorage.getItem('favorites')
        favorites.value = storedFavorites ? JSON.parse(storedFavorites) : []
        console.log('❤️ Loaded favorites from localStorage:', favorites.value.length, 'items')
        return
      }

      // 🔐 Logged-in → backend
      console.log('❤️ Loading favorites from API...')
      const res = await getWishlist()
      console.log('❤️ API Response:', res.data)

      // Handle different API response structures
      let wishlistItems: any[] = []

      if (res.data.wishlist) {
        // If wishlist is an object with items array
        if (Array.isArray(res.data.wishlist.items)) {
          wishlistItems = res.data.wishlist.items
        }
        // If wishlist is directly an array
        else if (Array.isArray(res.data.wishlist)) {
          wishlistItems = res.data.wishlist
        }
      } else if (res.data.wishList) {
        // Handle alternate naming
        if (Array.isArray(res.data.wishList.items)) {
          wishlistItems = res.data.wishList.items
        } else if (Array.isArray(res.data.wishList)) {
          wishlistItems = res.data.wishList
        }
      }

      // Normalize products - ensure each has an 'id' field
      favorites.value = wishlistItems.map((p: any) => {
        const productId = getProductId(p)
        return {
          ...p,
          id: productId, // Normalize to always use 'id'
          _id: p._id, // Keep original _id if it exists
          addedAt: Date.now(),
        }
      })

      console.log('❤️ Favorites loaded:', favorites.value.length, 'items')
      console.log('❤️ Favorite IDs:', favorites.value.map(f => ({ name: f.name, id: f.id, _id: f.id })))
    } catch (error) {
      console.error('❌ Error loading wishlist:', error)
      // Fallback to empty array on error
      favorites.value = []
    } finally {
      isLoading.value = false
    }
  }

  /* ---------------- SAVE LOCAL ---------------- */
  function saveLocal() {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
    console.log('💾 Favorites saved to localStorage:', favorites.value.length, 'items')
  }

  /* ---------------- TOGGLE ---------------- */
  async function toggleFavorite(product: any) {
    // Ensure favorites is always an array
    if (!Array.isArray(favorites.value)) {
      favorites.value = []
    }

    // Get the product ID (handles both _id and id)
    const productId = getProductId(product)

    if (!productId) {
      console.error('❌ Product has no valid ID:', product)
      return
    }

    console.log('🔍 Looking for product with ID:', productId)
    console.log('🔍 Current favorites IDs:', favorites.value.map(f => getProductId(f)))

    // Find product by comparing IDs (handles both _id and id)
    const index = favorites.value.findIndex((p) => getProductId(p) === productId)
    const exists = index >= 0

    console.log(exists ? '💔 Removing from favorites:' : '❤️ Adding to favorites:', product.name)
    console.log('Found at index:', index)

    // Store previous state for rollback
    const previousFavorites = [...favorites.value]

    // ✅ Optimistic UI
    if (exists) {
      favorites.value.splice(index, 1)
    } else {
      // Normalize the product when adding
      favorites.value.unshift({
        ...product,
        id: productId, // Normalize to always use 'id'
        addedAt: Date.now(),
      })
    }

    console.log('Updated favorites:', favorites.value.length, 'items')

    try {
      if (isLoggedIn()) {
        // 🔐 Sync with backend
        console.log('🔐 Syncing to API with ID:', productId)
        if (exists) {
          await removeFromWishlist(productId)
          console.log('✅ Remove synced to API')
        } else {
          await addToWishlist(productId)
          console.log('✅ Add synced to API')
        }
      } else {
        // 👤 Guest → local only
        saveLocal()
      }
    } catch (err) {
      console.error('❌ Error toggling favorite:', err)
      // Rollback if API fails
      favorites.value = previousFavorites
      console.log('↩️ Rolled back favorites')
      throw err
    }
  }

  /* ---------------- CHECK IF FAVORITE ---------------- */
  function isFavorite(product: any): boolean {
    const productId = getProductId(product)
    return favorites.value.some(f => getProductId(f) === productId)
  }

  /* ---------------- INIT ---------------- */
  load()

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite,
    load,
  }
})
