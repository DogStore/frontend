<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
  >
    <div
      class="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
    >
      <!-- Header -->
      <div
        class="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-white flex-shrink-0"
      >
        <h2 class="text-xl font-bold">Edit Product</h2>
        <p class="text-sm opacity-90">Update product information and media</p>
      </div>

      <!-- Scrollable Content -->
      <div class="overflow-y-auto flex-1">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <!-- LEFT: Product Info -->
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-gray-800 pb-2 border-b-2 border-orange-500">
              Product Information
            </h3>

            <!-- Name -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">
                Product Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="e.g., Dog Coat"
                class="w-full rounded-lg border-2 border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
              <textarea
                v-model="form.description"
                rows="3"
                placeholder="Describe the product..."
                class="w-full rounded-lg border-2 border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition resize-none"
              ></textarea>
            </div>

            <!-- Price & Discount -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">
                  Regular Price <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    v-model.number="form.originalPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    class="w-full rounded-lg border-2 border-gray-300 pl-8 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Discount (%)</label>
                <div class="relative">
                  <input
                    v-model.number="form.discount"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                    class="w-full rounded-lg border-2 border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  />
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
            </div>

            <!-- Category -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">
                Category <span class="text-red-500">*</span>
              </label>
              <div class="flex gap-2">
                <select
                  v-model="form.category"
                  class="flex-1 rounded-lg border-2 border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                >
                  <option value="" disabled>Select category</option>
                  <option v-for="cat in categories" :key="cat._id" :value="cat._id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Stock & Size -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">
                  Stock <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  class="w-full rounded-lg border-2 border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Size</label>
                <input
                  v-model="form.size"
                  type="text"
                  placeholder="e.g., S, M, L"
                  class="w-full rounded-lg border-2 border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">
                  Country Name
                </label>
                <input
                  v-model="form.countryName"
                  type="text"
                  placeholder="e.g., Cambodia"
                  class="w-full rounded-lg border-2 border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                />
              </div>
            </div>

            <!-- Toggles -->
            <div class="flex gap-6 pt-2 pb-4">
              <label class="flex items-center gap-2 cursor-pointer group">
                <div class="relative">
                  <input v-model="form.isPromoted" type="checkbox" class="sr-only peer" />
                  <div
                    class="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-orange-500 transition"
                  ></div>
                  <div
                    class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-700">Promoted</span>
              </label>

              <label class="flex items-center gap-2 cursor-pointer group">
                <div class="relative">
                  <input v-model="form.isActive" type="checkbox" class="sr-only peer" />
                  <div
                    class="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition"
                  ></div>
                  <div
                    class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-700">Active</span>
              </label>
            </div>
          </div>

          <!-- RIGHT: Media -->
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-gray-800 pb-2 border-b-2 border-orange-500">Media</h3>

            <!-- Existing Product Images -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">
                Current Images
              </label>

              <div v-if="editImages.length" class="grid grid-cols-4 gap-3 mb-3">
                <div
                  v-for="(url, index) in editImages"
                  :key="'old-' + index"
                  class="relative group"
                >
                  <img
                    :src="url"
                    class="w-full h-20 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    @click="removeExistingImage(url)"
                    class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition"
                  >
                    ×
                  </button>
                </div>
              </div>

              <label
                class="flex flex-col items-center justify-center border-2 border-dashed border-orange-300 rounded-xl p-6 cursor-pointer hover:bg-orange-50 hover:border-orange-400 transition group"
              >
                <svg
                  class="w-10 h-10 text-orange-400 group-hover:text-orange-500 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span class="text-sm font-semibold text-orange-500 group-hover:text-orange-600"
                  >Add new images</span
                >
                <span class="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  @change="handleImageUpload"
                  class="hidden"
                />
              </label>

              <!-- New Image Previews -->
              <div v-if="newImagePreviews.length" class="grid grid-cols-4 gap-3 mt-3">
                <div
                  v-for="(preview, index) in newImagePreviews"
                  :key="'new-' + index"
                  class="relative group"
                >
                  <img
                    :src="preview"
                    class="w-full h-20 object-cover rounded-lg border-2 border-green-200"
                  />
                  <div
                    class="absolute top-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded"
                  >
                    NEW
                  </div>
                  <button
                    type="button"
                    @click="removeNewImage(index)"
                    class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>

            <!-- Country Flag -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5"> Country Flag </label>

              <!-- Existing Flag -->
              <div v-if="oldFlagUrl" class="relative w-24 mb-3 group">
                <img
                  :src="oldFlagUrl"
                  class="w-24 h-16 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                />
                <button
                  type="button"
                  @click="removeOldFlag"
                  class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>

              <!-- New Flag Preview -->
              <div v-if="flagPreview" class="relative w-24 mb-3 group">
                <img
                  :src="flagPreview"
                  class="w-24 h-16 object-cover rounded-lg border-2 border-green-200 shadow-sm"
                />
                <div
                  class="absolute top-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded"
                >
                  NEW
                </div>
                <button
                  type="button"
                  @click="removeFlag"
                  class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>

              <label
                class="flex flex-col items-center justify-center border-2 border-dashed border-orange-300 rounded-xl p-6 cursor-pointer hover:bg-orange-50 hover:border-orange-400 transition group"
              >
                <svg
                  class="w-10 h-10 text-orange-400 group-hover:text-orange-500 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                <span class="text-sm font-semibold text-orange-500 group-hover:text-orange-600"
                  >Upload new flag</span
                >
                <span class="text-xs text-gray-500 mt-1">PNG, JPG recommended</span>
                <input type="file" accept="image/*" @change="handleFlagUpload" class="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 flex-shrink-0">
        <button
          @click="close"
          class="px-6 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          @click="save"
          class="px-6 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 transition"
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
  (e: 'save', data: FormData): void
}>()

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

