import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product } from "@/types/Product";

export const useFavoriteStore = defineStore("favorite", () => {
  const favorites = ref<Product[]>([]);

  function loadFromStorage() {
    favorites.value = JSON.parse(localStorage.getItem("favorites") || "[]");
  }

  function save() {
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  }

  function toggleFavorite(product: Product) {
    const exists = favorites.value.some((p) => p.id === product.id);

    if (exists) {
      favorites.value = favorites.value.filter((p) => p.id !== product.id);
    } else {
      favorites.value.push(product);
    }
    save();
  }

  loadFromStorage();

  return { favorites, toggleFavorite, loadFromStorage };
});
