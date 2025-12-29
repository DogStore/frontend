<!-- src/app.vue  -->

<template>
  <HeaderComponent :cartCount="cartCount" />

  <main class="pt-[325px] sm:pt-[327px] lg:pt-[357px] mb-50 text-center">
    <RouterView @update-cart="handleCartUpdate" />
  </main>

  <FooterComponent />
</template>

<script setup lang="ts">
import FooterComponent from './components/home/FooterComponent.vue'
import HeaderComponent from './components/home/HeaderComponent.vue'
import { ref } from 'vue'
const cartCount = ref(0)

const handleCartUpdate = (newValue: number) => {
  cartCount.value = newValue
}
</script>
