<template>
  <div class="w-full font-nunito bg-white">
    <!-- HERO / SHOWCASE -->
    <ShowCase
      :title="showcase.title"
      :description="showcase.description"
      :discount="showcase.discount"
      :buttonText="showcase.buttonText"
      :dogImage="showcase.dogImage"
      :boneImage="showcase.boneImage"
      :pawImage="showcase.pawImage"
    />

    <!-- FEATURE PRODUCTS -->
    <div class="w-full px-10 py-10">
      <div class="flex items-center justify-between mb-8">
        <h3 class="text-lg md:text-2xl font-bold text-gray-800">List of Products</h3>
        <button
          class="px-6 py-2 bg-[#FFAA0C] cursor-pointer text-white font-semibold rounded-md hover:bg-orange-500 transition"
        >
          View All
        </button>
      </div>

      <!-- Products Carousel -->
      <div class="overflow-hidden relative py-1">
        <div
          class="flex transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${currentPage * 100}%)` }"
        >
          <!-- Page Wrapper -->
          <div
            v-for="pageIndex in totalPages"
            :key="pageIndex"
            class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 w-full flex-shrink-0"
          >
            <ProductCard
              v-for="product in productStore.products.slice(
                (pageIndex - 1) * itemsPerPage,
                pageIndex * itemsPerPage,
              )"
              :key="product.id"
              :product="product"
              @click="openProductDetail(product)"
            />
          </div>
        </div>
      </div>

      <!-- Carousel Controls -->
      <div class="flex items-center justify-center gap-4 mt-6">
        <button
          @click="prevPage"
          :disabled="currentPage === 0"
          class="text-2xl text-orange-400 hover:text-orange-600 disabled:opacity-20"
        >
          ❮
        </button>

        <span class="text-gray-500">{{ currentPage + 1 }} / {{ totalPages }}</span>

        <button
          @click="nextPage"
          :disabled="currentPage + 1 === totalPages"
          class="text-2xl text-orange-400 hover:text-orange-600 disabled:opacity-20"
        >
          ❯
        </button>
      </div>
    </div>

   <!-- RECENTLY VIEWED - ✅ Use validRecents -->
    <div v-if="recentStore.validRecents.length > 0" class="w-full px-10 py-10">
      <h3 class="flex md:text-start text-center text-lg md:text-2xl font-bold text-gray-800 mb-8">
        Recently Viewed
      </h3>

      <div class="overflow-hidden relative py-1">
        <div
          class="flex transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${recentPage * 100}%)` }"
        >
          <div
            v-for="pageIndex in recentTotalPages"
            :key="pageIndex"
            class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 w-full flex-shrink-0"
          >
            <ProductCard
              v-for="product in recentStore.validRecents.slice(
                (pageIndex - 1) * recentItemsPerPage,
                pageIndex * recentItemsPerPage,
              )"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </div>

      <!-- Recently Viewed Controls -->
      <div class="flex items-center justify-center gap-4 mt-6" v-if="recentTotalPages > 1">
        <button
          @click="prevRecent"
          :disabled="recentPage === 0"
          class="text-2xl text-orange-400 hover:text-orange-600 disabled:opacity-20"
        >
          ❮
        </button>

        <span class="text-gray-500"> {{ recentPage + 1 }} / {{ recentTotalPages }} </span>

        <button
          @click="nextRecent"
          :disabled="recentPage + 1 === recentTotalPages"
          class="text-2xl text-orange-400 hover:text-orange-600 disabled:opacity-20"
        >
          ❯
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ShowCase from '@/components/home/ShowCase.vue'
import ProductCard from '@/components/home/ProductCard.vue'

//Show case images
import Dog from '@/assets/ShowcaseImages/Dog.png'
import Bone from '@/assets/ShowcaseImages/Bone.png'
import Paw from '@/assets/ShowcaseImages/Pawprint.png'

import type { Product } from '@/types/product'

// Pinia Stores
import { useCartStore } from '@/stores/cartStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useRecentStore } from '@/stores/recentStore'
import { useProductStore } from '@/stores/productStore'
import { watch } from 'vue'

const cart = useCartStore()
const favorite = useFavoriteStore()
const recentStore = useRecentStore()
const productStore = useProductStore()

// Load recent items on page load
recentStore.loadFromStorage()
cart.load()
favorite.load()

// Showcase
const showcase = ref({
  title: 'Your dog, <br> Our priority',
  description:
    'your dog deserve the best quality and healthy food and snacks, and accessories which is what we have to offer at the best, most affordable price',
  discount: '30%',
  buttonText: 'Shop now',
  dogImage: Dog,
  boneImage: Bone,
  pawImage: Paw,
})

  watch(
    () => productStore.products,
    (products) => {
      recentStore.syncWithProductStore(products)
    },
    { deep: true }
  )

//  Load products and sync recent
onMounted(async () => {
  await productStore.fetchProducts()
  //  Sync recent products with latest product data
  recentStore.syncWithProductStore(productStore.products)
})

// Pagination for Feature
const currentPage = ref(0)
const getItemsPerPage = () => {
  const width = window.innerWidth

  if (width < 640) return 1 // mobile
  if (width < 1024) return 3 // tablet
  return 6 // desktop
}

const itemsPerPage = ref(getItemsPerPage())

const updateItemsPerPage = () => {
  itemsPerPage.value = getItemsPerPage()
  currentPage.value = 0
}

onMounted(() => {
  window.addEventListener('resize', updateItemsPerPage)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerPage)
})

const totalPages = computed(() => Math.ceil(productStore.products.length / itemsPerPage.value))

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 0) currentPage.value--
}

// When clicking product card
const openProductDetail = (product: Product) => {
  recentStore.addRecent(product)
  console.log('Open detail:', product.name)
}

// Pagination for Recently Viewed
const recentPage = ref(0)
const recentItemsPerPage = ref(getItemsPerPage())

const recentTotalPages = computed(() =>
  Math.ceil(recentStore.validRecents.length / recentItemsPerPage.value)
)

const nextRecent = () => {
  if (recentPage.value < recentTotalPages.value - 1) recentPage.value++
}
const prevRecent = () => {
  if (recentPage.value > 0) recentPage.value--
}
</script>
