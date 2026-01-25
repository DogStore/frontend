<template>
  <aside class="sticky top-[170px] bg-white rounded-lg shadow-md h-fit border border-gray-100">
    <!-- COUNTRY SECTION -->
    <div class="p-4 md:p-5 border-b border-gray-100">
      <h2 class="font-bold text-gray-900 mb-3 md:mb-4 text-base md:text-lg">Country</h2>
      <div class="space-y-2 md:space-y-3">
        <label
          v-for="c in countryOptions"
          :key="c"
          class="flex items-center gap-2 md:gap-3 cursor-pointer hover:text-orange-500 transition text-sm md:text-base"
        >
          <input
            type="checkbox"
            :value="c"
            v-model="categoryStore.selectedCountries"
            class="w-4 h-4 accent-orange-500 cursor-pointer"
          />
          <span class="text-gray-700">{{ c }}</span>
        </label>
      </div>
    </div>

    <!-- CATEGORY SECTION -->
    <div class="p-4 md:p-5 border-b border-gray-100">
      <h2 class="font-bold text-gray-900 mb-3 md:mb-4 text-base md:text-lg">Category</h2>
      <div class="space-y-2 md:space-y-3">
        <label
          v-for="cat in categoryStore.categories"
          :key="cat.slug"
          class="flex items-center gap-2 md:gap-3 cursor-pointer hover:text-orange-500 transition text-sm md:text-base"
        >
          <input
            type="radio"
            name="category"
            :value="cat.slug"
            :checked="cat.slug === route.params.slug"
            @change="$router.push(`/category/${cat.slug}`)"
            class="w-4 h-4 accent-orange-500 cursor-pointer"
          />
          <span class="text-gray-700">{{ cat.name }}</span>
        </label>

        <!-- All Products Option -->
        <label
          class="flex items-center gap-2 md:gap-3 cursor-pointer hover:text-orange-500 transition text-sm md:text-base"
        >
          <input
            type="radio"
            name="category"
            value=""
            :checked="!route.params.slug"
            @change="$router.push('/category')"
            class="w-4 h-4 accent-orange-500 cursor-pointer"
          />
          <span class="text-gray-700">All Products</span>
        </label>
      </div>
    </div>

    <!-- PRICE SECTION -->
    <div class="p-4 md:p-5">
      <h2 class="font-bold text-gray-900 mb-3 md:mb-4 text-base md:text-lg">Price Range</h2>
      <div class="space-y-2 md:space-y-3 mb-3 md:mb-4">
        <input
          type="number"
          placeholder="Min Price"
          class="w-full border border-gray-300 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-sm md:text-base text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
          v-model.number="categoryStore.minPrice"
        />

        <input
          type="number"
          placeholder="Max Price"
          class="w-full border border-gray-300 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-sm md:text-base text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
          v-model.number="categoryStore.maxPrice"
        />
      </div>

      <button
        class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-1.5 md:py-2 text-sm md:text-base rounded-lg transition duration-200"
        @click="categoryStore.resetFilters"
      >
        Clear Filters
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '@/stores/categoryStore'

const route = useRoute()
const categoryStore = useCategoryStore()

// Static 5 countries
const staticCountries = ['Cambodia', 'Australia', 'France', 'China', 'Japan']

const countryOptions = computed<string[]>(() => {
  return staticCountries
})
</script>
