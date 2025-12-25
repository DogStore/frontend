<script setup lang="ts">
// 1. Import ONLY the icons you need
import { Users, Package, Wallet, ShoppingCart } from 'lucide-vue-next';
import StatsCard from './StatsCard.vue';
import type { Component } from 'vue';
// 2. Define the prop interface for the data
interface StatData {
  title: string;
  value: number;
  // Change iconName to iconComponent and set its type
  iconComponent: Component;
  backgroundClass: string;
  updateTime: string;
}

// 3. Use the imported component objects directly in your data array
const statsData: StatData[] = [
  {
    title: 'Registered Users',
    value: 10450,
    iconComponent: Users, // Pass the component object
    backgroundClass: 'bg-indigo-600',
    updateTime: '12:30 a.m.'
  },
  {
    title: 'Products Listed',
    value: 5200,
    iconComponent: Package, // Pass the component object
    backgroundClass: 'bg-green-600',
    updateTime: '12:30 a.m.'
  },
  // ... continue for Wallet and ShoppingCart
  { title: 'Revenue', value: 125300, iconComponent: Wallet, backgroundClass: 'bg-orange-600', updateTime: '12:30 a.m.' },
  { title: 'Products Sold', value: 980, iconComponent: ShoppingCart, backgroundClass: 'bg-red-600', updateTime: '12:30 a.m.' },
];
</script>

<template>
  <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
    <StatsCard
      v-for="stat in statsData"
      :key="stat.title"
      :title="stat.title"
      :value="stat.value"

      :icon-component="stat.iconComponent"

      :bg-color="stat.backgroundClass"
      :update-time="stat.updateTime"
    />
  </div>
</template>
