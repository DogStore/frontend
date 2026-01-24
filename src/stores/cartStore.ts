import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from '@/types/product'
import type { Coupon } from '@/types/coupon'
import { userApi } from '@/services/api'
import { useUserStore } from '@/stores/userStore'

/* ================= TYPES ================= */

export interface CartItem extends Product {
  quantity: number

  // backend identifiers
  cartItemId?: string
  productId?: string
}

/* ================= STORE ================= */

export const useCartStore = defineStore('cart', () => {
  /* ---------- STATE ---------- */
  const cartItems = ref<CartItem[]>([])
  const appliedCoupon = ref<Coupon | null>(null)
  const couponError = ref<string | null>(null)
  const applyingCoupon = ref(false)

  const userStore = useUserStore()

  /* ---------- STORAGE ---------- */

  function loadFromStorage() {
    if (userStore.token) return

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

  const isAuthenticated = computed(() => !!userStore.token)

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
    cartCount.value === 0 ? 0 : subtotal.value * 0.025
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

  async function addToCart(product: Product) {
    //GUEST USER → localStorage ONLY
    if (!isAuthenticated.value) {
      const existing = cartItems.value.find(i => i.id === product.id)

      if (existing) {
        existing.quantity += 1
      } else {
        cartItems.value.push({ ...product, quantity: 1 })
      }

      saveToStorage()
      return
    }

    //LOGGED-IN USER → BACKEND ONLY
    await userApi.post('/carts', {
      productId: product.id,
      quantity: 1
    })

    await fetchBackendCart()
  }

  async function increaseQuantity(id: string) {
    if (isAuthenticated.value) {
      const item = cartItems.value.find(i => i.id === id)
      if (!item?.cartItemId) return

      await userApi.put(`/carts/${item.cartItemId}`, {
        quantity: item.quantity + 1
      })

      await fetchBackendCart()
      return
    }

    // guest logic unchanged
    const item = cartItems.value.find(i => i.id === id)
    if (!item) return
    item.quantity += 1
    saveToStorage()
  }

  async function decreaseQuantity(id: string) {
    if (isAuthenticated.value) {
      const item = cartItems.value.find(i => i.id === id)
      if (!item?.cartItemId || item.quantity <= 1) return

      await userApi.put(`/carts/${item.cartItemId}`, {
        quantity: item.quantity - 1
      })

      await fetchBackendCart()
      return
    }

    const item = cartItems.value.find(i => i.id === id)
    if (!item || item.quantity <= 1) return
    item.quantity -= 1
    saveToStorage()
  }

  async function removeFromCart(id: string) {
    if (isAuthenticated.value) {
      const item = cartItems.value.find(i => i.id === id)
      if (!item?.cartItemId) return

      await userApi.delete(`/carts/${item.cartItemId}`)
      await fetchBackendCart()
      return
    }

    cartItems.value = cartItems.value.filter(i => i.id !== id)
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
        type: 'fixed',
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
  watch(
    () => userStore.token,
    async (token) => {
      if (token) {
        cartItems.value = []

        await syncCartToBackend()
        await fetchBackendCart()
      }
    }
  )

  /* ================= BACKEND SYNC ================= */

  async function initCart() {
    const storedCoupon = localStorage.getItem('coupon')

    if (userStore.token) {
      await fetchBackendCart()

      appliedCoupon.value = storedCoupon
        ? JSON.parse(storedCoupon)
        : null

      return
    }

    // guest
    loadFromStorage()
  }

  async function fetchBackendCart() {
    if (!userStore.token) return

    const res = await userApi.get('/carts')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cartItems.value = res.data.cart.items.map((item: any) => ({
      id: item.product._id,
      productId: item.product._id,
      cartItemId: item._id,
      name: item.name,
      slug: item.slug,
      images: [item.image],
      price: item.price,
      quantity: item.quantity
    }))
  }

  async function syncCartToBackend() {
    // Guests cannot sync
    if (!userStore.token) return

    // If cart already exists in backend, do NOT sync again
    const alreadySynced = cartItems.value.some(item => item.cartItemId)
    if (alreadySynced) return

    for (const item of cartItems.value) {
      await userApi.post('/carts', {
        productId: item.productId ?? item.id,
        quantity: item.quantity
      })
    }
  }

  function clearLocalCart() {
    cartItems.value = []
    appliedCoupon.value = null
    couponError.value = null
    localStorage.removeItem('cart')
    localStorage.removeItem('coupon')
  }

  /* ---------- LOGIN WATCHER: sync cart when user logs in ---------- */
  watch(
    () => userStore.token,
    async (token) => {
      if (token) {
        await syncCartToBackend()
        await fetchBackendCart()
      }
    }
  )

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
    initCart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    loadFromStorage,
    clearLocalCart,
    // backend sync
    syncCartToBackend
  }
})
