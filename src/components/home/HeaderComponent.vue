<template>
  <header class="fixed top-0 left-0 w-full z-50 font-Nunito border-b border-gray-200 bg-white">
    <!-- ROW 1: TOP CONTACT BAR - HIDDEN ON MOBILE -->
    <div class="hidden md:block border-b border-gray-200">
      <div
        class="max-w-[1500px] mx-auto px-4 lg:px-6 py-2 flex flex-wrap justify-between items-center text-sm text-gray-800"
      >
        <!-- LEFT -->
        <div class="flex items-center space-x-4 lg:space-x-10">
          <div class="flex items-center">
            <img src="@/assets/HeaderImages/Phone.png" class="w-5 h-5 mr-2" />
            <span class="hidden sm:inline">+885 123 456 789</span>
            <span class="sm:hidden">+885 123 456</span>
          </div>

          <a href="#" class="flex items-center hover:text-orange-500 transition">
            <img src="@/assets/HeaderImages/Telegram App.png" class="w-5 h-5 mr-2" />
            <span class="hidden sm:inline">+885 123 456 789</span>
            <span class="sm:hidden">Telegram</span>
          </a>
        </div>

        <!-- RIGHT -->
        <div class="flex items-center space-x-4 lg:space-x-10">
          <router-link
            to="/user/aboutUs"
            class="hidden sm:flex items-center hover:text-orange-500"
            active-class="text-orange-500"
          >
            <img src="@/assets/HeaderImages/About.png" class="w-6 mr-2" />
            <span class="block px-4 py-2 hover:bg-gray-100 hover:rounded-lg">About Us</span>
          </router-link>

          <div class="flex items-center space-x-4 lg:space-x-8">
            <a href="#" class="flex items-center hover:text-orange-500" title="Instagram">
              <img
                src="@/assets/HeaderImages/Instagram Circle.png"
                class="w-5 lg:w-6 mr-1 lg:mr-2"
              />
              <span class="block px-4 py-2 hover:bg-gray-100 hover:rounded-lg">Instagram</span>
            </a>
            <a href="#" class="flex items-center hover:text-orange-500" title="Facebook">
              <img src="@/assets/HeaderImages/Facebook f.png" class="w-5 lg:w-6 mr-1 lg:mr-2" />
              <span class="block px-4 py-2 hover:bg-gray-100 hover:rounded-lg">Facebook</span>
            </a>
            <a href="#" class="flex items-center hover:text-orange-500" title="X">
              <img src="@/assets/HeaderImages/X.png" class="w-5 lg:w-6 mr-1 lg:mr-2" />
              <span class="block px-4 py-2 hover:bg-gray-100 hover:rounded-lg">X</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- ROW 2: LOGO + SEARCH + CART -->
    <div
      class="max-w-[1500px] mx-auto mt-[-1rem] px-4 lg:px-6 py-4 lg:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6"
    >
      <!-- TOP ROW FOR MOBILE: LOGO + CART + LOGIN -->
      <div class="w-full sm:w-auto flex items-center justify-between sm:justify-start">
        <!-- LOGO -->
        <a href="/" class="flex-shrink-0">
          <img src="@/assets/HeaderImages/Logo.png" class="h-12 lg:h-12" />
        </a>

        <!-- MOBILE BUTTONS -->
        <div class="flex items-center gap-3 sm:hidden">
          <!-- CART -->
          <button
            class="relative p-2 bg-[#FFAA0C] text-white rounded-lg hover:bg-orange-500 transition"
            @click="goTOcart"
          >
            <img src="@/assets/HeaderImages/Shopping Cart.png" class="h-5 w-5" />
            <span
              class="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white"
            >
              {{ cart.cartCount }}
            </span>
          </button>

          <!-- MOBILE MENU TOGGLE -->
          <button @click="toggleMobileMenu" class="p-2 border border-orange-300 rounded-lg">
            <svg
              v-if="!isMobileMenuOpen"
              class="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
            <svg
              v-else
              class="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- SEARCH BAR -->
      <div class="w-full sm:w-auto sm:flex-grow max-w-xl relative order-3 sm:order-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for supplies"
          @keyup.enter="onSearch"
          class="w-full border border-orange-300 rounded-md py-2.5 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-600 placeholder-gray-400"
        />
        <button
          @click="onSearch"
          class="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70"
        >
          <img src="@/assets/HeaderImages/Search.png" class="w-5" />
        </button>
      </div>

      <!-- DESKTOP BUTTONS -->
      <div class="hidden sm:flex items-center gap-4 lg:gap-6 flex-shrink-0 order-2 sm:order-3">
        <!-- Wish List -->
        <button
          class="hidden lg:flex items-center px-4 py-2 border border-orange-300 rounded-lg text-gray-800 hover:bg-orange-500 hover:text-white transition"
          @click="goToWishlist"
        >
          <span class="mr-2">Wish Lists</span>
          <img src="@/assets/HeaderImages/Favorite.png" class="h-5" />
        </button>

        <button
          class="lg:hidden p-2 border border-orange-300 rounded-lg text-gray-800 hover:bg-orange-500 hover:text-white transition"
          @click="goToWishlist"
          title="Wish List"
        >
          <img src="@/assets/HeaderImages/Favorite.png" class="h-5" />
        </button>

        <!-- CART -->
        <button
          class="relative flex items-center px-4 lg:px-5 py-2 bg-[#FFAA0C] text-white rounded-lg hover:bg-orange-500 transition shadow-sm"
          @click="goTOcart"
        >
          <img src="@/assets/HeaderImages/Shopping Cart.png" class="h-5 mr-2" />
          <span class="hidden lg:inline font-bold">CARTS</span>
          <span
            class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white"
          >
            {{ cart.cartCount }}
          </span>
        </button>

        <!-- 👇 LOGIN OR PROFILE (DESKTOP) -->
        <template v-if="isLoggedIn">
          <div class="relative">
            <button
              @click="showProfileMenu = !showProfileMenu"
              class="flex items-center gap-2 text-gray-700 hover:text-black"
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
                My Profile
              </router-link>
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="hidden lg:flex px-8 py-2 bg-[#FFAA0C] text-white font-bold rounded-lg hover:bg-orange-500 transition shadow-sm"
          >
            Login
          </router-link>
          <!-- Tablet login icon -->
          <button
            class="lg:hidden px-4 py-2 bg-[#FFAA0C] text-white rounded-lg hover:bg-orange-500 transition"
            @click="goToLogin"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </template>
      </div>
    </div>

    <!-- ROW 3: NAVIGATION BAR - HIDDEN ON MOBILE -->
    <div class="hidden sm:block max-w-[1500px] mx-auto px-4 lg:px-6 mt-[-1rem]">
      <nav class="flex items-center flex-wrap gap-6 lg:gap-8 text-base lg:text-lg">
        <button
          type="button"
          @click="goToHome"
          class="flex items-center font-bold hover:text-orange-500 cursor-pointer bg-transparent border-none"
        >
          <img src="@/assets/HeaderImages/Home.png" class="w-5 lg:w-6 mr-2" />
          <span class="hidden md:inline">Home</span>
        </button>

        <div class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center font-bold hover:text-orange-500 transition px-3 py-2 rounded-md"
            :class="{ 'bg-orange-50': isDropdownOpen }"
          >
            <img src="@/assets/HeaderImages/Product.png" class="w-5 lg:w-6 mr-2" />
            <span class="hidden md:inline">All Products</span>
            <span class="ml-2 transition-transform" :class="{ 'rotate-180': isDropdownOpen }"
              >⌵</span
            >
          </button>

          <div
            v-if="isDropdownOpen"
            class="absolute top-full left-0 mt-2 w-48 bg-white border border-orange-300 shadow-xl rounded-lg z-50 divide-y divide-orange-300"
          >
            <div
              v-for="item in dropdownItems"
              :key="item.name"
              @click="goToCategory(item.route)"
              class="flex items-center px-4 py-3 hover:bg-orange-50 transition text-gray-800 cursor-pointer"
            >
              <img :src="item.icon" class="w-6 mr-3" />
              {{ item.name }}
            </div>
          </div>
        </div>

        <div class="flex items-center font-bold hover:text-orange-500" @click="goToBestSelling">
          <img src="@/assets/HeaderImages/Fire.png" class="w-5 lg:w-6 mr-2" />
          <span class="hidden lg:inline">Best Selling Products</span>
        </div>
      </nav>
    </div>

    <!-- MOBILE MENU -->
    <div v-if="isMobileMenuOpen" class="sm:hidden border-t border-gray-200 bg-white shadow-lg">
      <div class="px-4 py-3 space-y-4">
        <button
          type="button"
          class="flex items-center font-bold text-lg py-2 hover:text-orange-500 w-full bg-transparent border-none"
          @click="goToHome"
        >
          <img src="@/assets/HeaderImages/Home.png" class="w-6 mr-3" />
          Home
        </button>

        <div>
          <button
            @click="toggleMobileDropdown"
            class="flex items-center justify-between w-full font-bold text-lg py-2 hover:text-orange-500"
          >
            <div class="flex items-center">
              <img src="@/assets/HeaderImages/Product.png" class="w-6 mr-3" /> All Products
            </div>
            <span class="transition-transform" :class="{ 'rotate-180': isMobileDropdownOpen }"
              >⌵</span
            >
          </button>

          <div v-if="isMobileDropdownOpen" class="pl-9 mt-2 space-y-3">
            <a
              v-for="item in dropdownItems"
              :key="item.name"
              href="#"
              @click.prevent="goToCategory(item.route)"
              class="flex items-center py-2 hover:text-orange-500 text-gray-700"
            >
              <img :src="item.icon" class="w-5 mr-3" />
              {{ item.name }}
            </a>
          </div>
        </div>

        <a
          href="#"
          class="flex items-center font-bold text-lg py-2 hover:text-orange-500"
          @click="goToBestSelling"
        >
          <img src="@/assets/HeaderImages/Fire.png" class="w-6 mr-3" /> Best Selling Products
        </a>

        <!-- MOBILE USER ACTIONS -->
        <div class="pt-4 border-t border-gray-200 space-y-3">
          <button
            class="flex items-center w-full font-bold text-lg py-2 hover:text-orange-500 cursor-pointer"
            @click="goToWishlist"
          >
            <img src="@/assets/HeaderImages/Favorite.png" class="w-6 mr-3" />
            Wish List
          </button>

          <!-- Mobile Login / Profile -->
          <div v-if="isLoggedIn">
            <button
              class="flex items-center w-full font-bold text-lg py-2 hover:text-orange-500"
              @click="goToProfile"
            >
              <svg class="w-6 h-6 mr-3 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              My Profile
            </button>
          </div>
          <button
            v-else
            class="flex items-center w-full font-bold text-lg py-2 hover:text-orange-500"
            @click="goToLogin"
          >
            <svg class="w-6 h-6 mr-3 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Login
          </button>
        </div>

        <div class="pt-4 border-t border-gray-200 space-y-3">
          <a href="#" class="flex items-center py-2 hover:text-orange-500">
            <img src="@/assets/HeaderImages/About.png" class="w-6 mr-3" /> About Us
          </a>
          <div class="flex items-center space-x-6 py-2">
            <a href="#" class="flex items-center hover:text-orange-500">Instagram</a>
            <a href="#" class="flex items-center hover:text-orange-500">Facebook</a>
            <a href="#" class="flex items-center hover:text-orange-500">X</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted} from 'vue'
