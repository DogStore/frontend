<script setup lang="ts">
import { Bell } from 'lucide-vue-next'

const props = defineProps<{
  isSidebarOpened: boolean
}>()
</script>

<template>
  <header
    class="h-20 bg-white flex items-center justify-between px-6 border-b border-gray-200 shadow-sm"
  >
    <!-- Left: Logo -->
    <div class="flex items-center">
      <img
        v-show="!props.isSidebarOpened"
        src="/Logo.png"
        alt="Logo"
        class="h-10 object-contain transition-opacity duration-200"
      />
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-4">
      <!-- Notification -->
      <button
        class="relative flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200
               text-gray-700 hover:bg-gray-100 hover:border-gray-300
               transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <Bell class="w-5 h-5" />
        <span class="text-sm font-medium hidden md:inline">Notifications</span>

        <!-- Notification dot (optional) -->
        <span
          class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500"
        />
      </button>
    </div>
  </header>
</template>
