// src/stores/categoryStore.ts
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import type { Category } from '@/types/category'
import { adminApi } from '@/services/api'
import { publicApi } from '@/services/api'
import type { Product } from '@/types/product'

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
  // SMART FETCH - CACHE MANAGEMENT
  // =====================
  const lastFetchTime = ref<number>(0)
  const CACHE_DURATION_MS = 5 * 60 * 1000 // 5 minutes

  /**
   * Check if cached data is still fresh
   * @returns true if cache is still valid, false if it needs refresh
   */
  function isCacheValid(): boolean {
    const now = Date.now()
    return now - lastFetchTime.value < CACHE_DURATION_MS
  }

  // =====================
  // API
  // =====================
  async function fetchPublicCategories(forceRefresh = false) {
    // If cache is valid and we're not forcing refresh, skip the API call
    if (!forceRefresh && isCacheValid() && categories.value.length > 0) {
      console.log('✓ Using cached categories (less than 5 minutes old)')
      return
    }

    loading.value = true
    try {
      console.log('📡 Fetching fresh categories from server')
      const res = await publicApi.get('/categories')
      categories.value = res.data.categories ?? res.data
      lastFetchTime.value = Date.now() // Update cache timestamp
    } catch (err) {
      console.error('Failed to fetch categories', err)
      categories.value = []
    } finally {
      loading.value = false
    }
  }

  async function fetchCategoryBySlug(slug: string, forceRefresh = false) {
    // If we already have this category cached and it's fresh, reuse it
    if (!forceRefresh && activeCategory.value?.slug === slug && isCacheValid()) {
      console.log(`✓ Using cached category "${slug}" (less than 5 minutes old)`)
      return
    }

    loading.value = true
    try {
      console.log(`📡 Fetching fresh category "${slug}" from server`)
      const res = await publicApi.get(`/categories/${slug}`)
      activeCategory.value = res.data.category ?? res.data
      lastFetchTime.value = Date.now() // Update cache timestamp
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

  /**
   * Manually refresh categories from server
   * Useful when you know the backend data has been updated
   */
  function refreshCategories() {
    fetchPublicCategories(true)
  }

  /**
   * Manually refresh specific category
   * Useful when you know the backend data has been updated
   */
  function refreshCategory(slug: string) {
    fetchCategoryBySlug(slug, true)
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
    fetchCategories,

    // cache management
    isCacheValid,
    refreshCategories,
    refreshCategory,

    // actions
    resetFilters,
  }
})
