<template>
  <div class="px-6 py-8 font-Nunito mt-[-12rem]">
    <h2 class="text-2xl font-bold mb-8 text-orange-500">
      Search Results for " {{ productStore.lastQuery }} "
    </h2>

    <div v-if="productStore.loading">Loading...</div>

    <div v-else-if="productStore.products.length === 0" class="text-gray-500">
      No products found!
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
      <ProductCard v-for="product in productStore.products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/tempproductStore'
import ProductCard from '@/components/home/ProductCard.vue'

const productStore = useProductStore()
</script>
