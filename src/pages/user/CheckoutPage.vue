<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <CheckoutHeader />

    <!-- Main Checkout Section -->
    <div class="flex-grow flex justify-center">
      <div
        class="w-full max-w-6xl px-6 py-6
                grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        <!-- LEFT -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Customer Info -->
          <CheckoutForm />

          <!-- Payment -->
          <CheckoutPayment />
        </div>

        <!-- RIGHT -->
        <div class="lg:col-span-1">
          <div class="sticky top-40">
            <CheckoutSummary
              :canConfirm="checkout.canConfirm"
              @confirm="handleConfirm"
            />

            <!-- Login warning -->
            <p
              v-if="!user.token"
              class="text-sm text-red-500 mt-3 text-center"
            >
              Please log in to place your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckoutHeader from '@/components/Checkout/CheckoutHeader.vue'
import CheckoutForm from '@/components/Checkout/CheckoutForm.vue'
import CheckoutPayment from '@/components/Checkout/CheckoutPayment.vue'
import CheckoutSummary from '@/components/Checkout/CheckoutSummary.vue'

import { useCheckoutStore } from '@/stores/checkoutStore'
import { useUserStore } from '@/stores/userStore'

const checkout = useCheckoutStore()
const user = useUserStore()

async function handleConfirm() {
  if (!user.token) {
    alert('Please login to continue')
    return
  }

  try {
    await checkout.submitOrder()
    alert('Order placed successfully!')
  } catch (err) {
    console.error(err)
    alert(checkout.error || 'Failed to place order')
  }
}
</script>
