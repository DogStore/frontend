<template>
  <div class="px-6 py-8 font-Nunito mt-[-12rem]">
    <!-- Search Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-2">
        <span class="text-gray-700">Search Results for </span>
        <span class="text-orange-500">"{{ productStore.lastQuery }}"</span>
      </h2>
      <p v-if="!productStore.loading && nameMatchedProducts.length > 0" class="text-gray-600">
        Found {{ nameMatchedProducts.length }} {{ nameMatchedProducts.length === 1 ? 'product' : 'products' }}
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="productStore.loading" class="flex flex-col items-center justify-center py-20">
      <div class="relative">
        <!-- Animated Spinner -->
        <div class="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        <!-- Paw Print Icon -->
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="w-8 h-8 text-orange-500 opacity-50" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path d="M4 8a2 2 0 100-4 2 2 0 000 4zM16 8a2 2 0 100-4 2 2 0 000 4zM7 14a2 2 0 100-4 2 2 0 000 4zM13 14a2 2 0 100-4 2 2 0 000 4z"/>
          </svg>
        </div>
      </div>
      <p class="mt-4 text-gray-600 animate-pulse">Searching for products...</p>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="nameMatchedProducts.length === 0"
      class="flex flex-col items-center justify-center py-20 text-center"
    >
      <!-- Empty Box Icon -->
      <div class="mb-6 relative">
        <svg class="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <!-- Sad Dog Face -->
        <div class="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
          <span class="text-4xl">🐕</span>
        </div>
      </div>

      <h3 class="text-2xl font-bold text-gray-700 mb-2">No Products Found</h3>
      <p class="text-gray-500 mb-6 max-w-md">
        We couldn't find any products matching <span class="font-semibold text-gray-700">"{{ productStore.lastQuery }}"</span>
      </p>

      <!-- Suggestions -->
      <div class="bg-gray-50 rounded-lg p-6 max-w-md">
        <p class="font-semibold text-gray-700 mb-3">Try these tips:</p>
        <ul class="text-left text-gray-600 space-y-2">
          <li class="flex items-start gap-2">
            <span class="text-orange-500 mt-1">•</span>
            <span>Check your spelling</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-orange-500 mt-1">•</span>
            <span>Try different or more general keywords</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-orange-500 mt-1">•</span>
            <span>Browse our categories instead</span>
          </li>
        </ul>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 mt-8">
        <button
          @click="clearSearch"
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition font-semibold"
        >
          Clear Search
        </button>
        <router-link
          to="/"
          class="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition font-semibold"
        >
          Browse All Products
        </router-link>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-else>
      <!-- Sort Bar -->
      <div class="flex items-center justify-between mb-6">
        <!-- Sort Dropdown -->
        <div class="flex items-center gap-2">
          <label class="text-gray-700 font-semibold">Sort by:</label>
          <select
            v-model="sortBy"
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>
      </div>

      <!-- Products Grid with Animation -->
      <transition-group
        name="fade-slide"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
      >
        <ProductCard
          v-for="product in sortedProducts"
          :key="product.id || product.id"
          :product="product"
        />
      </transition-group>

      <!-- Load More / Pagination (if needed) -->
      <div v-if="hasMore" class="flex justify-center mt-12">
        <button
          @click="loadMore"
          class="px-8 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition font-semibold flex items-center gap-2"
        >
          <span>Load More Products</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import ProductCard from '@/components/home/ProductCard.vue'

const router = useRouter()
const productStore = useProductStore()

// Sort option
const sortBy = ref('relevance')

// Filter products to only show name matches
const nameMatchedProducts = computed(() => {
  const query = productStore.lastQuery.toLowerCase()
  return productStore.products.filter(product =>
    product.name.toLowerCase().includes(query)
  )
})

// Computed sorted products
const sortedProducts = computed(() => {
  const products = [...nameMatchedProducts.value]

  switch (sortBy.value) {
    case 'price-low':
      return products.sort((a, b) => (a.price || 0) - (b.price || 0))

    case 'price-high':
      return products.sort((a, b) => (b.price || 0) - (a.price || 0))

    case 'name':
      return products.sort((a, b) => (a.name || '').localeCompare(b.name || ''))

    case 'rating':
      return products.sort((a, b) => (b.rating || 0) - (a.rating || 0))

    case 'relevance':
    default:
      return products // Keep original order (from search API)
  }
})

// Pagination (if your API supports it)
const hasMore = computed(() => {
  // Implement based on your API
  // return productStore.currentPage < productStore.totalPages
  return false
})

// Actions
function clearSearch() {
  productStore.lastQuery = ''
  router.push('/')
}

function loadMore() {
  // Implement pagination
  // productStore.loadMoreProducts()
}
</script>

<style scoped>
/* Fade slide animation for products */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-move {
  transition: transform 0.3s ease;
}

/* Stagger animation for grid items */
.fade-slide-enter-active {
  transition-delay: calc(var(--i, 0) * 50ms);
}
</style>
