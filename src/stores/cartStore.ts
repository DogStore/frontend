// src/stores/cartStore.ts
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from '@/types/product'
import type { Coupon } from '@/types/coupon'
import { userApi } from '@/services/api'

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([])
  const cartCount = ref(0)

  /* ---------- COUPON STATE ---------- */
  const appliedCoupon = ref<Coupon | null>(null)
  const couponError = ref<string | null>(null)
  const applyingCoupon = ref(false)

  /* ---------- STORAGE ---------- */

  function loadFromStorage() {
    const storedCart = localStorage.getItem('cart')
    const storedCoupon = localStorage.getItem('coupon')

    cartItems.value = storedCart ? JSON.parse(storedCart) : []
    appliedCoupon.value = storedCoupon ? JSON.parse(storedCoupon) : null

    cartCount.value = cartItems.value.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))

    if (appliedCoupon.value) {
      localStorage.setItem('coupon', JSON.stringify(appliedCoupon.value))
    } else {
      localStorage.removeItem('coupon')
    }
  }

  /* ================= GETTERS ================= */

  const totalItems = computed(() => cartCount.value)

  const subtotal = computed(() =>
    cartItems.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  )

  const delivery = computed(() =>
    totalItems.value === 0 ? 0 : subtotal.value > 50 ? 0 : 5
  )

  const taxes = computed(() =>
    totalItems.value === 0 ? 0 : subtotal.value * 0.05
  )

  // DO NOT allow discount if cart is empty
  const discount = computed(() => {
    if (!appliedCoupon.value || totalItems.value === 0) return 0

    if (appliedCoupon.value.type === 'percent') {
      return (subtotal.value * appliedCoupon.value.value) / 100
    }

    return appliedCoupon.value.value
  })

  const total = computed(() =>
    totalItems.value === 0
      ? 0
      : subtotal.value + delivery.value + taxes.value - discount.value
  )

  /* ================= CART ACTIONS ================= */

  function addToCart(product: Product) {
    const item = cartItems.value.find(p => p.id === product.id)

    if (item) item.quantity += 1
    else cartItems.value.push({ ...product, quantity: 1 })

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

    // If cart empty → remove coupon
    if (cartCount.value === 0) {
      appliedCoupon.value = null
      couponError.value = null
      localStorage.removeItem('coupon')
    }

    saveCart()
  }

  function clearCart() {
    cartItems.value = []
    cartCount.value = 0
    appliedCoupon.value = null
    couponError.value = null
    saveCart()
  }

  /* ================= COUPON ACTION ================= */

  async function applyCoupon(code: string) {
    if (!code.trim() || subtotal.value <= 0) return

    applyingCoupon.value = true
    couponError.value = null

    try {
      const res = await userApi.post('/orders/validate-coupon', {
        couponCode: code.trim().toUpperCase(),
        cartTotal: subtotal.value,
      })

      if (!res.data.valid) {
        appliedCoupon.value = null
        couponError.value = res.data.message
        return
      }

      appliedCoupon.value = {
        code: res.data.coupon.code,
        title: res.data.coupon.title,
        type: 'fixed',
        value: res.data.discountAmount,
        isActive: true,
        usageLimitPerUser: 1,
        usedCount: 0,
      } as Coupon

      saveCart()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      appliedCoupon.value = null
      couponError.value =
        err.response?.data?.message || 'Coupon validation failed'
    } finally {
      applyingCoupon.value = false
    }
  }

  function removeCoupon() {
    appliedCoupon.value = null
    couponError.value = null
    saveCart()
  }

  /* ---------- AUTO CLEANUP WATCH ---------- */
  watch(totalItems, (count) => {
    if (count === 0 && appliedCoupon.value) {
      appliedCoupon.value = null
      couponError.value = null
      localStorage.removeItem('coupon')
    }
  })

  loadFromStorage()

  return {
    // State
    cartItems,
    appliedCoupon,
    couponError,
    applyingCoupon,
    // Getters
    cartCount,
    totalItems,
    subtotal,
    delivery,
    taxes,
    discount,
    total,

    // Actions
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    loadFromStorage,
  }
})
