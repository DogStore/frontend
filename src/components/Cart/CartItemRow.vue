<template>
  <div class="grid grid-cols-4 items-center py-4 px-4">
    <!-- Product -->
    <div class="flex items-center gap-3">
      <button
        @click="cartStore.removeFromCart(item.id)"
        class="text-gray-400 hover:text-red-500 text-xl font-bold"
      >
        ×
      </button>

      <img
        :src="item.image"
        alt="product"
        class="h-16 w-16 rounded-lg object-cover"
      />

      <p class="text-gray-800 font-medium leading-tight">
        {{ item.name }}
      </p>
    </div>

    <!-- Price -->
    <p class="text-center font-semibold text-gray-800">
      ${{ item.price.toFixed(2) }}
    </p>

    <!-- Quantity -->
    <div class="flex justify-center">
      <div class="flex items-center border border-gray-300 rounded-full overflow-hidden">
        <button
          @click="cartStore.decreaseQuantity(item.id)"
          class="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100"
        >
          −
        </button>

        <div class="px-4 border-x border-gray-300 text-gray-800 font-semibold select-none">
          {{ item.quantity }}
        </div>

        <button
          @click="cartStore.increaseQuantity(item.id)"
          class="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>

    <!-- Subtotal -->
    <p class="text-center font-semibold text-gray-800">
      ${{ (item.price * item.quantity).toFixed(2) }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/stores/cartStore'
import type { CartItem } from '@/stores/cartStore'

const cartStore = useCartStore()
defineProps<{ item: CartItem }>()
</script>
