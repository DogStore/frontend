<script lang="ts">
import { ref } from 'vue'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import { onMounted, computed } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

// Define Country interface
interface Country {
  name: string
  code: string
  flag: string
}

export default {
  name: 'TestUser',

  components: {
    VueTelInput
  },

  setup() {

    const userStore = useUserStore()
    const API_BASE = 'https://backend-kanu.onrender.com/api'

    // Loading Errors State
    const loading = ref(false)
    const error = ref('')

    // File upload state
    const selectedFile = ref<File | null>(null)
    const previewImage = ref<string | null>(null)

    // Edit Section State Handlers
    const editMode = ref(false)  // Start in view mode
    const originalUser = ref<unknown>(null)  // Backup for cancel

    // Phone number validation
    const phoneValid = ref(true)
    const phoneError = ref('')

    // New toggle function
    const startEdit = () => {
      editMode.value = true
      originalUser.value = { ...user.value }
    }

    // File select handler
   const onFileSelected = async (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files?.[0]) {
      const file = input.files[0]

      // Client-side validation
      if (file.size > 2 * 1024 * 1024) {
        error.value = 'Image too large (max 2MB)'
        return
      }
      if (!file.type.startsWith('image/')) {
        error.value = 'Please upload an image file'
        return
      }

      // Show local preview immediately
      selectedFile.value = file
      previewImage.value = URL.createObjectURL(file)

      // Auto-upload to backend (no need to wait for SAVE)
      await uploadPhotoImmediately(file)
    }
  }

  const uploadPhotoImmediately = async (file: File) => {
    if (!userStore.token) {
      error.value = 'Please log in first'
      return
    }

    const formData = new FormData()
    formData.append('userImage', file)  // Must match backend field name

    try {
      const response = await axios.put(`${API_BASE}/users/profile/image`, formData, {
        headers: {
          Authorization: `Bearer ${userStore.token}`
          // No manual Content-Type
        }
      })

      // Update local userImage with new backend URL
      if (response.data.user?.userImage) {
        user.value.userImage = response.data.user.userImage
        previewImage.value = null  // No need for local preview anymore
        alert('Photo updated successfully!')
      }

    } catch (err: any) {
      console.error('Photo upload error:', err)
      error.value = err.response?.data?.message || 'Failed to upload photo'
      // Revert preview on failure
      previewImage.value = null
      selectedFile.value = null
    }
  }

    // Helper function for address fetching
    const parseAddressString = (addressStr: string) => {
      if (!addressStr.trim()) {
      return {
        title: 'Home',
        street: '',
        city: '',
        country: user.value.country.name || 'Cambodia',
        postalCode: ''
      }
    }

    // Split by comma and clean up
    const parts = addressStr.split(',').map(part => part.trim()).filter(p => p)

    // Default values
    let street = ''
    let city = ''
    let country = user.value.country.name || 'Cambodia'
    let postalCode = ''

    // Parse based on your exact format: "123 Street, Phnom Penh, Cambodia, 12345"
    if (parts.length >= 4) {
      // Format: street, city, country, postalCode
      street = parts[0] || ''  // "123 Street"
      city = parts[1] || ''    // "Phnom Penh"
      country = parts[2] || 'Cambodia' // "Cambodia"
      postalCode = parts[3] || '' // "12345"
    } else if (parts.length === 3) {
      // Format: street, city, country (no postal code)
      street = parts[0] || ''
      city = parts[1] || ''
      country = parts[2] || 'Cambodia'
    } else if (parts.length === 2) {
      // Format: street, city
      street = parts[0] || ''
      city = parts[1] || ''
      // Country from dropdown
      country = user.value.country.name || 'Cambodia'
    } else if (parts.length === 1) {
      // Just street
      street = parts[0] || ''
      // City and country from dropdown/previous
      city = ''
      country = user.value.country.name || 'Cambodia'
    }

    return {
      title: 'Home',
      street,
      city,
      country,
      postalCode
    }
  }

    // Fetch profile on load
    onMounted(async () => {
      if (!userStore.token) {
        // If no token, redirect to login (optional)
        // router.push('/login')  // Import useRouter if needed
        error.value = 'Please log in first'
        return
      }

      loading.value = true
      error.value = ''

      try {
        const response = await axios.get(`${API_BASE}/users/profile`, {
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        })

        const data = response.data.user

        // Format address from backend object to string for display
        let addressString = ''
        if (data.addresses?.[0]) {
          const addr = data.addresses[0]
          addressString = `${addr.street}, ${addr.city}, ${addr.country}`
          if (addr.postalCode) {
            addressString += `, ${addr.postalCode}`
          }
        }

        // Handle phone - check if it's a string or object
        let phoneString = ''
        if (typeof data.phone === 'string') {
          phoneString = data.phone
        } else if (data.Phone?.number) {
          phoneString = `+${data.Phone.countryCode || ''}${data.Phone.number}`.trim()
        }

        const addressCountryName = data.addresses?.[0]?.country || 'Cambodia'

        const selectedCountry = countries.find(c =>
          c.name.toLowerCase() === addressCountryName.toLowerCase()
        ) || defaultCountry

        user.value = {
          fullName: data.name || '',
          email: data.email || '',
          address: addressString,
          phone: phoneString || '',
          country: selectedCountry,
          userImage: data.userImage
        }

        // In onMounted, after fetch:
        originalUser.value = { ...user.value }
        editMode.value = false  // View mode by default

      } catch (err: any) {

        console.error('Fetch profile error:', err)
        error.value = err.response?.data?.message || 'Failed to load profile'

      } finally {

        loading.value = false

      }

    })


    // Default country
    const defaultCountry: Country = { name: 'Cambodia', code: 'KH', flag: '🇰🇭' }
    const countries: Country[] = [
      { name: 'Cambodia', code: 'KH', flag: '🇰🇭' },
      { name: 'France', code: 'FR', flag: '🇫🇷' },
      { name: 'United States', code: 'US', flag: '🇺🇸' },
      { name: 'Vietnam', code: 'VN', flag: '🇻🇳' }
      // Add more countries here later
    ]

    const user = ref({
      fullName: '',
      email: '',
      address: '',
      phone: '',
      country: defaultCountry,
      userImage: null as string | null
    })

    // Function to get the first letter of the user's name if no image
    const getUserInitial = computed(() => {
      const name = user.value?.fullName || 'User';
      return name.charAt(0).toUpperCase();
    });

    // Phone input handler
   const phoneDetails = ref({
      countryCode: '',
      number: '',
      full: ''
    })

    const onPhoneInput = (phoneObject: unknown, countryObject: unknown) => {
      if (phoneObject?.number?.international) {
        phoneDetails.value.full = phoneObject.number.international
        phoneDetails.value.countryCode = countryObject?.dialCode || ''
        phoneDetails.value.number = phoneObject.number.national || ''

        user.value.phone = phoneDetails.value.full
        validatePhone()
      }
    }

    // Validate phone number
    const validatePhone = () => {

      const phone = user.value.phone?.trim() || ''

      if (!phone.trim()) {
        phoneValid.value = true // empty is allowed (optional field)
        phoneError.value = ''
        return true
      }

      // Parse with possible country code from phoneDetails or fallback
      const countryCode = phoneDetails.value.countryCode || 'KH' // default to Cambodia
      const parsed = parsePhoneNumberFromString(phone, countryCode as any)

      if (parsed && parsed.isValid()) {
        phoneValid.value = true
        phoneError.value = ''
        return true
      } else {
        phoneValid.value = false
        if (parsed && parsed.isPossible()) {
          phoneError.value = 'Phone number looks incomplete (too short)'
        } else {
          phoneError.value = 'Invalid phone number format for this country'
        }
        return false
      }
    }

    // Helper to convert country code to flag (if you want to auto-sync)
    const getFlagEmoji = (input: string): string => {
      if (input.length === 2) {
        return input
          .toUpperCase()
          .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)))
      }

      const name = input.toLowerCase()
      if (name.includes('cambodia')) return '🇰🇭'
      if (name.includes('france')) return '🇫🇷'
      if (name.includes('united states') || name.includes('usa')) return '🇺🇸'
      if (name.includes('vietnam')) return '🇻🇳'

      return '🌍'
    }

    // Save profile function
    const saveProfile = async () => {
    // Reset error
    error.value = ''

    // Validation (keep your existing validation)
    if (!user.value.fullName.trim()) {
      error.value = 'Full Name is required'
      return
    }

    if (!user.value.email.trim()) {
      error.value = 'Email is required'
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.value.email)) {
      error.value = 'Invalid email format'
      return
    }

    if (!user.value.address.trim()) {
      error.value = 'Address is required'
      return
    }

    if (!validatePhone()) {
      error.value = phoneError.value || 'Invalid phone number'
      return // Stop save
    }

    if (!userStore.token) {
      error.value = 'Please log in first'
      return
    }

    loading.value = true

    try {
      // Parse address
      const addr = parseAddressString(user.value.address)

      // Use the selected country from dropdown
      addr.country = user.value.country.name

      // --- STEP 1: Save BASIC PROFILE (name, email, phone) ---
      const profilePayload = {
        name: user.value.fullName,
        email: user.value.email,
        phone: user.value.phone
      }

      console.log('Saving profile:', profilePayload)

      const profileResponse = await axios.put(`${API_BASE}/users/profile`, profilePayload, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
          'Content-Type': 'application/json'
        }
      })

      console.log('Profile saved:', profileResponse.data)

      // --- STEP 2: Save ADDRESS separately ---
      const addressPayload = {
        title: addr.title,
        street: addr.street,
        city: addr.city,
        country: addr.country,
        postalCode: addr.postalCode
      }

      console.log('Saving address:', addressPayload)

      // Try to update existing address first, or create new
      try {
        // Check if user has existing addresses
        const addressesResponse = await axios.get(`${API_BASE}/users/addresses`, {
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        })

        const existingAddresses = addressesResponse.data.addresses || []

        if (existingAddresses.length > 0) {
          // Update first address
          const firstAddressId = existingAddresses[0]._id
          await axios.put(
            `${API_BASE}/users/addresses/${firstAddressId}`,
            addressPayload,
            {
              headers: {
                Authorization: `Bearer ${userStore.token}`,
                'Content-Type': 'application/json'
              }
            }
          )
          console.log('Updated existing address')
        } else {
          // Create new address
          await axios.post(
            `${API_BASE}/users/addresses`,
            addressPayload,
            {
              headers: {
                Authorization: `Bearer ${userStore.token}`,
                'Content-Type': 'application/json'
              }
            }
          )
          console.log('Created new address')
        }
      } catch (addrErr: any) {
        console.warn('Address save issue (but profile saved):', addrErr.message)
        // Continue - at least profile was saved
      }

      // --- STEP 3: Update local state ---
      // Format the address string for display
      const newAddress = `${addr.street}, ${addr.city}, ${addr.country}` +
        (addr.postalCode ? `, ${addr.postalCode}` : '')

      // Update user object
      user.value = {
        ...user.value, // Keep existing fields
        fullName: user.value.fullName,
        email: user.value.email,
        address: newAddress,
        phone: user.value.phone,
        country: user.value.country // Already has the selected country
      }

      // Update backup and switch to view mode
      originalUser.value = { ...user.value }
      editMode.value = false

      alert('Profile updated successfully!')

    } catch (err: any) {
      console.error('Save error:', err.response?.data || err)
      error.value = err.response?.data?.message || 'Failed to update profile'
      // Stay in edit mode on error
      editMode.value = true
    } finally {
      loading.value = false
    }
  }

    const cancelChanges = () => {
     if (originalUser.value) {
        user.value = { ...originalUser.value }
      }
      previewImage.value = null
      editMode.value = false
      alert('Changes cancelled')
    }


    return {
      user,
      countries,
      onPhoneInput,
      saveProfile,
      cancelChanges,
      getFlagEmoji,
      selectedFile,
      previewImage,
      onFileSelected,
      getUserInitial,
      startEdit,
      editMode,
      loading,
      error,
      phoneValid,
      validatePhone
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-orange-25 rounded-lg border border-orange-200 overflow-hidden">
        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12">
          <!-- Left Column - Profile Picture Area -->
          <div class="lg:col-span-3 bg-[#FFF8F0] p-6 flex flex-col items-center justify-center border-4 border-[#FFAA0C] rounded-tl-lg rounded-bl-lg relative group" style="border-width: 0.7px;">
            <!-- Profile Picture -->
            <div class="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
              <!-- Show uploaded/preview image if exists -->
              <img
                v-if="previewImage || user.userImage"
                :src="previewImage || user.userImage"
                alt="Profile picture"
                class="w-full h-full object-cover"
              />

              <!-- Beautiful Initial Letter when no image -->
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                <span class="text-white font-bold text-5xl md:text-6xl">
                  {{ getUserInitial }}
                </span>
              </div>

              <!-- Hover overlay for realism -->
              <div v-if="user.userImage === null" class="absolute inset-0 bg-gray-100 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="text-gray-700 text-sm font-medium">
                  {{ previewImage || user.userImage ? 'Change Photo' : 'Upload Photo' }}
                </span>
              </div>
            </div>

            <!-- Upload Button -->
            <label for="file-upload" class="px-4 py-2 bg-white border border-blue-300 text-blue-600 rounded-md text-sm hover:bg-blue-50 transition cursor-pointer">
              {{ previewImage || user.userImage ? 'Change Photo' : 'Upload Photo' }}
            </label>
            <input id="file-upload" type="file" accept="image/*" class="hidden" @change="onFileSelected" />

            <!-- Additional Info -->
            <div class="mt-8 text-center text-gray-500 text-sm">
              <p>Profile Picture</p>
              <p class="text-xs mt-1">Recommended: 400x400px</p>
            </div>
          </div>

          <!-- Right Column -->
          <div class="lg:col-span-9 p-6 md:p-8">
            <!-- Profile Information Section -->
            <div class="mb-10">

              <div class="flex items-center gap-4 mb-6">
                <img src="@/assets/ProfileImages/Security.png" alt="Security" class="w-20 h-15">
                <div>
                  <h2 class="text-2xl font-bold text-gray-800">Profile Information</h2>
                  <p class="text-gray-500 text-sm mt-1">Your profile, your identity</p>
                </div>
              </div>

              <!-- Form Fields -->
              <div class="space-y-6">
                <!-- Full Name and Email in one row -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Full Name -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span class="text-red-500">*</span>
                    </label>

                    <!-- Error alert above field -->
                    <div v-if="error && error.includes('Full Name')"
                        class="mb-2 p-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                      </svg>
                      {{ error }}
                    </div>

                    <div v-if="editMode">
                      <input
                        type="text"
                        v-model="user.fullName"
                        placeholder="Sima Yi"
                        class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                    <div v-else class="px-4 py-3 bg-gray-100 rounded-md border border-gray-200 text-gray-800">
                      {{ user.fullName || 'Not set' }}
                    </div>
                  </div>

                  <!-- Email -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Email address <span class="text-red-500">*</span>
                    </label>

                    <!-- Error alert above field -->
                    <div v-if="error && (error.includes('Email') || error.includes('email'))"
                        class="mb-2 p-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                      </svg>
                      {{ error }}
                    </div>

                    <div v-if="editMode ">
                      <input
                        type="email"
                        v-model="user.email"
                        placeholder="Simayi001@gmail.com"
                        class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                    <div v-else class="px-4 py-3 bg-gray-100 rounded-md border border-gray-200 text-gray-800">
                      {{ user.email || 'Not set' }}
                    </div>
                  </div>

                  <!-- Address -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Address <span class="text-red-500">*</span>
                    </label>

                    <!-- Error alert above field -->
                    <div v-if="error && error.includes('Address')"
                        class="mb-2 p-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                      </svg>
                      {{ error }}
                    </div>

                    <div v-if="editMode">
                      <textarea
                        type="text"
                        v-model="user.address"
                        placeholder="123 Main St, Phnom Penh, Cambodia, PostalCode"
                        class="w-90 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      ></textarea>
                      <div class="mt-1 w-100 text-xs text-gray-500">
                        Format: Street, City, Country, PostalCode (if no fill Nothing)
                      </div>
                    </div>
                    <div v-else class="w-152 px-4 py-3 bg-gray-100 rounded-md border border-gray-200 text-gray-800">
                      {{ user.address || 'Not set' }}
                    </div>
                  </div>
                </div>
                <!-- Phone Number with Country Code and Country Selection -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Phone Number with vue-tel-input -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <!-- Validation error message -->
                    <div v-if="editMode && !phoneValid && user.phone.trim()" class="mt-1 text-sm text-red-600">
                      {{ phoneError || 'Please enter a valid phone number' }}
                    </div>
                    <div v-if="editMode">
                      <vue-tel-input
                        v-model="user.phone"
                        default-country="kh"
                        mode="international"
                        @on-input="onPhoneInput"
                        :dropdownOptions="{
                          showFlags: true,
                          showDialCodeInList: true,
                          showDialCodeInSelection: true,
                          showSearchBox: true
                        }"
                        :inputOptions="{
                          placeholder: 'Enter phone number',
                          styleClasses: 'w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                        }"
                      ></vue-tel-input>
                    </div>

                    <div v-else class="px-4 py-3 bg-gray-100 rounded-md border border-gray-200 text-gray-800">
                        {{ user.phone || 'Not set' }}
                    </div>

                  </div>

                  <!-- Country Selection -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Choose your country</label>
                    <div v-if="editMode">
                      <select
                        v-model="user.country"
                        class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none bg-no-repeat bg-right"
                        style="background-position: right 0.75rem center; background-size: 1.25em 1.25em;"
                      >
                        <option :value="null" disabled>Select country</option>
                        <option v-for="c in countries" :key="c.code" :value="c">
                          {{ getFlagEmoji(c.code) }} {{ c.name }}
                        </option>
                      </select>
                    </div>

                    <div v-else class="px-4 py-3 bg-gray-100 rounded-md border border-gray-200 text-gray-800 flex items-center">
                      <span class="mr-2">{{ getFlagEmoji(user.country.code) }}</span>
                      {{ user.country.name || 'Not set' }}
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <!-- Divider -->
            <hr class="my-8 border-gray-200">

            <div>
              <!-- Action Buttons -->
              <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <div v-if="editMode" class="flex space-x-4">
                  <button @click="cancelChanges" class="px-6 py-3 border border-orange-300 text-gray-700 font-medium rounded-md hover:bg-red-50 transition">
                    CANCEL
                  </button>
                  <button @click="saveProfile" :disabled="loading" class="px-6 py-3 bg-[#FFAA0C] text-white font-medium rounded-md hover:bg-orange-400 disabled:opacity-50 transition">
                    {{ loading ? 'SAVING...' : 'SAVE' }}
                  </button>
                </div>
                <button v-else @click="startEdit" class="px-6 py-3 bg-[#FFAA0C] text-white font-medium rounded-md hover:bg-orange-400 transition">
                  EDIT PROFILE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom select dropdown arrow */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.25em 1.25em;
  padding-right: 2.5rem;

  /* Remove default browser arrow */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

/* Custom radio button styling */
input[type="radio"]:checked {
  background-color: #2563eb;
}
</style>
