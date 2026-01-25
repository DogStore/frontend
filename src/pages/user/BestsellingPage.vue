<template>
  <div class="bg-gray-50 min-h-screen w-full overflow-x-hidden -mt-54">
    <!-- Breadcrumb -->
    <div class="-mt-2">
      <div class="max-w-[1400px] mx-auto px-4 py-3">
        <nav class="flex items-center space-x-2 text-sm">
          <router-link to="/" class="text-gray-500 hover:text-orange-500 transition">
            Home
          </router-link>
          <span class="text-gray-400">›</span>
          <span class="text-gray-500 font-medium">Best Selling Products</span>
        </nav>
      </div>
    </div>

    <div class="max-w-[1400px] mx-auto px-4 py-8 flex gap-8">
      <!-- FILTER SIDEBAR -->
      <aside class="w-64 shrink-0 hidden lg:block">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-lg">Filter</h3>
            <button
              v-if="hasActiveFilters"
              @click="clearFilters"
              class="text-xs text-orange-500 hover:text-orange-600 font-medium"
            >
              Clear all
            </button>
          </div>

          <!-- ACTIVE FILTERS CHIPS -->
          <div
            v-if="selectedCategories.length"
            class="flex flex-wrap gap-2 mb-4 pb-4 border-b border-gray-200"
          >
            <span
              v-for="c in selectedCategories"
              :key="c"
              class="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium animate-fadeIn"
            >
              {{ categories.find((cat) => cat.value === c)?.label || c }}
              <button
                @click="removeCategory(c)"
                class="hover:bg-orange-200 rounded-full p-0.5 transition"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          </div>

          <!-- CATEGORY FILTER -->
          <div class="mb-6">
            <button
              @click="isCategoryOpen = !isCategoryOpen"
              class="flex items-center justify-between w-full font-semibold text-gray-900 mb-3 hover:text-orange-500 transition"
            >
              <span>Category</span>
              <svg
                class="w-5 h-5 transition-transform"
                :class="{ 'rotate-180': isCategoryOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <transition name="expand">
              <div v-if="isCategoryOpen" class="space-y-2">
                <label
                  v-for="c in categories"
                  :key="c.value"
                  class="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition group"
                >
                  <input
                    type="checkbox"
                    v-model="selectedCategories"
                    :value="c.value"
                    class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                  />
                  <span class="group-hover:text-orange-500 transition">{{ c.label }}</span>
                </label>
              </div>
            </transition>
          </div>

          <!-- PRICE RANGE -->
          <div class="mb-6">
            <h4 class="font-semibold text-gray-900 mb-3">Price Range</h4>
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <input
                  type="number"
                  v-model.number="priceRange.min"
                  placeholder="Min"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
                <span class="text-gray-400">—</span>
                <input
                  type="number"
                  v-model.number="priceRange.max"
                  placeholder="Max"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
              </div>
            </div>
          </div>

          <!-- RESULTS COUNT -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <p class="text-sm text-gray-600">
              Showing
              <span class="font-semibold text-gray-900">{{ filteredProducts.length }}</span>
              products
            </p>
          </div>
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="flex-1 min-w-0">
        <!-- HEADER -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-1">Best Selling Products</h1>
          </div>

          <!-- SORT DROPDOWN -->
          <div class="relative">
            <select
              v-model="sortBy"
              class="px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm bg-white cursor-pointer appearance-none min-w-[200px]"
            >
              <option value="best-selling">Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <svg
              class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <!-- LOADING STATE -->
        <div
          v-if="isLoading"
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
        >
          <div
            v-for="i in 10"
            :key="i"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse"
          >
            <div class="aspect-square bg-gray-200 rounded-lg mb-4"></div>
            <div class="h-4 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
            <div class="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>

        <!-- PRODUCTS GRID -->
        <div
          v-else-if="paginatedProducts.length > 0"
          class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5"
        >
          <ProductCard
            v-for="(product, index) in paginatedProducts"
            :key="product.id"
            :product="product"
            show-hot-badge
            class="animate-fadeIn"
            :style="{ animationDelay: `${index * 50}ms` }"
          />
        </div>

        <!-- EMPTY STATE -->
        <div v-else class="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="text-gray-300 mb-4">
            <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
          <p class="text-gray-600 mb-6">
            Try adjusting your filters to find what you're looking for
          </p>
          <button
            @click="clearFilters"
            class="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium active:scale-95"
          >
            Clear All Filters
          </button>
        </div>

        <!-- PAGINATION -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-10">
          <button
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
            class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span class="hidden sm:inline">Previous</span>
          </button>

          <div class="flex gap-1">
            <button
              v-for="p in visiblePages"
              :key="p"
              @click="goToPage(p)"
              class="w-10 h-10 rounded-lg flex items-center justify-center font-medium transition"
              :class="
                p === currentPage
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'border border-gray-300 hover:bg-gray-100'
              "
            >
              {{ p }}
            </button>
          </div>

          <button
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
            class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            <span class="hidden sm:inline">Next</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </main>
    </div>

    <!-- RECOMMENDED SECTION -->
    <section
      v-if="recommendedProducts.length > 0"
      class="mt-16 py-12 bg-white border-t border-gray-200"
    >
      <div class="max-w-[1400px] mx-auto px-4">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-3xl text-start font-bold text-gray-900 mb-1">
              Your dog might also like
            </h2>
          </div>
        </div>

        <div class="relative">
          <!-- LEFT ARROW -->
          <button
            v-show="canScrollLeft"
            @click="scroll(-1)"
            class="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white border-2 border-orange-300 shadow-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition active:scale-95"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <!-- SLIDER -->
          <div
            ref="slider"
            @scroll="checkScroll"
            class="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pt-6 pb-6"
          >
            <div
              v-for="(product, index) in recommendedProducts"
              :key="product.id"
              class="w-[250px] shrink-0 flex"
            >
              <ProductCard
                :product="product"
                show-hot-badge
                class="h-full animate-fadeIn"
                :style="{ animationDelay: `${index * 50}ms` }"
              />
            </div>
          </div>

          <!-- RIGHT ARROW -->
          <button
            v-show="canScrollRight"
            @click="scroll(1)"
            class="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white border-2 border-orange-300 shadow-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition active:scale-95"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import ProductCard from '@/components/home/ProductCard.vue'

