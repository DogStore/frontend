<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <CheckoutHeader />

    <!-- Main Checkout Section -->
    <div class="flex-grow flex justify-center">
      <div
        class="w-full max-w-6xl px-6 py-10
              grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <!-- Left side -->
        <div class="space-y-6">
          <CheckoutForm @valid-change="isFormValid = $event" />
          <CheckoutPayment @payment-valid="isPaymentValid = $event" />
        </div>

        <!-- Right side -->
        <div class="flex flex-col">
          <CheckoutSummary
            :canConfirm="canConfirm"
            @confirm="handleConfirm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import CheckoutHeader from '@/components/Checkout/CheckoutHeader.vue'
import CheckoutForm from '@/components/Checkout/CheckoutForm.vue'
import CheckoutPayment from '@/components/Checkout/CheckoutPayment.vue'
import CheckoutSummary from '@/components/Checkout/CheckoutSummary.vue'

const isFormValid = ref(false)
const isPaymentValid = ref(false)

const canConfirm = computed(() =>
  isFormValid.value && isPaymentValid.value
)

function handleConfirm() {
  alert('Order Confirmed! Thank you!')
}
</script>