import { useRouter } from 'vue-router'
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

const userStore = useUserStore()
const cart = useCartStore()
const router = useRouter()
const productStore = useProductStore()

const searchQuery = ref('')
const isDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isMobileDropdownOpen = ref(false)
const showProfileMenu = ref(false)
const imageLoading = ref(false)

const isLoggedIn = computed(() => !!userStore.token)
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
  if (!searchQuery.value.trim()) return
  if (router.currentRoute.value.name !== 'search') {
    await router.push('/search')
  }
  productStore.searchProducts(searchQuery.value)
}

watch(searchQuery, (q) => {
  if (q === '') productStore.clearSearch()
})

// Dropdown items
const dropdownItems = [
  { name: 'Foods', icon: foodIcon, route: '/products/foods' },
  { name: 'Clothes', icon: clothesIcon, route: '/products/clothes' },
  { name: 'Toys', icon: toyIcon, route: '/products/toys' },
  { name: 'Others', icon: moreIcon, route: '/products/others' },
]

// Toggle functions
const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (!isMobileMenuOpen.value) isMobileDropdownOpen.value = false
}
const toggleMobileDropdown = () => (isMobileDropdownOpen.value = !isMobileDropdownOpen.value)

// Close utilities
const closeAll = () => {
  isDropdownOpen.value = false
  isMobileMenuOpen.value = false
  isMobileDropdownOpen.value = false
}

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
const goToCategory = (route: string) => {
  router.push(route)
  isDropdownOpen.value = false
  isMobileMenuOpen.value = false
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
  const $toast = useToast()
  $toast.success("You've been logged out.")
  showProfileMenu.value = false
  closeAll()
}

</script>
