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

  </header>
</template>
