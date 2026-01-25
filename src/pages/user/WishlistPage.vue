<template>
  <div class="font-Nunito">

    <!-- HERO -->
    <WishlistHero
      :leftDog="dogLeft"
      :rightDog="dogRight"
      @addNow="goShopping"
    />

    <div class="max-w-[1500px] mx-auto px-6 py-12">

      <!-- ===== RECENTLY ADDED ===== -->
      <h3 class="text-2xl font-bold mb-6 md:text-start lg:text-start">
        Recently Added
      </h3>

      <div
        v-if="recentFavorites.length === 0"
        class="flex flex-col items-center justify-center py-20 text-center"
      >
        <div class="mb-6 relative">
          <svg class="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <div class="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
            <span class="text-4xl">🐕</span>
          </div>
        </div>

        <h3 class="text-2xl font-bold text-gray-700 mb-2">Your Wishlist is Empty</h3>
        <p class="text-gray-500 mb-6 max-w-md">
          Start adding your favorite products to keep track of what you love! 🐾
        </p>

        <button
          @click="goShopping"
          class="px-8 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition font-semibold flex items-center gap-2"
        >
          <span>Browse Products</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-16"
      >
        <ProductCard
          v-for="product in recentFavorites"
          :key="getProductKey(product)"
          :product="product"
        />
      </div>

      <div class="flex justify-center mb-8 relative md:mr-152 lg:mr-320">
        <button
          @click="toggleFilter"
          class="flex items-center gap-2 text-2xl font-bold hover:text-orange-500 transition"
        >
          {{ filterLabel }}
          <span
            class="transition-transform duration-300"
            :class="{ 'rotate-180': showFilter }"
          >
            ⌵
          </span>
        </button>

        <transition name="fade-slide">
          <div
            v-if="showFilter"
            class="absolute top-full mt-3 bg-white border rounded-md shadow-lg z-20"
          >
            <button
              v-for="opt in filters"
              :key="opt.value"
              @click="setFilter(opt.value)"
              class="block px-6 py-3 text-left w-full hover:bg-orange-50"
            >
              {{ opt.label }}
            </button>
          </div>
        </transition>
      </div>

      <!-- ===== FILTERED GRID ===== -->
      <transition-group
        name="fade"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6"
      >
        <ProductCard
          v-for="product in filteredFavorites"
          :key="getProductKey(product)"
          :product="product"
        />
      </transition-group>

      <div
        v-if="filteredFavorites.length === 0 && favoriteStore.favorites.length > 0"
        class="text-center py-16 text-gray-400"
      >
        No items found for {{ filterLabel.toLowerCase() }}
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import WishlistHero from "@/components/common/WhishListHero.vue";
import ProductCard from "@/components/home/ProductCard.vue";
import { useFavoriteStore } from "@/stores/favoriteStore";

import dogLeft from "@/assets/wishlist/dog-left.png";
import dogRight from "@/assets/wishlist/dog-right.png";

const router = useRouter();
const favoriteStore = useFavoriteStore();

const showFilter = ref(false);
const filter = ref<"week" | "month" | "year">("month");

const filters: { label: string; value: "week" | "month" | "year" }[] = [
  { label: "Last week", value: "week" },
  { label: "Last month", value: "month" },
  { label: "Last year", value: "year" },
];

const filterLabel = computed(() => {
  return filters.find(f => f.value === filter.value)?.label ?? "Last month";
});

function getProductKey(product: any): string {
  return product.id || product._id || `product-${product.name}-${product.addedAt}`;
}

// ===== HELPERS =====
function isWithin(days: number, time: number) {
  return Date.now() - time <= days * 24 * 60 * 60 * 1000;
}

// ===== ACTIONS =====
function toggleFilter() {
  showFilter.value = !showFilter.value;
}

function setFilter(value: "week" | "month" | "year") {
  filter.value = value;
  showFilter.value = false;
}

function goShopping() {
  router.push("/");
}

// ===== COMPUTED DATA =====
const recentFavorites = computed(() => {
  return [...favoriteStore.favorites]
    .sort((a, b) => b.addedAt - a.addedAt)
    .slice(0, 6);
});

const filteredFavorites = computed(() => {
  if (filter.value === "week") {
    return favoriteStore.favorites.filter(p =>
      isWithin(7, p.addedAt)
    );
  }

  if (filter.value === "month") {
    return favoriteStore.favorites.filter(p =>
      isWithin(30, p.addedAt)
    );
  }

  if (filter.value === "year") {
    return favoriteStore.favorites.filter(p =>
      isWithin(365, p.addedAt)
    );
  }

  return [];
});
</script>

<style scoped>
/* Dropdown animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Grid animation */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.96);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

.fade-move {
  transition: transform 0.3s ease;
}
</style>
