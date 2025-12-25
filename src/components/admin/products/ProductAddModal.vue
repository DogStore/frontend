<!-- src/components/admin/products/ProductAddModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
      <h2 class="text-xl font-bold mb-4">Add New Product</h2>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Product Name *</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full border rounded px-3 py-2"
            placeholder="e.g. Dog Coat"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea
            v-model="form.description"
            class="w-full border rounded px-3 py-2"
            rows="2"
            placeholder="Describe the product..."
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Regular Price *</label>
            <input
              v-model.number="form.regularPrice"
              type="number"
              step="0.01"
              min="0"
              class="w-full border rounded px-3 py-2"
              placeholder="0.00"
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
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Category ID *</label>
          <input
            v-model="form.category"
            type="text"
            class="w-full border rounded px-3 py-2"
            placeholder="Enter valid Category ID"
            required
          />
          <p class="text-xs text-gray-500 mt-1">Get this from the Categories page</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Stock *</label>
            <input
              v-model.number="form.stock"
              type="number"
              min="0"
              class="w-full border rounded px-3 py-2"
              placeholder="0"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Size</label>
            <input
              v-model="form.size"
              type="text"
              class="w-full border rounded px-3 py-2"
              placeholder="e.g. S, M, L"
            />
          </div>
        </div>

        <div>
          <label class="inline-flex items-center">
            <input v-model="form.isPromoted" type="checkbox" class="rounded" />
            <span class="ml-2 text-sm">Promoted</span>
          </label>
          <p class="text-xs text-gray-500 mt-1">Show in promoted products section</p>
        </div>
      </div>

      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="close"
          class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          @click="save"
          class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          :disabled="!isValid"
        >
          Create Product
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '@/types/product'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: Partial<Product>): void  // ✅ Fixed: event name + data
}>()

// Form state
const form = ref<Partial<Product>>({
  name: '',
  description: '',
  regularPrice: 0,
  discount: 0,
  category: '',
  stock: 0,
  size: '',
  isPromoted: false
})

// Validation
const isValid = computed(() => {
  // Make sure required fields exist and are correct type
  const nameValid = typeof form.value.name === 'string' && form.value.name.trim().length > 0
  const priceValid = typeof form.value.regularPrice === 'number' && form.value.regularPrice > 0
  const categoryValid = typeof form.value.category === 'string' && form.value.category.trim().length > 0
  const stockValid = typeof form.value.stock === 'number' && form.value.stock >= 0

  return nameValid && priceValid && categoryValid && stockValid
})


const close = () => {
  emit('close')
  // Reset form
  form.value = {
    name: '',
    description: '',
    regularPrice: 0,
    discount: 0,
    category: '',
    stock: 0,
    size: '',
    isPromoted: false
  }
}

const save = () => {
  if (isValid.value) {
    emit('save', { ...form.value })
  }
}
</script>
