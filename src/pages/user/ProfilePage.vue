<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { useUserProfileStore } from '@/stores/userProfileStore'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'

interface Country {
  name: string
  code: string
  flag: string
}

/* ---------------- Store ---------------- */
const profileStore = useUserProfileStore()
const { user, loading, error } = storeToRefs(profileStore)
const userStore = useUserStore()

/* ---------------- State ---------------- */
const editMode = ref(false)
const previewImage = ref<string | null>(null)
const phoneValid = ref(true)
const phoneError = ref('')

/* ---------------- Country ---------------- */
const countries: Country[] = [
  { name: 'Cambodia', code: 'KH', flag: '🇰🇭' },
  { name: 'France', code: 'FR', flag: '🇫🇷' },
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'Vietnam', code: 'VN', flag: '🇻🇳' }
]

/* ---------------- Computed ---------------- */
const getUserInitial = computed(() => {
  return user.value.fullName?.charAt(0).toUpperCase() || 'U'
})

const hasImage = computed(() => !!previewImage.value || !!user.value.userImage)


/* ---------------- Methods ---------------- */
const startEdit = () => {
  editMode.value = true
}

const onFileSelected = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.[0]) return

  const file = input.files[0]

  previewImage.value = URL.createObjectURL(file)

  profileStore.setPendingImage(file)
}


const validatePhone = () => {
  if (!user.value.phone) return true

  const parsed = parsePhoneNumberFromString(user.value.phone)
  return !!parsed?.isValid()
}

const saveProfile = async () => {
  error.value = ''
  if (!validatePhone()) return

  try {
    if (profileStore.pendingImage) {
      await profileStore.uploadPhoto(profileStore.pendingImage)
    }

    await profileStore.saveProfile()
    await profileStore.fetchProfile()

    editMode.value = false
    alert('Profile updated successfully!')
  } catch {}
}


const cancelChanges = () => {
  editMode.value = false
  profileStore.fetchProfile()
}

const getFlagEmoji = (code: string) =>
  code.toUpperCase().replace(/./g, char =>
    String.fromCodePoint(127397 + char.charCodeAt(0))
  )

/* ---------------- Lifecycle ---------------- */
onMounted(() => profileStore.fetchProfile())
</script>

<template>
  <div class="bg-gray-50 p-4 md:p-8 my-10">
    <div class="max-w-4xl mx-auto">
      <div class="bg-orange-25 rounded-lg border border-orange-200 overflow-hidden">
        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12">
          <!-- Left Column - Profile Picture Area -->
          <div class="lg:col-span-3 bg-[#FFF8F0] p-6 flex flex-col items-center justify-center border-4 border-[#FFAA0C] rounded-tl-lg rounded-bl-lg relative group" style="border-width: 0.7px;">
            <!-- Profile Picture -->
            <div class="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
              <img
                v-if="hasImage"
                :src="previewImage ?? user.userImage ?? undefined"
                alt="Profile picture"
                class="w-full h-full object-cover"
              />

              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500 to-purple-600"
              >
                <span class="text-white font-bold text-5xl md:text-6xl">
                  {{ getUserInitial }}
                </span>
              </div>

              <div v-if="user.userImage === null" class="absolute inset-0 bg-gray-100 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="text-gray-700 text-sm font-medium">
                  {{ previewImage || user.userImage ? 'Change Photo' : 'Upload Photo' }}
                </span>
              </div>
            </div>

            <!-- Upload Button -->
            <label
              v-if="editMode"
              for="file-upload"
              class="px-4 py-2 bg-white border border-blue-300 text-blue-600 rounded-md text-sm hover:bg-blue-50 transition cursor-pointer"
            >
              Change Photo
            </label>

            <input
              v-if="editMode"
              id="file-upload"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onFileSelected"
            />

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
                      />
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
