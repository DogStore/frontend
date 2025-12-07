<template>
  <HeaderComponent :cartCount="cartCount" />

  <main class="text-center mt-50 mb-50">
    <RouterView @update-cart="handleCartUpdate" />
  </main>

  <FooterComponent/>
</template>

<script setup lang="ts">
import FooterComponent from './components/home/FooterComponent.vue';
import HeaderComponent from './components/home/HeaderComponent.vue';
import { ref } from 'vue';
const cartCount = ref(0);

const handleCartUpdate = (newValue: number) => {
  cartCount.value = newValue;
};
</script>
