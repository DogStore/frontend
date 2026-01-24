<template>
  <header
    class="fixed top-0 left-0 w-full z-50 font-Nunito bg-white transition-all duration-300"
    :class="{ 'shadow-md': isScrolled }"
  >
    <!-- ROW 1: TOP CONTACT BAR - Hidden on scroll and mobile -->
    <transition name="slide-up">
      <div v-if="!isScrolled" class="hidden md:block border-b border-gray-200 bg-gray-50">
        <div
          class="max-w-[1500px] mx-auto px-4 lg:px-6 py-1.5 flex justify-between items-center text-xs text-gray-700"
        >
          <!-- LEFT: Contact -->
          <div class="flex items-center space-x-6">
            <a href="tel:+885123456789" class="flex items-center hover:text-orange-500 transition">
              <img src="@/assets/HeaderImages/Phone.png" class="w-4 h-4 mr-1.5" alt="Phone" />
              <span>+885 123 456 789</span>
            </a>
            <a
              href="https://t.me/+885123456789"
              target="_blank"
              rel="noopener"
              class="flex items-center hover:text-orange-500 transition"
            >
              <img
                src="@/assets/HeaderImages/Telegram App.png"
                class="w-4 h-4 mr-1.5"
                alt="Telegram"
              />
              <span>+885 123 456 789</span>
            </a>
          </div>

          <!-- RIGHT: Social -->
          <div class="flex items-center space-x-4">
            <router-link to="/about" class="hover:text-orange-500 transition">About Us</router-link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              class="hover:text-orange-500"
              aria-label="Instagram"
            >
              <img
                src="@/assets/HeaderImages/Instagram Circle.png"
                class="w-4 h-4"
                alt="Instagram"
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener"
              class="hover:text-orange-500"
              aria-label="Facebook"
            >
              <img src="@/assets/HeaderImages/Facebook f.png" class="w-4 h-4" alt="Facebook" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener"
              class="hover:text-orange-500"
              aria-label="X"
            >
              <img src="@/assets/HeaderImages/X.png" class="w-4 h-4" alt="X" />
            </a>
          </div>
        </div>
      </div>
    </transition>

    <!-- ROW 2: LOGO + SEARCH + ACTIONS (This sticks when scrolled) -->
    <div class="border-b border-gray-200" :class="isScrolled ? 'py-2' : 'py-3'">
      <div class="max-w-[1500px] mx-auto px-4 lg:px-6 flex items-center justify-between gap-4">
        <!-- LOGO & Mobile Menu -->
        <div class="flex items-center gap-3">
          <!-- LOGO -->
          <router-link to="/" class="shrink-0 hover:opacity-90 transition">
            <img
              src="@/assets/HeaderImages/Logo.png"
              :class="isScrolled ? 'h-8' : 'h-10'"
              class="transition-all duration-300"
              alt="DOG Hub Logo"
            />
          </router-link>
          <!-- Mobile Menu Toggle -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="sm:hidden p-2 hover:bg-orange-50 rounded-lg transition"
            :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          >
            <svg
              v-if="!isMobileMenuOpen"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

        </div>

        <!-- SEARCH BAR -->
        <div class="flex-1 max-w-xl">
          <form @submit.prevent="onSearch" class="relative">
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search for supplies"
              class="w-full border border-gray-300 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm transition"
            />
            <button
              type="submit"
              class="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70"
            >
              <img src="@/assets/HeaderImages/Search.png" class="w-4" alt="Search" />
            </button>
          </form>
        </div>

        <!-- ACTIONS -->
        <div class="flex items-center gap-2">
          <!-- Wishlist - Desktop -->
          <button
            class="hidden lg:flex items-center gap-2 px-3 py-1.5 border border-orange-300 rounded-lg hover:bg-orange-50 transition text-sm"
            @click="goToWishlist"
          >
            <span>Wish Lists</span>
            <img src="@/assets/HeaderImages/Favorite.png" class="h-4" alt="Wishlist" />
          </button>

          <!-- Wishlist - Tablet -->
          <button
            class="hidden sm:block lg:hidden p-2 border border-orange-300 rounded-lg hover:bg-orange-50 transition"
            @click="goToWishlist"
            aria-label="Wishlist"
          >
            <img src="@/assets/HeaderImages/Favorite.png" class="h-4" alt="Wishlist" />
          </button>

          <!-- CART -->
          <button
            class="relative flex items-center gap-2 px-3 py-1.5 bg-[#FFAA0C] text-white rounded-lg hover:bg-orange-500 transition shadow-sm"
            @click="goTOcart"
          >
            <img src="@/assets/HeaderImages/Shopping Cart.png" class="h-4" alt="Cart" />
            <span class="hidden lg:inline font-bold text-sm">CARTS</span>
            <span
              v-if="cart.cartCount > 0"
              class="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs font-bold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full border-2 border-white"
            >
              {{ cart.cartCount > 99 ? '99+' : cart.cartCount }}
            </span>
          </button>

          <!-- USER MENU -->
          <div
            v-if="isLoggedIn"
            class="hidden sm:block relative"
            v-click-outside="closeProfileMenu"
          >
            <button
              @click="showProfileMenu = !showProfileMenu"
              class="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded-lg transition"
            >
              <!-- Loading state -->
              <div v-if="imageLoading" class="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
              <!-- Avatar with picture -->
              <div v-else-if="userStore.profilePicture && !imageError" class="flex items-center">
                 <img
                  :src="userStore.profilePicture"
                  alt="Profile"
                  class="w-10 h-10 rounded-full object-cover border border-gray-300"
                  loading="lazy"
                  @error="handleImageError"
                />
              </div>
              <!-- Avatar without picture -->
              <div v-else class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300">
                <span class="text-gray-700 font-medium text-sm">
                  <!-- {{ userStore.name ? userStore.name[0]?.toUpperCase() : 'U' }} -->
                  {{ getUserInitials() }}
                </span>
              </div>
            </button>
            <div
              v-if="showProfileMenu"
              class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10"
            >
              <router-link
                to="/user/profile"
                class="block px-4 py-2 hover:bg-gray-100"
                @click="showProfileMenu = false"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </router-link>
            </div>

            <transition name="dropdown">
              <div
                v-if="showProfileMenu"
                class="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg py-2 z-50 border border-gray-100"
              >
                <div class="px-4 py-2 border-b border-gray-100">
                  <p class="text-sm font-semibold text-gray-900 truncate">{{ userName }}</p>
                  <p class="text-xs text-gray-500 truncate">{{ userStore.email }}</p>
                </div>
                <router-link
                  to="/user/profile"
                  class="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 text-sm"
                  @click="showProfileMenu = false"
                >
                  <svg
                    class="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  My Profile
                </router-link>
                <button
                  @click="logout"
                  class="flex items-center gap-2 w-full px-4 py-2 hover:bg-red-50 text-red-600 text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </transition>
          </div>

          <!-- LOGIN -->
          <router-link
            v-else
            to="/login"
            class="hidden sm:flex items-center gap-1 px-4 py-1.5 bg-[#FFAA0C] text-white font-bold rounded-lg hover:bg-orange-500 transition text-sm"
          >
            Login
          </router-link>
        </div>
      </div>
    </div>

    <!-- ROW 3: NAVIGATION - Always visible, just compacts on scroll -->
    <div class="hidden sm:block border-b border-gray-100">
      <div
        class="max-w-[1500px] mx-auto px-4 lg:px-6 transition-all duration-300"
        :class="isScrolled ? 'py-1.5' : 'py-2'"
      >
        <nav class="flex items-center gap-6 text-sm">
          <button
            @click="goToHome"
            class="flex items-center gap-1.5 font-bold hover:text-orange-500 transition"
          >
            <img src="@/assets/HeaderImages/Home.png" class="w-4 h-4" alt="Home" />
            <span>Home</span>
          </button>

          <!-- All Products Button → Route to ProductPage.vue -->
          <button
            @click="goToAllProducts"
            class="flex items-center gap-1.5 font-bold hover:text-orange-500 transition px-2 py-1 rounded-md"
          >
            <img src="@/assets/HeaderImages/Product.png" class="w-4 h-4" alt="Products" />
            <span>All Products</span>
          </button>

          <button
            @click="goToBestSelling"
            class="flex items-center gap-1.5 font-bold hover:text-orange-500 transition"
          >
            <img src="@/assets/HeaderImages/Fire.png" class="w-4 h-4" alt="Best Selling" />
            <span>Best Selling Products</span>
          </button>
        </nav>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <transition name="slide-down">
      <div
        v-if="isMobileMenuOpen"
        class="sm:hidden border-t border-gray-200 bg-white shadow-lg max-h-[70vh] overflow-y-auto"
      >
        <div class="px-4 py-3 space-y-1">
          <button
            @click="goToHome"
            class="flex items-center w-full gap-3 py-2.5 px-3 rounded-lg hover:bg-orange-50 font-semibold text-sm"
          >
            <img src="@/assets/HeaderImages/Home.png" class="w-5" alt="Home" />
            Home
          </button>

          <button
            @click="goToAllProducts"
            class="flex items-center w-full gap-3 py-2.5 px-3 rounded-lg hover:bg-orange-50 font-semibold text-sm"
          >
            <img src="@/assets/HeaderImages/Product.png" class="w-5" alt="Products" />
            All Products
          </button>

          <button
            @click="goToBestSelling"
            class="flex items-center w-full gap-3 py-2.5 px-3 rounded-lg hover:bg-orange-50 font-semibold text-sm"
          >
            <img src="@/assets/HeaderImages/Fire.png" class="w-5" alt="Best Selling" />
            Best Selling
          </button>

          <div class="pt-2 mt-2 border-t border-gray-200">
            <button
              @click="goToWishlist"
              class="flex items-center w-full gap-3 py-2.5 px-3 rounded-lg hover:bg-orange-50 font-semibold text-sm"
            >
              <img src="@/assets/HeaderImages/Favorite.png" class="w-5" alt="Wishlist" />
              Wish List
            </button>

            <template v-if="isLoggedIn">
              <button
                @click="goToProfile"
                class="flex items-center w-full gap-3 py-2.5 px-3 rounded-lg hover:bg-orange-50 font-semibold text-sm"
              >
                <div
                  class="w-5 h-5 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xs"
                >
                  {{ userInitial }}
                </div>
                My Profile
              </button>
              <button
                @click="logout"
                class="flex items-center w-full gap-3 py-2.5 px-3 rounded-lg hover:bg-red-50 text-red-600 font-semibold text-sm"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </template>
            <button
              v-else
              @click="goToLogin"
              class="flex items-center w-full gap-3 py-2.5 px-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 font-semibold text-sm"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login
            </button>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useProductStore } from '@/stores/productStore'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'