type ProductForm = {
  name: string
  description: string
  originalPrice: number
  discount: number
  category: string
  stock: number
  size: string
  isPromoted: boolean
  isActive: boolean
  countryName: string
}

const form = ref<ProductForm>({
  name: '',
  description: '',
  originalPrice: 0,
  discount: 0,
  category: '',
  stock: 0,
  size: '',
  isPromoted: false,
  isActive: true,
  countryName: '',
})

// Existing images from product
const editImages = ref<string[]>([])
// Images to delete
const imagesToDelete = ref<string[]>([])

// New images to upload
const newImageFiles = ref<File[]>([])
const newImagePreviews = ref<string[]>([])

// Flag handling
const oldFlagUrl = ref<string | null>(null)
const flagFile = ref<File | null>(null)
const flagPreview = ref<string | null>(null)
const deleteFlagFlag = ref(false)

// Watch for product changes and populate form
watch(
  () => props.product,
  async (newProduct) => {
    if (newProduct) {
      // Populate form fields
      form.value = {
        name: newProduct.name || '',
        description: newProduct.description || '',
        originalPrice: newProduct.originalPrice || 0,
        discount: newProduct.discount || 0,
        category:
          typeof newProduct.category === 'string'
            ? newProduct.category
            : newProduct.category?._id || '',
        stock: newProduct.stock || 0,
        size: newProduct.size || '',
        isPromoted: newProduct.isPromoted || false,
        isActive: newProduct.isActive !== undefined ? newProduct.isActive : true,
        countryName: newProduct.countryName || '',
      }

      // Load existing images
      editImages.value = [...(newProduct.images || [])]
      imagesToDelete.value = []

      // Clear new images
      newImageFiles.value = []
      newImagePreviews.value.forEach((url) => URL.revokeObjectURL(url))
      newImagePreviews.value = []

      // Load existing flag
      oldFlagUrl.value = newProduct.countryFlag || null
      flagFile.value = null
      if (flagPreview.value) URL.revokeObjectURL(flagPreview.value)
      flagPreview.value = null
      deleteFlagFlag.value = false

      // Fetch categories if needed
      if (categories.value.length === 0) {
        await categoryStore.fetchCategories()
      }
    }
  },
  { immediate: true },
)

// Remove existing image
const removeExistingImage = (url: string) => {
  imagesToDelete.value.push(url)
  editImages.value = editImages.value.filter((u) => u !== url)
}

// Handle new image upload
const handleImageUpload = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return

  const newFiles = Array.from(files)
  const previews = newFiles.map((file) => URL.createObjectURL(file))

  newImageFiles.value.push(...newFiles)
  newImagePreviews.value.push(...previews)
}

// Remove new image
const removeNewImage = (index: number) => {
  const url = newImagePreviews.value[index]
  if (url) URL.revokeObjectURL(url)

  newImagePreviews.value.splice(index, 1)
  newImageFiles.value.splice(index, 1)
}

// Handle flag upload
const handleFlagUpload = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length === 0) return

  if (flagPreview.value) URL.revokeObjectURL(flagPreview.value)

  flagFile.value = files[0]!
  flagPreview.value = URL.createObjectURL(files[0]!)
}

// Remove new flag
const removeFlag = () => {
  if (flagPreview.value) URL.revokeObjectURL(flagPreview.value)
  flagFile.value = null
  flagPreview.value = null
}

// Remove old flag
const removeOldFlag = () => {
  oldFlagUrl.value = null
  deleteFlagFlag.value = true
}

const close = () => {
  // Clean up preview URLs
  newImagePreviews.value.forEach((url) => URL.revokeObjectURL(url))
  if (flagPreview.value) URL.revokeObjectURL(flagPreview.value)

  emit('close')
}

const save = () => {
  if (!props.product) return

  const formData = new FormData()

  // Text fields
  formData.append('name', form.value.name.trim())
  formData.append('description', form.value.description.trim())
  formData.append('originalPrice', form.value.originalPrice.toString())
  formData.append('discount', form.value.discount.toString())
  formData.append('category', form.value.category)
  formData.append('stock', form.value.stock.toString())
  formData.append('size', form.value.size.trim())
  formData.append('isPromoted', String(form.value.isPromoted))
  formData.append('isActive', String(form.value.isActive))
  formData.append('countryName', form.value.countryName.trim())

  // Images to delete
  imagesToDelete.value.forEach((url) => {
    formData.append('imagesToDelete', url)
  })

  // New images
  newImageFiles.value.forEach((file) => {
    formData.append('images', file)
  })

  // Flag
  if (flagFile.value) {
    formData.append('countryFlag', flagFile.value)
  } else if (deleteFlagFlag.value) {
    formData.append('deleteFlag', 'true')
  }

  emit('save', formData)
}
</script>
