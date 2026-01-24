import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getUserProfile,
  updateUserProfile,
  uploadUserImage,
  getUserAddresses,
  updateUserAddress,
  createUserAddress
} from '@/services/user.service'

export const useUserProfileStore = defineStore('userProfile', () => {

  const loading = ref(false)
  const error = ref('')

  const user = ref({
    fullName: '',
    email: '',
    address: '',
    phone: '',
    country: { name: 'Cambodia', code: 'KH', flag: '🇰🇭' },
    userImage: null as string | null
  })

  const fetchProfile = async () => {
    loading.value = true
    try {
      const res = await getUserProfile()
      const data = res.data.user

      let addressString = ''
      if (data.addresses?.[0]) {
        const addr = data.addresses[0]
        addressString = `${addr.street}, ${addr.city}, ${addr.country}`
        if (addr.postalCode) addressString += `, ${addr.postalCode}`
      }

      user.value = {
        fullName: data.name,
        email: data.email,
        address: addressString,
        phone: data.phone || '',
        country: { name: 'Cambodia', code: 'KH', flag: '🇰🇭' },
        userImage: data.userImage
      }

    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to load profile'
    } finally {
      loading.value = false
    }
  }

  const saveProfile = async () => {
    loading.value = true
    try {
      await updateUserProfile({
        name: user.value.fullName,
        email: user.value.email,
        phone: user.value.phone
      })
    } finally {
      loading.value = false
    }
  }

  const uploadPhoto = async (file: File) => {
    const formData = new FormData()
    formData.append('userImage', file)

    const res = await uploadUserImage(formData)
    user.value.userImage = res.data.user.userImage
  }

  return {
    user,
    loading,
    error,
    fetchProfile,
    saveProfile,
    uploadPhoto
  }
})
