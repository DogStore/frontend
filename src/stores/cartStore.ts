import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/product'

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  // const cartItems = ref<Product[]>([])
  const cartItems = ref<CartItem[]>([])
  const cartCount = ref<number>(0)

  function loadFromStorage() {
    const stored = localStorage.getItem('cart')
    cartItems.value = stored ? (JSON.parse(stored) as CartItem[]) : []

    cartCount.value = cartItems.value.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
    localStorage.setItem('cartCount', String(cartCount.value))
  }


  /* ------------------ GETTERS ------------------ */

  // const cartCount = computed(() =>
  //   cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  // );

  const totalItems = computed(() => cartCount.value);

  const subtotal = computed(() =>
    cartItems.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  );

  const delivery = computed(() =>
    totalItems.value === 0 ? 0 : subtotal.value > 50 ? 0 : 5
  );

  const taxes = computed(() =>
    totalItems.value === 0 ? 0 : subtotal.value * 0.05
  );

  const discount = computed(() => 0);

  const total = computed(() =>
    totalItems.value === 0
      ? 0
      : subtotal.value + delivery.value + taxes.value - discount.value
  );

  /* ------------------ ACTIONS ------------------ */

  function addToCart(product: Product) {
    const item = cartItems.value.find(p => p.id === product.id)

    if (item) {
      item.quantity += 1
    } else {
      cartItems.value.push({
        ...product,
        quantity: 1,
      })
    }

    cartCount.value = cartItems.value.reduce(
      (sum, item) => sum + item.quantity,
      0
    )

    saveCart()
  }

  function increaseQuantity(productId: string) {
    const item = cartItems.value.find(p => p.id === productId)
    if (!item) return

    item.quantity += 1
    saveCart()
  }

  function decreaseQuantity(productId: string) {
    const item = cartItems.value.find(p => p.id === productId)
    if (!item || item.quantity <= 1) return

    item.quantity -= 1
    saveCart()
  }

  function removeFromCart(productId: string) {
    cartItems.value = cartItems.value.filter(p => p.id !== productId)

    cartCount.value = cartItems.value.reduce(
      (sum, item) => sum + item.quantity,
      0
    )

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
    // state
    cartItems,

    // getters
    cartCount,
    totalItems,
    subtotal,
    delivery,
    taxes,
    discount,
    total,

    // actions
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    loadFromStorage,
  }
})
