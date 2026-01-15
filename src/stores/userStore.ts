// src/stores/userStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const token = ref<string | null>(null)
  const role = ref<string | null>(null)
  const name = ref<string | null>(null)
  const email = ref<string | null>(null)
  const _id = ref<string | null>(null)

  // Actions
  const setAuth = (userData: { token: string; role: string; name: string; email: string; _id: string }) => {
    token.value = userData.token
    role.value = userData.role
    name.value = userData.name
    email.value = userData.email
    _id.value = userData._id

    // Persist to localStorage
    localStorage.setItem('authToken', userData.token)
    localStorage.setItem('userRole', userData.role)
    localStorage.setItem('user', JSON.stringify({ _id: userData._id, name: userData.name, email: userData.email, role: userData.role }))
  }

  const logout = () => {
    token.value = null
    role.value = null
    name.value = null
    email.value = null
    _id.value = null

    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('user')
  }

  // ✅ Initialize from localStorage on app start
  const initializeFromStorage = () => {
    const storedToken = localStorage.getItem('authToken')
    const storedRole = localStorage.getItem('userRole')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedRole) {
      token.value = storedToken
      role.value = storedRole

      if (storedUser) {
        const user = JSON.parse(storedUser)
        name.value = user.name
        email.value = user.email
        _id.value = user._id
      }
    }
  }

  return {
    token,
    role,
    name,
    email,
    _id,
    setAuth,
    logout,
    initializeFromStorage
  }
})
