import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const token = ref<string | null>(null)
  const role = ref<string | null>(null)
  const name = ref<string | null>(null)
  const email = ref<string | null>(null)
  const _id = ref<string | null>(null)
  const profilePicture = ref<string | null>(null)

  // Actions
  const setAuth = (userData: { token: string; role: string; name: string; email: string; _id: string ; profilePicture: string}) => {
    token.value = userData.token
    role.value = userData.role
    name.value = userData.name
    email.value = userData.email
    _id.value = userData._id
    profilePicture.value = userData.profilePicture

    // Persist to localStorage
    localStorage.setItem('authToken', userData.token)
    localStorage.setItem('userRole', userData.role)
    localStorage.setItem('user', JSON.stringify({ _id: userData._id, name: userData.name, email: userData.email, role: userData.role, profilePicture: userData.profilePicture }))
  }

  const logout = () => {
    token.value = null
    role.value = null
    name.value = null
    email.value = null
    _id.value = null
    profilePicture.value = null

    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('user')
  }

  const updateProfilePicture = (newPictureUrl: string) => {
    profilePicture.value = newPictureUrl

    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      user.profilePicture = newPictureUrl
      localStorage.setItem('user', JSON.stringify(user))
    }
  }

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
        profilePicture.value = user.profilePicture || null
      }
    }
  }

  const updateUser = (data: {
    name?: string
    email?: string
    profilePicture?: string
  }) => {
    if (data.name !== undefined) name.value = data.name
    if (data.email !== undefined) email.value = data.email
    if (data.profilePicture !== undefined) profilePicture.value = data.profilePicture

    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      Object.assign(user, data)
      localStorage.setItem('user', JSON.stringify(user))
    }
  }

  return {
    token,
    role,
    name,
    email,
    _id,
    profilePicture,
    setAuth,
    logout,
    updateProfilePicture,
    initializeFromStorage,
    updateUser
  }
})
