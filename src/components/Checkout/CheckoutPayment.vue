<template>
  <div class="p-6 space-y-5 bg-white rounded-2xl shadow-sm">
    <h2 class="text-xl font-semibold text-gray-800">Payment</h2>
    <p class="text-sm text-gray-600">Choose your payment method*</p>

    <!-- 2-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">

      <!-- LEFT: Payment Methods -->
      <div class="space-y-4">
        <div
          v-for="method in paymentMethods"
          :key="method.id"
          @click="selectMethod(method.id)"
          class="flex items-center justify-between border-2 rounded-xl px-5 py-4 cursor-pointer transition"
          :class="checkout.payment?.method === method.id
            ? 'border-[#FF6600] bg-orange-50'
            : 'border-[#FFAA0C]'"
        >
          <div class="flex items-center gap-3">
            <img :src="method.icon" class="h-6" />
            <span class="font-semibold text-gray-700">
              {{ method.label }}
            </span>
          </div>

          <div class="w-5 h-5 border-2 rounded-full flex items-center justify-center border-[#FFAA0C]">
            <div
              v-if="checkout.payment?.method === method.id"
              class="w-2.5 h-2.5 bg-[#FFAA0C] rounded-full"
            />
          </div>
        </div>

        <p v-if="!checkout.payment" class="text-sm text-red-500">
          Please select a payment method
        </p>
      </div>

      <!-- RIGHT: Payment Details -->
      <div class="bg-white rounded-2xl border border-[#FFAA0C] p-6 min-h-[260px]">
        <h3 class="font-semibold text-gray-800 mb-4">
          Complete your payment details
        </h3>

        <!-- Empty -->
        <div
          v-if="!checkout.payment"
          class="flex items-center justify-center h-[160px] text-gray-400 text-sm"
        >
          Select a payment method to continue
        </div>

        <!-- Cash -->
        <div
          v-else-if="checkout.payment.method === 'cash'"
          class="flex items-center justify-center h-[160px]"
        >
          <p class="text-green-600 font-medium text-center">
            You will pay by cash on delivery
          </p>
        </div>

        <!-- PayPal -->
        <div
          v-else-if="checkout.payment.method === 'paypal'"
          class="space-y-3"
        >
          <label class="font-medium text-gray-700">
            PayPal Email*
          </label>
          <input
            v-model="checkout.payment.details.paypalEmail"
            type="email"
            placeholder="example@email.com"
            class="border border-[#FFAA0C] rounded-lg px-3 py-2 w-full
                    outline-none focus:ring-1 focus:ring-[#FFAA0C]"
          />
        </div>

        <!-- Card -->
        <div
          v-else
          class="space-y-4"
        >
          <input
            v-model="checkout.payment.details.cardNumber"
            placeholder="Card Number"
            class="border border-[#FFAA0C] rounded-lg px-3 py-2 w-full
                    outline-none focus:ring-1 focus:ring-[#FFAA0C]"
          />

          <div class="grid grid-cols-2 gap-4">
            <input
              v-model="checkout.payment.details.expiry"
              placeholder="MM/YY"
              class="border border-[#FFAA0C] rounded-lg px-3 py-2 w-full
                      outline-none focus:ring-1 focus:ring-[#FFAA0C]"
            />
            <input
              v-model="checkout.payment.details.cvc"
              placeholder="CVC"
              class="border border-[#FFAA0C] rounded-lg px-3 py-2 w-full
                      outline-none focus:ring-1 focus:ring-[#FFAA0C]"
            />
          </div>

          <p v-if="!checkout.isPaymentValid" class="text-sm text-red-500">
            Please complete payment details
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCheckoutStore } from '@/stores/checkoutStore'
import type { PaymentMethod } from '@/types/payment'

const checkout = useCheckoutStore()

function selectMethod(method: PaymentMethod) {
  if (method === 'cash') {
    checkout.setPaymentData({ method: 'cash', details: null })
    return
  }

  if (method === 'paypal') {
    checkout.setPaymentData({
      method: 'paypal',
      details: { paypalEmail: '' },
    })
    return
  }

  checkout.setPaymentData({
    method,
    details: {
      cardNumber: '',
      expiry: '',
      cvc: '',
    },
  })
}

const paymentMethods = [
  { id: 'paypal', label: 'PayPal', icon: '/src/assets/CartImages/paypal.png' },
  { id: 'visa', label: 'VISA', icon: '/src/assets/CartImages/visa.png' },
  { id: 'mastercard', label: 'Mastercard', icon: '/src/assets/CartImages/mastercard.png' },
  { id: 'cash', label: 'By cash', icon: '/src/assets/CartImages/Dollar.png' },
] as const
</script>
