import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/types/product'
import {
  getCart,
  addToCartApi,
  removeFromCartApi,
  clearCartApi,
} from '@/services/cart.service'

// Helper function to get product ID (handles both _id and id)
function getProductId(product: any): string {
  return product.id || product._id || product.productId || ''
}

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<Product[]>([])
  const cartCount = ref(0)
  const isLoading = ref(false)

  const isLoggedIn = () => !!localStorage.getItem('authToken')

  /* ---------------- LOAD ---------------- */
  async function load() {
    try {
      isLoading.value = true

      // 👤 Guest
      if (!isLoggedIn()) {
        const storedCart = localStorage.getItem('cart')
        cartItems.value = storedCart ? JSON.parse(storedCart) : []
        cartCount.value = cartItems.value.length
        console.log('📦 Loaded cart from localStorage:', cartItems.value.length, 'items')
        console.log('📦 LocalStorage cart IDs:', cartItems.value.map(p => ({
          name: p.name,
          id: getProductId(p)
        })))
        return
      }

      // 🔐 Logged in
      console.log('📦 Loading cart from API...')
      const res = await getCart()
      console.log('📦 RAW API Response:', JSON.stringify(res.data, null, 2))

      // Handle different API response structures
      let items: any[] = []

      if (res.data.cart) {
        // If cart is an object with items array
        if (Array.isArray(res.data.cart.items)) {
          items = res.data.cart.items
          console.log('📦 Found cart.items array:', items.length, 'items')
        }
        // If cart is directly an array
        else if (Array.isArray(res.data.cart)) {
          items = res.data.cart
          console.log('📦 Found cart as array:', items.length, 'items')
        }
      }

      console.log('📦 Items before normalization:', items)

      // Normalize products - ensure each has an 'id' field
      cartItems.value = items.map((item: any) => {
        // Check if the item has a nested product object
        const product = item.product || item.productId || item

        // Get the ID from various possible locations
        const productId = getProductId(product) || getProductId(item)

        console.log('📦 Processing item:', {
          itemStructure: Object.keys(item),
          hasProduct: !!item.product,
          hasProductId: !!item.productId,
          extractedId: productId,
          productName: product.name || item.name
        })

        return {
          ...product,
          id: productId, // Normalize to always use 'id'
          _id: product._id || item._id, // Keep original _id if it exists
          productId: item.productId // Keep productId reference if it exists
        }
      })

      cartCount.value = cartItems.value.length
      console.log('📦 Cart loaded:', cartItems.value.length, 'items')
      console.log('📦 Normalized Cart IDs:', cartItems.value.map(c => ({
        name: c.name,
        id: c.id,
        _id: c._id,
        productId: c.productId
      })))
    } catch (error) {
      console.error('❌ Error loading cart:', error)
      // Fallback to empty cart on error
      cartItems.value = []
      cartCount.value = 0
    } finally {
      isLoading.value = false
    }
  }

  /* ---------------- LOCAL SAVE ---------------- */
  function saveLocal() {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
    localStorage.setItem('cartCount', String(cartCount.value))
    console.log('💾 Cart saved to localStorage:', cartItems.value.length, 'items')
  }

  /* ---------------- ADD ---------------- */
  async function addToCart(product: any) {
    // Ensure cartItems is always an array
    if (!Array.isArray(cartItems.value)) {
      cartItems.value = []
    }

    const productId = getProductId(product)

    if (!productId) {
      console.error('❌ Product has no valid ID:', product)
      return
    }

    console.log('➕ Checking if product exists in cart...')
    console.log('➕ Looking for ID:', productId)
    console.log('➕ Current cart IDs:', cartItems.value.map(p => getProductId(p)))

    const exists = cartItems.value.some(p => getProductId(p) === productId)
    if (exists) {
      console.log('⚠️ Product already in cart:', product.name)
      return
    }

    // Normalize the product when adding
    const normalizedProduct = {
      ...product,
      id: productId, // Normalize to always use 'id'
    }

    // Optimistic update
    cartItems.value.push(normalizedProduct)
    cartCount.value++
    console.log('➕ Added to cart:', product.name, 'ID:', productId)
    console.log('📦 Cart now has:', cartItems.value.length, 'items')

    try {
      if (isLoggedIn()) {
        console.log('🔐 Syncing add to API with ID:', productId)
        await addToCartApi(productId)
        console.log('✅ Add synced to API')
        // Reload to ensure we have the correct server state
        await load()
      } else {
        saveLocal()
      }
    } catch (error) {
      console.error('❌ Error adding to cart:', error)
      // Rollback on error
      cartItems.value = cartItems.value.filter(p => getProductId(p) !== productId)
      cartCount.value = cartItems.value.length
    }
  }

  /* ---------------- REMOVE ---------------- */
  async function removeFromCart(productIdOrProduct: string | any) {
    // Ensure cartItems is always an array
    if (!Array.isArray(cartItems.value)) {
      cartItems.value = []
      return
    }

    // Get the product ID (handles both string ID or product object)
    const productId = typeof productIdOrProduct === 'string'
      ? productIdOrProduct
      : getProductId(productIdOrProduct)

    if (!productId) {
      console.error('❌ Invalid product ID')
      return
    }

    console.log('🗑️ Attempting to remove product ID:', productId)
    console.log('📦 Current cart IDs:', cartItems.value.map(p => getProductId(p)))

    // Store the item before removing for potential rollback
    const previousItems = [...cartItems.value]

    // Find and remove by comparing IDs
    const initialLength = cartItems.value.length
    cartItems.value = cartItems.value.filter(p => getProductId(p) !== productId)
    const removed = initialLength !== cartItems.value.length

    if (!removed) {
      console.warn('⚠️ Product not found in cart:', productId)
      return
    }

    cartCount.value = cartItems.value.length
    console.log('🗑️ Cart after removal:', cartItems.value.length, 'items')

    try {
      if (isLoggedIn()) {
        console.log('🔐 Syncing remove to API with ID:', productId)
        await removeFromCartApi(productId)
        console.log('✅ Remove synced to API')
      } else {
        saveLocal()
      }
    } catch (error) {
      console.error('❌ Error removing from cart:', error)
      // Rollback on error
      cartItems.value = previousItems
      cartCount.value = previousItems.length
      console.log('↩️ Rolled back cart')
      throw error
    }
  }

  /* ---------------- CLEAR ---------------- */
  async function clearCart() {
    const previousItems = [...cartItems.value]

    cartItems.value = []
    cartCount.value = 0
    console.log('🗑️ Cart cleared')

    try {
      if (isLoggedIn()) {
        console.log('🔐 Syncing clear to API...')
        await clearCartApi()
        console.log('✅ Clear synced to API')
      } else {
        saveLocal()
      }
    } catch (error) {
      console.error('❌ Error clearing cart:', error)
      // Rollback on error
      cartItems.value = previousItems
      cartCount.value = previousItems.length
      throw error
    }
  }

  /* ---------------- CHECK IF IN CART ---------------- */
  function isInCart(product: any): boolean {
    const productId = getProductId(product)
    const result = cartItems.value.some(p => getProductId(p) === productId)
    console.log('🔍 isInCart check:', productId, '→', result)
    return result
  }

  /* ---------------- INIT ---------------- */
  load()

  return {
    cartItems,
    cartCount,
    isLoading,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    load,
  }
})