const productStore = useProductStore()

// STATE
const isLoading = ref(true)
const selectedCategories = ref<string[]>([])
const priceRange = ref<{ min: number | null; max: number | null }>({ min: null, max: null })
const sortBy = ref('best-selling')
const currentPage = ref(1)
const itemsPerPage = 8
const isCategoryOpen = ref(true)

// SLIDER STATE
const slider = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

// CATEGORIES
const categories = computed(() => {
  const map = new Map<string, string>()
  productStore.products.forEach((p: any) => {
    if (typeof p.category === 'string') {
      map.set(p.category.toLowerCase(), p.category)
    } else if (p.category?.name) {
      map.set(p.category.name.toLowerCase(), p.category.name)
    }
  })
  return Array.from(map.entries()).map(([value, label]) => ({ value, label }))
})

// FILTERED PRODUCTS
const filteredProducts = computed(() => {
  let products = [...productStore.products]

  // Category filter
  if (selectedCategories.value.length) {
    products = products.filter((p: any) => {
      const cat =
        typeof p.category === 'string' ? p.category.toLowerCase() : p.category?.name?.toLowerCase()
      return selectedCategories.value.includes(cat)
    })
  }

  // Price filter
  if (priceRange.value.min !== null) {
    products = products.filter((p) => p.price >= priceRange.value.min!)
  }
  if (priceRange.value.max !== null) {
    products = products.filter((p) => p.price <= priceRange.value.max!)
  }

  // Apply sort based on dropdown selection
  let sortedProducts = [...products]

  switch (sortBy.value) {
    case 'price-low':
      sortedProducts.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      sortedProducts.sort((a, b) => b.price - a.price)
      break
    case 'best-selling':
    default: {
      const getRating = (p: any) => {
        if (!Array.isArray(p.reviews) || p.reviews.length === 0) return 0
        return (
          p.reviews.reduce((sum: number, r: any) => sum + (Number(r.rating) || 0), 0) /
          p.reviews.length
        )
      }

      const sold = sortedProducts.filter((p: any) => Number(p.soldCount ?? 0) > 0)
      const unsold = sortedProducts.filter((p: any) => Number(p.soldCount ?? 0) === 0)

      sold.sort((a: any, b: any) => {
        const soldDiff = Number(b.soldCount ?? 0) - Number(a.soldCount ?? 0)
        if (soldDiff !== 0) return soldDiff

        return getRating(b) - getRating(a)
      })

      unsold.sort((a: any, b: any) => {
        const ratingDiff = getRating(b) - getRating(a)
        if (ratingDiff !== 0) return ratingDiff

        return (b.addedAt ?? 0) - (a.addedAt ?? 0)
      })

      sortedProducts = [...sold, ...unsold]
      break
    }
  }
  return sortedProducts
})

// PAGINATION
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const hasActiveFilters = computed(
  () =>
    selectedCategories.value.length > 0 ||
    priceRange.value.min !== null ||
    priceRange.value.max !== null,
)

// RECOMMENDED PRODUCTS
// Lower the bar - show if rating ≥ 2 OR any sales
const recommendedProducts = computed(() => {
  const mainIds = new Set(paginatedProducts.value.map((p: any) => p.id))

  const others = productStore.products.filter((p: any) => !mainIds.has(p.id))

  // Prefer products with good ratings/sales, but show others if needed
  const preferred = others.filter((p: any) => (p.rating ?? 0) >= 2 || (p.soldCount ?? 0) > 0)

  const result = preferred.length > 0 ? preferred : others

  return result
    .sort((a: any, b: any) => {
      if ((b.rating ?? 0) !== (a.rating ?? 0)) return (b.rating ?? 0) - (a.rating ?? 0)
      if ((b.soldCount ?? 0) !== (a.soldCount ?? 0)) return (b.soldCount ?? 0) - (a.soldCount ?? 0)
      return (b.addedAt ?? 0) - (a.addedAt ?? 0)
    })
    .slice(0, 10)
})

// METHODS
const removeCategory = (category: string) => {
  selectedCategories.value = selectedCategories.value.filter((c) => c !== category)
}

const clearFilters = () => {
  selectedCategories.value = []
  priceRange.value = { min: null, max: null }
  currentPage.value = 1
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const scroll = (dir: number) => {
  if (!slider.value) return
  const scrollAmount = 400
  slider.value.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' })
  setTimeout(checkScroll, 300)
}

const checkScroll = () => {
  if (!slider.value) return
  const el = slider.value
  canScrollLeft.value = el.scrollLeft > 10
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 10
}

// WATCHERS
watch([selectedCategories, () => priceRange.value.min, () => priceRange.value.max], () => {
  currentPage.value = 1
})

watch(recommendedProducts, () => {
  nextTick(() => setTimeout(checkScroll, 100))
})

// LIFECYCLE
onMounted(async () => {
  isLoading.value = true
  await productStore.fetchProducts()
  isLoading.value = false
  setTimeout(checkScroll, 300)
  window.addEventListener('resize', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScroll)
})
</script>

<style scoped>
/* Scrollbar hide */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
  opacity: 0;
}

/* Expand animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>


