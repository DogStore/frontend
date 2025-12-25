<!-- src/components/admin/products/ProductEditModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
      <h2 class="text-xl font-bold mb-4">Edit Product</h2>

      <div class="space-y-4">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium mb-1">Name *</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea
            v-model="form.description"
            class="w-full border rounded px-3 py-2"
            rows="2"
          ></textarea>
        </div>

        <!-- Price & Discount -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Regular Price *</label>
            <input
              v-model.number="form.regularPrice"
              type="number"
              step="0.01"
              min="0"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Discount (%)</label>
            <input
              v-model.number="form.discount"
              type="number"
              min="0"
              max="100"
              class="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <!-- Category Dropdown -->
        <div>
          <label class="block text-sm font-medium mb-1">Category *</label>
          <select
            v-model="form.category"
            class="w-full border rounded px-3 py-2"
            required
          >
            <option value="" disabled>Select a category</option>
            <option
              v-for="cat in categories"
              :key="cat._id"
              :value="cat._id"
            >
              {{ cat.name }} ({{ cat.slug }})
            </option>
          </select>
        </div>

        <!-- Stock, Size, Active -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Stock *</label>
            <input
              v-model.number="form.stock"
              type="number"
              min="0"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Size</label>
            <input
              v-model="form.size"
              type="text"
              class="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <!-- Toggles -->
        <div class="space-y-2">
          <label class="inline-flex items-center">
            <input v-model="form.isPromoted" type="checkbox" class="rounded" />
            <span class="ml-2 text-sm">Promoted</span>
          </label>
          <label class="inline-flex items-center">
            <input v-model="form.isActive" type="checkbox" class="rounded" />
            <span class="ml-2 text-sm">Active</span>
          </label>
        </div>

        <!-- Image Management -->
        <div class="mt-4 pt-4 border-t">
          <label class="block text-sm font-medium mb-2">Product Images</label>

          <!-- Current Images -->
          <div class="flex flex-wrap gap-2 mb-3">
            <div v-for="(url, index) in editImages" :key="index" class="relative">
              <img :src="url" class="w-16 h-16 object-cover border rounded" />
              <button
                @click="removeImage(url)"
                type="button"
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          </div>

          <!-- Add New Images -->
          <div>
            <label class="block text-sm text-gray-600 mb-1">Add New Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              @change="handleImageUpload"
              class="border rounded px-2 py-1 w-full"
            />
          </div>
          <!-- New Image Previews -->
          <div v-if="newImagePreviews.length > 0" class="mt-3">
            <label class="block text-sm text-gray-600 mb-1">New Images Preview</label>
            <div class="flex flex-wrap gap-2">
              <div v-for="(preview, index) in newImagePreviews" :key="index" class="relative">
                <img :src="preview" class="w-16 h-16 object-cover border rounded" />
                <button
                  @click="removeNewImage(index)"
                  type="button"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-3 mt-6">
        <button @click="close" class="px-4 py-2 border rounded">Cancel</button>
        <button @click="save" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Product } from '@/types/product'
import { useCategoryStore } from '@/stores/categoryStore'

const props = defineProps<{
  show: boolean
  product: Product | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: Partial<Product>): void
}>()

// preview image
const newImagePreviews = ref<string[]>([])

// State
const form = ref<Partial<Product>>({
  name: '',
  description: '',
  regularPrice: 0,
  discount: 0,
  category: '',
  stock: 0,
  size: '',
  isPromoted: false,
  isActive: true
})

const editImages = ref<string[]>([])
const newImageFiles = ref<File[]>([])
const imagesToDelete = ref<string[]>([])

// Use category store
const categoryStore = useCategoryStore()
const { categories } = categoryStore

// Sync form with product
watch(() => props.product, async (newProduct) => {
  if (newProduct) {
    form.value = {
      name: newProduct.name || '',
      description: newProduct.description || '',
      regularPrice: newProduct.regularPrice,
      discount: newProduct.discount,
      category: typeof newProduct.category === 'string'
        ? newProduct.category
        : newProduct.category._id,
      stock: newProduct.stock,
      size: newProduct.size || '',
      isPromoted: newProduct.isPromoted || false,
      isActive: newProduct.isActive || true
    }

    // Load images
    editImages.value = [...(newProduct.images || [])]
    newImageFiles.value = []
    imagesToDelete.value = []

    // Fetch categories if not loaded
    if (categories.values.length === 0) {
      await categoryStore.fetchCategories()
    }
  }
}, { immediate: true })

// Image handlers
const removeImage = (url: string) => {
  imagesToDelete.value.push(url)
  editImages.value = editImages.value.filter(u => u !== url)
}

// removNewImage
const removeNewImage = (index: number) => {
  const url = newImagePreviews.value[index]
  if (url) {
    URL.revokeObjectURL(url) // ✅ Safe
  }
  newImagePreviews.value.splice(index, 1)
  newImageFiles.value.splice(index, 1)
}

const handleImageUpload = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;

  // Convert FileList to array
  const newFiles = Array.from(files);

  // Generate previews
  const previews = newFiles.map(file => URL.createObjectURL(file));

  // Update state
  newImageFiles.value.push(...newFiles);
  newImagePreviews.value.push(...previews);
}

// clear New images after save
const clearNewImages = () => {
  newImageFiles.value = []
  newImagePreviews.value = []
}


// Actions
const close = () => {
  emit('close')
  clearNewImages()
}

const save = () => {
  if (!props.product) return;

  // ✅ Prepare data to send to parent
  const data = {
    ...form.value,
    imagesToDelete: imagesToDelete.value,
    newImageFiles: newImageFiles.value
  };

  // ✅ Emit data → parent will handle FormData + API call
  emit('save', data as Partial<Product>);

  // ✅ Clear new image previews
  clearNewImages();
}
</script>
