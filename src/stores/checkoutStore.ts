import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { publicApi } from '@/services/api'

/* ================= TYPES ================= */

export type Address = {
  houseNo: string
  street: string
  city: string
  country: string
  postalCode: string
}

export type CustomerInfo = {
  firstName: string
  lastName: string
  phoneCode: string
  phone: string
  address: Address
  note: string
}

export type PaymentData =
  | { method: 'cash'; details: null }
  | { method: 'paypal'; details: { paypalEmail: string } }
  | {
      method: 'visa' | 'mastercard'
      details: {
        cardNumber: string
        expiry: string
        cvc: string
      }
    }

/* ================= STORE ================= */

export const useCheckoutStore = defineStore('checkout', () => {
  const cartStore = useCartStore()

  /* ---------- STATE ---------- */

  const customer = ref<CustomerInfo>({
    firstName: '',
    lastName: '',
    phoneCode: '+855',
    phone: '',
    address: {
      houseNo: '',
      street: '',
      city: '',
      country: '',
      postalCode: '',
    },
    note: '',
  })

  const payment = ref<PaymentData | null>(null)

  const loading = ref(false)
  const error = ref<string | null>(null)

  /* ---------- CUSTOMER VALIDATION ---------- */

  const isPhoneValid = computed(() =>
    /^[0-9]{8,9}$/.test(customer.value.phone)
  )

  const isPostalCodeValid = computed(() =>
    /^[0-9]{4,10}$/.test(customer.value.address.postalCode)
  )

  const isAddressValid = computed(() =>
    !!(
      customer.value.address.houseNo &&
      customer.value.address.street &&
      customer.value.address.city &&
      customer.value.address.country &&
      isPostalCodeValid.value
    )
  )

  const isFormValid = computed(() =>
    !!(
      customer.value.firstName &&
      customer.value.lastName &&
      isPhoneValid.value &&
      isAddressValid.value
    )
  )

  /* ---------- PAYMENT VALIDATION ---------- */

  const isPaymentValid = computed(() => {
    if (!payment.value) return false

    if (payment.value.method === 'cash') return true

    if (payment.value.method === 'paypal') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        payment.value.details.paypalEmail
      )
    }

    // visa / mastercard
    return (
      payment.value.details.cardNumber.length >= 12 &&
      !!payment.value.details.expiry &&
      payment.value.details.cvc.length >= 3
    )
  })

  /* ---------- FINAL CHECK ---------- */

  const canConfirm = computed(() =>
    isFormValid.value &&
    isPaymentValid.value &&
    cartStore.cartItems.length > 0
  )

  /* ---------- HELPERS ---------- */

  function sanitizePhone() {
    customer.value.phone = customer.value.phone.replace(/\D/g, '')
  }

  function sanitizePostalCode() {
    customer.value.address.postalCode =
      customer.value.address.postalCode.replace(/\D/g, '')
  }

  function setPaymentData(data: PaymentData) {
    payment.value = data
  }

  /* ---------- SUBMIT ORDER ---------- */

  async function submitOrder(token: string) {
    if (!canConfirm.value) return

    loading.value = true
    error.value = null

    try {
      const payload = {
        customer: {
          ...customer.value,
          fullPhone: `${customer.value.phoneCode}${customer.value.phone}`,
        },
        payment: payment.value,
        items: cartStore.cartItems,
        totals: {
          subtotal: cartStore.subtotal,
          delivery: cartStore.delivery,
          taxes: cartStore.taxes,
          total: cartStore.total,
        },
      }

      await publicApi.post('/orders', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    payment.value = null
    customer.value = {
      firstName: '',
      lastName: '',
      phoneCode: '+855',
      phone: '',
      address: {
        houseNo: '',
        street: '',
        city: '',
        country: '',
        postalCode: '',
      },
      note: '',
    }
  }

  return {
    /* state */
    customer,
    payment,
    loading,
    error,

    /* validation */
    isFormValid,
    isPhoneValid,
    isPostalCodeValid,
    isAddressValid,
    isPaymentValid,
    canConfirm,

    /* helpers */
    sanitizePhone,
    sanitizePostalCode,
    setPaymentData,

    /* submit */
    submitOrder,
    resetCheckout,
  }
})
