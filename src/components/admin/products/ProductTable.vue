<script setup lang="ts" >
import type { Product } from '@/types/product';
import { computed, ref } from 'vue';

const emit = defineEmits<{
  (e: 'edit', product: Product): void
  (e: 'delete', id: string): void
}>()

const props = defineProps<{
  products: Product[]
}>()

/* Pagination */
const currentPage = ref(1)
const pageSize = 6

const totalPages = computed(() =>
  Math.ceil(props.products.length / pageSize)
)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return props.products.slice(start, start + pageSize)
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
    <table class="min-w-full">
      <!-- HEADER -->
      <thead class="bg-gray-50 border-b">
        <tr>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Image</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Stock</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
        </tr>
      </thead>

      <!-- BODY -->
      <tbody class="divide-y divide-gray-100">
        <tr
          v-for="product in paginatedProducts"
          :key="product._id"
          class="hover:bg-orange-50 transition"
        >
          <!-- ID -->
          <td class="px-6 py-4 text-sm font-medium text-gray-900">
            {{ product._id.slice(0, 6) }}
          </td>

          <!-- IMAGE -->
          <td class="px-6 py-4">
            <img
              :src="product.images[0] || 'https://via.placeholder.com/50'"
              alt="Product"
              class="h-11 w-11 rounded-lg object-cover border border-gray-200 shadow-sm"
            />
          </td>

          <!-- NAME -->
          <td class="px-6 py-4 text-sm font-medium text-gray-800">
            {{ product.name }}
          </td>

          <!-- CATEGORY -->
          <td class="px-6 py-4">
            <span
              v-if="typeof product.category === 'object'"
              class="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800"
            >
              {{ product.category.name }}
            </span>
            <span
              v-else
              class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
            >
              {{ product.category }}
            </span>
          </td>

          <!-- PRICE -->
          <td class="px-6 py-4 text-sm text-gray-700 font-medium">
            ${{ product.salePrice?.toFixed(2) || product.regularPrice.toFixed(2) }}
          </td>

          <!-- STOCK -->
          <td class="px-6 py-4 text-sm text-gray-700">
            {{ product.stock }}
          </td>

          <!-- STATUS -->
          <td class="px-6 py-4">
            <span
              :class="product.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'"
              class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
            >
              {{ product.isActive ? 'Active' : 'Inactive' }}
            </span>
          </td>

          <!-- ACTIONS -->
          <td class="px-6 py-4">
            <div class="flex justify-center gap-2">
              <button
                @click="emit('edit', product)"
                class="rounded-lg p-2 text-orange-500 hover:bg-orange-100 transition"
              >
                <!-- edit icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                </svg>
              </button>

              <button
                @click="emit('delete', product._id)"
                class="rounded-lg p-2 text-red-600 hover:bg-red-100 transition"
              >
                <!-- delete icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M3 6h18"/>
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                  <path d="M10 11v6"/>
                  <path d="M14 11v6"/>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex items-center justify-between px-6 py-4 border-t bg-white">
      <span class="text-sm text-gray-500">
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <div class="flex items-center gap-1">
        <!-- Prev -->
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded border text-sm disabled:opacity-50 hover:bg-gray-100 transition"
        >
          Prev
        </button>

        <!-- Page Numbers -->
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-1 rounded text-sm border transition',
            page === currentPage
              ? 'bg-orange-500 text-white border-orange-500'
              : 'hover:bg-gray-100'
          ]"
        >
          {{ page }}
        </button>

        <!-- Next -->
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded border text-sm disabled:opacity-50 hover:bg-gray-100 transition"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

