<template>
  <div
    class="flex flex-col gap-3 py-4 px-4 border-b border-gray-200
           sm:grid sm:grid-cols-4 sm:items-center sm:gap-0"
  >
    <!-- Product -->
    <div class="flex items-center gap-3">
      <button
        @click="cartStore.removeFromCart(item.id)"
        class="text-gray-400 hover:text-red-500 text-xl font-bold"
      >
        ×
      </button>

      <img
        :src="item.images[0]"
        alt="product"
        class="md:h-14 md:w-14 h-10 w-10 sm:h-16 sm:w-16 rounded-lg object-cover"
      />

      <p class="text-gray-800 font-medium leading-tight line-clamp-2 hidden sm:block">
        {{ item.name }}
      </p>
    </div>

    <!-- Mobile Info Row -->
    <div class="flex items-center justify-between text-[12px] sm:text-[14px] sm:hidden">
      <p class="font-semibold text-gray-800">
        ${{ item.price.toFixed(2) }}
      </p>

      <!-- Quantity -->
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

      <p class="font-semibold text-gray-800">
        ${{ (item.price * item.quantity).toFixed(2) }}
      </p>
    </div>

    <!-- Desktop Price -->
    <p class="hidden sm:block text-center font-semibold text-gray-800">
      ${{ item.price.toFixed(2) }}
    </p>

    <!-- Desktop Quantity -->
    <div class="hidden sm:flex justify-center">
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

    <!-- Desktop Subtotal -->
    <p class="hidden sm:block text-center font-semibold text-gray-800">
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
