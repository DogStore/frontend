<template>

  <div class="w-full p-4 md:p-6 lg:p-12 -mt-20 lg:-mt-10">
    <div class="text-black text-3xl font-bold">All Products</div>
    <!-- SORT - Modern Header - Responsive -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8 pb-4 border-b border-gray-200"
    >
      <div>
        <p class="text-xs md:text-sm text-gray-600">
          Showing <span class="font-semibold text-gray-900">{{ paginatedProducts.length }}</span> of
          <span class="font-semibold text-gray-900">{{ sortedProducts.length }}</span> products
        </p>
      </div>
      <select
        v-model="categoryStore.sortType"
        class="w-full sm:w-auto px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm md:text-base text-gray-700 font-medium hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
      >
        <option value="">Sort By</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
        <option value="az">Name: A to Z</option>
      </select>
    </div>

    <!-- GRID - Responsive Layout (Mobile: 1, Tablet: 2, Desktop: 4) -->
    <div v-if="paginatedProducts.length" class="mb-12">
      <div class="flex flex-wrap gap-4 md:gap-6 justify-start">
        <div
          v-for="p in paginatedProducts"
          :key="p.id"
          class="w-[260px] shrink-0"
        >
          <ProductCard :product="p" />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 md:py-24">
      <p class="text-base md:text-lg text-gray-500">No products found matching your filters.</p>
    </div>

    <!-- PAGINATION - Responsive Style -->
    <div
      v-if="totalPages > 1"
      class="flex flex-wrap justify-center items-center gap-1 md:gap-2 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200"
    >
      <button
        :disabled="currentPage === 1"
        @click="currentPage--"
        class="px-2 md:px-4 py-1 md:py-2 border border-gray-300 rounded-lg text-xs md:text-base font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        ← <span class="hidden md:inline">Prev</span>
      </button>

      <div class="flex gap-1">
        <button
          v-for="n in totalPages"
          :key="n"
          @click="currentPage = n"
          class="px-2 md:px-3 py-1 md:py-2 rounded-lg text-xs md:text-base font-medium transition"
          :class="{
            'bg-orange-500 text-white': n === currentPage,
            'text-gray-700 border border-gray-300 hover:bg-gray-100': n !== currentPage,
          }"
        >
          {{ n }}
        </button>
      </div>

      <button
        :disabled="currentPage === totalPages"
        @click="currentPage++"
        class="px-2 md:px-4 py-1 md:py-2 border border-gray-300 rounded-lg text-xs md:text-base font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <span class="hidden md:inline">Next</span> →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import ProductCard from '@/components/home/ProductCard.vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { useProductStore } from '@/stores/productStore'

const categoryStore = useCategoryStore()
const productStore = useProductStore()

const currentPage = ref(1)

// Filter products based on category store filters
const filteredProducts = computed(() => {
  return productStore.products.filter((p) => {
    if (
      categoryStore.selectedCountries.length &&
      (!p.countryFlag || !categoryStore.selectedCountries.includes(p.countryName))
    )
      return false

    if (categoryStore.minPrice !== null && p.price < categoryStore.minPrice) return false

    if (categoryStore.maxPrice !== null && p.price > categoryStore.maxPrice) return false

    return true
  })
})

// Sort products
const sortedProducts = computed(() => {
  const list = [...filteredProducts.value]

  if (categoryStore.sortType === 'low') {
    list.sort((a, b) => a.price - b.price)
  }

  if (categoryStore.sortType === 'high') {
    list.sort((a, b) => b.price - a.price)
  }

  if (categoryStore.sortType === 'az') {
    list.sort((a, b) => a.name.localeCompare(b.name))
  }

  return list
})

// Reset pagination when filters change
watch(
  [
    () => categoryStore.selectedCountries,
    () => categoryStore.minPrice,
    () => categoryStore.maxPrice,
    () => categoryStore.sortType,
  ],
  () => {
    currentPage.value = 1
  },
)

const itemsPerPage = 12
const totalPages = computed(() => Math.ceil(sortedProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return sortedProducts.value.slice(start, start + itemsPerPage)
})
</script>
