<script setup lang="ts">
import ProductTable from '@/components/admin/products/ProductTable.vue';
import ProductEditModal from '@/components/admin/products/ProductEditModal.vue';
import ProductAddModal from '@/components/admin/products/ProductAddModal.vue';
import ProductDeleteModal from '@/components/admin/products/ProductDeleteModal.vue';
import { useProductStore } from '@/stores/productStore';
import type { Product } from '@/types/product';
import { onMounted, ref } from 'vue';

const productStore = useProductStore()
const editingProduct = ref<Product | null>(null)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const deleteProdutId = ref<string | null>(null)
const showAddModal = ref(false)

onMounted(() => {
  productStore.fetchProduct()
})

const handleEdit = (product: Product) => {
  editingProduct.value = product
  showEditModal.value = true
}

const handleDelete = (productId: string) => {
  deleteProdutId.value = productId,
  showDeleteModal.value = true
}

const handleConfirmDelete = async () => {
  if(deleteProdutId.value){
    await productStore.deleteProduct(deleteProdutId.value)
    showDeleteModal.value = false
  }
}

const handleSaveEdit = async (data: any) => {
  if (!editingProduct.value) return

  const formData = new FormData()

  // Add text fields
  formData.append('name', data.name || '')
  formData.append('description', data.description || '')
  formData.append('regularPrice', (data.regularPrice || 0).toString())
  formData.append('discount', (data.discount || 0).toString())
  formData.append('category', data.category || '')
  formData.append('stock', (data.stock || 0).toString())
  formData.append('size', data.size || '')
  formData.append('isPromoted', (data.isPromoted || false).toString())
  formData.append('isActive', (data.isActive || false).toString())

  // Add image deletions
  if (data.imagesToDelete && Array.isArray(data.imagesToDelete)) {
    data.imagesToDelete.forEach((url: string) => {
      formData.append('imagesToDelete', url)
    })
  }

  // ✅ FIX: use `newImageFiles` (not `newImages`)
  if (data.newImageFiles && Array.isArray(data.newImageFiles)) {
    data.newImageFiles.forEach((file: File) => {
      formData.append('images', file)
    })
  }

  // Update product
  await productStore.updateProduct(editingProduct.value._id, formData)

  // ✅ Refresh product list (optional but recommended)
  await productStore.fetchProduct()

  // Close modal
  showEditModal.value = false
}

const handleAddProduct = async (data: any) => {
  const formData = new FormData()

  // Add text fields
  formData.append('name', data.name || '')
  formData.append('description', data.description || '')
  formData.append('regularPrice', (data.regularPrice || 0).toString())
  formData.append('discount', (data.discount || 0).toString())
  formData.append('category', data.category || '')
  formData.append('stock', (data.stock || 0).toString())
  formData.append('size', data.size || '')
  formData.append('isPromoted', (data.isPromoted || false).toString())
  formData.append('isActive', (data.isActive || false).toString())

  // If you support image upload in create (optional)
  // if (data.newImageFiles) {
  //   data.newImageFiles.forEach((file: File) => {
  //     formData.append('images', file)
  //   })
  // }

  await productStore.createProduct(formData)
  showAddModal.value = false
}



</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Manage Products</h1>
      <button @click="showAddModal = true" class="bg-orange-500 text-white px-4 py-2 rounded">
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
      <div class="p-4 border-b">
        <h2 class="font-semibold">Product List ({{ productStore.products.length }})</h2>
      </div>
      <ProductTable
        :products="productStore.products"
        @edit="handleEdit"
        @delete="handleDelete"
      />
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
    <ProductAddModal
      :show="showAddModal"
      @close="showAddModal = false"
      @save="handleAddProduct"
    />
  </div>
</template>
