<script setup lang="ts" >
import type { Product } from '@/types/product';

defineProps<{
  products: Product[]
}>()

const emit = defineEmits<{
  (e: 'edit', product: Product): void
  (e: 'delete', id: string): void
}>()

</script>

<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="product in products" :key="product._id">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {{ product._id.slice(0, 6) }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <img
            :src="product.images[0] || 'https://via.placeholder.com/50'"
            alt="Product"
            class="h-10 w-10 object-cover rounded"
          />
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ product.name }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span
            v-if="typeof product.category === 'object'"
            class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded"
          >
            {{ product.category.name }}
          </span>
          <span
            v-else
            class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
          >
            {{ product.category }}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${{ product.salePrice?.toFixed(2) || product.regularPrice.toFixed(2) }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ product.stock }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span
            :class="{
              'bg-green-100 text-green-800': product.isActive,
              'bg-red-100 text-red-800': !product.isActive
            }"
            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
          >
            {{ product.isActive ? 'Active' : 'Inactive' }}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <button @click="emit('edit', product)" class="text-indigo-600 hover:text-indigo-900 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
          </button>
          <button @click="emit('delete', product._id)" class="text-red-600 hover:text-red-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
