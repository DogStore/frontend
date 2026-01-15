<template>
  <div class="p-6 max-w-6xl mx-auto grid grid-cols-12 gap-8">
    
    <!-- LEFT: Images -->
    <div class="col-span-6">
      <!-- Image Gallery with Pagination -->
      <div class="flex items-center justify-center gap-4 mb-4">
        <button 
          @click="prevImage" 
          :disabled="currentImageIndex === 0"
          class="p-3 rounded-full border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow"
        >
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <!-- Main Image Container -->
        <div class="border rounded-xl p-4 flex justify-center items-center bg-white h-96 w-full">
          <img :src="activeImage" class="max-h-full max-w-full object-contain" />
        </div>
        
        <button 
          @click="nextImage" 
          :disabled="currentImageIndex === totalImages - 1"
          class="p-3 rounded-full border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow"
        >
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Image Indicator -->
      <div class="flex justify-center items-center gap-2 mb-4" v-if="product.images && product.images.length > 1">
        <div 
          v-for="(img, index) in product.images" 
          :key="img"
          @click="goToImage(index)"
          class="w-2 h-2 rounded-full cursor-pointer transition-all"
          :class="index === currentImageIndex ? 'bg-orange-500 w-4' : 'bg-gray-300 hover:bg-gray-400'"
        ></div>
        <span class="text-sm text-gray-600 ml-2">
          {{ currentImageIndex + 1 }} / {{ totalImages }}
        </span>
      </div>

      <!-- Thumbnails -->
      <div class="flex gap-3 overflow-x-auto py-2" v-if="product.images && product.images.length">
        <img 
          v-for="(img, index) in product.images"
          :key="img"
          :src="img"
          class="h-20 w-20 border rounded-md cursor-pointer hover:opacity-80 shrink-0 object-cover"
          :class="activeImage === img ? 'ring-2 ring-orange-400' : ''"
          @click="goToImage(index)"
        />
      </div>
    </div>

    <!-- RIGHT: Product Info -->
    <div class="col-span-6 space-y-4">
      <h1 class="text-3xl font-bold">{{ product.name }}</h1>
      <p class="text-gray-600">30–70 cm Back Length</p>

      <!-- Rating -->
      <div class="flex items-center gap-2">
        <div class="flex">
          <span v-for="i in 5" :key="i" class="text-yellow-500 text-lg">★</span>
        </div>
        <span class="text-gray-700 font-semibold">({{ product.rating }})</span>
        <span class="text-gray-500 ml-2">{{ product.reviewCount }} reviews</span>
      </div>

      <!-- Description -->
      <p class="text-gray-600 leading-relaxed">
        {{ product.description }}
      </p>

      <!-- Variant selector - Using select and option tags -->
<div 
  class="border rounded-xl p-4 bg-white"
  v-if="product.variants && product.variants.length"
>
  <h2 class="text-lg font-semibold mb-3">
    Choose Items ({{ product.variants.length }} options)
  </h2>

  <div class="space-y-4">
    <!-- Select dropdown for variants -->
    <div class="relative">
      <select 
        v-model="selectedVariant"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white cursor-pointer"
      >
        <option value="" disabled>Select a variant</option>
        <option 
          v-for="v in product.variants" 
          :key="v.label"
          :value="v.label"
        >
          {{ product.name }} – {{ v.label }} - ${{ v.price }}
        </option>
      </select>
      
      <!-- Custom dropdown arrow -->
      <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <!-- Display selected price -->
    <div v-if="selectedVariant" class="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
      <span class="font-medium">Selected:</span>
      <span class="font-bold text-orange-600 text-lg">
        ${{ getSelectedVariantPrice() }}
      </span>
    </div>
  </div>
