<template>
  <div class="bg-white rounded-2xl shadow p-6">
    <!-- Table Header -->
    <div
      class="grid grid-cols-4 bg-[#FFA500] text-black font-bold text-[16px] rounded-lg py-3 px-4 text-center"
    >
      <span>Product</span>
      <span>Price</span>
      <span>Quantity</span>
      <span>Subtotal</span>
    </div>

    <!-- Cart Items -->
    <div v-if="cartStore.cartItems.length" class="divide-y mt-2">
      <CartItemRow
        v-for="item in cartStore.cartItems"
        :key="item.id"
        :item="item"
      />
    </div>

    <!-- Empty Cart -->
    <EmptyCart v-else class="mt-6" />
  </div>
</template>

<script lang="ts" setup>
import CartItemRow from './CartItemRow.vue'
import EmptyCart from './EmptyCart.vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
</script>