// Assets
import foodIcon from '@/assets/HeaderImages/Food.png'
import clothesIcon from '@/assets/HeaderImages/Clothes.png'
import toyIcon from '@/assets/HeaderImages/Toy.png'
import moreIcon from '@/assets/HeaderImages/More.png'
import { useToast } from 'vue-toast-notification'

// Stores
const userStore = useUserStore()
const cart = useCartStore()
const productStore = useProductStore()
const router = useRouter()
const route = useRoute()
const $toast = useToast()

// State
const searchQuery = ref('')
const isDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isMobileDropdownOpen = ref(false)
const showProfileMenu = ref(false)
const isScrolled = ref(false)
const imageLoading = ref(false)

// Computed
const isLoggedIn = computed(() => !!userStore.token)
const userName = computed(() => userStore.name || 'User')
const userInitial = computed(() => (userStore.name || 'U')[0]?.toUpperCase())

// Scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
const API_BASE = 'https://backend-kanu.onrender.com/api'

// Add this function to fetch profile picture
const fetchProfilePicture = async () => {
  if (!userStore.token || userStore.profilePicture) {
    return // Don't fetch if already have picture or no token
  }

  imageLoading.value = true
  try {
    const response = await axios.get(`${API_BASE}/users/profile`, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })

    const data = response.data.user || response.data // handle both structures

    // Try common field names (in order of likelihood)
    const pictureUrl =
      data.userImage ||
      data.profilePicture ||
      data.avatar ||
      data.photo ||
      data.image ||
      (data.user && data.user.userImage) ||
      (data.user && data.user.profilePicture)

    if (pictureUrl) {
      userStore.updateProfilePicture(pictureUrl)
      imageError.value = false
    } else {
      console.warn('No profile picture found in response')
    }
  } catch (err) {
    console.error('Failed to fetch profile picture:', err)
  } finally {
    imageLoading.value = false
  }
}

