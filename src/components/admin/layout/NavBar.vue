<script setup lang="ts">
import { Bell, IdCard, User2 } from 'lucide-vue-next'

const props = defineProps<{
  isSidebarOpened: boolean
}>()
</script>

<template>
  <div class="bg-gray-50 h-28 flex justify-between items-center px-4 border-b border-gray-200">
    <div class="">
      <img :class="props.isSidebarOpened ? 'hidden' : 'block'" src="/Logo.png" alt="" />
    </div>
    <div class="flex flex-row gap-8">
      <div
        class="flex flex-row gap-2 items-center border-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <Bell />
        <p>Notification</p>
      </div>
    </div>
  </div>
</template>
