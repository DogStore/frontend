<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <CheckoutHeader />

    <!-- Main Checkout Section -->
    <div class="flex-grow flex justify-center">
      <div class="w-full max-w-6xl px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left side -->
        <div class="space-y-6">
          <CheckoutForm />
          <CheckoutPayment />
        </div>

        <!-- Right side -->
        <div class="flex flex-col">
          <CheckoutSummary :cartItems="cartItems" />
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import CheckoutHeader from '@/components/Checkout/CheckoutHeader.vue'
import CheckoutForm from '@/components/Checkout/CheckoutForm.vue'
import CheckoutPayment from '@/components/Checkout/CheckoutPayment.vue'
import CheckoutSummary from '@/components/Checkout/CheckoutSummary.vue'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

const route = useRoute()
const cartItems = route.query.cart
  ? (JSON.parse(route.query.cart as string) as CartItem[])
  : []
</script>
