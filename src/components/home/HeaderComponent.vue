<template>
  <header class="w-full font-Nunito border-b border-gray-200 bg-white">

    <!-- ======================= -->
    <!-- ROW 1: TOP CONTACT BAR -->
    <!-- ======================= -->
    <div class="border-b border-gray-200">
      <div class="max-w-[1500px] mx-auto px-6 py-2 flex flex-wrap justify-between items-center text-sm text-gray-800">

        <!-- LEFT -->
        <div class="flex items-center space-x-10">
          <div class="flex items-center">
            <img src="@/assets/HeaderImages/Phone.png" class="w-5 h-5 mr-2" />
            +885 123 456 789
          </div>

          <a href="#" class="flex items-center hover:text-orange-500 transition">
            <img src="@/assets/HeaderImages/Telegram App.png" class="w-5 h-5 mr-2" />
            +885 123 456 789
          </a>
        </div>

        <!-- RIGHT -->
        <div class="flex items-center space-x-10 mt-2 md:mt-0">
          <a href="#" class="flex items-center hover:text-orange-500">
            <img src="@/assets/HeaderImages/About.png" class="w-6 mr-2" />
            About Us
          </a>

          <div class="flex items-center space-x-8">
            <a href="#" class="flex items-center hover:text-orange-500">
              <img src="@/assets/HeaderImages/Instagram Circle.png" class="w-6 mr-2" /> Instagram
            </a>
            <a href="#" class="flex items-center hover:text-orange-500">
              <img src="@/assets/HeaderImages/Facebook f.png" class="w-6 mr-2" /> Facebook
            </a>
            <a href="#" class="flex items-center hover:text-orange-500">
              <img src="@/assets/HeaderImages/X.png" class="w-6 mr-2" /> X
            </a>
          </div>
        </div>

      </div>
    </div>

    <!-- =========================== -->
    <!-- ROW 2: LOGO + SEARCH + CART -->
    <!-- =========================== -->
    <div class="max-w-[1500px] mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-6">

      <!-- LOGO -->
      <a href="/" class="flex-shrink-0">
        <img src="@/assets/HeaderImages/Logo.png" class="h-16" />
      </a>

      <!-- SEARCH BAR (center) -->
      <div class="flex-grow max-w-xl relative w-full md:w-auto">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for supplies"
          class="w-full border border-orange-300 rounded-md py-2.5 px-4 pr-10
                 focus:outline-none focus:ring-2 focus:ring-orange-500
                 text-gray-600 placeholder-gray-400"
        />
        <button class="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70">
          <img src="@/assets/HeaderImages/Search.png" class="w-5" />
        </button>
      </div>

      <!-- BUTTONS -->
      <div class="flex items-center gap-6 flex-shrink-0">

        <!-- Wish List -->
        <button class="flex items-center px-4 py-2 border border-orange-300 rounded-lg
                       text-gray-800 hover:bg-orange-500 hover:text-white transition">
          <span class="mr-2">Wish Lists</span>
          <img src="@/assets/HeaderImages/Favorite.png" class="h-5" />
        </button>

        <!-- CART -->
        <button class="relative flex items-center px-5 py-2 bg-[#FFAA0C] text-white rounded-lg hover:bg-orange-500 transition shadow-sm">
          <img src="@/assets/HeaderImages/Shopping Cart.png" class="h-5 mr-2" />
          <span class="font-bold">CARTS</span>

          <span class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold
                         w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
            {{ cart.cartCount }}
          </span>
        </button>

        <!-- LOGIN -->
        <button class="px-8 py-2 bg-[#FFAA0C] text-white font-bold rounded-lg
                       hover:bg-orange-500 transition shadow-sm">
          Login
        </button>

      </div>

    </div>

    <!-- ======================= -->
    <!-- ROW 3: NAVIGATION BAR  -->
    <!-- ======================= -->
    <div class="max-w-[1500px] mx-auto px-6 pb-4">
      <nav class="flex items-center flex-wrap gap-8 text-lg">

        <!-- Home -->
        <a href="#" class="flex items-center font-bold hover:text-orange-500">
          <img src="@/assets/HeaderImages/Home.png" class="w-6 mr-2" /> Home
        </a>

        <!-- Dropdown -->
        <div class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center font-bold hover:text-orange-500 transition px-3 py-2 rounded-md"
            :class="{ 'bg-orange-50': isDropdownOpen }"
          >
            <img src="@/assets/HeaderImages/Product.png" class="w-6 mr-2" />
            All Products
            <span class="ml-2 transition-transform" :class="{ 'rotate-180': isDropdownOpen }">⌵</span>
          </button>

          <!-- Dropdown menu -->
          <div
            v-if="isDropdownOpen"
            class="absolute top-full left-0 mt-2 w-48 bg-white border border-orange-300
                   shadow-xl rounded-lg z-50 divide-y divide-orange-300"
          >
            <a v-for="item in dropdownItems"
               :key="item.name"
               href="#"
               @click.prevent="closeDropdown"
               class="flex items-center px-4 py-3 hover:bg-orange-50 transition text-gray-800"
            >
              <img :src="item.icon" class="w-6 mr-3" />
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- Best Selling -->
        <a href="#" class="flex items-center font-bold hover:text-orange-500">
          <img src="@/assets/HeaderImages/Fire.png" class="w-6 mr-2" /> Best Selling Products
        </a>

      </nav>
    </div>

  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "@/stores/cartStore";

const cart = useCartStore();
const searchQuery = ref("");
const isDropdownOpen = ref(false);

const dropdownItems = [
  { name: "Foods", icon: "@/assets/HeaderImages/Food.png" },
  { name: "Clothes", icon: "@/assets/HeaderImages/Clothes.png" },
  { name: "Toys", icon: "@/assets/HeaderImages/Toy.png" },
  { name: "Others", icon: "@/assets/HeaderImages/More.png" },
];

const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value);
const closeDropdown = () => (isDropdownOpen.value = false);
</script>
