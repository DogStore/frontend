<template>
  <div
    :class="[
      'rounded-xl p-6 text-white shadow-lg',
      colorClass,
      fullWidth ? 'md:col-span-2 lg:col-span-1' : ''
    ]"
  >
    <div class="flex items-center gap-3 mb-3">
      <component :is="iconComponent" class="w-5 h-5" />
      <h3 class="text-sm font-semibold">{{ title }}</h3>
    </div>

    <div class="text-3xl font-bold mb-2">
      {{ prefix }}{{ formattedValue }}
    </div>

    <div class="text-xs opacity-90">
      Update on: {{ lastUpdate }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  value: number
  lastUpdate: string
  color: 'orange' | 'blue' | 'yellow' | 'green'
  icon: 'users' | 'products' | 'revenue' | 'sold'
  prefix?: string
  fullWidth?: boolean
}>()

const colorClass = computed(() => {
  const colors = {
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-700'
  }
  return colors[props.color]
})

const formattedValue = computed(() => {
  return props.value.toLocaleString()
})

const iconComponent = computed(() => {
  const icons = {
    users: UsersIcon,
    products: ProductsIcon,
    revenue: RevenueIcon,
    sold: SoldIcon
  }
  return icons[props.icon]
})

// Icon Components
const UsersIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  `
}

const ProductsIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  `
}

const RevenueIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  `
}

const SoldIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  `
}
</script>
