<template>
  <div class="bg-white p-6 rounded-2xl shadow">
    <h2 class="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
    <div class="border-t border-gray-300 my-5"></div>

    <div class="space-y-2 text-gray-600">
      <div class="flex justify-between"><span>Items</span><span>{{ totalItems }}</span></div>
      <div class="flex justify-between"><span>Sub Total</span><span>${{ subtotal.toFixed(2) }}</span></div>
      <div class="flex justify-between"><span>Delivery</span><span>${{ delivery.toFixed(2) }}</span></div>
      <div class="flex justify-between"><span>Taxes</span><span>${{ taxes.toFixed(2) }}</span></div>
      <div class="flex justify-between"><span>Coupon Discount</span><span>-${{ discount.toFixed(2) }}</span></div>
    </div>

    <div class="border-t my-4"></div>

    <div class="flex justify-between text-lg font-semibold text-gray-800">
      <span>Total</span>
      <span>${{ total.toFixed(2) }}</span>
    </div>

    <button
      class="w-full mt-5 bg-[#FFAA0C] hover:bg-[#FF6600]/80 hover:cursor-pointer text-white py-2 rounded-lg font-medium"
      @click="goToCheckout"
    >
    <img src="/src/assets/Hand Right.png" alt="proceed icon" class="inline-block mr-2" />
      Proceed to Checkout
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

const props = defineProps<{ cartItems: CartItem[] }>()
const router = useRouter()

// --- Computed Totals ---
const subtotal = computed(() => {
  if (!props.cartItems.length) return 0
  return props.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
})

const totalItems = computed(() => {
  if (!props.cartItems.length) return 0
  return props.cartItems.reduce((count, i) => count + i.quantity, 0)
})

const delivery = computed(() => {
  if (!props.cartItems.length) return 0
  return subtotal.value > 50 ? 0 : 5
})

const taxes = computed(() => {
  if (!props.cartItems.length) return 0
  return subtotal.value * 0.05
})

const discount = computed(() => {
  if (!props.cartItems.length) return 0
  return 0 // integrate later with coupon logic
})

const total = computed(() => {
  if (!props.cartItems.length) return 0
  return subtotal.value + delivery.value + taxes.value - discount.value
})

function goToCheckout() {
  if (!props.cartItems.length) return // prevent navigating if empty
  router.push({
    path: '/checkout',
    query: { cart: JSON.stringify(props.cartItems) },
  })
}
</script>
