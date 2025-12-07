<template>
    <div class="bg-white p-6 rounded-2xl shadow h-fit">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
        <div class="border-t border-gray-300 my-5"></div>

        <div class="space-y-2 text-gray-600">
          <div class="flex justify-between"><span>Items</span><span>{{ totalItems }}</span></div>
          <div class="flex justify-between"><span>Sub Total</span><span>${{ subtotal.toFixed(2) }}</span></div>
          <div class="flex justify-between"><span>Delivery</span><span>${{ delivery.toFixed(2) }}</span></div>
          <div class="flex justify-between"><span>Taxes</span><span>${{ taxes.toFixed(2) }}</span></div>
          <div class="flex justify-between"><span>Coupon Discount</span><span>-${{ discount.toFixed(2) }}</span></div>
        </div>

        <div class="border-t my-3"></div>

        <div class="flex justify-between text-lg font-semibold text-gray-800">
          <span>Total</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>

        <button
          class="w-full mt-5 bg-[#FFAA0C] hover:bg-[#FF6600]/80 text-white py-2 rounded-lg hover:cursor-pointer font-medium"
        >
          Confirm Order
        </button>
      </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

const props = defineProps<{ cartItems: CartItem[] }>()

// Reuse same summary logic as CartSummary.vue
const subtotal = computed(() =>
  props.cartItems.length ? props.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0) : 0
)
const totalItems = computed(() =>
  props.cartItems.length ? props.cartItems.reduce((sum, i) => sum + i.quantity, 0) : 0
)
const delivery = computed(() => (props.cartItems.length ? (subtotal.value > 50 ? 0 : 5) : 0))
const taxes = computed(() => (props.cartItems.length ? subtotal.value * 0.05 : 0))
const discount = computed(() => (props.cartItems.length ? 0 : 0))
const total = computed(() =>
  props.cartItems.length ? subtotal.value + delivery.value + taxes.value - discount.value : 0
)
</script>