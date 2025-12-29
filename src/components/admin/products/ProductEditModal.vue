<!-- src/components/admin/products/ProductEditModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
  >
    <div class="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">

      <!-- Header -->
      <div class="bg-orange-500 px-6 py-4 text-white">
        <h2 class="text-xl font-semibold flex items-center gap-2">
          ✏️ Edit Product
        </h2>
        <p class="text-sm opacity-90">
          Update product information and media
        </p>
      </div>

      <!-- Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">

        <!-- LEFT : Product Info -->
        <div class="space-y-5">
          <h3 class="text-[26px] font-semibold text-gray-800 border-b pb-2">
            Product Information
          </h3>

          <!-- Name -->
          <div>
            <label class="block text-sm font-medium mb-1">
              Product Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              class="w-full rounded-lg border border-orange-300 px-4 py-2 outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full rounded-lg border border-orange-300 px-4 py-2 outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition"
            ></textarea>
          </div>

          <!-- Price & Discount -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">
                Regular Price <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="form.regularPrice"
                type="number"
                min="0"
                step="0.01"
                class="w-full rounded-lg border border-orange-300 px-4 py-2 outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Discount (%)</label>
              <input
                v-model.number="form.discount"
                type="number"
                min="0"
                max="100"
                class="w-full rounded-lg border border-orange-300 px-4 py-2 outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium mb-1">
              Category <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.category"
              class="w-full rounded-lg border border-orange-300 px-4 py-2 outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition"
            >
              <option value="" disabled>Select category</option>
              <option
                v-for="cat in categories"
                :key="cat._id"
                :value="cat._id"
              >
                {{ cat.name }} ({{ cat.slug }})
              </option>
            </select>
          </div>

          <!-- Stock & Size -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">
                Stock <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="form.stock"
                type="number"
                min="0"
                class="w-full rounded-lg border border-orange-300 px-4 py-2 outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Size</label>
              <input
                v-model="form.size"
                type="text"
                class="w-full rounded-lg border border-orange-300 px-4 py-2 outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>
          </div>

          <!-- Toggles -->
          <div class="flex gap-6 pt-2">
            <label class="flex items-center gap-2">
              <input
                v-model="form.isPromoted"
                type="checkbox"
                class="accent-orange-500 cursor-pointer"
              />
              <span class="text-sm">Promoted</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                v-model="form.isActive"
                type="checkbox"
                class="accent-orange-500 cursor-pointer"
              />
              <span class="text-sm">Active</span>
            </label>
          </div>
        </div>

        <!-- RIGHT : Media -->
        <div class="space-y-6">
          <h3 class="text-[26px] font-semibold text-gray-800 border-b pb-2">
            Media
          </h3>

          <!-- Existing Images -->
          <div>
            <div class="text-sm font-medium mb-2">Current Images</div>
            <div class="flex flex-wrap gap-3">
              <div
                v-for="(url, index) in editImages"
                :key="index"
                class="relative group"
              >
                <img
                  :src="url"
                  class="w-20 h-20 object-cover rounded-lg shadow"
                />
                <button
                  type="button"
                  @click="removeImage(url)"
                  class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 text-white text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <!-- Add New Images -->
          <div>
            <div class="text-sm font-medium mb-2">Add New Images</div>
            <label
              class="flex flex-col items-center justify-center border-2 border-dashed border-orange-300 rounded-xl p-6 cursor-pointer hover:bg-orange-50 transition"
            >
              <span class="text-sm font-medium text-orange-500">
                Click to upload images
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                @change="handleImageUpload"
                class="hidden"
              />
            </label>

            <div v-if="newImagePreviews.length" class="flex flex-wrap gap-3 mt-4">
              <div
                v-for="(preview, index) in newImagePreviews"
                :key="index"
                class="relative group"
              >
                <img
                  :src="preview"
                  class="w-20 h-20 object-cover rounded-lg shadow"
                />
                <button
                  type="button"
                  @click="removeNewImage(index)"
                  class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 text-white text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <!-- Country Flag -->
          <div>
            <div class="text-sm font-medium mb-2">Country Flag</div>

            <div v-if="oldFlagUrl" class="relative w-20 mb-3 group">
              <img
                :src="oldFlagUrl"
                class="w-20 h-20 object-cover rounded-lg shadow"
              />
              <button
                type="button"
                @click="removeOldFlag"
                class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 text-white text-xs opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
            </div>

            <div v-if="flagPreview" class="relative w-20 mb-3 group">
              <img
                :src="flagPreview"
                class="w-20 h-20 object-cover rounded-lg shadow"
              />
              <button
                type="button"
                @click="removeFlag"
                class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 text-white text-xs opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
            </div>

            <label
              class="flex flex-col items-center justify-center border-2 border-dashed border-orange-300 rounded-xl p-6 cursor-pointer hover:bg-orange-50 transition"
            >
              <span class="text-sm font-medium text-orange-500">
                Upload new flag
              </span>
              <input
                type="file"
                accept="image/*"
                @change="handleFlagUpload"
                class="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
        <button
          @click="close"
          class="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          @click="save"
          class="px-6 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600"
        >
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
import { storeToRefs } from 'pinia'

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
  isActive: true,
})

