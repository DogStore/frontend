<template>
  <div class="bg-white p-6 rounded-2xl shadow h-fit">
    <h2 class="text-xl font-semibold mb-4 text-gray-800">
      Order Summary
    </h2>

    <div class="border-t border-gray-300 my-5"></div>

    <div class="space-y-2 text-gray-600">
      <div class="flex justify-between">
        <span>Items</span>
        <span>{{ cartStore.totalItems }}</span>
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

      <div class="flex justify-between">
        <span>Coupon Discount</span>
        <span>- ${{ cartStore.discount.toFixed(2) }}</span>
      </div>
    </div>

    <div class="border-t my-3"></div>

    <div class="flex justify-between text-lg font-semibold text-gray-800">
      <span>Total</span>
      <span>${{ cartStore.total.toFixed(2) }}</span>
    </div>

    <button
      @click="confirmOrder"
      :disabled="!canConfirm || cartStore.totalItems === 0"
      class="w-full mt-5 bg-[#FFAA0C] hover:bg-[#FF6600]/80
             text-white py-2 rounded-lg font-medium
             disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      Confirm Order
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/stores/cartStore'

defineProps<{
  canConfirm: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const cartStore = useCartStore()

function confirmOrder() {
  if (!cartStore.totalItems) return
  emit('confirm')
}
</script>
