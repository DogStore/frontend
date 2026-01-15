<script setup lang="ts">
import { computed, watch, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/home/ProductCard.vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { useProductStore } from '@/stores/productStore'

const route = useRoute()
const categoryStore = useCategoryStore()
const productStore = useProductStore()

/* -------------------------
   FETCH DATA BASED ON ROUTE
-------------------------- */
watch(
  () => route.params.slug,
  async (slug) => {
    if (typeof slug === 'string') {
      await Promise.all([
        categoryStore.fetchCategoryBySlug(slug),
        productStore.fetchProductsByCategory(slug),
      ])
    } else {
      categoryStore.activeCategory = null
      await productStore.fetchProducts()
    }
  },
  { immediate: true },
)

onMounted(() => {
  categoryStore.fetchPublicCategories()
})

/* -------------------------
   FILTER + SORT (LOCAL)
-------------------------- */
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

/* -------------------------
   PAGINATION
-------------------------- */
const itemsPerPage = 12
const currentPage = ref(1)

watch(
  [
    () => categoryStore.selectedCountries,
    () => categoryStore.minPrice,
    () => categoryStore.maxPrice,
    () => categoryStore.sortType,
    () => route.params.slug,
  ],
  () => {
    currentPage.value = 1
  },
)

const totalPages = computed(() => Math.ceil(sortedProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return sortedProducts.value.slice(start, start + itemsPerPage)
})

/* -------------------------
   COUNTRY OPTIONS (FROM PRODUCTS)
-------------------------- */
const countryOptions = computed<string[]>(() => {
  return [
    ...new Set(
      productStore.products
        .map((p) => p.countryName)
        .filter((c): c is string => typeof c === 'string' && c.length > 0),
    ),
  ]
})
</script>

<template>
  <div class="container mx-auto px-6 py-6">
    <!-- SEO / CATEGORY HEADER -->
    <div v-if="categoryStore.activeCategory" class="mb-8">
      <img
        v-if="categoryStore.activeCategory.image"
        :src="categoryStore.activeCategory.image"
        class="w-full h-56 object-cover rounded-xl mb-4"
        alt="Category banner"
      />
      <h1 class="text-3xl font-bold">
        {{ categoryStore.activeCategory.name }}
      </h1>
    </div>

    <div v-else class="mb-8">
      <h1 class="text-3xl font-bold">All Products</h1>
    </div>

    <div v-if="!productStore.loading" class="grid grid-cols-12 gap-6">
      <!-- SIDEBAR FILTERS -->
      <aside class="col-span-3 bg-white p-4 rounded-xl shadow">
        <h2 class="font-bold mb-2">Country</h2>

        <label v-for="c in countryOptions" :key="c" class="flex gap-2 mb-1">
          <input type="checkbox" :value="c" v-model="categoryStore.selectedCountries" />
          <span>{{ c }}</span>
        </label>

        <hr class="my-4" />
        <h2 class="font-bold mb-2">Category</h2>

        <label
          v-for="cat in categoryStore.categories"
          :key="cat.slug"
          class="flex gap-2 mb-1 cursor-pointer"
        >
          <input
            type="radio"
            name="category"
            :value="cat.slug"
            :checked="cat.slug === route.params.slug"
            @change="$router.push(`/category/${cat.slug}`)"
          />
          <span>{{ cat.name }}</span>
        </label>

        <!-- Add an "All Products" option -->
        <label class="flex gap-2 mb-1 cursor-pointer">
          <input
            type="radio"
            name="category"
            value=""
            :checked="!route.params.slug"
            @change="$router.push('/category')"
          />
          <span>All Products</span>
        </label>

        <hr class="my-4" />

        <hr class="my-4" />

        <h2 class="font-bold mb-2">Price</h2>

        <input
          type="number"
          placeholder="Min"
          class="w-full border p-2 mb-2"
          v-model.number="categoryStore.minPrice"
        />

        <input
          type="number"
          placeholder="Max"
          class="w-full border p-2"
          v-model.number="categoryStore.maxPrice"
        />

        <button class="mt-4 w-full bg-gray-200 py-2 rounded" @click="categoryStore.resetFilters">
          Clear
        </button>
      </aside>

      <!-- PRODUCT LIST -->
      <main class="col-span-9">
        <!-- SORT -->
        <div class="flex justify-end mb-6">
          <select v-model="categoryStore.sortType" class="border p-2 rounded">
            <option value="">Sort</option>
            <option value="low">Price ↑</option>
            <option value="high">Price ↓</option>
            <option value="az">Name A–Z</option>
          </select>
        </div>

        <!-- GRID -->
        <div v-if="paginatedProducts.length" class="grid grid-cols-4 gap-6">
          <ProductCard v-for="p in paginatedProducts" :key="p.id" :product="p" />
        </div>

        <div v-else class="text-center py-20 text-gray-500">No products found.</div>

        <!-- PAGINATION -->
        <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-10">
          <button
            :disabled="currentPage === 1"
            @click="currentPage--"
            class="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <button
            v-for="n in totalPages"
            :key="n"
            @click="currentPage = n"
            class="px-3 py-1 border rounded"
            :class="{
              'bg-orange-500 text-white': n === currentPage,
            }"
          >
            {{ n }}
          </button>

          <button
            :disabled="currentPage === totalPages"
            @click="currentPage++"
            class="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </main>
    </div>

    <div v-else class="text-center py-20">Loading products…</div>
  </div>
</template>
