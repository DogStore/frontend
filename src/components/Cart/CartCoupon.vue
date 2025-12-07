<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-3">Any Coupon?</h2>
    <div class="flex gap-2">
      <input
        v-model="coupon"
        type="text"
        placeholder="Enter coupon code here"
        class="flex-1 border-2 border-[#FF6600] focus:ring-1 focus:ring-[#FF6600] outline-none rounded-[10px] px-3 py-2"
      />
      <button
        @click="applyCoupon"
        class="bg-[#FF6600] hover:bg-orange-600 text-white px-3 py-2 rounded-[10px] hover:cursor-pointer whitespace-nowrap"
      >
        Apply Coupon
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const coupon = ref('')
const emit = defineEmits(['apply-coupon'])

function applyCoupon() {
  emit('apply-coupon', coupon.value)
}
</script>
