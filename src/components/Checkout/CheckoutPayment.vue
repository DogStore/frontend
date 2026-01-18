<template>
  <div class="p-6 space-y-5 bg-white rounded-2xl shadow-sm">
    <h2 class="text-xl font-semibold text-gray-800">Payment</h2>
    <p class="text-sm text-gray-600">Choose your payment method*</p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">

      <!-- LEFT: METHODS -->
      <div class="space-y-4">
        <div
          v-for="method in paymentMethods"
          :key="method.id"
          @click="selectMethod(method.id)"
          class="flex items-center justify-between border-2 rounded-xl px-5 py-4 cursor-pointer transition"
          :class="checkout.payment.method === method.id
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
              v-if="checkout.payment.method === method.id"
              class="w-2.5 h-2.5 bg-[#FFAA0C] rounded-full"
            />
          </div>
        </div>
      </div>

      <!-- RIGHT: PAYMENT DETAILS -->
      <div class="bg-white rounded-2xl border border-[#FFAA0C] p-6 min-h-[260px]">
        <h3 class="font-semibold text-gray-800 mb-4">
          Complete your payment details
        </h3>

        <!-- CASH -->
        <div
          v-if="checkout.payment.method === 'cash'"
          class="flex items-center justify-center h-[160px]"
        >
          <p class="text-green-600 font-medium text-center">
            You will pay by cash on delivery
          </p>
        </div>

        <!-- PAYPAL -->
        <div
          v-else-if="checkout.payment.method === 'paypal'"
          class="space-y-3"
        >
          <label class="block font-medium text-gray-700">
            PayPal Email*
          </label>
          <input
            v-model="paypalEmail"
            type="email"
            placeholder="example@email.com"
            class="border border-[#FFAA0C] rounded-lg px-3 py-2 w-full
                    outline-none focus:ring-1 focus:ring-[#FFAA0C]"
          />
        </div>

        <!-- CARD -->
        <div
          v-else
          class="space-y-4"
        >
          <input
            v-model="cardNumber"
            placeholder="Card Number"
            class="border border-[#FFAA0C] rounded-lg px-3 py-2 w-full"
          />

          <div class="grid grid-cols-2 gap-4">
            <input
              v-model="expiry"
              placeholder="MM/YY"
              class="border border-[#FFAA0C] rounded-lg px-3 py-2 w-full"
            />
            <input
              v-model="cvc"
              placeholder="CVC"
              class="border border-[#FFAA0C] rounded-lg px-3 py-2 w-full"
            />
          </div>

          <p class="text-gray-500 text-sm">
            Card details will be processed securely
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCheckoutStore } from '@/stores/checkoutStore'

type PaymentMethod = 'cash' | 'paypal' | 'visa' | 'mastercard'

const checkout = useCheckoutStore()

/* LOCAL INPUT STATE (UI ONLY) */
const paypalEmail = ref('')
const cardNumber = ref('')
const expiry = ref('')
const cvc = ref('')

function selectMethod(method: PaymentMethod) {
  checkout.setPaymentMethod(method)

  // reset UI-only inputs
  paypalEmail.value = ''
  cardNumber.value = ''
  expiry.value = ''
  cvc.value = ''
}

const paymentMethods = [
  { id: 'paypal', label: 'PayPal', icon: '/src/assets/CartImages/paypal.png' },
  { id: 'visa', label: 'VISA', icon: '/src/assets/CartImages/visa.png' },
  { id: 'mastercard', label: 'Mastercard', icon: '/src/assets/CartImages/mastercard.png' },
  { id: 'cash', label: 'By cash', icon: '/src/assets/CartImages/Dollar.png' },
] as const
</script>
