import type { Product } from '../types/product'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { publicApi, adminApi } from '@/services/api'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  //  map backend → frontend
  function mapBackendProduct(p: any): Product {
    const regular = p.regularPrice ?? 0
    const discount = p.discount ?? 0
    const images = Array.isArray(p.images) ? p.images : []
    return {
      id: p._id?.toString() || '',
      name: p.name,
      countryName: p.countryName,
      slug: p.slug, 
      images: images,
      price: discount > 0 ? regular - (regular * discount) / 100 : regular,
      originalPrice: regular,
      discount: discount,
      rating: p.rating ?? 0,
      countryFlag: p.countryFlag ?? null,
      isActive: p.isActive,
      isFavorite: false,
      inCart: false,
      category: p.category,
      stock: p.stock ?? 0,
      description: p.description ?? '',
      size: p.size,
      soldCount: p.soldCount,
      isPromoted: p.isPromoted,
      addedAt: p.createdAt ? new Date(p.createdAt).getTime() : undefined,
    }
  }

  // Fetch ALL products for admin dashboard
  const fetchAdminProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.get('/admin/products')
      products.value = response.data.products.map(mapBackendProduct)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch admin products'
      console.error('Fetch admin products error:', err)
    } finally {
      loading.value = false
    }
  }

  // Create Product
  const createProduct = async (productData: FormData) => {
    const response = await adminApi.post('/admin/products', productData)
    const mappedProduct = mapBackendProduct(response.data.product)
    products.value.push(mappedProduct)
    return mappedProduct
  }

  // Update Product
  const updateProduct = async (id: string, productData: FormData) => {
    const response = await adminApi.put(`/admin/products/${id}`, productData)
    const mappedProduct = mapBackendProduct(response.data.product) // ✅ MAP IT!
    const index = products.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      products.value[index] = mappedProduct
    }
    return mappedProduct
  }

  // delete Product
  const deleteProduct = async (id: string) => {
    await adminApi.delete(`/admin/products/${id}`)
    products.value = products.value.filter((p) => p.id !== id)
  }

  // Active Product
  const activeProduct = computed(() => products.value.filter((p) => p.isActive))

  // search state
  const lastQuery = ref('')
  const isSearching = ref(false)

  // GET all products
  async function fetchProducts() {
    loading.value = true
    error.value = null

    try {
      const res = await publicApi.get('/products')
      products.value = res.data.products.map(mapBackendProduct)
    } catch (err) {
      error.value = 'Failed to load products'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchProductsByCategory(slug: string) {
  const res = await publicApi.get(`/products/category/${slug}`)
  products.value = res.data.products.map(mapBackendProduct)
}
  // SEARCH products
  async function searchProducts(query: string) {
    isSearching.value = true
    lastQuery.value = query
    loading.value = true

    try {
      const res = await publicApi.get('/products/search/query', {
        params: { q: query },
      })
      products.value = res.data.products.map(mapBackendProduct)
    } finally {
      loading.value = false
    }
  }

  function clearSearch() {
    isSearching.value = false
    products.value = []
    lastQuery.value = ''
  }

  return {
    // Public
    fetchProducts,
    searchProducts,
    clearSearch,
    fetchProductsByCategory,

    // admin
    fetchAdminProducts,
    createProduct,
    updateProduct,
    deleteProduct,

    // share states
    products,
    loading,
    error,
    activeProduct,
    lastQuery,
    isSearching,
  }
})
