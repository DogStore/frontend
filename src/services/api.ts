import axios from 'axios'

const baseConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 300000,
}


// Public API (no auth) — guest
export const publicApi = axios.create(baseConfig)

// Admin API (with auth) — dashboard
export const adminApi = axios.create(baseConfig)

// User API (with auth) — wishlist, cart, orders
export const userApi = axios.create(baseConfig)

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

// Add request interceptor to userApi to inject token
userApi.interceptors.request.use(
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
