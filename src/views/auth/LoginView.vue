<!-- src/views/auth/LoginView.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form @submit.prevent="handleLogin" class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <div v-if="error" class="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
        {{ error }}
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Email</label>
        <input
          v-model="email"
          type="email"
          class="w-full px-3 py-2 border rounded"
          required
          @input="clearError"
        />
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 mb-2">Password</label>
        <input
          v-model="password"
          type="password"
          class="w-full px-3 py-2 border rounded"
          required
          @input="clearError"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700"
        :disabled="loading"
      >
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

// ✅ Use Pinia store
const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

// const api_base = "http://localhost:3000"
const api_base = "https://backend-kanu.onrender.com"

const clearError = () => {
  error.value = ''
}

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // ✅ Call real backend
    const response = await axios.post( `${api_base}/api/auth/login`, {
      email: email.value.trim(),
      password: password.value
    })

    const { token, _id, name, email: userEmail, role } = response.data

    // ✅ Save to Pinia (and localStorage)
    userStore.setAuth({ token, _id, name, email: userEmail, role })

    if(userStore.role == 'admin'){
      router.push('./admin/dashboard')
    }else{
      router.push('/')
    }

  } catch (err: any) {
    console.error('Login error:', err)
    if (err.response?.status === 401) {
      error.value = 'Invalid email or password'
    } else {
      error.value = 'Something went wrong. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>
