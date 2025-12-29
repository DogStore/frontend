import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/api";
import type { Product } from "@/types/Product";

export const useProductStore = defineStore("product", () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 🔍 search state
  const lastQuery = ref("");
  const isSearching = ref(false);

  // 🔁 map backend → frontend
  function mapBackendProduct(p: any): Product {
    const regular = p.regularPrice ?? 0;
    const discount = p.discount ?? 0;

    return {
      id: p._id,
      name: p.name,
      image: p.images?.[0] ?? "",
      price:
        discount > 0
          ? regular - (regular * discount) / 100
          : regular,
      originalPrice: regular,
      rating: p.rating ?? 0,
      countryFlag: p.countryFlag ?? null,
      // frontend-only
      isFavorite: false,
      inCart: false,
    };
  }

  // 🔽 GET all products
  async function fetchProducts() {
    loading.value = true;
    error.value = null;

    try {
      const res = await api.get("/api/products");
      products.value = res.data.products.map(mapBackendProduct);
    } catch (err) {
      error.value = "Failed to load products";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  // 🔍 SEARCH products
  async function searchProducts(query: string) {
    isSearching.value = true;
    lastQuery.value = query;
    loading.value = true;

    try {
      const res = await api.get("/api/products/search/query", {
        params: { q: query },
      });
      products.value = res.data.products.map(mapBackendProduct);
    } finally {
      loading.value = false;
    }
  }

  function clearSearch() {
    isSearching.value = false;
    products.value = [];
    lastQuery.value = "";
  }

  return {
    products,
    loading,
    error,
    lastQuery,
    isSearching,
    searchProducts,
    clearSearch,
    fetchProducts,
  };
});
