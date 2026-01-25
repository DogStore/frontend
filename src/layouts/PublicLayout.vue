<!-- src/layouts/PublicLayout.vue -->
<template>
  <div>
    <HeaderComponent :cartCount="cartCount" />
  </div>

  <main class="pt-[320px] sm:pt-[327px] lg:pt-[357px] mb-50 text-center">
    <RouterView @update-cart="handleCartUpdate" />
  </main>

  <FooterComponent />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderComponent from '@/components/home/HeaderComponent.vue'
import FooterComponent from '@/components/home/FooterComponent.vue'


const cartCount = ref(0)

const handleCartUpdate = (newValue: number) => {
  cartCount.value = newValue
}
</script>
