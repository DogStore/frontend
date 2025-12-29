<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { EyeIcon, EyeSlashIcon, CalendarIcon } from '@heroicons/vue/24/outline'
import WhiteDog from '../../assets/WhiteDog.png'
import DogLogo from '../../assets/DogLogo.png'

// UI State
const isLogin = ref(true)
const showPassword = ref(false)

// Form Data
const email = ref('')
const password = ref('')
const name = ref('')
const loading = ref(false)
const error = ref('')

// Constants
const API_BASE = 'https://backend-kanu.onrender.com/api'

// Pinia + Router
const userStore = useUserStore()
const router = useRouter()

// Toggle forms
const switchToSignup = () => {
  isLogin.value = false
  clearError()
}
const switchToLogin = () => {
  isLogin.value = true
  clearError()
}

const clearError = () => {
  error.value = ''
}

// Handle login
const handleLogin = async () => {
  if (!email.value.trim() || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await axios.post(`${API_BASE}/auth/login`, {
      email: email.value.trim(),
      password: password.value,
    })

    const { token, _id, name: userName, email: userEmail, role } = response.data
    userStore.setAuth({ token, _id, name: userName, email: userEmail, role })

    if (role === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/')
    }
  } catch (err: any) {
    console.error('Login error:', err)
    error.value = err.response?.data?.message || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}

// Handle signup
const handleSignup = async () => {
  if (!name.value.trim() || !email.value.trim() || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await axios.post(`${API_BASE}/auth/register`, {
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value,
    })

    const { token, _id, name: userName, email: userEmail, role } = response.data
    userStore.setAuth({ token, _id, name: userName, email: userEmail, role })

    router.push('/')
  } catch (err: any) {
    console.error('Signup error:', err)
    error.value = err.response?.data?.message || 'Failed to create account'
  } finally {
    loading.value = false
  }
}

// Form submit handler
const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (isLogin.value) {
    handleLogin()
  } else {
    handleSignup()
  }
}
</script>

<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
    <!-- Decorative orange circles -->
    <div class="absolute -top-30 -left-35 w-90 h-90 bg-amber-500 rounded-full opacity-100"></div>
    <div class="absolute -top-40 -left-45 w-85 h-85 bg-amber-400 rounded-full opacity-100"></div>

    <!-- Bottom-left two orange rectangles -->
    <div
      class="absolute bottom-50 -right-1/8 w-56 h-20 bg-amber-500 rotate-120 origin-bottom-left opacity-100"
    ></div>
    <div
      class="absolute bottom-40 -right-1/9 w-48 h-15 bg-amber-400 rotate-130 origin-bottom-left opacity-100"
    ></div>

    <!-- Main Card -->
    <div
      class="relative z-10 max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2"
    >
      <!-- Left: Form -->
      <div class="p-10 lg:p-14 flex flex-col justify-center">
        <!-- Error Message -->
        <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded text-center text-sm">
          {{ error }}
        </div>

        <!-- Logo + Title -->
        <div class="text-center mb-8">
          <div class="flex justify-center items-center gap-3 mb-1">
            <div class="w-10 h-10 rounded-full flex items-center justify-center">
              <img :src="DogLogo" alt="Dog Logo" class="w-8 h-8" />
            </div>
          </div>
          <h1
            style="font-family: 'Lemon', cursive; font-weight: 900"
            class="text-2xl font-bold text-orange-600"
          >
            DOG HUB
          </h1>
          <p style="font-family: 'Nunito', cursive" class="text-2xl mt-2 text-gray-700">
            {{ isLogin ? 'Log In' : 'Sign Up' }}
          </p>
        </div>

        <!-- Form -->
        <form
          style="font-family: 'Nunito', cursive"
          class="space-y-6"
          @submit.prevent="handleSubmit"
        >
          <!-- Name (Sign Up only) -->
          <div v-if="!isLogin">
            <label class="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              v-model="name"
              type="text"
              class="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="Your Name"
              @input="clearError"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              v-model="email"
              type="email"
              class="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="you@example.com"
              @input="clearError"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1 relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="block w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="••••••••"
                @input="clearError"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <EyeSlashIcon v-if="!showPassword" class="h-5 w-5 text-gray-500" />
                <EyeIcon v-else class="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition transform hover:scale-105 duration-200"
          >
            {{ loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up' }}
          </button>
        </form>

        <!-- Switch Link -->
        <p style="font-family: 'Nunito', cursive" class="mt-6 text-center text-gray-600">
          <template v-if="isLogin">
            Don't have an account?
            <button
              @click="switchToSignup"
              class="text-orange-600 font-semibold hover:underline cursor-pointer"
            >
              Sign up
            </button>
          </template>
          <template v-else>
            Already have an account?
            <button
              @click="switchToLogin"
              class="text-orange-600 font-semibold hover:underline cursor-pointer"
            >
              Log in
            </button>
          </template>
        </p>
      </div>

      <!-- Right: Happy Dog Image -->
      <div class="hidden md:block relative bg-amber-500">
        <img
          :src="WhiteDog"
          alt="Happy white dog"
          class="object-cover"
          :style="`width: 70%; height: auto; display: flex; justify-content: center; align-items: center; padding-top: ${isLogin ? '80px' : '155px'}; margin-left: 50px`"
        />
      </div>
    </div>
  </div>
</template>
