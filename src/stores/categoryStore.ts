// src/stores/categoryStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Category } from '@/types/category'

const API_BASE = 'https://backend-kanu.onrender.com/api'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE}/admin/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      categories.value = response.data.categories || []
    } catch (err: any) {
      console.error('Error fetching categories:', err)
    }
  }

  return {
    categories,
    fetchCategories
  }
})
