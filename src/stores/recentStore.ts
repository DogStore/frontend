import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/types/product'

export const useRecentStore = defineStore('recent', () => {
  const recent = ref<Product[]>([])

  function loadFromStorage() {
    recent.value = JSON.parse(localStorage.getItem('recent') || '[]')
  }

  function save() {
    localStorage.setItem('recent', JSON.stringify(recent.value))
  }

  function addRecent(product: Product) {
    if (recent.value.some((p) => p.id === product.id)) {
      return
    }
    recent.value.unshift(product)

    if (recent.value.length > 20) {
      recent.value.pop()
    }

    save()
  }

  loadFromStorage()

  return { recent, addRecent, loadFromStorage }
})
