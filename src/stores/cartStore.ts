import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/types/product'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<Product[]>([])
  const cartCount = ref<number>(0)

  function loadFromStorage() {
    cartItems.value = JSON.parse(localStorage.getItem('cart') || '[]')
    cartCount.value = cartItems.value.length
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
    localStorage.setItem('cartCount', String(cartCount.value))
  }

  function addToCart(product: Product) {
    const exists = cartItems.value.some((p) => p.id === product.id)
    if (!exists) {
      cartItems.value.push(product)
      cartCount.value = cartItems.value.length
      saveCart()
    }
  }

  function removeFromCart(productId: string) {
    cartItems.value = cartItems.value.filter((p) => p.id !== productId)
    cartCount.value = cartItems.value.length
    saveCart()
  }

  function clearCart() {
    cartItems.value = []
    cartCount.value = 0
    saveCart()
  }

  // Load at initialization
  loadFromStorage()

  return {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    clearCart,
    loadFromStorage,
  }
})
