<template>
  <div class="w-full font-nunito bg-white">

    <!-- HERO / SHOWCASE -->
    <ShowCase
      :title="showcase.title"
      :description="showcase.description"
      :discount="showcase.discount"
      :buttonText="showcase.buttonText"
      :dogImage="showcase.dogImage"
      :boneImage="showcase.boneImage"
      :pawImage="showcase.pawImage"
    />

    <!-- FEATURE PRODUCTS -->
    <div class="w-full px-10 py-10">
      <div class="flex items-center justify-between mb-8">
        <h3 class="text-2xl font-bold text-gray-800">Feature Products</h3>
        <button class="px-6 py-2 bg-[#FFAA0C] cursor-pointer text-white font-semibold rounded-md hover:bg-orange-500 transition">
          View All
        </button>
      </div>

      <!-- Products Carousel -->
      <div class="overflow-hidden relative py-1">
        <div
          class="flex transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${currentPage * 100}%)` }">
          <!-- Page Wrapper -->
          <div
            v-for="pageIndex in totalPages"
            :key="pageIndex"
            class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full flex-shrink-0">
            <ProductCard
              v-for="product in featureProducts.slice((pageIndex - 1) * itemsPerPage, pageIndex * itemsPerPage)"
              :key="product.id"
              :product="product"
              @click="openProductDetail(product)"
            />
          </div>
        </div>
      </div>

      <!-- Carousel Controls -->
      <div class="flex items-center justify-center gap-4 mt-6">
        <button
          @click="prevPage"
          :disabled="currentPage === 0"
          class="text-2xl text-orange-400 hover:text-orange-600 disabled:opacity-20">
          ❮
        </button>

        <span class="text-gray-500">{{ currentPage + 1 }} / {{ totalPages }}</span>

        <button
          @click="nextPage"
          :disabled="currentPage + 1 === totalPages"
          class="text-2xl text-orange-400 hover:text-orange-600 disabled:opacity-20">
          ❯
        </button>
      </div>
    </div>

    <!-- RECENTLY VIEWED -->
    <div v-if="recent.recent.length > 0" class="w-full px-10 py-10">
      <h3 class="text-2xl mr-[87%] font-bold text-gray-800 mb-8">Recently Viewed</h3>

      <div class="overflow-hidden relative py-1">
        <div
          class="flex transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${recentPage * 100}%)` }">
          <div
            v-for="pageIndex in recentTotalPages"
            :key="pageIndex"
            class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full flex-shrink-0">
            <ProductCard
              v-for="product in recent.recent.slice((pageIndex - 1) * recentItemsPerPage, pageIndex * recentItemsPerPage)"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </div>

      <!-- Recently Viewed Controls -->
      <div class="flex items-center justify-center gap-4 mt-6" v-if="recentTotalPages > 1">

        <button
          @click="prevRecent"
          :disabled="recentPage === 0"
          class="text-2xl text-orange-400 hover:text-orange-600 disabled:opacity-20"
        >
          ❮
        </button>

        <span class="text-gray-500">
          {{ recentPage + 1 }} / {{ recentTotalPages }}
        </span>

        <button
          @click="nextRecent"
          :disabled="recentPage + 1 === recentTotalPages"
          class="text-2xl text-orange-400 hover:text-orange-600 disabled:opacity-20"
        >
          ❯
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import ShowCase from "@/components/home/ShowCase.vue";
import ProductCard from "@/components/home/ProductCard.vue";

import Dog from "@/assets/ShowcaseImages/Dog.png";
import Bone from "@/assets/ShowcaseImages/Bone.png";
import Paw from "@/assets/ShowcaseImages/Pawprint.png";
import Coat from "@/assets/ProductImages/Soft Shell Dog Coat.png";

import type { Product } from "@/types/Product";

// Pinia Stores
import { useCartStore } from "@/stores/cartStore";
import { useFavoriteStore } from "@/stores/favoriteStore";
import { useRecentStore } from "@/stores/recentStore";

const cart = useCartStore();
const favorite = useFavoriteStore();
const recent = useRecentStore();

// Load recent items on page load
recent.loadFromStorage();
cart.loadFromStorage();
favorite.loadFromStorage();

// Showcase
const showcase = ref({
  title: "Your dog, <br> Our priority",
  description:
    "your dog deserve the best quality and healthy food and snacks, and accessories which is what we have to offer at the best, most affordable price",
  discount: "30%",
  buttonText: "Shop now",
  dogImage: Dog,
  boneImage: Bone,
  pawImage: Paw,
});

// Feature Products (Mock Data)
const featureProducts = ref<Product[]>([
  {
    id: 1,
    name: "Soft Stud Dog Food",
    image: Coat,
    price: 23.9,
    originalPrice: 28.9,
    rating: 4.5,
    isFavorite: false,
    inCart: false
  },
  {
    id: 2,
    name: "Named Tuna Bacon Dog Coat",
    image: Coat,
    price: 18.0,
    originalPrice: 22.0,
    rating: 4.5,
    isFavorite: false,
    inCart: false
  },
  {
    id: 3,
    name: "Cozy Egyptian Straight Bed",
    image: Coat,
    price: 32.0,
    originalPrice: 38.0,
    rating: 4.5,
    isFavorite: false,
    inCart: false
  },
  {
    id: 4,
    name: "Dog Shady Vest",
    image: Coat,
    price: 16.9,
    originalPrice: 19.9,
    rating: 4.5,
    isFavorite: false,
    inCart: false
  },
  {
    id: 5,
    name: "Dog Raincoat",
    image: Coat,
    price: 27.9,
    originalPrice: 32.9,
    rating: 4.5,
    isFavorite: false,
    inCart: false
  },
  {
    id: 6,
    name: "Wool & Waterproof Dog Sweater",
    image: Coat,
    price: 23.9,
    originalPrice: 29.0,
    rating: 4.5,
    isFavorite: false,
    inCart: false
  },
    {
    id: 7,
    name: "Wool & Waterproof Dog Sweater",
    image: Coat,
    price: 23.9,
    originalPrice: 29.0,
    rating: 4.5,
    isFavorite: false,
    inCart: false
  },
]);


// Pagination for Feature
const currentPage = ref(0);
const itemsPerPage = 6;

const totalPages = computed(() =>
  Math.ceil(featureProducts.value.length / itemsPerPage)
);

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 0) currentPage.value--;
};

// When clicking product card
const openProductDetail = (product: Product) => {
  recent.addRecent(product);
  console.log("Open detail:", product.name);
};

// Pagination for Recently Viewed
const recentPage = ref(0);
const recentItemsPerPage = 6;

const recentTotalPages = computed(() =>
  Math.ceil(recent.recent.length / recentItemsPerPage)
);

const nextRecent = () => {
  if (recentPage.value < recentTotalPages.value - 1) recentPage.value++;
};
const prevRecent = () => {
  if (recentPage.value > 0) recentPage.value--;
};
</script>

