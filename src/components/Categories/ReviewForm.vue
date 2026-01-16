<template>
  <div class="bg-white rounded-xl border p-6 shadow-sm">
    <h3 class="text-xl font-bold mb-4">Write a Review</h3>

    <!-- Login Required Message -->
    <div
      v-if="!isUserLoggedIn"
      class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700"
    >
      <span class="font-semibold">Login Required:</span> You must be logged in to submit a review.
      <router-link to="/auth" class="font-semibold underline hover:text-blue-900">
        Click here to login
      </router-link>
    </div>

    <!-- Success Message -->
    <div
      v-if="successMessage"
      class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
    >
      {{ successMessage }}
    </div>

    <!-- Error Message -->
    <div
      v-if="errorMessage"
      class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
    >
      {{ errorMessage }}
    </div>

    <form @submit.prevent="submitReview" class="space-y-4" v-if="isUserLoggedIn">
      <!-- Name Input (Auto-filled) -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
        <input
          v-model="formData.name"
          type="text"
          required
          placeholder="Your name"
          :readonly="isUserLoggedIn"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          :class="{ 'bg-gray-100': isUserLoggedIn }"
        />
      </div>

      <!-- Email Input (Auto-filled) -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Email (Auto-filled)</label>
        <input
          v-model="formData.email"
          type="email"
          :readonly="isUserLoggedIn"
          placeholder="your.email@example.com"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          :class="{ 'bg-gray-100': isUserLoggedIn }"
        />
      </div>

      <!-- Rating Stars -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
        <div class="flex gap-2">
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            @click="formData.rating = star"
            class="text-3xl transition-colors focus:outline-none"
            :class="
              star <= formData.rating ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'
            "
          >
            ★
          </button>
          <span class="ml-2 text-gray-600 self-center">{{ formData.rating }} / 5</span>
        </div>
      </div>

      <!-- Review Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Review Title *</label>
        <input
          v-model="formData.title"
          type="text"
          required
          placeholder="Sum up your experience in one line"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <!-- Review Comment -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Your Review *</label>
        <textarea
          v-model="formData.comment"
          required
          rows="5"
          placeholder="Tell us about your experience with this product..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
        ></textarea>
        <p class="text-sm text-gray-500 mt-1">{{ formData.comment.length }} / 500 characters</p>
      </div>

      <!-- Submit Button -->
      <div class="flex gap-3">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit Review' }}
        </button>
        <button
          type="button"
          @click="resetForm"
          class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { publicApi } from '@/services/api'

const router = useRouter()
const userStore = useUserStore()

const props = defineProps<{
  productId: string
}>()

const emit = defineEmits<{
  (e: 'reviewSubmitted', review: any): void
}>()

const formData = reactive({
  name: '',
  email: '',
  rating: 0,
  title: '',
  comment: '',
})

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Check if user is logged in
const isUserLoggedIn = computed(() => {
  return !!userStore.token && !!userStore._id
})

// Auto-fill user info when component mounts
onMounted(() => {
  if (isUserLoggedIn.value) {
    formData.name = userStore.name || ''
    formData.email = userStore.email || ''
  }
})

const submitReview = async () => {
  // Check if user is logged in
  if (!isUserLoggedIn.value) {
    errorMessage.value = 'Please login to submit a review'
    return
  }

  // Validate rating
  if (formData.rating === 0) {
    errorMessage.value = 'Please select a rating'
    return
  }

  // Validate comment
  if (formData.comment.length === 0) {
    errorMessage.value = 'Please write a review'
    return
  }

  if (formData.comment.length > 500) {
    errorMessage.value = 'Review must be less than 500 characters'
    return
  }

  // Validate product ID
  if (!props.productId || props.productId === 'undefined' || props.productId === '') {
    errorMessage.value = 'Product ID is missing. Please refresh and try again.'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const endpoint = `/products/${props.productId}/reviews`
    const reviewPayload = {
      rating: formData.rating,
      title: formData.title,
      comment: formData.comment,
      userId: userStore._id,
    }

    console.log('Submitting review to:', endpoint)
    console.log('Payload:', reviewPayload)
    console.log('Token:', userStore.token)

    const res = await publicApi.post(endpoint, reviewPayload, {
      headers: {
        Authorization: `Bearer ${userStore.token}`,
        'Content-Type': 'application/json',
      },
    })

    successMessage.value = 'Thank you! Your review has been submitted successfully.'

    const created = res?.data?.review ?? res?.data ?? reviewPayload

    setTimeout(() => {
      resetForm()
      emit('reviewSubmitted', created)
    }, 1500)
  } catch (error: any) {
    console.error('Failed to submit review:')
    console.error('Status:', error.response?.status)
    console.error('Data:', error.response?.data)
    console.error('Full error:', error)

    // Show alert for any backend error
    const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Failed to submit review. Please try again.'
    alert(errorMsg)
    errorMessage.value = errorMsg
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.comment = ''
  formData.title = ''
  formData.rating = 0

  if (isUserLoggedIn.value) {
    formData.name = userStore.name || ''
    formData.email = userStore.email || ''
  } else {
    formData.name = ''
    formData.email = ''
  }

  successMessage.value = ''
  errorMessage.value = ''
}
</script>
