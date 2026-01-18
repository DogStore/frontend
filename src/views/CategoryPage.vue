<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CategoryProductList from '@/components/Categories/CategoryProductList.vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { useProductStore } from '@/stores/productStore'

const route = useRoute()
const categoryStore = useCategoryStore()
const productStore = useProductStore()

/* -------------------------
   FETCH DATA BASED ON ROUTE
   The sidebar is now in the layout (persistent), so only this component
   updates when the category changes
-------------------------- */
const isFetching = ref(false)

watch(
  () => route.params.slug,
  async (slug) => {
    if (isFetching.value) return

    const s = typeof slug === 'string' ? slug : ''
    isFetching.value = true

    try {
      if (s && s.length > 0) {
        // SMART FETCH: Only re-fetches if cache is older than 5 minutes
        // If cache is fresh, it will reuse stored data without API call
        await Promise.all([
          categoryStore.fetchCategoryBySlug(s),
          productStore.fetchProductsByCategory(s),
        ])
      } else {
        categoryStore.activeCategory = null
        await productStore.fetchProducts()
      }
    } finally {
      isFetching.value = false
    }
  },
  { immediate: true },
)
</script>

<template>
  <!-- PRODUCT LIST - Natural flow layout -->
  <CategoryProductList />
</template>
