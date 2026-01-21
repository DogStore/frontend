<template>
  <div class="min-h-screen bg-gray-50">
    <header class="flex-shrink-0 border-b border-gray-200 shadow-sm">
      <HeaderComponent :cartCount="cartCount" />
    </header>

    <!-- Main content area -->
    <main class="flex-1 overflow-y-auto bg-gray-50">
      <div class="container mx-auto px-4 py-8 mt-35 mb-23">
        <RouterView />
      </div>
    </main>
  </div>

  <footer class="flex-shrink-0 bg-white border-t border-gray-200">
    <FooterComponent />
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderComponent from '@/components/home/HeaderComponent.vue'
import FooterComponent from '@/components/home/FooterComponent.vue'
const cartCount = ref(0)
// Nothing needed here unless you add logic
</script>