</div>

      <!-- Add to cart -->
      <button class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 w-full mt-4">
        Add to Cart
      </button>
    </div>
  </div>

   <h2 class="text-2xl font-bold text-gray-800 mb-6 max-w-6xl px-4 mx-auto mt-10">Products you might find interesting</h2>
  <!-- Recommendations section remains the same -->
  <section class="mt-10 px-4 max-w-screen-2xl mx-auto">
   

    <!-- Pagination Container with Products in Between -->
    <div class="flex items-center gap-4" v-if="recommended.length > itemsPerPage">
      <!-- Previous Button -->
      <button 
        @click="prevRecommendationPage" 
        :disabled="currentRecommendationPage === 1"
        class="px-5 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 text-gray-700 font-medium shadow-sm hover:shadow shrink-0"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>
      
      <!-- Product Grid (Centered between buttons) -->
      <div class="flex-1">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <ProductCard 
            v-for="p in paginatedRecommendations"
            :key="p.id"
            :product="p"
            class="w-full"
          />
        </div>
      </div>
      
      <!-- Next Button -->
      <button 
        @click="nextRecommendationPage" 
        :disabled="currentRecommendationPage === totalRecommendationPages"
        class="px-5 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 text-gray-700 font-medium shadow-sm hover:shadow shrink-0"
      >
        Next
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Display without pagination when not needed -->
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <ProductCard 
        v-for="p in recommended"
        :key="p.id"
        :product="p"
        class="w-full"
      />
    </div>

    <!-- Page Indicator Below -->
    <div class="flex justify-center items-center gap-3 mt-6" v-if="recommended.length > itemsPerPage">
      <div class="flex items-center gap-2">
        <div class="flex space-x-1">
          <div 
            v-for="page in Math.min(5, totalRecommendationPages)" 
            :key="page"
            @click="currentRecommendationPage = page"
            class="w-2 h-2 rounded-full cursor-pointer transition-all"
            :class="page === currentRecommendationPage ? 'bg-orange-500 w-4' : 'bg-gray-300 hover:bg-gray-400'"
          ></div>
        </div>
        <span class="text-sm text-gray-600 font-medium">
          Page {{ currentRecommendationPage }} of {{ totalRecommendationPages }}
        </span>
      </div>
    </div>
  </section>

  <!-- Product Detail Rating & Review Section -->
  <section class="mt-12 px-4 max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Product Details & Reviews</h2>
    
    <!-- Tab Navigation (Only 2 tabs) -->
    <div class="border-b mb-6">
      <div class="flex space-x-8">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="py-3 px-1 font-medium text-gray-500 hover:text-gray-700 relative"
          :class="activeTab === tab.id ? 'text-orange-500 border-b-2 border-orange-500' : ''"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="bg-white rounded-xl border p-6 w-200">
      <!-- Product Detail Tab -->
      <div v-if="activeTab === 'productDetail'" class="space-y-8">
        <!-- Overview Section -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold mb-3">Overview</h3>
          <p class="text-gray-700 leading-relaxed">
            Keep your pup cozy in style with our Quilted Dog Coat—a perfect blend of lightweight warmth, comfort, and classic design. Ideal for breezy walks, fall strolls, or chilly mornings, this coat offers just the right amount of insulation without restricting movement.
          </p>
        </div>

        <!-- Recommended Breeds Section -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold mb-3">Recommended For</h3>
          <p class="text-gray-700 mb-4">Best suited for small to medium, short-haired breeds like:</p>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 bg-orange-500 rounded-full shrink-0"></span>
              <span>Corgis</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 bg-orange-500 rounded-full shrink-0"></span>
              <span>Jack Russells</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 bg-orange-500 rounded-full shrink-0"></span>
              <span>Mini Dachshunds</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 bg-orange-500 rounded-full shrink-0"></span>
              <span>Beagles (smaller frame)</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 bg-orange-500 rounded-full shrink-0"></span>
              <span>French Bulldogs</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 bg-orange-500 rounded-full shrink-0"></span>
              <span>Border Terriers</span>
            </div>
          </div>
        </div>

        <!-- Fit & Sizing Section -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold mb-3">Fit & Sizing</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 bg-orange-500 rounded-full shrink-0"></span>
              <div>
                <span class="font-medium">Back Length:</span>
                <span class="ml-2">50 cm</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 bg-orange-500 rounded-full shrink-0"></span>
              <div>
                <span class="font-medium">Chest Girth (max):</span>
                <span class="ml-2">~55 cm</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 bg-orange-500 rounded-full shrink-0"></span>
              <div>
                <span class="font-medium">Neck Opening:</span>
                <span class="ml-2">~38 cm (slightly stretchy)</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 bg-orange-500 rounded-full shrink-0"></span>
              <div>
                <span class="font-medium">Weight Range:</span>
                <span class="ml-2">9–13 kg (ideal, but always measure!)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Note Section -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold mb-3">Note</h3>
          <div class="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r">
            <p class="text-gray-700">
              This coat is designed for dry, cool weather—not waterproof or intended for heavy rain or deep snow. Perfect for urban walks, light winter days, and stylish comfort!
            </p>
          </div>
        </div>
      </div>

      <!-- Reviews Tab - Redesigned to match image -->
      <div v-if="activeTab === 'reviews'" class="space-y-8">
        <!-- Header with View All button -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold">Product Detail Rating & Review</h3>
          <button class="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
            View all review →
          </button>
        </div>

        <!-- Overall Rating -->
        <div class="bg-gray-50 p-6 rounded-lg mb-8">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h4 class="text-xl font-bold mb-2">Overall Rating ({{ product.reviewCount || 120 }})</h4>
              <div class="flex items-center gap-2">
                <div class="flex">
                  <span v-for="i in 5" :key="i" class="text-yellow-500 text-2xl">★</span>
                </div>
                <span class="text-3xl font-bold ml-2">{{ product.rating || 4.5 }}</span>
              </div>
            </div>
            <button class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-semibold">
              Write a Review
            </button>
          </div>

          <!-- Rating Breakdown - Matches image exactly -->
          <div class="space-y-4">
            <!-- 5 Stars -->
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <span class="text-yellow-500 text-xl">★</span>
                <span class="text-yellow-500 text-xl">★</span>
                <span class="text-yellow-500 text-xl">★</span>
                <span class="text-yellow-500 text-xl">★</span>
                <span class="text-yellow-500 text-xl">★</span>
              </div>
              <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-yellow-500 rounded-full" style="width: 58.3%"></div>
              </div>
              <span class="font-medium w-20 text-right">70/120 rates</span>
            </div>
            
            <!-- 4 Stars -->
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <span class="text-yellow-500 text-xl">★</span>
                <span class="text-yellow-500 text-xl">★</span>
                <span class="text-yellow-500 text-xl">★</span>
                <span class="text-yellow-500 text-xl">★</span>
                <span class="text-gray-300 text-xl">★</span>
              </div>
              <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-yellow-500 rounded-full" style="width: 20.8%"></div>
              </div>
              <span class="font-medium w-20 text-right">25/120 rates</span>
            </div>
            
            <!-- 3 Stars -->
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <span class="text-yellow-500 text-xl">★</span>
                <span class="text-yellow-500 text-xl">★</span>
                <span class="text-yellow-500 text-xl">★</span>
                <span class="text-gray-300 text-xl">★</span>
                <span class="text-gray-300 text-xl">★</span>
              </div>
              <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-yellow-500 rounded-full" style="width: 8.3%"></div>
              </div>
              <span class="font-medium w-20 text-right">10/120 rates</span>
            </div>
            
            <!-- 2 Stars -->
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <span class="text-yellow-500 text-xl">★</span>
                <span class="text-yellow-500 text-xl">★</span>
                <span class="text-gray-300 text-xl">★</span>
                <span class="text-gray-300 text-xl">★</span>
                <span class="text-gray-300 text-xl">★</span>
              </div>
              <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-yellow-500 rounded-full" style="width: 8.3%"></div>
              </div>
              <span class="font-medium w-20 text-right">10/120 rates</span>
            </div>
            
            <!-- 1 Star -->
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <span class="text-yellow-500 text-xl">★</span>
                <span class="text-gray-300 text-xl">★</span>
                <span class="text-gray-300 text-xl">★</span>
                <span class="text-gray-300 text-xl">★</span>
                <span class="text-gray-300 text-xl">★</span>
              </div>
              <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-yellow-500 rounded-full" style="width: 4.2%"></div>
              </div>
              <span class="font-medium w-20 text-right">05/120 rates</span>
            </div>
          </div>
        </div>

        <!-- Latest Reviews Header -->
        <div class="flex justify-between items-center mb-6">
          <h4 class="text-xl font-bold">Review</h4>
          <h5 class="text-lg font-semibold text-gray-700">Latest Reviews</h5>
        </div>

        <!-- Review Cards -->
        <div class="space-y-6">
          <!-- Review 1 -->
          <div class="border rounded-lg p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h5 class="font-bold text-lg">Json Best | 03/11/2025</h5>
                <div class="flex items-center gap-1 mt-1">
                  <span class="text-yellow-500 text-lg">★</span>
                  <span class="text-yellow-500 text-lg">★</span>
                  <span class="text-yellow-500 text-lg">★</span>
                  <span class="text-yellow-500 text-lg">★</span>
                  <span class="text-yellow-500 text-lg">★</span>
                </div>
              </div>
            </div>
            <h6 class="font-semibold text-lg mb-2">The suit is really good with my dog</h6>
            <p class="text-gray-700">
              This coat is really good with my dog! He seems happy and relaxed wearing it—no scratching or trying to rub it off. The fit is just right (we got the 50 cm for our Corgi), and it's easy to put on and take off. Plus, it's adorable! Great quality for the price.
            </p>
          </div>

          <!-- Review 2 -->
          <div class="border rounded-lg p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h5 class="font-bold text-lg">Hello World | 03/11/2025</h5>
                <div class="flex items-center gap-1 mt-1">
                  <span class="text-yellow-500 text-lg">★</span>
                  <span class="text-yellow-500 text-lg">★</span>
                  <span class="text-yellow-500 text-lg">★</span>
                  <span class="text-yellow-500 text-lg">★</span>
                  <span class="text-yellow-500 text-lg">★</span>
                </div>
              </div>
            </div>
            <h6 class="font-semibold text-lg mb-2">Satisfy with the product</h6>
            <p class="text-gray-700">
              I was a little nervous about ordering a fixed-size coat, but this one fits my Jack Russell perfectly! The 50 cm length is just right—covers his back without getting in the way when he runs. The material is soft on the inside and looks stylish on the outside.
            </p>
          </div>

          <!-- View All Reviews Button -->
          <div class="text-center pt-6">
            <button class="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
              View all review →
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { useRoute } from "vue-router"
import ProductCard from "@/components/Categories/ProductCard.vue"
import { mockProducts } from "@/data/mockData"

