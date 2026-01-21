<!-- src/layouts/PublicLayout.vue -->
<template>
  <!-- HEADER - Fixed only for category pages -->
  <header v-if="isOnCategoryRoute" class="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
    <HeaderComponent :cartCount="cartCount" />
  </header>

  <!-- HEADER - Normal for other pages -->
  <header v-else class="bg-white shadow-sm relative z-40">
    <HeaderComponent :cartCount="cartCount" />
  </header>

  <!-- MAIN CONTENT -->
  <main :class="isOnCategoryRoute ? 'pt-[170px]' : 'pt-80'">
    <!-- Category pages with sidebar layout -->
    <div v-if="isOnCategoryRoute" class="container mx-auto px-4 md:px-6 py-4 md:py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4 md:gap-6">
        <!-- SIDEBAR - Responsive: Hidden on mobile, visible on md+ -->
        <div class="hidden md:block md:col-span-1 lg:col-span-2 pb-32">
          <CategorySidebar />
        </div>

        <!-- Page content - Responsive: Full width on mobile -->
        <div class="col-span-1 md:col-span-2 lg:col-span-10 pb-32 ">
          <RouterView @update-cart="handleCartUpdate" />
        </div>
      </div>
    </div>

    <!-- Non-category pages with proper spacing -->
    <div v-else class="pb-32">
      <RouterView @update-cart="handleCartUpdate" />
    </div>
  </main>

  <!-- FOOTER - Separate container with proper spacing -->
  <footer class="bg-gray-50 pt-12 mt-0">
    <FooterComponent />
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import HeaderComponent from '@/components/home/HeaderComponent.vue'
import FooterComponent from '@/components/home/FooterComponent.vue'
import CategorySidebar from '@/components/Categories/CategorySidebar.vue'
import { useCategoryStore } from '@/stores/categoryStore'

const route = useRoute()
const categoryStore = useCategoryStore()
const cartCount = ref(0)

// Check if current route is a category route
const isOnCategoryRoute = computed(() => {
  return route.path.startsWith('/category')
})

// Initialize categories when layout mounts
import { onMounted } from 'vue'
onMounted(() => {
  categoryStore.fetchPublicCategories()
})

const handleCartUpdate = (newValue: number) => {
  cartCount.value = newValue
}
</script>