// Watch for login state changes
watch(isLoggedIn, (loggedIn) => {
  if (loggedIn) {
    fetchProfilePicture()
  } else {
    userStore.updateProfilePicture('') // Clear on logout
  }
})

// Fetch on component mount if already logged in
onMounted(() => {
  if (isLoggedIn.value && !userStore.profilePicture) {
    fetchProfilePicture()
  }
})


const imageError = ref(false)

const getUserInitials = () => {
  if (!userStore.name) return 'U'
  return userStore.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

const handleImageError = (event: Event) => {
  imageError.value = true
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

// Search
const onSearch = async () => {
  const query = searchQuery.value.trim()
  if (!query) return

  if (route.name !== 'Search') {
    await router.push('/search')
  }
  productStore.searchProducts(query)
  isMobileMenuOpen.value = false
}

watch(searchQuery, (q) => {
  if (q === '') productStore.clearSearch()
})

// Close on route change
watch(
  () => route.path,
  () => closeAll(),
)

// Close utilities
const closeAll = () => {
  isDropdownOpen.value = false
  isMobileMenuOpen.value = false
  isMobileDropdownOpen.value = false
  showProfileMenu.value = false
  document.body.style.overflow = ''
}
const closeDropdown = () => (isDropdownOpen.value = false)
const closeProfileMenu = () => (showProfileMenu.value = false)

// Navigation
const goToHome = () => {
  router.push('/')
  closeAll()
}
const goToWishlist = () => {
  router.push('/wishlist')
  closeAll()
}
const goTOcart = () => {
  router.push('/cart')
  closeAll()
}
const goToAllProducts = () => {
  router.push('/category')
  closeAll()
}
const goToBestSelling = () => {
  router.push('/products/bestSelling')
  closeAll()
}
const goToLogin = () => {
  router.push('/login')
  closeAll()
}
const goToProfile = () => {
  router.push('/user/profile')
  closeAll()
}

// Logout
const logout = () => {
  userStore.logout()
  router.push('/')
  $toast.success('Successfully logged out')
  closeAll()
}

// Click outside directive
const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}
</script>

<style scoped>
/* Slide up animation */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-up-enter-from,
.slide-up-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  max-height: 100px;
  opacity: 1;
}

/* Dropdown animation */
.dropdown-enter-active {
  animation: dropdown-in 0.2s ease-out;
}

.dropdown-leave-active {
  animation: dropdown-out 0.15s ease-in;
}

@keyframes dropdown-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dropdown-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
}

/* Slide down for mobile menu */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 70vh;
  opacity: 1;
}

/* Expand animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 300px;
  opacity: 1;
}
</style>
