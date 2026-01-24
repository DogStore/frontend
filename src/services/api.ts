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

// Inject token for user & admin
;[userApi, adminApi].forEach(api => {
  api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
})

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
    res => res,
    err => {
      console.error('API Error:', err.response || err.message)
      return Promise.reject(err)
    }
  )
})
