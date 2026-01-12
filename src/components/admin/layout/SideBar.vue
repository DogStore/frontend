<script setup lang="ts">
import { BookDashedIcon, Projector, SettingsIcon, UniversityIcon } from 'lucide-vue-next'

const props = defineProps<{ isSidebarOpened: boolean }>()

const emit = defineEmits<{
  (e: 'update:isSidebarOpened', value: boolean): void
}>()

const toggleSidebar = () => {
  emit('update:isSidebarOpened', !props.isSidebarOpened)
}
</script>
<template>
  <div class="flex flex-row justify-start items-center">
    <div
      class="h-screen flex text-black p-5 gap-10 transition-all duration-200"
      :class="
        props.isSidebarOpened
          ? 'w-70 flex flex-col justify-start items-center'
          : 'w-20 flex flex-col justify-center items-center'
      "
    >
      <div :class="props.isSidebarOpened ? 'block' : 'hidden'">
        <img src="/Logo.png" alt="" />
      </div>
      <div
        class="flex flex-col justify-start text-lg font-medium"
        :class="props.isSidebarOpened ? 'gap-10 mt-10' : 'gap-0'"
      >
        <router-link
          to="/admin/dashboard"
          class="flex flex-row gap-2 justify-center items-center hover:border-l-2 hover:border-sky-600 hover:bg-sky-400 hover:text-white hover:rounded-md px-2 py-1.5"
        >
          <BookDashedIcon />
          <span :class="isSidebarOpened ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'"
            >Dashboard & Analytics</span
          >
        </router-link>

        <router-link
          to="/admin/Manage-Product"
          class="flex flex-row gap-2 justify-start items-center hover:border-l-2 hover:border-sky-600 hover:bg-sky-400 hover:text-white hover:rounded-md px-2 py-1.5"
        >
          <Projector />
          <span :class="isSidebarOpened ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'"
            >Manage Products</span
          >
        </router-link>
        <router-link
          to="/admin/Promotion"
          class="flex flex-row gap-2 justify-start items-center hover:border-l-2 hover:border-sky-600 hover:bg-sky-400 hover:text-white hover:rounded-md px-2 py-1.5"
        >
          <UniversityIcon />
          <span :class="isSidebarOpened ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'"
            >Promotion & Coupon</span
          >
        </router-link>

        <router-link
          to="/admin/View-Order"
          class="flex flex-row gap-2 justify-start items-center hover:border-l-2 hover:border-sky-600 hover:bg-sky-400 hover:text-white hover:rounded-md px-2 py-1.5"
        >
          <SettingsIcon />
          <span :class="isSidebarOpened ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'"
            >View Order</span
          >
        </router-link>
      </div>
    </div>
    <div class="mr-10">
      <button
        @click="toggleSidebar"
        class="absolute top-1/2 z-10 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-amber-600 border border-black/20 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <span v-if="isSidebarOpened">⮜</span>
        <span v-else>⮞</span>
      </button>
    </div>
  </div>
</template>