const editImages = ref<string[]>([])
const newImageFiles = ref<File[]>([])
const imagesToDelete = ref<string[]>([])

const flagFile = ref<File | null>(null)      // New flag file
const flagPreview = ref<string | null>(null) // Preview URL
const oldFlagUrl = ref<string | null>(null)  // Current flag from product

// Use category store
const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

// Sync form with product
watch(
  () => props.product,
  async (newProduct) => {
    if (newProduct) {
      form.value = {
        name: newProduct.name || '',
        description: newProduct.description || '',
        regularPrice: newProduct.regularPrice,
        discount: newProduct.discount,
        category:
          typeof newProduct.category === 'string' ? newProduct.category : newProduct.category._id,
        stock: newProduct.stock,
        size: newProduct.size || '',
        isPromoted: newProduct.isPromoted || false,
        isActive: newProduct.isActive || true,
      }

      // Load images
      editImages.value = [...(newProduct.images || [])]
      newImageFiles.value = []
      imagesToDelete.value = []

      // ✅ Load existing flag
      oldFlagUrl.value = newProduct.countryFlag || null
      flagFile.value = null
      flagPreview.value = null

      // Fetch categories if not loaded
      if (categories.value.length === 0) {
        await categoryStore.fetchCategories()
      }
    }
  },
  { immediate: true },
)

// Image handlers
const removeImage = (url: string) => {
  imagesToDelete.value.push(url)
  editImages.value = editImages.value.filter((u) => u !== url)
}

// removNewImage
const removeNewImage = (index: number) => {
  const url = newImagePreviews.value[index]
  if (url) {
    URL.revokeObjectURL(url)
  }
  newImagePreviews.value.splice(index, 1)
  newImageFiles.value.splice(index, 1)
}

const handleImageUpload = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return

  // Convert FileList to array
  const newFiles = Array.from(files)

  // Generate previews
  const previews = newFiles.map((file) => URL.createObjectURL(file))

  // Update state
  newImageFiles.value.push(...newFiles)
  newImagePreviews.value.push(...previews)
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


// Handle flag upload
const handleFlagUpload = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length === 0) return

  flagFile.value = files[0]!
  flagPreview.value = URL.createObjectURL(files[0]!)
}

// Remove new flag
const removeFlag = () => {
  if (flagPreview.value) URL.revokeObjectURL(flagPreview.value)
  flagFile.value = null
  flagPreview.value = null
}

// Remove old flag (mark for deletion)
const removeOldFlag = () => {
  oldFlagUrl.value = null
  // Mark for deletion in backend
  // We'll send this in FormData later
}


const save = () => {
  if (!props.product) return

  // ✅ Prepare data to send to parent
  const data = {
    ...form.value,
    imagesToDelete: imagesToDelete.value,
    newImageFiles: newImageFiles.value,

    oldFlagUrl: oldFlagUrl.value,
    flagFile: flagFile.value
  }

  // ✅ Emit data → parent will handle FormData + API call
  emit('save', data as Partial<Product>)

  // ✅ Clear new image previews
  clearNewImages()
}
</script>
