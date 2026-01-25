<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class=" mb-30 bg-white rounded-2xl shadow-md p-10 text-center max-w-md w-full">
      <div class="flex justify-center mb-5">
        <img
          src="@/assets/Congrats.png"
          alt="Success"
          class="w-55 h-60"
        />
      </div>

      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        Your order is complete!
      </h1>

      <p class="text-gray-500 mb-6">
        Thank you for shopping with us.
      </p>

      <button
        @click="goHome"
        class="px-6 py-3 rounded-full bg-[#FF6600] text-white
               hover:bg-[#e65500] transition cursor-pointer font-medium"
      >
        Continue Shopping
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>
