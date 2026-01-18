<template>
  <div class="relative">
    <div
      class="h-screen bg-gray-300 border-r border-gray-200 shadow-sm transition-all duration-300 flex flex-col"
      :class="props.isSidebarOpened ? 'w-72' : 'w-20'"
    >
      <!-- Logo Section -->
      <div class="border-b border-gray-200" :class="props.isSidebarOpened ? 'p-5' : 'p-4'">
        <transition name="fade" mode="out-in">
          <div v-if="props.isSidebarOpened" class="flex items-center gap-3">
            <img src="/Logo.png" alt="DOG Hub Logo" class="h-12" />
          </div>
          <div v-else class="flex justify-center">
            <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-xl text-white">
              D
            </div>
          </div>
        </transition>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 py-6 space-y-2 overflow-y-auto" :class="props.isSidebarOpened ? 'px-4' : 'px-2'">
        <!-- Dashboard -->
        <router-link
          to="/admin/dashboard"
          v-slot="{ isActive }"
          custom
        >
          <a
            @click="$router.push('/admin/dashboard')"
            class="flex items-center rounded-lg transition-all duration-200 cursor-pointer group relative"
            :class="[
              props.isSidebarOpened ? 'gap-3 px-4 py-3' : 'justify-center py-3',
              isActive
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            <BookDashedIcon
              :size="22"
              :class="isActive ? 'text-white' : 'text-gray-700'"
            />
            <span
              v-if="props.isSidebarOpened"
              class="font-medium whitespace-nowrap"
            >
              Dashboard
            </span>
          </a>
        </router-link>

        <!-- Manage Products -->
        <router-link
          to="/admin/Manage-Product"
          v-slot="{ isActive }"
          custom
        >
          <a
            @click="$router.push('/admin/Manage-Product')"
            class="flex items-center rounded-lg transition-all duration-200 cursor-pointer group"
            :class="[
              props.isSidebarOpened ? 'gap-3 px-4 py-3' : 'justify-center py-3',
              isActive
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            <Projector
              :size="22"
              :class="isActive ? 'text-white' : 'text-gray-700'"
            />
            <span
              v-if="props.isSidebarOpened"
              class="font-medium whitespace-nowrap"
            >
              Manage Products
            </span>
          </a>
        </router-link>

        <!-- Promotion -->
        <router-link
          to="/admin/Promotion"
          v-slot="{ isActive }"
          custom
        >
          <a
            @click="$router.push('/admin/Promotion')"
            class="flex items-center rounded-lg transition-all duration-200 cursor-pointer group"
            :class="[
              props.isSidebarOpened ? 'gap-3 px-4 py-3' : 'justify-center py-3',
              isActive
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            <UniversityIcon
              :size="22"
              :class="isActive ? 'text-white' : 'text-gray-700'"
            />
            <span
              v-if="props.isSidebarOpened"
              class="font-medium whitespace-nowrap"
            >
              Promotion & Coupon
            </span>
          </a>
        </router-link>

        <!-- View Orders -->
        <router-link
          to="/admin/View-Order"
          v-slot="{ isActive }"
          custom
        >
          <a
            @click="$router.push('/admin/View-Order')"
            class="flex items-center rounded-lg transition-all duration-200 cursor-pointer group"
            :class="[
              props.isSidebarOpened ? 'gap-3 px-4 py-3' : 'justify-center py-3',
              isActive
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            <SettingsIcon
              :size="22"
              :class="isActive ? 'text-white' : 'text-gray-700'"
            />
            <span
              v-if="props.isSidebarOpened"
              class="font-medium whitespace-nowrap"
            >
              View Orders
            </span>
          </a>
        </router-link>

        <!-- Divider -->
        <div class="my-4 border-t border-gray-200"></div>

        <!-- Visit Store as Guest -->
        <button
          @click="visitStoreAsGuest"
          class="flex items-center w-full rounded-lg transition-all duration-200 cursor-pointer group text-gray-600 hover:bg-blue-50 hover:text-blue-600"
          :class="props.isSidebarOpened ? 'gap-3 px-4 py-3' : 'justify-center py-3'"
        >
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span
            v-if="props.isSidebarOpened"
            class="font-medium whitespace-nowrap"
          >
            Visit Store as Guest
          </span>
        </button>
      </nav>
    </div>

    <!-- Toggle Button -->
    <button
      @click="toggleSidebar"
      class="fixed top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      :style="{ left: props.isSidebarOpened ? '264px' : '64px' }"
      :title="props.isSidebarOpened ? 'Collapse sidebar' : 'Expand sidebar'"
    >
      <svg
        class="w-5 h-5 transition-transform duration-300"
        :class="{ 'rotate-180': !props.isSidebarOpened }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { BookDashedIcon, Projector, SettingsIcon, UniversityIcon } from 'lucide-vue-next'
import { useToast } from 'vue-toast-notification'
import { useUserStore } from '@/stores/userStore'

const props = defineProps<{ isSidebarOpened: boolean }>()

const emit = defineEmits<{
  (e: 'update:isSidebarOpened', value: boolean): void
}>()

const router = useRouter()
const $toast = useToast()
const userStore = useUserStore()

// Methods
const toggleSidebar = () => {
  emit('update:isSidebarOpened', !props.isSidebarOpened)
}

const visitStoreAsGuest = () => {
  // Save admin token
  const adminToken = userStore.token || ''

  // Logout to appear as guest
  userStore.logout()

  // Set preview mode flags
  sessionStorage.setItem('adminPreview', 'true')
  sessionStorage.setItem('adminToken', adminToken)

  // Navigate to homepage
  router.push('/')

  $toast.info('Viewing store as guest.', {
    duration: 5000
  })
}
</script>

<style scoped>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>
