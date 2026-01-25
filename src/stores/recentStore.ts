import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/product'

export const useRecentStore = defineStore('recent', () => {
  const recent = ref<Product[]>([])
  const maxRecent = 20

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem('recent')
      recent.value = stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load recent products:', error)
      recent.value = []
    }
  }

  function save() {
    try {
      localStorage.setItem('recent', JSON.stringify(recent.value))
    } catch (error) {
      console.error('Failed to save recent products:', error)
    }
  }

  function addRecent(product: Product) {
    recent.value = recent.value.filter((p) => p.id !== product.id)

    recent.value.unshift(product)

    if (recent.value.length > maxRecent) {
      recent.value = recent.value.slice(0, maxRecent)
    }

    save()
  }

  const validRecents = computed(() => {
    return recent.value.filter(product => product.isActive === true)
  })

  function syncWithProductStore(allProducts: Product[]) {
    recent.value = recent.value
      .map(r => allProducts.find(p => p.id === r.id))
      .filter((p): p is Product => Boolean(p && p.isActive))

    save()
  }

  function clearRecents() {
    recent.value = []
    localStorage.removeItem('recent')
  }

  loadFromStorage()

  return {
    recent,
    validRecents,
    addRecent,
    loadFromStorage,
    syncWithProductStore,
    clearRecents
  }
})
