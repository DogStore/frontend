<template>
  <div
    class="product-card relative flex flex-col items-center bg-white border border-[#FFAA0C] rounded-md p-4 shadow-sm w-60 md:w-full mx-auto cursor-pointer transition-all duration-300 ease-[cubic-bezier(.25,.8,.25,1)] hover:-translate-y-1 hover:z-20 hover:shadow-2xl"
    @click="openDetail"
  >
    <!-- Badges Container - Top Left -->
    <div class="absolute top-2 left-2 z-10 flex flex-col gap-2">
      <!-- Promoted Badge -->
      <span
        v-if="product.isPromoted"
        class="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"
      >
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        HOT
      </span>

      <!-- Discount Badge -->
      <span
        v-if="product.discount > 0"
        class="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
      >
        -{{ product.discount }}%
      </span>

      <!-- Low Stock Badge -->
      <span
        v-if="product.stock > 0 && product.stock <= 5"
        class="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
      >
        {{ product.stock }} LEFT
      </span>
    </div>

    <!-- IMAGE -->
    <div class="relative flex items-center justify-center h-[150px] w-full">
      <img :src="product.images[0]" :alt="product.name" class="h-[120px] object-contain" />

      <!-- Favorite Button -->
      <button
        @click.stop="toggleFavorite"
        class="absolute top-0 right-0 transition hover:scale-110 cursor-pointer"
      >
        <img :src="isFavorite ? HeartFilled : HeartOutline" class="w-[35px] h-[35px]" />
      </button>
    </div>

    <!-- PRODUCT NAME -->
    <h4 class="text-base font-Nunito font-bold text-gray-800 mb-2 text-center h-[38px]">
      {{ product.name }}
    </h4>

    <!-- STARS -->
    <div class="flex gap-4 mt-1 mb-2">
      <img
        v-for="(type, index) in starArray"
        :key="index"
        :src="type === 'full' ? StarFilled : type === 'half' ? StarHalf : StarEmpty"
        class="w-5 h-5 object-contain"
      />
    </div>

    <!-- PRICE SECTION -->
    <div class="w-full mb-3 text-center font-Nunito">
      <div class="flex flex-col items-center gap-1">
        <!-- Current Price and Original Price with Flag -->
        <div class="flex items-center gap-2">
          <span class="text-base text-orange-500 font-bold whitespace-nowrap">
            Price: ${{ product.price.toFixed(2) }}
          </span>
          <!-- Country Flag -->
          <img
            v-if="product.countryFlag"
            :src="product.countryFlag"
            alt="Country flag"
            class="w-8 h-6 object-cover shadow border border-white rounded flex-shrink-0"
          />
        </div>
        <div class="flex gap-8 mt-1">
          <!-- Original Price (if discount exists) -->
          <span v-if="product.discount > 0" class="text-gray-700 line-through text-sm whitespace-nowrap">
            ${{ product.originalPrice.toFixed(2) }}
          </span>
          <!-- Save percentage below -->
          <span v-if="product.discount > 0" class="text-green-600 font-semibold text-xs">
            Save {{ product.discount }}%
          </span>
        </div>

      </div>
    </div>

    <!-- ADD TO CART -->
    <button
      @click.stop="addCart"
      class="w-full px-4 py-2 rounded-md transition font-Nunito flex items-center justify-center gap-2 mt-auto"
      :class="
        isInCart
          ? 'bg-gray-400 text-white cursor-pointer'
          : 'bg-[#FFAA0C] text-white hover:bg-orange-500 cursor-pointer'
      "
    >
      <template v-if="isInCart"> ✔ Added to Cart </template>
      <template v-else>
        <img src="@/assets/HeaderImages/Shopping Cart.png" alt="" class="h-7" />
      </template>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useRecentStore } from '@/stores/recentStore'

import StarFilled from '@/assets/ProductImages/Star-filled.png'
import StarEmpty from '@/assets/ProductImages/Star.png'
import StarHalf from '@/assets/ProductImages/Star Half.png'
import HeartFilled from '@/assets/ProductImages/Heart-filled.png'
import HeartOutline from '@/assets/ProductImages/Heart.png'

import type { Product } from '@/types/product'

// PROPS
const props = defineProps<{
  product: Product
}>()

// STORES
const cart = useCartStore()
const favorite = useFavoriteStore()
const recent = useRecentStore()

// COMPUTED
const isFavorite = computed(() => favorite.favorites.some((p) => p.id === props.product.id))

const isInCart = computed(() => cart.cartItems.some((p) => p.id === props.product.id))

// ACTIONS
function toggleFavorite() {
  favorite.toggleFavorite(props.product)
}

function addCart() {
  cart.addToCart(props.product)
}

function openDetail() {
  recent.addRecent(props.product)
  console.log('OPEN:', props.product.name)
}

// STARS
const starArray = computed(() => {
  const rating = props.product.rating
  return Array.from({ length: 5 }, (_, i) => {
    const full = i + 1 <= rating
    const half = !full && i + 0.5 <= rating
    return half ? 'half' : full ? 'full' : 'empty'
  })
})
</script>
