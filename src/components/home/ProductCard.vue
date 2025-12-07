<template>
  <div
    class="product-card relative flex flex-col items-center bg-white border border-[#FFAA0C] rounded-xl p-4 shadow-sm w-full mx-auto cursor-pointer
    transition-all duration-300 ease-[cubic-bezier(.25,.8,.25,1)] hover:-translate-y-1 hover:z-20 hover:shadow-2xl"
    @click="openDetail">

    <!-- FLAG BADGE (Optional) -->
    <div
      v-if="flag"
      class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-md font-semibold">
      {{ flag }}
    </div>

    <!-- IMAGE -->
    <div class="relative flex items-center justify-center h-[150px] w-full">
      <img :src="product.image" :alt="product.name" class="h-[120px] object-contain" />

      <!-- Favorite Button -->
      <button
        @click.stop="toggleFavorite"
        class="absolute top-0 right-0 transition hover:scale-110 cursor-pointer">
        <img
          :src="isFavorite ? HeartFilled : HeartOutline"
          class="w-[35px] h-[35px]"
        />
      </button>
    </div>

    <!-- PRODUCT NAME -->
    <h4 class="text-base font-Nunito font-bold text-gray-800 mt-1 mb-2 text-center h-[38px]">
      {{ product.name }}
    </h4>

    <!-- STARS -->
    <div class="flex gap-2 mt-2 mb-2">
      <img
        v-for="(type, index) in starArray"
        :key="index"
        :src="type === 'full' ? StarFilled : type === 'half' ? StarHalf : StarEmpty"
        class="w-5 h-5 object-contain"
      />
    </div>

    <!-- PRICE -->
    <div class="mb-3 text-center font-Nunito">
      <span class="text-lg font-bold">Price: ${{ product.price.toFixed(2) }}</span>
    </div>

    <!-- ADD TO CART -->
    <button
      @click.stop="addCart"
      class="w-full px-4 py-2 rounded-md transition font-Nunito flex items-center justify-center gap-2 mt-auto"
      :class="isInCart ? 'bg-gray-400 text-white cursor-pointer' : 'bg-[#FFAA0C] text-white hover:bg-orange-500 cursor-pointer'"
    >
      <template v-if="isInCart">
        ✔ Added to Cart
      </template>
      <template v-else>
        <img src="@/assets/HeaderImages/Shopping Cart.png" alt="" class="h-7" />
      </template>
    </button>

  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useFavoriteStore } from "@/stores/favoriteStore";
import { useRecentStore } from "@/stores/recentStore";

import StarFilled from "@/assets/ProductImages/Star-filled.png";
import StarEmpty from "@/assets/ProductImages/Star.png";
import StarHalf from "@/assets/ProductImages/Star Half.png";
import HeartFilled from "@/assets/ProductImages/Heart-filled.png";
import HeartOutline from "@/assets/ProductImages/Heart.png";

import type { Product } from "@/types/Product";

// PROPS
const props = defineProps<{
  product: Product;
  flag?: string;
}>();

// STORES
const cart = useCartStore();
const favorite = useFavoriteStore();
const recent = useRecentStore();

// COMPUTED
const isFavorite = computed(() =>
  favorite.favorites.some((p) => p.id === props.product.id)
);

const isInCart = computed(() =>
  cart.cartItems.some((p) => p.id === props.product.id)
);

// ACTIONS
function toggleFavorite() {
  favorite.toggleFavorite(props.product);
}

function addCart() {
  cart.addToCart(props.product);
}

function openDetail() {
  recent.addRecent(props.product);
  console.log("OPEN:", props.product.name);
}

// STARS
const starArray = computed(() => {
  const rating = props.product.rating;
  return Array.from({ length: 5 }, (_, i) => {
    const full = i + 1 <= rating;
    const half = !full && i + 0.5 <= rating;
    return half ? "half" : full ? "full" : "empty";
  });
});
</script>

