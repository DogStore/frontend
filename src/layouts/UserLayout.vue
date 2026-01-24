<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Optional: User dashboard header -->
    <header class="bg-white shadow-sm py-4 px-6">
      <h1 class="text-2xl font-bold text-gray-800">My Account</h1>
    </header>

    <!-- Main content area -->
    <main :class="mainClass">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const mainClass = computed(() => {
  // Pages that need compact spacing
  if (route.path === '/cart' || route.path === '/checkout') {
    return 'pt-35 sm:pt-35 lg:pt-35 pb-40'
  }

  // Default (Home & other pages)
  return 'pt-[325px] sm:pt-[327px] lg:pt-[357px] mb-50 text-center'
})
</script>
