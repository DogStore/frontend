<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"
        ></div>
        <p class="text-gray-600">Loading product...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="!product" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <svg
          class="mx-auto h-16 w-16 text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p class="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <router-link
          to="/"
          class="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 inline-block"
        >
          Back to Home
        </router-link>
      </div>
    </div>

    <!-- Product Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-[-150px]">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <ol class="flex items-center space-x-2 text-gray-500">
          <li><router-link to="/" class="hover:text-orange-500">Home</router-link></li>
          <li>›</li>
          <li><router-link to="/category" class="hover:text-orange-500">Products</router-link></li>
          <li>›</li>
          <li class="text-gray-900 font-medium">{{ product.name }}</li>
        </ol>
      </nav>

      <!-- Main Product Section -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
          <!-- LEFT: Image Gallery -->
          <div class="space-y-4">
            <!-- Main Image with Navigation -->
            <div class="relative bg-gray-50 rounded-xl overflow-hidden">
              <div class="aspect-square flex items-center justify-center p-8">
                <img
                  :src="activeImage"
                  :alt="product.name"
                  class="max-h-full max-w-full object-contain"
                />
              </div>

              <!-- Navigation Arrows -->
              <button
                v-if="totalImages > 1"
                @click="prevImage"
                :disabled="currentImageIndex === 0"
                class="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <svg
                  class="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                v-if="totalImages > 1"
                @click="nextImage"
                :disabled="currentImageIndex === totalImages - 1"
                class="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <svg
                  class="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <!-- Image Counter -->
              <div
                v-if="totalImages > 1"
                class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
              >
                {{ currentImageIndex + 1 }} / {{ totalImages }}
              </div>
            </div>

            <!-- Thumbnail Gallery -->
            <div v-if="product.images && product.images.length > 1" class="grid grid-cols-6 gap-2">
              <button
                v-for="(img, index) in product.images"
                :key="index"
                @click="goToImage(Number(index))"
                class="aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-orange-400"
                :class="
                  Number(index) === currentImageIndex
                    ? 'border-orange-500 ring-2 ring-orange-200'
                    : 'border-gray-200'
                "
              >
                <img
                  :src="img"
                  :alt="`${product.name} ${Number(index) + 1}`"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>

          <!-- RIGHT: Product Info -->
          <div class="space-y-6">
            <!-- Product Title & Country -->
            <div>
              <div class="flex items-center gap-2 mb-2">
                <img
                  v-if="product.countryFlag"
                  :src="product.countryFlag"
                  :alt="product.countryName"
                  class="w-6 h-4 object-cover rounded shadow-sm"
                />
                <span class="text-sm text-gray-600">{{
                  product.countryName || 'International'
                }}</span>
                <span
                  v-if="product.stock > 0"
                  class="ml-auto px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full"
                >
                  In Stock ({{ product.stock }})
                </span>
                <span
                  v-else
                  class="ml-auto px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full"
                >
                  Out of Stock
                </span>
              </div>
              <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
              <p v-if="product.size" class="text-gray-600">Size: {{ product.size }}</p>
            </div>

            <!-- Rating & Reviews -->
            <div class="flex items-center gap-4 pb-6 border-b">
              <div class="flex items-center gap-2">
                <div class="flex">
                  <span
                    v-for="i in 5"
                    :key="i"
                    class="text-xl"
                    :class="
                      i <= Math.round(product.averageRating || 0)
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    "
                    >★</span
                  >
                </div>
                <span class="font-semibold text-gray-900">{{ Math.round(product.averageRating).toFixed(2) || 0}}</span>
              </div>
              <a href="#reviews" class="text-orange-500 hover:text-orange-600 font-medium">
                ({{ product.reviewCount || 0 }} reviews)
              </a>
              <span class="text-gray-400">•</span>
              <span class="text-gray-600">{{ product.soldCount || 0 }} sold</span>
            </div>

            <!-- Price -->
            <div class="py-6 border-b">
              <div class="flex items-baseline gap-4">
                <span class="text-4xl font-bold text-orange-500"
                  >${{ product.salePrice || product.price }}</span
                >
                <span v-if="product.discount > 0" class="text-2xl text-gray-400 line-through"
                  >{{ product.regularPrice }}</span
                >
                <span
                  v-if="product.discount > 0"
                  class="px-3 py-1 bg-red-100 text-red-700 font-bold rounded-lg"
                >
                  -{{ product.discount }}%
                </span>
              </div>
            </div>

            <!-- Description -->
            <div v-if="product.description" class="py-6 border-b">
              <h3 class="font-semibold text-gray-900 mb-2">Description</h3>
              <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
            </div>

            <!-- Variants (if any) -->
            <div v-if="product.variants && product.variants.length" class="py-6 border-b">
              <h3 class="font-semibold text-gray-900 mb-3">Select Variant</h3>
              <select
                v-model="selectedVariant"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
              >
                <option value="" disabled>Choose an option</option>
                <option v-for="v in product.variants" :key="v.label" :value="v.label">
                  {{ v.label }} - ${{ v.price }}
                </option>
              </select>
            </div>

            <!-- Add to Cart Section -->
            <div class="space-y-3 pt-6">
              <button
                @click="addToCart"
                :disabled="product.stock === 0 || isInCart"
                class="w-full px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                :class="
                  isInCart
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : product.stock === 0
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                "
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>

                <span v-if="isInCart">✔ Added to Cart</span>
                <span v-else-if="product.stock === 0">Out of Stock</span>
                <span v-else>Add to Cart</span>
              </button>

              <button
                @click="toggleWishlist"
                :class="[
                  'w-full px-8 py-4 rounded-lg hover:bg-gray-50 font-semibold text-lg transition-colors flex items-center justify-center gap-2',
                  isWishlisted
                    ? 'border-red-300 text-red-700 border-2 bg-red-50'
                    : 'border-2 border-gray-300 text-gray-700',
                ]"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span v-if="isWishlisted">Wishlisted</span>
                <span v-else> Add to Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs Section -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
        <!-- Tab Navigation -->
        <div class="border-b">
          <nav class="flex">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="px-8 py-4 font-semibold transition-colors relative"
              :class="
                activeTab === tab.id
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-600 hover:text-gray-900'
              "
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6 lg:p-10">
          <!-- Product Details Tab -->
          <div v-if="activeTab === 'details'" class="prose max-w-none">
            <h3 class="text-2xl font-bold mb-6">Product Details</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 class="font-semibold text-lg mb-3">Specifications</h4>
                <dl class="space-y-2">
                  <div class="flex justify-between py-2 border-b">
                    <dt class="text-gray-600">Size</dt>
                    <dd class="font-medium">{{ product.size || 'N/A' }}</dd>
                  </div>
                  <div class="flex justify-between py-2 border-b">
                    <dt class="text-gray-600">Stock</dt>
                    <dd class="font-medium">{{ product.stock }} units</dd>
                  </div>
                  <div class="flex justify-between py-2 border-b">
                    <dt class="text-gray-600">Category</dt>
                    <dd class="font-medium">{{ product.category?.name || 'N/A' }}</dd>
                  </div>
                  <div class="flex justify-between py-2 border-b">
                    <dt class="text-gray-600">Country</dt>
                    <dd class="font-medium">{{ product.countryName || 'N/A' }}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h4 class="font-semibold text-lg mb-3">Product Information</h4>
                <div class="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r">
                  <p class="text-gray-700">{{ product.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews Tab -->
          <div v-if="activeTab === 'reviews'" id="reviews" class="space-y-8">
            <!-- Reviews Header -->
            <div class="flex justify-between items-center">
              <h3 class="text-2xl font-bold">Customer Reviews</h3>
              <button
                @click="showReviewForm = !showReviewForm"
                class="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold transition-colors"
              >
                {{ showReviewForm ? 'Cancel' : 'Write a Review' }}
              </button>
            </div>

            <!-- Review Form (Collapsible) -->
            <ReviewForm
              v-if="showReviewForm"
              :product-id="product.id"
              @review-submitted="handleReviewSubmitted"
            />

            <!-- Overall Rating Summary -->
            <div class="bg-gray-50 rounded-xl p-6">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Left: Average Rating -->
                <div class="text-center lg:text-left">
                  <div class="text-5xl font-bold text-gray-900 mb-2">
                    {{ Math.round(product.averageRating).toFixed(2) || 0}}
                  </div>
                  <div class="flex items-center justify-center lg:justify-start gap-1 mb-2">
                    <span
                      v-for="i in 5"
                      :key="i"
                      class="text-2xl"
                      :class="
                        i <= Math.round(product.averageRating || 0)
                          ? 'text-yellow-500'
                          : 'text-gray-300'
                      "
                      >★</span
                    >
                  </div>
                  <p class="text-gray-600">Based on {{ product.reviewCount || 0 }} reviews</p>
                </div>

                <!-- Right: Rating Breakdown -->
                <div class="space-y-2">
                  <div
                    v-for="rating in [5, 4, 3, 2, 1]"
                    :key="rating"
                    class="flex items-center gap-3"
                  >
                    <span class="text-sm font-medium w-16">{{ rating }} stars</span>
                    <div class="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-yellow-500 rounded-full transition-all"
                        :style="{ width: calculateRatingPercentage(rating) + '%' }"
                      ></div>
                    </div>
                    <span class="text-sm text-gray-600 w-12 text-right">{{
                      getRatingCount(rating)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reviews List -->
            <div v-if="product.reviews && product.reviews.length > 0" class="space-y-6">
              <h4 class="text-xl font-bold">All Reviews</h4>

              <div
                v-for="review in paginatedReviews"
                :key="review._id"
                class="border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <!-- Review Header -->
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h5 class="font-bold text-lg">
                      {{ review.name || review.user?.name || 'Anonymous User' }}
                    </h5>
                    <div class="flex items-center gap-2 mt-1">
                      <div class="flex">
                        <span
                          v-for="i in 5"
                          :key="i"
                          class="text-lg"
                          :class="i <= review.rating ? 'text-yellow-500' : 'text-gray-300'"
                          >★</span
                        >
                      </div>
                      <span class="text-sm text-gray-500">{{ formatDate(review.createdAt) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Review Title -->
                <h6 v-if="review.title" class="font-semibold text-lg mb-2">{{ review.title }}</h6>

                <!-- Review Content -->
                <p class="text-gray-700 leading-relaxed">{{ review.comment }}</p>
              </div>

              <!-- Pagination for Reviews -->
              <div v-if="totalReviewPages > 1" class="flex justify-center gap-2 pt-6">
                <button
                  @click="currentReviewPage--"
                  :disabled="currentReviewPage === 1"
                  class="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  v-for="page in totalReviewPages"
                  :key="page"
                  @click="currentReviewPage = page"
                  class="px-4 py-2 border rounded-lg transition-colors"
                  :class="
                    page === currentReviewPage ? 'bg-orange-500 text-white' : 'hover:bg-gray-50'
                  "
                >
                  {{ page }}
                </button>
                <button
                  @click="currentReviewPage++"
                  :disabled="currentReviewPage === totalReviewPages"
                  class="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>

            <!-- No Reviews Message -->
            <div v-else class="text-center py-12">
              <svg
                class="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p class="text-gray-600 text-lg">
                No reviews yet. Be the first to review this product!
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recommended Products -->
      <section
        v-if="recommended.length > 0"
        class="bg-white rounded-2xl shadow-sm overflow-hidden p-6 lg:p-10"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">You Might Also Like</h2>
          <div class="flex gap-2">
            <button
              @click="prevRecommendationPage"
              :disabled="currentRecommendationPage === 1"
              class="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              @click="nextRecommendationPage"
              :disabled="currentRecommendationPage === totalRecommendationPages"
              class="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="relative overflow-x-auto md:overflow-hidden">
          <div
            class="flex gap-6 transition-transform duration-300 ease-in-out"
            :style="{
              transform: `translateX(-${(currentRecommendationPage - 1) * 100}%)`,
            }"
          >
            <div v-for="p in recommended" :key="p.slug || p.id" class="w-64 shrink-0">
              <ProductCard :product="p" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/home/ProductCard.vue'
import { useProductStore } from '@/stores/productStore'
import ReviewForm from '@/components/Categories/ReviewForm.vue'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useCartStore } from '@/stores/cartStore'

const route = useRoute()
const productStore = useProductStore()

// Product state
const product = ref<any>(null)
const loading = ref(true)

// Fetch product when slug changes
const loadProduct = async (slug: string) => {
  loading.value = true
  try {
    const fetchedProduct = await productStore.fetchProductBySlug(slug)
    product.value = fetchedProduct

    // Reviews should come from the backend - no need to merge with localStorage
    // The backend already returns reviews in the product object
    if (product.value) {
      // Ensure reviews array exists
      if (!Array.isArray(product.value.reviews)) {
        product.value.reviews = []
      }

      // Review stats are already calculated by backend (avgRating, reviewCount)
      // But if they're missing, calculate them from the reviews array
      if (product.value.reviews.length > 0 && !product.value.averageRating) {
        const sum = product.value.reviews.reduce(
          (s: number, r: any) => s + (Number(r.rating) || 0),
          0,
        )
        product.value.averageRating = Math.round((sum / product.value.reviews.length) * 10) / 10
        product.value.reviewCount = product.value.reviews.length
      }
    }
  } catch (error) {
    console.error('Failed to load product:', error)
    product.value = null
  } finally {
    loading.value = false
  }
}

// Watch for slug changes
watch(
  () => route.params.slug,
  async (newSlug) => {
    if (typeof newSlug === 'string') {
      await loadProduct(newSlug)
    }
  },
  { immediate: true },
)

// Image Gallery Pagination
const activeImage = ref('')
const currentImageIndex = ref(0)
const totalImages = computed(() => product.value?.images?.length || 1)

// Update active image when product loads
watch(
  () => product.value?.images,
  (newImages) => {
    if (newImages && newImages.length > 0) {
      activeImage.value = newImages[0]
      currentImageIndex.value = 0
    }
  },
  { immediate: true },
)

const nextImage = () => {
  if (!product.value?.images) return
  if (currentImageIndex.value < totalImages.value - 1) {
    currentImageIndex.value++
    activeImage.value = product.value.images[currentImageIndex.value]
  }
}

const prevImage = () => {
  if (!product.value?.images) return
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    activeImage.value = product.value.images[currentImageIndex.value]
  }
}

const goToImage = (index: number) => {
  if (!product.value?.images) return
  currentImageIndex.value = index
  activeImage.value = product.value.images[index]
}

const selectedVariant = ref('')

// Cart & Favorite stores
const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()

const productIdStr = computed(() => product.value?._id ?? product.value?.id ?? '')

const isWishlisted = computed(() =>
  favoriteStore.favorites.some((p) => p.id === productIdStr.value),
)

function toggleWishlist() {
  if (!product.value) return
  favoriteStore.toggleFavorite(product.value)
}

const isInCart = computed(() => {
  if (!product.value) return false
  const id = product.value.id
  return cartStore.cartItems.some((i: any) => i.id === id || i.product === id)
})



function addToCart() {
  if (!product.value) return
  cartStore.addToCart(product.value)
}

// Watch for product changes to set default variant
watch(
  () => product.value,
  (newProduct) => {
    if (newProduct?.variants && newProduct.variants.length > 0) {
      selectedVariant.value = newProduct.variants[0].label
    }
  },
)

// Recommendations - fetch from same category
const recommended = ref<any[]>([])

watch(
  () => product.value,
  async (newProduct) => {
    if (!newProduct) {
      recommended.value = []
      return
    }

    // Extract category slug properly
    const categorySlug =
      typeof newProduct.category === 'object' ? newProduct.category.slug : newProduct.category

    if (categorySlug) {
      await productStore.fetchProductsByCategory(categorySlug)
      recommended.value = productStore.products.filter((p) => p.id !== newProduct.id).slice(0, 12)
    }
  },
  { immediate: true },
)

const itemsPerPage = 4
const currentRecommendationPage = ref(1)

const totalRecommendationPages = computed(() => Math.ceil(recommended.value.length / itemsPerPage))

const nextRecommendationPage = () => {
  if (currentRecommendationPage.value < totalRecommendationPages.value) {
    currentRecommendationPage.value++
  }
}

const prevRecommendationPage = () => {
  if (currentRecommendationPage.value > 1) {
    currentRecommendationPage.value--
  }
}

// Tab system
const tabs = ref([
  { id: 'details', label: 'Product Detail' },
  { id: 'reviews', label: `Rating & Reviews` },
])

const activeTab = ref('details')

const getSelectedVariantPrice = () => {
  if (!product.value || !selectedVariant.value) return product.value?.price || 0

  const selected = product.value.variants?.find((v: any) => v.label === selectedVariant.value)
  return selected?.price || product.value.price
}

// Review state & helpers (used by template)
const showReviewForm = ref(false)
const currentReviewPage = ref(1)
const reviewsPerPage = 5

const totalReviewPages = computed(() => {
  const len = Array.isArray(product.value?.reviews) ? product.value.reviews.length : 0
  return Math.max(1, Math.ceil(len / reviewsPerPage))
})

const paginatedReviews = computed(() => {
  const all = Array.isArray(product.value?.reviews) ? product.value.reviews : []

  const sorted = [...all].sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const start = (currentReviewPage.value - 1) * reviewsPerPage
  return sorted.slice(start, start + reviewsPerPage)
})


function formatDate(iso?: string) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString()
  } catch {
    return iso
  }
}

function calculateRatingPercentage(rating: number) {
  const all = Array.isArray(product.value?.reviews) ? product.value.reviews : []
  if (all.length === 0) return 0
  const count = all.filter((r: any) => Number(r.rating) === rating).length
  return Math.round((count / all.length) * 100)
}

function getRatingCount(rating: number) {
  const all = Array.isArray(product.value?.reviews) ? product.value.reviews : []
  return all.filter((r: any) => Number(r.rating) === rating).length
}

function handleReviewSubmitted(newReview: any) {
  if (!product.value) return

  // Ensure reviews array exists
  if (!Array.isArray(product.value.reviews)) product.value.reviews = []

  // Add the new review to the beginning of the array
  product.value.reviews.unshift(newReview)

  // Recalculate review count and average rating
  product.value.reviewCount = product.value.reviews.length

  const sum = product.value.reviews.reduce((s: number, r: any) => s + (Number(r.rating) || 0), 0)
  product.value.averageRating = product.value.reviews.length
    ? Math.round((sum / product.value.reviews.length) * 10) / 10
    : 0

  // Hide the form and reset to first page
  showReviewForm.value = false
  currentReviewPage.value = 1

  // Optionally reload the product from backend to get updated avgRating
  // This ensures the product data matches the backend exactly
  if (route.params.slug && typeof route.params.slug === 'string') {
    setTimeout(() => {
      loadProduct(route.params.slug as string)
    }, 1000)
  }
}
</script>
