<template>
  <div
    class="relative bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer flex flex-col h-[300px] border border-gray-300 hover:border-orange-300"
    @click="$router.push(`/product/${product.slug || product.id}`)"
  >
    <!-- Wishlist Heart (top-right corner) -->
    <button
      @click.stop="toggleWishlist"
      class="absolute top-4 right-4 z-10 p-2 rounded-full border-orange-400 transition"
    >
      <svg
        class="w-6 h-6 transition-colors"
        :class="isWishlisted ? 'text-orange-500 fill-orange-500' : 'text-gray-400'"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        />
      </svg>
    </button>

    <!-- Product Image with reduced height -->
    <div class="px-4 h-32 flex items-center justify-center">
      <img
        :src="product.images?.[0] || 'https://via.placeholder.com/200'"
        :alt="product.name"
        class="w-full h-full object-contain drop-shadow-md"
      />
    </div>

    <!-- Content section with flex-grow -->
    <div class="flex flex-col grow">
      <!-- Product name with fixed height -->
      <h3 class="text-base font-bold text-gray-800 leading-tight h-8 overflow-hidden">
        {{ product.name }}
      </h3>

      <!-- Stars (smaller) -->
      <div class="flex gap-3 text-xl">
        <span class="text-orange-200">★</span>
        <span class="text-orange-200">★</span>
        <span class="text-orange-200">★</span>
        <span class="text-orange-200">★</span>
      </div>

      <!-- Price + Flag (smaller) -->
      <div class="flex items-center gap-3 mb-2">
        <span class="text-xl font-bold text-orange-500">
          {{ (product.price || 0).toFixed(2) }}$
        </span>
        <img
          v-if="product.countryFlag"
          :src="product.countryFlag"
          :alt="product.countryName"
          class="w-6 h-4 object-cover rounded"
        />
      </div>

      <!-- Add to Cart button at bottom (smaller) -->
      <button
        class="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm py-2 rounded-xl flex items-center justify-center shadow-md transition"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/types/product'

const props = defineProps<{
  product: Product
}>()

const isWishlisted = ref(false)

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value
}
</script>
