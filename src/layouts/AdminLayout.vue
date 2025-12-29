<script setup lang="ts">
import NavBar from '../components/admin/layout/NavBar.vue'
import SideBar from '../components/admin/layout/SideBar.vue'
import { ref } from 'vue'

const isSidebarOpened = ref(true)
</script>

<template>
  <div class="flex h-screen">
    <aside class="bg-slate-100">
      <SideBar
        :isSidebarOpened="isSidebarOpened"
        @update:isSidebarOpened="isSidebarOpened = $event"
      />
    </aside>

    <div class="flex flex-col flex-1">
      <header class="bg-white border-b border-gray-200">
        <NavBar :isSidebarOpened="isSidebarOpened" />
      </header>

      <main class="flex-1 overflow-auto p-6 bg-gray-50">
        <RouterView />
      </main>
    </div>
  </div>
</template>
