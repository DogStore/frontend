// src/stores/categoryStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Category } from '@/types/category'
import { adminApi } from '@/services/api'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])

  const fetchCategories = async () => {
    try {
      const response = await adminApi.get('/admin/categories')
      if (Array.isArray(response.data)) {
        categories.value = response.data
      } else {
        console.warn('Unexpected API response structure')
        categories.value = []
      }
    } catch (err: any) {
      console.error('Error fetching categories:', err)
      categories.value = []
    }
  }

  return {
    categories,
    fetchCategories,
  }
})
