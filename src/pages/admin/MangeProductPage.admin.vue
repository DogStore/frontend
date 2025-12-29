<script setup lang="ts">
import ProductTable from '@/components/admin/products/ProductTable.vue'
import ProductEditModal from '@/components/admin/products/ProductEditModal.vue'
import ProductAddModal from '@/components/admin/products/ProductAddModal.vue'
import ProductDeleteModal from '@/components/admin/products/ProductDeleteModal.vue'
import { useProductStore } from '@/stores/tempproductStore'
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
  productStore.fetchProducts()
})

const handleEdit = (product: Product) => {
  editingProduct.value = product
  showEditModal.value = true
}

const handleDelete = (productId: string) => {
  ;((deleteProdutId.value = productId), (showDeleteModal.value = true))
}

const handleConfirmDelete = async () => {
  if (deleteProdutId.value) {
    await productStore.deleteProduct(deleteProdutId.value)
    showDeleteModal.value = false
  }
}

const handleSaveEdit = async (formData: FormData) => {
  await productStore.updateProduct(editingProduct.value!.id, formData)
  showEditModal.value = false
}
const handleAddProduct = async (formData: FormData) => {
  try {
    await productStore.createProduct(formData)
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
    // Search by name
    const matchesName = product.name.toLowerCase().includes(query)

    // Search by ID (first 8 chars)
    const matchesId = product.id.toLowerCase().includes(query)

    // Search by category name (if populated)
    let matchesCategory = false
    if (product.category) {
      if (typeof product.category === 'string') {
        // If category is just ID (fallback)
        matchesCategory = product.category.toLowerCase().includes(query)
      } else {
        // If category is populated object
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
    <div class="flex justify-between items-center mb-6">
      <div class="flex flex-row items-center gap-10">
        <h1 class="text-[36px] font-Nunito font-bold text-amber-600">Manage Products</h1>
        <div class="relative w-160">
          <!-- Search Icon -->
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-900"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>

          <!-- Input -->
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or ID..."
            class="w-full pl-10 pr-9 py-2.5 text-sm rounded-lg border border-amber-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />

          <!-- Clear Button -->
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>
      </div>

      <button
        @click="showAddModal = true"
        class="cursor-pointer bg-orange-500 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg shadow-orange-500/40 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/50 active:scale-95 transition duration-200 ease-in-out"
      >
        + Add Product
      </button>
    </div>

    <!-- Loading -->
    <div v-if="productStore.loading" class="text-center py-10">Loading products...</div>

    <!-- Error -->
    <div v-else-if="productStore.error" class="bg-red-100 text-red-700 p-4 rounded mb-4">
      {{ productStore.error }}
    </div>

    <!-- Table -->
    <div v-else class="bg-white shadow-md rounded overflow-hidden">
      <div class="p-4 border-b flex flex-row items-center">
        <div class="p-4 flex items-center gap-2 text-lg font-semibold text-gray-800 bg-white">
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
          Product List ({{ productStore.products.length }})
        </div>
      </div>
      <ProductTable :products="filteredProducts" @edit="handleEdit" @delete="handleDelete" />
    </div>

    <!-- Modals -->
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
