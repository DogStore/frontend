<template>
  <HeaderComponent />

  <main :class="mainClass">
    <RouterView />
  </main>

  <FooterComponent />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HeaderComponent from './components/home/HeaderComponent.vue'
import FooterComponent from './components/home/FooterComponent.vue'

const route = useRoute()

const mainClass = computed(() => {
  // Pages that need compact spacing
  if (route.path === '/cart' || route.path === '/checkout') {
    return 'pt-35 pb-36'
  }

  // Default (Home & other pages)
  return 'pt-[325px] sm:pt-[327px] lg:pt-[357px] mb-50 text-center'
})
</script>
