// src/stores/categoryStore.ts
import { defineStore } from 'pinia'
import { ref,computed,watch } from 'vue'
import axios from 'axios'
import type { Category } from '@/types/category'
import { adminApi } from '@/services/api'
import { publicApi } from "@/services/api"
import type { Product } from "@/types/product"

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

  // =====================
  // STATE
  // =====================
  const activeCategory = ref<Category | null>(null)
  const loading = ref(false)

  // UI FILTER STATE (used by CategoryPage)
  const selectedCountries = ref<string[]>([])
  const minPrice = ref<number | null>(null)
  const maxPrice = ref<number | null>(null)
  const sortType = ref<string>('')

  // =====================
  // API
  // =====================
  async function fetchPublicCategories() {
    loading.value = true
    try {
      const res = await publicApi.get('/categories')
      categories.value = res.data.categories ?? res.data
    } catch (err) {
      console.error('Failed to fetch categories', err)
      categories.value = []
    } finally {
      loading.value = false
    }
  }

  async function fetchCategoryBySlug(slug: string) {
    loading.value = true
    try {
      const res = await publicApi.get(`/categories/${slug}`)
      activeCategory.value = res.data.category ?? res.data
    } catch (err) {
      console.error('Failed to fetch category', err)
      activeCategory.value = null
    } finally {
      loading.value = false
    }
  }

  // =====================
  // ACTIONS
  // =====================
  function resetFilters() {
    selectedCountries.value = []
    minPrice.value = null
    maxPrice.value = null
    sortType.value = ''
  }

  return {
    // state
    categories,
    activeCategory,
    loading,

    // filters
    selectedCountries,
    minPrice,
    maxPrice,
    sortType,

    // api
    fetchPublicCategories,
    fetchCategoryBySlug,

    // actions
    resetFilters,
  }
})
