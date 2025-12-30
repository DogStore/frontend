<template>
  <div class=" p-6 space-y-5">
    <h2 class="text-xl font-semibold text-gray-800 mb-3">Payment</h2>
    <p class="text-sm text-gray-600 mb-2">Choose your payment method*</p>

    <div class="space-y-3">
      <!-- Payment Options -->
      <div
        v-for="method in paymentMethods"
        :key="method.id"
        @click="selectedPayment = method.id"
        class="flex items-center justify-between border-2 rounded-[12px] px-5 py-3 cursor-pointer transition hover:border-[#FF6600]"
        :class="selectedPayment === method.id ? 'border-[#FF6600]' : 'border-[#FFAA0C]'"
      >
        <!-- Left side: Icon + Label -->
        <div class="flex items-center gap-3">
          <img
            v-if="method.icon"
            :src="method.icon"
            :alt="method.label"
            class="h-6 object-contain"
          />
          <span
            class="font-semibold text-gray-700"
            :class="method.colorClass"
          >
            {{ method.label }}
          </span>
        </div>

        <!-- Right side: Custom radio -->
        <div
          class="w-5 h-5 border-2 rounded-full flex items-center justify-center"
          :class="selectedPayment === method.id ? 'border-[#FFAA0C]' : 'border-[#FFAA0C]'"
        >
          <div
            v-if="selectedPayment === method.id"
            class="w-2.5 h-2.5 bg-[#FFAA0C] rounded-full"
          ></div>
        </div>
      </div>

      <p
      v-if="!selectedPayment"
      class="text-sm text-red-500 mt-2"
      >
      Please select a payment method
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const emit = defineEmits<{
  (e: 'payment-valid', value: boolean): void
}>()

const selectedPayment = ref<string>('')

watch(
  selectedPayment,
  (val) => {
    emit('payment-valid', !!val)
  },
  { immediate: true }
)

const paymentMethods = [
  {
    id: 'paypal',
    icon: '/src/assets/CartImages/paypal.png',
    colorClass: 'text-blue-600',
  },
  {
    id: 'visa',
    icon: '/src/assets/CartImages/visa.png',
    colorClass: 'text-blue-800',
  },
  {
    id: 'mastercard',
    icon: '/src/assets/CartImages/mastercard.png',
    colorClass: 'text-red-500',
  },
  {
    id: 'cash',
    label: 'By cash',
    icon: '/src/assets/CartImages/Dollar.png',
    colorClass: 'text-gray-700',
  },
]
</script>

