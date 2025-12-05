<template>
    <div class="min-h-screen bg-gray-50">
        <CartHeader />

    <div class="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
        <CartTable :cartItems="cartItems" @update-cart="updateCart"/>
        </div>

        <div class="space-y-4">
        <CartSummary :cartItems="cartItems" />
        <CartCoupon />
        </div>
    </div>

        <CartServiceInfo />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CartHeader from '@/components/home/CartHeader.vue'
import CartTable from '@/components/home/CartTable.vue'
import CartSummary from '@/components/home/CartSummary.vue'
import CartCoupon from '@/components/home/CartCoupon.vue'
import CartServiceInfo from '@/components/home/CartServiceInfo.vue'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

// const cartItems = ref<CartItem[]>([
//   { id: 1, name: 'Soft Shell Dog Coat', price: 22.99, quantity: 1, image: '/images/dog-coat.jpg' },
//   { id: 2, name: 'Chew Bone - Chicken', price: 22.99, quantity: 2, image: '/images/chew-bone.jpg' },
//   { id: 3, name: 'Cosy Kingdom Snuggle Bed', price: 32.99, quantity: 1, image: '/images/dog-bed.jpg' },
// ])

const cartItems = ref<CartItem[]>([
  {
    id: 1,
    name: 'Soft Shell Dog Coat',
    price: 22.99,
    quantity: 1,
    image: '/src/assets/image 7.png',
  },
  {
    id: 2,
    name: 'Chew Bone - Chicken',
    price: 22.99,
    quantity: 2,
    image: '/src/assets/image 35.png',
  },
  {
    id: 3,
    name: 'Cosy Kingdom Snuggle Bed',
    price: 32.99,
    quantity: 1,
    image: '/src/assets/image 8.png',
  },
  {
    id: 4,
    name: 'Fun Fam Dog Pajamas',
    price: 22.99,
    quantity: 2,
    image: '/src/assets/image 33.png',
  },
  {
    id: 5,
    name: 'Wolf of Wilderness Adult "Oak Woods"',
    price: 22.99,
    quantity: 3,
    image: '/src/assets/image 24.png',
  },
  {
    id: 6,
    name: 'Dog Overall Mint',
    price: 16.99,
    quantity: 1,
    image: '/src/assets/image 9.png',
  },
])

function updateCart(updatedItems: CartItem[]) {
  cartItems.value = updatedItems
}
</script>
