<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <!-- Header with icon, title, code and status -->
    <div class="flex items-start justify-between mb-6">
      <div class="flex items-start gap-3">
        <!-- Icon -->
        <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>

        <div>
          <h3 class="font-bold text-base">{{ coupon.title || coupon.code }}</h3>
          <p class="text-xs text-gray-400 uppercase mt-0.5">{{ coupon.code }}</p>
        </div>
      </div>
      <!-- Status badge with background -->
      <span
        class="text-xs px-3 py-1.5 rounded-md font-medium"
        :class="{
          'bg-green-100 text-green-700': coupon.isActive,
          'bg-red-100 text-red-700': !coupon.isActive,
          'bg-blue-100 text-blue-700': coupon.status === 'schedule'
        }"
      >
        {{ coupon.isActive ? 'Active' : 'Expired' }}
      </span>
    </div>
    <!-- Discount with background -->
    <div class="flex justify-between items-center mb-4 bg-orange-50 rounded-lg p-3">
      <span class="text-sm text-gray-600 font-medium">% Discount</span>
      <span class="text-xl font-bold text-orange-500">
        {{ coupon.type === 'percent' ? coupon.value + '%' : '$' + coupon.value }}
      </span>
    </div>
    <!-- Date Range with background -->
    <div class="flex items-center gap-1.5 mb-4 bg-gray-50 rounded-lg p-3">
      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span class="text-sm text-gray-600" v-if="coupon.startDate">
        {{ formatDate(coupon.startDate) }} - {{ formatDate(coupon.validUntil) }}
      </span>
      <span class="text-sm text-gray-600">
        Valid until: {{ formatDate(coupon.validUntil) }}
      </span>
    </div>
    <!-- Total Uses -->
    <div class="flex justify-between items-center mb-6">
      <span class="text-sm text-gray-500">Total Uses</span>
      <span class="text-lg font-bold">{{ coupon.usedCount || 0 }}</span>
    </div>
    <!-- Action Buttons -->
    <div class="flex gap-3">
      <button
        class="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 transition"
        @click="$emit('edit', coupon)"
      >
        Edit
      </button>
      <button
        class="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 transition"
        @click="$emit('view-details', coupon)"
      >
        View Details
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ coupon: any }>()
defineEmits(['edit', 'view-details'])

function formatDate(date: string) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  })
}
</script>
