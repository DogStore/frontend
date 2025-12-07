<template>
  <div class="grid grid-cols-12 gap-6 p-6">

    <!-- SIDEBAR FILTERS -->
    <aside class="col-span-3 bg-white p-4 rounded-xl shadow">

      <!-- Selected Filters -->
      <div v-if="hasFilters" class="mb-4 flex justify-between items-center">
        <p class="font-semibold">Filters:</p>
        <button @click="resetAll" class="text-orange-500">Remove all</button>
      </div>

      <!-- Selected Category Tag -->
      <div v-if="selectedCategory"
           class="bg-orange-100 text-orange-600 px-3 py-1 rounded-full mb-4">
        Category: {{ selectedCategory }}
      </div>

      <!-- CATEGORY FILTER -->
      <h2 class="font-bold text-gray-700 mb-2">Category</h2>
      <div class="space-y-2">
        <label v-for="c in categoryOptions" :key="c" class="flex items-center gap-2">
          <input type="radio" :value="c" v-model="selectedCategory" />
          <span>{{ c }}</span>
        </label>
      </div>

      <hr class="my-4" />

      <!-- COUNTRY FILTER -->
      <h2 class="font-bold text-gray-700 mb-2">Country</h2>
      <div class="space-y-2">
        <label v-for="c in countryOptions" :key="c" class="flex items-center gap-2">
          <input type="checkbox" :value="c" v-model="selectedCountries" />
          <span>{{ c }}</span>
        </label>
      </div>

      <hr class="my-4" />

      <!-- PRICE FILTER -->
      <h2 class="font-bold text-gray-700 mb-2">Price Range</h2>
      <div class="flex gap-2">
        <input type="number" class="w-1/2 border rounded p-2"
               placeholder="Min" v-model.number="minPrice" />

        <input type="number" class="w-1/2 border rounded p-2"
               placeholder="Max" v-model.number="maxPrice" />
      </div>

      <button class="mt-4 bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600"
              @click="applyFilter">
        Apply Filter
      </button>

      <button class="mt-2 bg-gray-200 w-full py-2 rounded hover:bg-gray-300"
              @click="resetAll">
        Clear
      </button>
    </aside>

    <!-- PRODUCT LIST SECTION -->
    <main class="col-span-9">

      <!-- CATEGORY TITLE -->
      <h1 v-if="selectedCategory"
          class="text-3xl font-bold mb-6 capitalize">
        {{ categoryTitle }}
      </h1>

      <!-- SORTING -->
      <div class="mb-6 flex justify-end">
        <select v-model="sortType" class="border px-3 py-2 rounded">
          <option value="">Sort By</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="az">Name: A → Z</option>
        </select>
      </div>

      <!-- PRODUCT GRID (4 per row) -->
      <div class="grid grid-cols-4 gap-6">
        <ProductCard 
          v-for="p in paginatedProducts"
          :key="p.id"
          :product="p"
        />
      </div>

      <!-- PAGINATION -->
      <div class="flex justify-center items-center gap-4 mt-8">

        <button class="px-3 py-2 bg-gray-200 rounded"
                :disabled="currentPage === 1"
                @click="currentPage--">
          Previous
        </button>

        <span v-for="n in totalPages" :key="n"
              class="px-3 py-1 rounded cursor-pointer"
              :class="n === currentPage ? 'bg-orange-500 text-white' : 'bg-gray-200'"
              @click="currentPage = n">
          {{ n }}
        </span>

        <button class="px-3 py-2 bg-gray-200 rounded"
                :disabled="currentPage === totalPages"
                @click="currentPage++">
          Next
        </button>

      </div>
    </main>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from "vue"
import ProductCard from "@/components/Categories/ProductCard.vue"
import { mockProducts } from "@/data/mockData"
import type { Product } from "@/data/product"

// FILTER STATES
const selectedCategory = ref<string>("")
const selectedCountries = ref<string[]>([])
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)

// SORTING
const sortType = ref<string>("")

// CHECK if filters exist
const hasFilters = computed(() =>
  selectedCategory.value ||
  selectedCountries.value.length > 0 ||
  minPrice.value ||
  maxPrice.value
)

// OPTIONS
const categoryOptions = ["food", "cloth", "toy"]
const countryOptions = [...new Set(mockProducts.map(p => p.country))]

// FILTER LOGIC
const filteredProducts = computed(() => {
  return mockProducts.filter((p: Product) => {
    const matchCategory = selectedCategory.value ? p.category === selectedCategory.value : true
    const matchCountry = selectedCountries.value.length ? selectedCountries.value.includes(p.country) : true
    const matchMin = minPrice.value !== null ? p.price >= minPrice.value : true
    const matchMax = maxPrice.value !== null ? p.price <= maxPrice.value : true

    return matchCategory && matchCountry && matchMin && matchMax
  })
})

// SORTING LOGIC
const sortedProducts = computed(() => {
  const list = [...filteredProducts.value]

  if (sortType.value === "low") list.sort((a, b) => a.price - b.price)
  if (sortType.value === "high") list.sort((a, b) => b.price - a.price)
  if (sortType.value === "az") list.sort((a, b) => a.name.localeCompare(b.name))

  return list
})

function applyFilter() {
  currentPage.value = 1
}

function resetAll() {
  selectedCategory.value = ""
  selectedCountries.value = []
  minPrice.value = null
  maxPrice.value = null
  sortType.value = ""
  currentPage.value = 1
}

// CATEGORY TITLE
const categoryTitle = computed(() => {
  if (!selectedCategory.value) return ""
  if (selectedCategory.value === "food") return "Dog Food"
  if (selectedCategory.value === "cloth") return "Dog Clothing"
  if (selectedCategory.value === "toy") return "Dog Toys"
  return selectedCategory.value
})

// PAGINATION
const itemsPerPage = 12
const currentPage = ref(1)

const totalPages = computed(() => 
  Math.ceil(sortedProducts.value.length / itemsPerPage)
)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return sortedProducts.value.slice(start, start + itemsPerPage)
})
</script>
