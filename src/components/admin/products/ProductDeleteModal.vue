<script lang="ts" setup>
import type { Product } from '@/types/product';

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: "cancel"): void,
  (e: "confirm"): void
}>()

const cancel = () => emit('cancel')
const confirm = () => emit('confirm')

</script>


<template>
  <div v-if="show" class="fixed inset-0 bg-gray-700/60 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg max-w-sm w-full mx-4">
      <div class="flex items-center mb-4">
        <div class="bg-red-100 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-800 ml-3">Delete Product</h3>
      </div>

      <p class="text-gray-600 mb-6">
        Are you sure you want to delete this product? This action cannot be undone.
      </p>

      <div class="flex justify-end space-x-3">
        <button
          @click="cancel"
          class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          @click="confirm"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer "
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
