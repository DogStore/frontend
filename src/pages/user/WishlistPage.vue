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
        class="text-center py-20 text-gray-500"
      >
        Your wishlist is empty 🐾
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

      <!-- ===== FILTER TITLE (DROPDOWN HEADER) ===== -->
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

        <!-- DROPDOWN -->
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

      <!-- EMPTY FILTER RESULT -->
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

// ===== HELPER: Get unique key for product (handles both id and _id) =====
function getProductKey(product: any): string {
  // Try multiple ID sources to ensure we always have a unique key
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
