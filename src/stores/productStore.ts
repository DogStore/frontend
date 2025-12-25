import type { Product } from "@/types/product"
import axios from "axios"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

const API_BASE = 'https://backend-kanu.onrender.com/api'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all Products
  const fetchProduct = async () => {
    loading.value = true
    error.value = null
    try{
      const response = await axios.get(`${API_BASE}/admin/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      loading.value = false;
      products.value = response.data.products
    }catch(err: any){
      error.value = err.response?.data?.message || 'Fail to fetch the products'
      console.error('Fetch products error:', err)
    }
  }

  // Create Product
  const createProduct = async (productData: any) => {
    const response  = await axios.post(`${API_BASE}/admin/products`, productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    products.value.push(response.data.product)
    return response.data.product
  }

  // Update Product
  const updateProduct = async (id: string, productData: any) => {
    const response = await axios.put(`${API_BASE}/admin/products/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    const index = products.value.findIndex(p => p._id === id)
    if(index !== -1){
      products.value[index] = response.data.product
    }
    return response.data.product
  }

  // delete Product
  const deleteProduct = async (id: string) => {
    await axios.delete(`${API_BASE}/admin/products/${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    products.value = products.value.filter(p => p._id !== id)
  }

  // Active Product
  const activeProduct = computed(() => {
    products.value.filter(p => p.isActive)
  })


  return{
    products,
    loading,
    error,

    activeProduct,

    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct

  }

})
