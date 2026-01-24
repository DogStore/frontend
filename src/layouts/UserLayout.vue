<template>
  <div class="min-h-screen bg-gray-50">
    <header class="shrink-0 border-b border-gray-200 shadow-sm">
      <HeaderComponent :cartCount="cartCount" />
    </header>

    <!-- Main content area -->
    <main :class="mainClass">
      <RouterView />
    </main>
  </div>

  <footer class="shrink-0 bg-white border-t border-gray-200">
    <FooterComponent />
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import HeaderComponent from '@/components/home/HeaderComponent.vue'
import FooterComponent from '@/components/home/FooterComponent.vue'

const route = useRoute()

const mainClass = computed(() => {
  if (route.path === '/cart' || route.path === '/checkout' || route.path === '/user/profile') {
    return 'pt-35 sm:pt-35 lg:pt-35 pb-40'
  }

  return 'pt-[325px] sm:pt-[327px] lg:pt-[357px] mb-50 text-center'
})

const cartCount = ref(0)
</script>
