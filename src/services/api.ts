import axios from 'axios'

// Public API (NO auth)
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 300000,
})

// User API (WITH auth)
export const userApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 300000,
})

// Admin API (WITH auth)
export const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 300000,
})

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

// Response logging
;[publicApi, userApi, adminApi].forEach(api => {
  api.interceptors.response.use(
    res => res,
    err => {
      console.error('API Error:', err.response || err.message)
      return Promise.reject(err)
    }
  )
})