const route = useRoute()

const product = computed(() => {
  return mockProducts.find(p => p.id === Number(route.params.id))!
})



// Image Gallery Pagination
const activeImage = ref(
  product.value.images?.[0] ?? product.value.image ?? ""
)

const currentImageIndex = ref(0)
const totalImages = computed(() => product.value.images?.length || 1)

const nextImage = () => {
  if (currentImageIndex.value < totalImages.value - 1) {
    currentImageIndex.value++
    activeImage.value = product.value.images?.[currentImageIndex.value] ?? product.value.image ?? ""
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    activeImage.value = product.value.images?.[currentImageIndex.value] ?? product.value.image ?? ""
  }
}

const goToImage = (index: number) => {
  currentImageIndex.value = index
  activeImage.value = product.value.images?.[index] ?? product.value.image ?? ""
}

// Watch for changes in product images
watch(() => product.value.images, (newImages) => {
  if (newImages && newImages.length > 0 && newImages[0]) {
    activeImage.value = newImages[0]
    currentImageIndex.value = 0
  }
})

const selectedVariant = ref(
  product.value.variants?.[0]?.label ?? ""
)

// Recommendations with Pagination (separate from image pagination)
const recommended = computed(() => 
  mockProducts.filter(
    p => p.category === product.value.category && p.id !== product.value.id
  )
)

const itemsPerPage = ref(6)
const currentRecommendationPage = ref(1)

const totalRecommendationPages = computed(() => 
  Math.ceil(recommended.value.length / itemsPerPage.value)
)

const paginatedRecommendations = computed(() => {
  const start = (currentRecommendationPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return recommended.value.slice(start, end)
})

const prevRecommendationPage = () => {
  if (currentRecommendationPage.value > 1) {
    currentRecommendationPage.value--
  }
}

const nextRecommendationPage = () => {
  if (currentRecommendationPage.value < totalRecommendationPages.value) {
    currentRecommendationPage.value++
  }
}

// Tab system for product details - Only 2 tabs
const tabs = ref([
  { id: 'productDetail', label: 'Product Detail' },
  { id: 'reviews', label: `Rating & Reviews (${product.value.reviewCount || 0})` }
])

const activeTab = ref('productDetail')
// Helper function to get selected variant price
const getSelectedVariantPrice = () => {
  if (!selectedVariant.value) return product.value.price
  
  const selected = product.value.variants?.find(v => v.label === selectedVariant.value)
  return selected?.price || product.value.price
}
</script>