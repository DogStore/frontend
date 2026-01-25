import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getUserProfile,
  updateUserProfile,
  uploadUserImage
} from '@/services/user.service'
import { useUserStore } from '@/stores/userStore'
const countries = [
  { name: 'Cambodia', code: 'KH', flag: '🇰🇭' },
  { name: 'France', code: 'FR', flag: '🇫🇷' },
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'Vietnam', code: 'VN', flag: '🇻🇳' }
]

export const useUserProfileStore = defineStore('userProfile', () => {

  const loading = ref(false)
  const error = ref('')
  const userStore = useUserStore()
  const user = ref({
    fullName: '',
    email: '',
    address: '',
    phone: '',
    country: { name: 'Cambodia', code: 'KH', flag: '🇰🇭' },
    userImage: null as string | null
  })
  const pendingImage = ref<File | null>(null)

  const setPendingImage = (file: File) => {
    pendingImage.value = file
  }

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

      const backendCountry = data.addresses?.[0]?.country || 'Cambodia'

      const matchedCountry =
        countries.find(c => c.name === backendCountry) ||
        { name: backendCountry, code: '', flag: '' }

      user.value = {
        fullName: data.name,
        email: data.email,
        address: addressString,
        phone: data.phone || '',
        country: matchedCountry,
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
      let imageUrl = null

      if (pendingImage.value) {
        imageUrl = await uploadPhoto(pendingImage.value)
      }

      const res = await updateUserProfile(user.value)
      const updatedUser = res.data.user

      userStore.updateUser({
        name: updatedUser.name,
        email: updatedUser.email,
        profilePicture: imageUrl || updatedUser.userImage
      })

      if (imageUrl) {
        user.value.userImage = imageUrl
      }

      pendingImage.value = null
    } finally {
      loading.value = false
    }
  }

  const uploadPhoto = async (file: File) => {
    const formData = new FormData()
    formData.append('userImage', file)

    const res = await uploadUserImage(formData)

    const newImage =
      res.data?.userImage ||
      res.data?.profilePicture ||
      res.data?.image ||
      res.data?.url

    if (newImage) {
      user.value.userImage = newImage
      userStore.updateProfilePicture(newImage)
    }

    return newImage
  }


  return {
    user,
    loading,
    error,
    pendingImage,
    setPendingImage,
    fetchProfile,
    saveProfile,
    uploadPhoto
  }
})
