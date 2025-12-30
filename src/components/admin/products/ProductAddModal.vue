<!-- src/components/admin/products/ProductAddModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
  >
    <div class="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
      <!-- Header -->
      <div class="bg-orange-500 px-6 py-4 text-white">
        <h2 class="text-xl font-semibold flex items-center gap-2">➕ Add New Product</h2>
        <p class="text-sm opacity-90">Create and publish a new product to your store</p>
      </div>

      <!-- Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <!-- LEFT : Product Info -->
        <div class="space-y-5">
          <h3 class="text-[26px] font-semibold text-gray-800 border-b pb-2">Product Information</h3>

          <!-- Name -->
          <div>
            <label class="block text-sm font-medium mb-1"
              >Product Name <span class="text-red-500">*</span></label
            >
            <input
              v-model="form.name"
              type="text"
              placeholder="Dog Coat"
              class="w-full rounded-lg border outline-none border-orange-300 px-4 py-2 focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Describe the product..."
              class="border outline-none border-orange-300 w-full rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
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
                placeholder="0.00"
                class="border outline-none border-orange-300 w-full rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1"> Discount (%) </label>
              <input
                v-model.number="form.discount"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                class="w-full rounded-lg border outline-none border-orange-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium mb-1"
              >Category <span class="text-red-500">*</span></label
            >
            <div class="flex gap-2">
              <select
                v-model="form.category"
                class="flex-1 rounded-lg border outline-none border-orange-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              >
                <option value="" disabled>Select category</option>
                <option v-for="cat in categories" :key="cat._id" :value="cat._id">
                  {{ cat.name }}
                </option>
              </select>

              <button
                type="button"
                @click="showNewCategoryInput = !showNewCategoryInput"
                class="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200 transition"
              >
                +
              </button>
            </div>

            <!-- New Category -->
            <div v-if="showNewCategoryInput" class="mt-2 space-y-2">
              <input
                v-model="newCategoryName"
                @keyup.enter="addNewCategory"
                type="text"
                placeholder="New category name"
                class="w-full rounded-lg border outline-none border-orange-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition text-sm"
              />
              <div class="flex gap-2">
                <button
                  type="button"
                  @click="addNewCategory"
                  class="px-3 py-1 rounded bg-orange-500 text-white text-xs hover:bg-orange-600"
                >
                  Add
                </button>
                <button
                  type="button"
                  @click="showNewCategoryInput = false"
                  class="px-3 py-1 rounded bg-gray-200 text-xs hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <!-- Stock & Size -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1"
                >Stock <span class="text-red-500">*</span></label
              >
              <input
                v-model.number="form.stock"
                type="number"
                min="0"
                placeholder="0"
                class="border outline-none border-orange-300 w-full rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Size</label>
              <input
                v-model="form.size"
                type="text"
                placeholder="S, M, L"
                class="w-full rounded-lg border outline-none border-orange-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
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
          <h3 class="text-[26px] font-semibold text-gray-800 border-b pb-2">Media</h3>

          <!-- Image Upload -->
          <div>
            <div class="mb-3 text-sm font-medium">
              Product Images <span class="text-red-500">*</span>
            </div>
            <label
              class="flex flex-col items-center justify-center border-2 border-dashed border-orange-300 rounded-xl p-6 cursor-pointer hover:bg-orange-50 transition"
            >
              <span class="text-sm font-medium text-orange-500"> Click to add images </span>
              <input
                type="file"
                multiple
                accept="image/*"
                class="hidden"
                @change="handleImageUpload"
              />
            </label>

            <!-- Image Preview -->
            <div class="flex flex-wrap gap-3 mt-4">
              <div v-for="(preview, index) in imagePreviews" :key="index" class="relative group">
                <img :src="preview" class="w-20 h-20 object-cover rounded-lg shadow" />
                <button
                  type="button"
                  @click="removeImage(index)"
                  class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 text-white text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <!-- Country Flag -->
          <div>
            <label class="block text-sm font-medium mb-3"
              >Country Flag <span class="text-red-500">*</span></label
            >

            <label
              class="flex flex-col items-center justify-center border-2 border-dashed border-orange-300 rounded-xl p-6 cursor-pointer hover:bg-orange-50 transition"
            >
              <span class="text-sm font-medium text-orange-500"> Click to upload Flag </span>
              <input
                type="file"
                accept="image/*"
                @change="handleFlagUpload"
                class="w-full px-4 py-2 hidden"
              />
            </label>

            <div v-if="flagPreview" class="relative w-20 my-3 group">
              <img :src="flagPreview" class="w-20 h-20 object-cover rounded-lg shadow" />
              <button
                type="button"
                @click="removeFlag"
                class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 text-white text-xs opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
            </div>
          </div>

          <!-- Country Name -->
          <div>
            <label class="block text-sm font-medium mb-1">
              Country Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.countryName"
              type="text"
              placeholder="e.g. Cambodia"
              class="w-full rounded-lg border outline-none border-orange-300 px-4 py-2 focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition"
            />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
        <button @click="close" class="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100">
          Cancel
        </button>

        <button
          @click="save"
          :disabled="!canSave"
          class="px-6 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 disabled:opacity-50"
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
    form.value.countryName.trim() !== '' &&
    imageFiles.value.length > 0
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
}

// State
const flagFile = ref<File | null>(null)
const flagPreview = ref<string | null>(null)

// Handle flag upload
const handleFlagUpload = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length === 0) return

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
