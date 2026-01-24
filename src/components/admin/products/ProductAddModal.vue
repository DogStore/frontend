<!-- src/components/admin/products/ProductAddModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
  >
    <div
      class="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
    >
      <!-- Header -->
      <div class="bg-linear-to-r from-orange-500 to-orange-600 px-6 py-4 text-white shrink-0">
        <h2 class="text-xl font-bold">Add New Product</h2>
        <p class="text-sm opacity-90">Create and publish a new product to your store</p>
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
                    v-model.number="form.regularPrice"
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

                <button
                  type="button"
                  @click="showNewCategoryInput = !showNewCategoryInput"
                  class="w-10 h-10 flex items-center justify-center bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-lg transition"
                  title="Add Category"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>

              <!-- New Category -->
              <div v-if="showNewCategoryInput" class="mt-2 space-y-2">
                <input
                  v-model="newCategoryName"
                  @keyup.enter="addNewCategory"
                  type="text"
                  placeholder="New category name"
                  class="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                />
                <div class="flex gap-2">
                  <button
                    type="button"
                    @click="addNewCategory"
                    class="px-4 py-1.5 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    @click="showNewCategoryInput = false"
                    class="px-4 py-1.5 rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
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

            <!-- Image Upload -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">
                Product Images <span class="text-red-500">*</span>
              </label>

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
                  >Add images</span
                >
                <span class="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  class="hidden"
                  @change="handleImageUpload"
                />
              </label>

              <!-- Image Preview -->
              <div v-if="imagePreviews.length" class="grid grid-cols-4 gap-3 mt-3">
                <div v-for="(preview, index) in imagePreviews" :key="index" class="relative group">
                  <img
                    :src="preview"
                    class="w-full h-20 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                  />
                  <button
                    type="button"
                    @click="removeImage(index)"
                    class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>

            <!-- Country Flag -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">
                Country Flag <span class="text-red-500">*</span>
              </label>

              <!-- Flag Preview -->
              <div v-if="flagPreview" class="relative w-24 mb-3 group">
                <img
                  :src="flagPreview"
                  class="w-24 h-16 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                />
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
                  >Upload flag</span
                >
                <span class="text-xs text-gray-500 mt-1">PNG, JPG recommended</span>
                <input type="file" accept="image/*" @change="handleFlagUpload" class="hidden" />
              </label>
            </div>
          </div>

          <!-- Country Name -->
          <div>
            <label class="block text-sm font-medium mb-1">
              Country Name <span class="text-red-500">*</span>
            </label>

            <select
              v-model="form.countryName"
              class="w-full rounded-lg border outline-none border-orange-300 px-4 py-2 focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition"
            >
              <option value="" disabled>Select country</option>
              <option v-for="c in countries" :key="c" :value="c">
                {{ c }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 shrink-0">
        <button
          @click="close"
          class="px-6 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          @click="save"
          :disabled="!canSave"
          class="px-6 py-2.5 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Product
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { useCategoryStore } from '@/stores/categoryStore'

// Define ProductForm type
type ProductForm = {
  name: string
  description: string
  regularPrice: number
  discount: number
  category: string
  stock: number
  size: string
  isPromoted: boolean
  isActive: boolean
  countryName: string
}

const countries = [
  'Cambodia',
  'Australia',
  'France',
  'China',
  'Japan',
]

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: FormData): void
}>()
// State
const form = ref<ProductForm>({
  name: '',
  description: '',
  regularPrice: 0,
  discount: 0,
  category: '',
  stock: 0,
  size: '',
  isPromoted: false,
  isActive: true,
  countryName: '',
})

// Images
const imageFiles = ref<File[]>([])
const imagePreviews = ref<string[]>([])

// Categories
const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const showNewCategoryInput = ref(false)
const newCategoryName = ref('')

// Fetch categories when modal opens
watch(
  () => props.show,
  async (isOpen) => {
    if (isOpen && categories.value.length === 0) {
      await categoryStore.fetchCategories()
    }
  },
)

// Image handling
const handleImageUpload = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return

  const newFiles = Array.from(files)
  const previews = newFiles.map((file) => URL.createObjectURL(file))

  imageFiles.value.push(...newFiles)
  imagePreviews.value.push(...previews)
}

const removeImage = (index: number) => {
  const url = imagePreviews.value[index]
  if (url) URL.revokeObjectURL(url)
  imagePreviews.value.splice(index, 1)
  imageFiles.value.splice(index, 1)
}

const addNewCategory = async () => {
  if (!newCategoryName.value.trim()) return

  try {
    const response = await axios.post(
      'https://backend-kanu.onrender.com/api/admin/categories',
      { name: newCategoryName.value.trim() },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      },
    )

    if (response.data) {
      await categoryStore.fetchCategories()
      form.value.category = response.data._id
      showNewCategoryInput.value = false
      newCategoryName.value = ''
    } else {
      alert('Category created but no data returned')
    }
  } catch (err: any) {
    console.error('Add category error:', err)
    alert('Failed to create category: ' + (err.response?.data?.message || 'Unknown error'))
  }
}

// Validation
const canSave = computed(() => {
  return (
    form.value.name.trim() !== '' &&
    form.value.regularPrice > 0 &&
    form.value.category.trim() !== '' &&
    form.value.stock >= 0 &&
    imageFiles.value.length > 0 &&
    flagFile.value !== null
  )
})

// Actions
const close = () => {
  emit('close')
  // Reset
  form.value = {
    name: '',
    description: '',
    regularPrice: 0,
    discount: 0,
    category: '',
    stock: 0,
    size: '',
    isPromoted: false,
    isActive: true,
    countryName: '',
  }
  imageFiles.value = []
  imagePreviews.value.forEach((url) => URL.revokeObjectURL(url))
  imagePreviews.value = []
  showNewCategoryInput.value = false
  newCategoryName.value = ''

  // Reset flag
  if (flagPreview.value) URL.revokeObjectURL(flagPreview.value)
  flagFile.value = null
  flagPreview.value = null
}

// State
const flagFile = ref<File | null>(null)
const flagPreview = ref<string | null>(null)

// Handle flag upload
const handleFlagUpload = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length === 0) return

  if (flagPreview.value) URL.revokeObjectURL(flagPreview.value)

  flagFile.value = files[0]! // ! tells TS it's not undefined
  flagPreview.value = URL.createObjectURL(files[0]!)
}

// Remove flag
const removeFlag = () => {
  if (flagPreview.value) {
    URL.revokeObjectURL(flagPreview.value)
  }
  flagFile.value = null
  flagPreview.value = null
}

const save = () => {
  if (!canSave.value) return

  const formData = new FormData()

  // Text fields
  formData.append('name', form.value.name)
  formData.append('description', form.value.description)
  formData.append('regularPrice', form.value.regularPrice.toString())
  formData.append('discount', form.value.discount.toString())
  formData.append('category', form.value.category)
  formData.append('stock', form.value.stock.toString())
  formData.append('size', form.value.size)
  formData.append('isPromoted', form.value.isPromoted.toString())
  formData.append('isActive', form.value.isActive.toString())
  formData.append('countryName', form.value.countryName.trim())

  // Images
  imageFiles.value.forEach((file) => {
    formData.append('images', file)
  })

  // Flag
  if (flagFile.value instanceof File) {
    formData.append('countryFlag', flagFile.value)
  }

  emit('save', formData)
}
</script>
