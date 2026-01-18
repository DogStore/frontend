<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl w-full max-w-lg p-8 relative">

      <!-- Close button -->
      <button
        type="button"
        @click="$emit('close')"
        class="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 class="text-2xl font-bold mb-2">
        {{ coupon ? 'Edit Promotion' : 'Create New Promotion' }}
      </h2>
      <p class="text-gray-500 text-sm mb-6">
        Set up a new discount code or promotional campaign for your customers.
      </p>

      <form @submit.prevent="submit">
        <!-- Promotion Name -->
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-2">
            Promotion Name <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.title"
            class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., Summer Sale"
          />
        </div>

        <!-- Promo Code -->
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-2">
            Promo Code <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.code"
            class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., SUMMER2025"
          />
        </div>

        <!-- Discount Type & Value -->
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-2">
            Discount Percentage
          </label>
          <div class="relative">
            <input
              v-model.number="form.value"
              type="number"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="20"
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>

        <!-- Start Date & End Date -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-semibold mb-2">
              Start Date <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.startDate"
              type="date"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">
              End Date <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.validUntil"
              type="date"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Usage Limit -->
        <div class="mb-6">
          <label class="block text-sm font-semibold mb-2">
            Usage Limit (optional)
          </label>
          <input
            v-model.number="form.usageLimitTotal"
            type="number"
            placeholder="Leave empty for unlimited"
            class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400"
          />
        </div>

        <!-- Buttons -->
        <div class="flex gap-3">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 border border-gray-300 text-gray-700 font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 bg-orange-500 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-orange-600 transition"
          >
            {{ coupon ? 'Update Promotion' : 'Create Promotion' }}
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps<{ coupon?: any }>()
const emit = defineEmits(['close', 'save'])

const form = reactive<any>({
  title: '',
  code: '',
  type: 'percent',
  value: 0,
  startDate: '',
  validUntil: '',
  usageLimitTotal: null,
})

watch(
  () => props.coupon,
  (c) => {
    if (c) Object.assign(form, c)
  },
  { immediate: true }
)

function submit() {
  emit('save', { ...form })
}
</script>
