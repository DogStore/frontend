// src/stores/cartStore.ts
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from '@/types/product'
import type { Coupon } from '@/types/coupon'
import { userApi } from '@/services/api'

/* ================= TYPES ================= */

export interface CartItem extends Product {
  quantity: number
}

/* ================= STORE ================= */

export const useCartStore = defineStore('cart', () => {
  /* ---------- STATE ---------- */
  const cartItems = ref<CartItem[]>([])
  const appliedCoupon = ref<Coupon | null>(null)
  const couponError = ref<string | null>(null)
  const applyingCoupon = ref(false)

  /* ---------- STORAGE ---------- */

  function loadFromStorage() {
    const storedCart = localStorage.getItem('cart')
    const storedCoupon = localStorage.getItem('coupon')

    cartItems.value = storedCart ? JSON.parse(storedCart) : []
    appliedCoupon.value = storedCoupon ? JSON.parse(storedCoupon) : null
  }

  function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))

    if (appliedCoupon.value) {
      localStorage.setItem('coupon', JSON.stringify(appliedCoupon.value))
    } else {
      localStorage.removeItem('coupon')
    }
  }

  /* ================= GETTERS ================= */

  const cartCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subtotal = computed(() =>
    cartItems.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  )

  const delivery = computed(() =>
    cartCount.value === 0 ? 0 : subtotal.value > 50 ? 0 : 5
  )

  const taxes = computed(() =>
    cartCount.value === 0 ? 0 : subtotal.value * 0.05
  )

  const discount = computed(() => {
    if (!appliedCoupon.value || cartCount.value === 0) return 0

    if (appliedCoupon.value.type === 'percent') {
      return (subtotal.value * appliedCoupon.value.value) / 100
    }

    return appliedCoupon.value.value
  })

  const total = computed(() =>
    cartCount.value === 0
      ? 0
      : subtotal.value + delivery.value + taxes.value - discount.value
  )

  /* ================= CART ACTIONS ================= */

  function addToCart(product: Product) {
    const existing = cartItems.value.find(i => i.id === product.id)

    if (existing) {
      existing.quantity += 1
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }

    saveToStorage()
  }

  function increaseQuantity(productId: string) {
    const item = cartItems.value.find(i => i.id === productId)
    if (!item) return

    item.quantity += 1
    saveToStorage()
  }

  function decreaseQuantity(productId: string) {
    const item = cartItems.value.find(i => i.id === productId)
    if (!item || item.quantity <= 1) return

    item.quantity -= 1
    saveToStorage()
  }

  function removeFromCart(productId: string) {
    cartItems.value = cartItems.value.filter(i => i.id !== productId)

    // If cart empty → remove coupon
    if (cartItems.value.length === 0) {
      appliedCoupon.value = null
      couponError.value = null
    }

    saveToStorage()
  }

  function clearCart() {
    cartItems.value = []
    appliedCoupon.value = null
    couponError.value = null
    saveToStorage()
  }

  /* ================= COUPON ACTIONS ================= */

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
        couponError.value = res.data.message || 'Invalid coupon'
        return
      }

      appliedCoupon.value = {
        code: res.data.coupon.code,
        title: res.data.coupon.title,
        type: 'fixed', // backend already calculated discount
        value: res.data.discountAmount,
        isActive: true,
        usageLimitPerUser: 1,
        usedCount: 0,
      } as Coupon

      saveToStorage()
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
    saveToStorage()
  }

  /* ---------- AUTO CLEANUP ---------- */
  watch(cartCount, (count) => {
    if (count === 0 && appliedCoupon.value) {
      appliedCoupon.value = null
      couponError.value = null
      localStorage.removeItem('coupon')
    }
  })

  /* ---------- INIT ---------- */
  loadFromStorage()

  return {
    // state
    cartItems,
    appliedCoupon,
    couponError,
    applyingCoupon,

    // getters
    cartCount,
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
    applyCoupon,
    removeCoupon,
    loadFromStorage
  }
})
