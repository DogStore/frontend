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
    <div v-if="cartItems.length" class="divide-y mt-2">
      <CartItemRow
        v-for="item in cartItems"
        :key="item.id"
        :item="item"
        @update-quantity="updateQuantity"
        @remove-item="removeItem"
      />
    </div>

    <!-- Empty Cart -->
    <EmptyCart v-else class="mt-6" />
  </div>
</template>

<script lang="ts" setup>
//import { computed } from 'vue'
import CartItemRow from './CartItemRow.vue'
import EmptyCart from './EmptyCart.vue'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

const props = defineProps<{ cartItems: CartItem[] }>()
const emit = defineEmits(['update-cart'])

function updateQuantity(id: number, qty: number) {
  const updated = props.cartItems.map(i =>
    i.id === id ? { ...i, quantity: qty } : i
  )
  emit('update-cart', updated)
}

function removeItem(id: number) {
  const updated = props.cartItems.filter(i => i.id !== id)
  emit('update-cart', updated)
}
</script>
