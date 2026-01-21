<template>
  <div class="bg-white p-6 rounded-2xl shadow h-fit">
    <h2 class="text-xl font-semibold mb-4 text-gray-800">
      Order Summary
    </h2>

    <div class="border-t border-gray-300 my-5"></div>

    <!-- Summary rows -->
    <div class="space-y-2 text-gray-600">
      <div class="flex justify-between">
        <span>Items</span>
        <span>{{ cartStore.cartCount }}</span>
      </div>

      <div class="flex justify-between">
        <span>Sub Total</span>
        <span>${{ cartStore.subtotal.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between">
        <span>Delivery</span>
        <span>${{ cartStore.delivery.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between">
        <span>Taxes</span>
        <span>${{ cartStore.taxes.toFixed(2) }}</span>
      </div>

      <!-- Coupon -->
      <div
        v-if="cartStore.appliedCoupon && cartStore.discount > 0"
        class="flex justify-between text-green-600 font-medium"
      >
        <span>
          Coupon Discount
          <span v-if="cartStore.appliedCoupon.type === 'percent'">
            ({{ cartStore.appliedCoupon.value }}%)
          </span>
        </span>
        <span>- ${{ cartStore.discount.toFixed(2) }}</span>
      </div>

      <div v-else class="flex justify-between">
        <span>Coupon Discount</span>
        <span>$0.00</span>
      </div>
    </div>

    <div class="border-t my-3"></div>

    <!-- Total -->
    <div class="flex justify-between text-lg font-semibold text-gray-800">
      <span>Total</span>
      <span>${{ cartStore.total.toFixed(2) }}</span>
    </div>

    <!-- Validation messages -->
    <div class="mt-3 space-y-1 text-sm text-red-500">
      <p v-if="cartStore.cartCount === 0">
        Your cart is empty
      </p>

      <p v-else-if="!canConfirm">
        Please login to place your order
      </p>

      <p v-else-if="!checkout.isFormValid">
        Please complete customer information
      </p>
    </div>

    <!-- Confirm button -->
    <button
      @click="confirmOrder"
      :disabled="!canConfirm"
      class="w-full mt-5 bg-[#FFAA0C] hover:bg-[#FF6600]/80
              text-white py-2 rounded-lg font-medium
              disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
    >
      Confirm Order
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { useCheckoutStore } from '@/stores/checkoutStore'

const props = defineProps<{
  canConfirm: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const cartStore = useCartStore()
const checkout = useCheckoutStore()

function confirmOrder() {
  if (!props.canConfirm) return
  emit('confirm')
}
</script>
