import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useUserStore } from '@/stores/userStore'
import { userApi } from '@/services/api'
import type { ShippingAddress } from '@/types/order'

type PaymentMethod = 'cash' | 'paypal' | 'visa' | 'mastercard'

export const useCheckoutStore = defineStore('checkout', () => {
  const cartStore = useCartStore()
  const userStore = useUserStore()

  /* ---------- STATE ---------- */

  const customer = ref({
    firstName: '',
    lastName: '',
    phoneCode: '+855',
    phone: '',
    address: {
      title: '',
      street: '',
      city: '',
      country: '',
      postalCode: '',
    } as ShippingAddress,
    note: '',
  })

  const payment = ref<{ method: PaymentMethod }>({
    method: 'cash',
  })

  const loading = ref(false)
  const error = ref<string | null>(null)

  /* ---------- VALIDATION ---------- */

  const isPhoneValid = computed(() =>
    /^[0-9]{8,9}$/.test(customer.value.phone)
  )

  const isPostalCodeValid = computed(() =>
    /^[0-9]{4,10}$/.test(customer.value.address.postalCode || '')
  )

  const isFormValid = computed(() =>
    !!(
      customer.value.firstName &&
      customer.value.lastName &&
      isPhoneValid.value &&
      customer.value.address.street &&
      customer.value.address.city &&
      customer.value.address.country &&
      isPostalCodeValid.value
    )
  )

  const isPaymentValid = computed(() => !!payment.value.method)

  const canConfirm = computed(() =>
    isFormValid.value &&
    isPaymentValid.value &&
    cartStore.cartCount > 0 &&
    !!userStore.token
  )

  /* ---------- HELPERS ---------- */

  function sanitizePhone() {
    customer.value.phone = customer.value.phone.replace(/\D/g, '')
  }

  function sanitizePostalCode() {
    customer.value.address.postalCode =
      customer.value.address.postalCode?.replace(/\D/g, '') || ''
  }

  function setPaymentMethod(method: PaymentMethod) {
    payment.value.method = method
  }

  /* ---------- SUBMIT ORDER ---------- */

  async function submitOrder() {
    if (!userStore.token) {
      error.value = 'Please login to continue'
      throw new Error('Not authenticated')
    }

    if (cartStore.cartCount === 0) {
      error.value = 'Cart is empty'
      throw new Error('Cart is empty')
    }

    loading.value = true
    error.value = null

    try {
      await userApi.post('/orders', {
        shippingAddress: customer.value.address,
        phone: `${customer.value.phoneCode}${customer.value.phone}`,
        paymentMethod: payment.value.method,
        appliedCoupon: cartStore.appliedCoupon
          ? { code: cartStore.appliedCoupon.code }
          : undefined,
      })

      cartStore.clearCart()
      resetCheckout()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Checkout failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  /* ---------- RESET ---------- */

  function resetCheckout() {
    payment.value.method = 'cash'
    customer.value = {
      firstName: '',
      lastName: '',
      phoneCode: '+855',
      phone: '',
      address: {
        title: '',
        street: '',
        city: '',
        country: '',
        postalCode: '',
      },
      note: '',
    }
  }

  return {
    customer,
    payment,
    loading,
    error,

    isFormValid,
    isPhoneValid,
    isPostalCodeValid,
    isPaymentValid,
    canConfirm,

    sanitizePhone,
    sanitizePostalCode,
    setPaymentMethod,

    submitOrder,
    resetCheckout,
  }
})
