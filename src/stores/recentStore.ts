import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product } from "@/types/Product";

export const useRecentStore = defineStore("recent", () => {
  const recent = ref<Product[]>([]);

  function loadFromStorage() {
    recent.value = JSON.parse(localStorage.getItem("recent") || "[]");
  }

  function save() {
    localStorage.setItem("recent", JSON.stringify(recent.value));
  }

  function addRecent(product: Product) {
    recent.value = recent.value.filter((p) => p.id !== product.id);
    recent.value.unshift(product);

    if (recent.value.length > 20) {
      recent.value.pop();
    }
    save();
  }

  loadFromStorage();

  return { recent, addRecent, loadFromStorage };
});
