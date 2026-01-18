<template>
  <div class="p-6 rounded-2xl">
    <h2 class="text-xl font-bold mb-3">Any Coupon?</h2>

    <!-- APPLY COUPON (only if no coupon applied) -->
    <div v-if="!cartStore.appliedCoupon" class="flex gap-2">
      <input
        v-model="code"
        placeholder="Enter coupon code"
        class="flex-1 border border-[#FF6600]
                focus:ring-1 focus:ring-[#FF6600]
                rounded-lg px-3 py-2 outline-none"
        :disabled="cartStore.applyingCoupon || cartStore.totalItems === 0"
      />

      <button
        @click="apply"
        :disabled="cartStore.applyingCoupon || cartStore.totalItems === 0"
        class="bg-[#FF6600] text-white px-4 py-2 rounded-lg
                disabled:opacity-60 hover:bg-[#e65500]"
      >
        {{ cartStore.applyingCoupon ? 'Applying...' : 'Apply' }}
      </button>
    </div>

    <!-- ERROR -->
    <p v-if="cartStore.couponError" class="text-red-500 mt-2">
      {{ cartStore.couponError }}
    </p>

    <!-- APPLIED COUPON -->
    <div
      v-if="cartStore.appliedCoupon"
      class="flex items-center justify-between mt-3 bg-green-50
              border border-green-200 rounded-lg px-3 py-2"
    >
      <p class="text-green-700">
        Coupon <b>{{ cartStore.appliedCoupon.code }}</b> applied
      </p>

      <button
        @click="remove"
        class="text-sm text-red-600 hover:underline"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
const code = ref('')

function apply() {
  if (!code.value.trim()) return
  cartStore.applyCoupon(code.value)
}

/* Clear input once coupon is applied */
watch(
  () => cartStore.appliedCoupon,
  (val) => {
    if (val) code.value = ''
  }
)

function remove() {
  cartStore.removeCoupon()
}
</script>
