<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto">

      <!-- Close button - Fixed positioning -->
      <button
        type="button"
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Header -->
      <div class="flex items-start gap-4 mb-6 pr-8">
        <div class="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
          <svg class="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>

        <div class="flex-1">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-2xl font-bold">{{ coupon.title || coupon.code }}</h2>
              <p class="text-sm text-gray-400 uppercase mt-1">{{ coupon.code }}</p>
            </div>

            <span
              class="text-xs px-3 py-1 rounded-full font-medium"
              :class="{
                'bg-green-100 text-green-700': coupon.isActive,
                'bg-red-100 text-red-700': !coupon.isActive
              }"
            >
              {{ coupon.isActive ? 'Active' : 'Expired' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Details Grid -->
      <div class="space-y-6">

        <!-- Discount Information -->
        <div class="bg-orange-50 rounded-lg p-4">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Discount Information</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-gray-500 mb-1">Type</p>
              <p class="font-semibold text-gray-900 capitalize">{{ coupon.type }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">Value</p>
              <p class="font-semibold text-orange-500 text-lg">
                {{ coupon.type === 'percent' ? coupon.value + '%' : '$' + coupon.value }}
              </p>
            </div>
            <div v-if="coupon.minOrderAmount" class="col-span-2">
              <p class="text-xs text-gray-500 mb-1">Minimum Order Amount</p>
              <p class="font-semibold text-gray-900">${{ coupon.minOrderAmount }}</p>
            </div>
          </div>
        </div>

        <!-- Validity Period -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Validity Period</h3>
          <div class="grid grid-cols-2 gap-4">
            <div v-if="coupon.startDate">
              <p class="text-xs text-gray-500 mb-1">Start Date</p>
              <p class="font-semibold text-gray-900">{{ formatDate(coupon.startDate) }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">End Date</p>
              <p class="font-semibold text-gray-900">{{ formatDate(coupon.validUntil) }}</p>
            </div>
          </div>
        </div>

        <!-- Usage Statistics -->
        <div class="bg-blue-50 rounded-lg p-4">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Usage Statistics</h3>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <p class="text-xs text-gray-500 mb-1">Total Uses</p>
              <p class="font-bold text-2xl text-gray-900">{{ coupon.usedCount || 0 }}</p>
            </div>
            <div v-if="coupon.usageLimitTotal">
              <p class="text-xs text-gray-500 mb-1">Usage Limit</p>
              <p class="font-bold text-2xl text-gray-900">{{ coupon.usageLimitTotal }}</p>
            </div>
            <div v-if="coupon.usageLimitPerUser">
              <p class="text-xs text-gray-500 mb-1">Limit Per User</p>
              <p class="font-bold text-2xl text-gray-900">{{ coupon.usageLimitPerUser }}</p>
            </div>
          </div>

          <!-- Progress Bar (if usage limit exists) -->
          <div v-if="coupon.usageLimitTotal" class="mt-4">
            <div class="flex justify-between text-xs text-gray-600 mb-1">
              <span>Usage Progress</span>
              <span>{{ Math.round(((coupon.usedCount || 0) / coupon.usageLimitTotal) * 100) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-500 h-2 rounded-full transition-all"
                :style="{ width: `${Math.min(((coupon.usedCount || 0) / coupon.usageLimitTotal) * 100, 100)}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Metadata -->
        <div class="border-t pt-4">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Additional Information</h3>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-gray-500">Created</p>
              <p class="font-medium text-gray-900">{{ formatDateTime(coupon.createdAt) }}</p>
            </div>
            <div>
              <p class="text-gray-500">Last Updated</p>
              <p class="font-medium text-gray-900">{{ formatDateTime(coupon.updatedAt) }}</p>
            </div>
          </div>
        </div>

      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 mt-6 pt-6 border-t">
        <button
          type="button"
          @click="$emit('edit', coupon)"
          class="flex-1 bg-orange-500 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-orange-600 transition"
        >
          Edit Promotion
        </button>
        <button
          type="button"
          @click="toggleStatus"
          class="px-6 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition"
        >
          {{ coupon.isActive ? 'Deactivate' : 'Activate' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ coupon: any }>()
const emit = defineEmits(['close', 'edit', 'toggle-status'])

function formatDate(date: string) {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
}

function formatDateTime(date: string) {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function toggleStatus() {
  emit('toggle-status', props.coupon)
}
</script>
