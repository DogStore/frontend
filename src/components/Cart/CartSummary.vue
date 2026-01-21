<template>
  <div class="bg-white p-6 rounded-2xl shadow">
    <h2 class="text-xl font-semibold mb-4">
      Order Summary
    </h2>

    <!-- SUMMARY -->
    <div class="space-y-2 text-sm">
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

      <div
        v-if="cartStore.discount > 0"
        class="flex justify-between text-green-600 font-medium"
      >
        <span>Coupon Discount</span>
        <span>- ${{ cartStore.discount.toFixed(2) }}</span>
      </div>

      <div
        v-else
        class="flex justify-between text-gray-500"
      >
        <span>Coupon Discount</span>
        <span>$0.00</span>
      </div>
    </div>

    <div class="border-t my-4"></div>

    <!-- TOTAL -->
    <div class="flex justify-between text-lg font-semibold mb-4">
      <span>Total</span>
      <span>${{ cartStore.total.toFixed(2) }}</span>
    </div>

    <!-- CHECKOUT BUTTON -->
    <button
      @click="handleCheckout"
      :disabled="isDisabled"
      class="w-full py-3 rounded-lg font-semibold transition
        bg-[#FFAA0C] hover:bg-[#FF9900] text-white
        disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
    >
      <span>
        Proceed to Checkout
      </span>
    </button>

    <!-- LOGIN HINT -->
    <p
      v-if="!userStore.token && cartStore.cartCount > 0"
      class="text-xs text-gray-500 mt-3 text-center"
    >
      You will be asked to login before checkout
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useUserStore } from '@/stores/userStore'

const cartStore = useCartStore()
const userStore = useUserStore()
const router = useRouter()

const isDisabled = computed(() =>
  cartStore.cartCount === 0
)

async function handleCheckout() {
  if (cartStore.cartCount === 0) return

  // If logged in → sync cart before checkout
  if (userStore.token) {
    await cartStore.syncCartToBackend()
  }

  router.push('/checkout')
}
</script>
