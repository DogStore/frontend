import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/types/product'

export type FavoriteProduct = Product & {
  addedAt: number // ⭐ timestamp
}

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref<FavoriteProduct[]>([])

  function loadFromStorage() {
    favorites.value = JSON.parse(localStorage.getItem('favorites') || '[]')
  }

  function save() {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  function toggleFavorite(product: Product) {
    const index = favorites.value.findIndex((p) => p.id === product.id)

    if (index >= 0) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.unshift({
        ...product,
        addedAt: Date.now(), // REQUIRED
      })
    }

    save()
  }

  loadFromStorage()

  return {
    favorites,
    toggleFavorite,
    loadFromStorage,
  }
})
