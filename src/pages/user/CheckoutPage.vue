<template>
  <div class="min-h-screen flex flex-col">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import CheckoutHeader from '@/components/Checkout/CheckoutHeader.vue'
import CheckoutForm from '@/components/Checkout/CheckoutForm.vue'
import CheckoutPayment from '@/components/Checkout/CheckoutPayment.vue'
import CheckoutSummary from '@/components/Checkout/CheckoutSummary.vue'

import { useCheckoutStore } from '@/stores/checkoutStore'
import { useUserStore } from '@/stores/userStore'

const checkout = useCheckoutStore()
const user = useUserStore()
const router = useRouter()

onMounted(() => {
  if (!user.token) {
    router.replace('/login')
  }
})

async function handleConfirm() {
  try {
    await checkout.submitOrder()
    router.replace('/order-success')
  } catch (err) {
    console.error(err)
    alert(checkout.error || 'Failed to place order')
  }
}
</script>

