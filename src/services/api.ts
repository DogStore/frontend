// src/services/api.ts

import axios from 'axios'

// Public API (no auth)
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 300000,
})

// Admin API (with auth)
export const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 300000,
})

// Add request interceptor to adminApi to inject token
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Optional: response interceptor for both
;[publicApi, adminApi].forEach((api) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error.response || error.message)
      return Promise.reject(error)
    },
  )
})
