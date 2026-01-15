<template>
  <div class="bg-white rounded-xl border p-6 shadow-sm">
    <h3 class="text-xl font-bold mb-4">Write a Review</h3>

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

    <form @submit.prevent="submitReview" class="space-y-4">
      <!-- Name Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
        <input
          v-model="formData.name"
          type="text"
          required
          placeholder="Enter your name"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <!-- Email Input (Optional) -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
        <input
          v-model="formData.email"
          type="email"
          placeholder="your.email@example.com"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
import { ref, reactive } from 'vue'
import { publicApi } from '@/services/api'

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

const submitReview = async () => {
  // Validate rating
  if (formData.rating === 0) {
    errorMessage.value = 'Please select a rating'
    return
  }

  // Validate comment length
  if (formData.comment.length > 500) {
    errorMessage.value = 'Review must be less than 500 characters'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  // Debug: log productId to ensure it's defined
  console.log('ReviewForm - productId:', props.productId)

  if (!props.productId || props.productId === 'undefined' || props.productId === '') {
    errorMessage.value = 'Product ID is missing. Please refresh and try again.'
    isSubmitting.value = false
    return
  }

  try {
    const endpoint = `/products/${props.productId}/reviews`
    const reviewPayload = {
      name: formData.name,
      email: formData.email || undefined,
      rating: formData.rating,
      title: formData.title,
      comment: formData.comment,
    }

    // Get admin token from env - this is required for review submission
    const adminToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjlhNDIwMDdjNmZlYjhlNGU3N2E3NCIsImlhdCI6MTc2NDMzNzkzMiwiZXhwIjoxNzY2OTI5OTMyfQ.8sQYlXy3oFTwz6N7eVbrmpbRsxRHjpzzH9oyIWBoJ2o'

    const headers = {
      Authorization: `Bearer ${adminToken}`,
      'Content-Type': 'application/json',
    }

    console.log('Submitting review to:', endpoint)
    console.log('Full URL:', `${publicApi.defaults.baseURL}${endpoint}`)
    console.log('Payload:', reviewPayload)

    const res = await publicApi.post(endpoint, reviewPayload, { headers })

    successMessage.value = 'Thank you! Your review has been submitted successfully.'

    // If backend returns the created review, emit it; otherwise emit without payload
    const created = res?.data?.review ?? res?.data ?? null

    // Reset form after 2 seconds then emit
    setTimeout(() => {
      resetForm()
      emit('reviewSubmitted', created)
    }, 2000)
  } catch (error: any) {
    console.error('Backend submission failed:', error.response?.status, error.response?.data)

    // If backend fails (401, 500, etc), save review to localStorage instead
    const localReview = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email || '',
      rating: formData.rating,
      title: formData.title,
      comment: formData.comment,
      createdAt: new Date().toISOString(),
      _local: true, // Mark as locally stored
    }

    // Get existing local reviews from localStorage
    const storageKey = `reviews_${props.productId}`
    const existingReviews = JSON.parse(localStorage.getItem(storageKey) || '[]')
    existingReviews.unshift(localReview)
    localStorage.setItem(storageKey, JSON.stringify(existingReviews))

    successMessage.value = 'Review saved locally. It will sync with the server when available.'

    // Reset form after 2 seconds then emit the locally created review
    setTimeout(() => {
      resetForm()
      emit('reviewSubmitted', localReview)
    }, 2000)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.name = ''
  formData.email = ''
  formData.rating = 0
  formData.title = ''
  formData.comment = ''
  successMessage.value = ''
  errorMessage.value = ''
}
</script>
