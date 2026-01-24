<script setup lang="ts">
import ProductTable from '@/components/admin/products/ProductTable.vue'
import ProductEditModal from '@/components/admin/products/ProductEditModal.vue'
import ProductAddModal from '@/components/admin/products/ProductAddModal.vue'
import ProductDeleteModal from '@/components/admin/products/ProductDeleteModal.vue'
import { useProductStore } from '@/stores/productStore'
import type { Product } from '@/types/product'
import { computed, onMounted, ref } from 'vue'

const productStore = useProductStore()
const editingProduct = ref<Product | null>(null)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const deleteProdutId = ref<string | null>(null)
const showAddModal = ref(false)
const searchQuery = ref('')

onMounted(() => {
  productStore.fetchAdminProducts()
})

const handleEdit = (product: Product) => {
  editingProduct.value = product
  showEditModal.value = true
}

const handleDelete = (productId: string) => {
  deleteProdutId.value = productId
  showDeleteModal.value = true
}

const handleConfirmDelete = async () => {
  if (deleteProdutId.value) {
    await productStore.deleteProduct(deleteProdutId.value)

    await productStore.fetchAdminProducts()

    showDeleteModal.value = false
  }
}


const handleSaveEdit = async (formData: FormData) => {
  await productStore.updateProduct(editingProduct.value!.id, formData)

  await productStore.fetchAdminProducts()

  showEditModal.value = false
}


const handleAddProduct = async (formData: FormData) => {
  try {
    await productStore.createProduct(formData)

    await productStore.fetchAdminProducts()

    showAddModal.value = false

  } catch (error: any) {
    console.error('Add product error:', error)
    alert('Failed to create product')
  }
}

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) {
    return productStore.products
  }

  const query = searchQuery.value.toLowerCase().trim()

  return productStore.products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(query)
    const matchesId = product.id.toLowerCase().includes(query)

    let matchesCategory = false
    if (product.category) {
      if (typeof product.category === 'string') {
        matchesCategory = product.category.toLowerCase().includes(query)
      } else {
        matchesCategory =
          product.category.name.toLowerCase().includes(query) ||
          product.category.slug.toLowerCase().includes(query)
      }
    }

    return matchesName || matchesId || matchesCategory
  })
})
</script>

<template>
  <div class="p-6 font-Nunito">
    <!-- HEADER -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-1">Manage Products</h1>
        <p class="text-sm text-gray-500">Add, edit, and manage your product catalog</p>
      </div>

      <button
        @click="showAddModal = true"
        class="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/50 active:scale-95 transition duration-200 ease-in-out flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Product
      </button>
    </div>

    <!-- SEARCH BAR -->
    <div class="mb-6">
      <div class="relative max-w-md">
        <svg
          class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.3-4.3" />
        </svg>

        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name, ID, or category..."
          class="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        />

        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- LOADING STATE -->
    <div v-if="productStore.loading" class="space-y-4">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center gap-2 mb-4">
          <div class="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>

        <!-- Table Header Skeleton -->
        <div class="mb-3 pb-3 border-b">
          <div class="grid grid-cols-6 gap-4">
            <div v-for="i in 6" :key="i" class="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <!-- Table Rows Skeleton -->
        <div class="space-y-3">
          <div v-for="i in 5" :key="i" class="animate-pulse">
            <div class="grid grid-cols-6 gap-4 items-center py-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gray-200 rounded"></div>
                <div class="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div class="h-4 bg-gray-200 rounded w-20"></div>
              <div class="h-4 bg-gray-200 rounded w-16"></div>
              <div class="h-4 bg-gray-200 rounded w-16"></div>
              <div class="h-6 bg-gray-200 rounded-full w-20"></div>
              <div class="flex gap-2 justify-end">
                <div class="h-8 bg-gray-200 rounded w-16"></div>
                <div class="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ERROR STATE -->
    <div v-else-if="productStore.error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Failed to load products</h3>
      <p class="text-red-600 mb-4">{{ productStore.error }}</p>
      <button
        @click="productStore.fetchProducts()"
        class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
      >
        Try Again
      </button>
    </div>

    <!-- EMPTY STATE -->
    <div v-else-if="filteredProducts.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <div class="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
        <svg class="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V7a2 2 0 00-2-2h-4V3H10v2H6a2 2 0 00-2 2v6M20 13H4v5a2 2 0 002 2h12a2 2 0 002-2v-5z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        {{ searchQuery ? 'No products found' : 'No products yet' }}
      </h3>
      <p class="text-gray-500 mb-6">
        {{ searchQuery
          ? 'Try adjusting your search terms'
          : 'Get started by adding your first product to the catalog'
        }}
      </p>
      <button
        v-if="!searchQuery"
        @click="showAddModal = true"
        class="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition font-semibold inline-flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Your First Product
      </button>
      <button
        v-else
        @click="searchQuery = ''"
        class="text-orange-500 hover:text-orange-600 font-semibold"
      >
        Clear Search
      </button>
    </div>

    <!-- PRODUCT TABLE -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <svg
                class="w-5 h-5 text-orange-500"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path d="M20 13V7a2 2 0 00-2-2h-4V3H10v2H6a2 2 0 00-2 2v6" />
                <path d="M20 13H4v5a2 2 0 002 2h12a2 2 0 002-2v-5z" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-gray-900">Product List</h2>
              <p class="text-sm text-gray-500">
                {{ searchQuery ? `${filteredProducts.length} results` : `${productStore.products.length} total products` }}
              </p>
            </div>
          </div>

          <!-- Quick Stats -->
          <div v-if="!searchQuery" class="flex gap-4 text-sm">
            <div class="text-center px-4 py-2 bg-green-50 rounded-lg">
              <p class="text-green-600 font-semibold">
                {{ productStore.products.filter(p => p.stock > 10).length }}
              </p>
              <p class="text-gray-600 text-xs">High Stock</p>
            </div>
            <div class="text-center px-4 py-2 bg-orange-50 rounded-lg">
              <p class="text-orange-600 font-semibold">
                {{ productStore.products.filter(p => p.stock <= 10 && p.stock > 0).length }}
              </p>
              <p class="text-gray-600 text-xs">Low Stock</p>
            </div>
            <div class="text-center px-4 py-2 bg-red-50 rounded-lg">
              <p class="text-red-600 font-semibold">
                {{ productStore.products.filter(p => p.stock === 0).length }}
              </p>
              <p class="text-gray-600 text-xs">Out of Stock</p>
            </div>
          </div>
        </div>
      </div>

      <ProductTable :products="filteredProducts" @edit="handleEdit" @delete="handleDelete" />
    </div>

    <!-- MODALS -->
    <ProductEditModal
      :show="showEditModal"
      :product="editingProduct"
      @close="showEditModal = false"
      @save="handleSaveEdit"
    />
    <ProductDeleteModal
      :show="showDeleteModal"
      @cancel="showDeleteModal = false"
      @confirm="handleConfirmDelete"
    />
    <ProductAddModal :show="showAddModal" @close="showAddModal = false" @save="handleAddProduct" />
  </div>
</template>
