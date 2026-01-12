<template>
  <div :class="['p-5 rounded-lg shadow-md', bgColor]">
    <div class="flex items-center justify-between">
      <div class="p-3 rounded-full bg-white bg-opacity-30">
        <component :is="iconComponent" class="w-6 h-6 text-white" />
      </div>

      <div class="text-right text-white">
        <p class="text-2xl font-bold">{{ value.toLocaleString() }}</p>
        <p class="text-sm opacity-90">{{ title }}</p>
      </div>
    </div>
    <p class="mt-4 text-xs text-white opacity-80 border-t pt-2 border-white border-opacity-30">
      Update on: {{ updateTime }}
    </p>
  </div>
</template>

<script setup lang="ts">
// We MUST import Component from vue
import type { Component } from 'vue';
// NO LucideImports HERE

interface Props {
  title: string;
  value: number;
  // This is the prop name passed from the parent
  iconComponent: Component;
  bgColor: string;
  updateTime: string;
}

// Define the props
defineProps<Props>();

// Note: In Vue 3's <script setup>, the prop named iconComponent is automatically
// available in the template under the same name (iconComponent).
// NO computed property is needed.
</script>
