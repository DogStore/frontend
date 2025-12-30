<template>
  <div class="p-6 space-y-5 rounded-2xl">
    <h2 class="text-xl font-semibold text-gray-800">
      Customer Information
    </h2>

    <!-- Name -->
    <div>
      <label class="block font-medium text-gray-800 mb-1">
        Name*
      </label>

      <div class="grid grid-cols-2 gap-4">
        <input
          v-model.trim="form.firstName"
          type="text"
          placeholder="First Name"
          class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
                outline-none focus:ring-1 focus:ring-[#FFAA0C]"
        />

        <input
          v-model.trim="form.lastName"
          type="text"
          placeholder="Last Name"
          class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
                outline-none focus:ring-1 focus:ring-[#FFAA0C]"
        />
      </div>
    </div>

    <!-- Phone -->
    <div>
      <label class="block font-medium text-gray-800 mb-1">
        Phone Number*
      </label>

      <div
        class="flex border rounded-[10px] overflow-hidden"
        :class="isPhoneValid || !form.phone ? 'border-[#FFAA0C]' : 'border-red-500'"
      >
        <span class="px-4 flex items-center font-semibold text-gray-700 border-r border-[#FFAA0C]">
          +855
        </span>

        <input
          v-model="form.phone"
          type="tel"
          inputmode="numeric"
          placeholder="12 345 678"
          @input="sanitizePhone"
          class="flex-1 px-3 py-2 outline-none"
        />
      </div>

      <p v-if="form.phone && !isPhoneValid" class="text-red-500 text-sm mt-1">
        Phone number must be 8–9 digits only
      </p>
    </div>

    <!-- Address -->
    <div>
      <label class="block font-medium text-gray-800 mb-1">
        Address*
      </label>

      <input
        v-model.trim="form.address"
        type="url"
        placeholder="Paste your Google Maps link"
        class="border rounded-[10px] px-3 py-2 w-full outline-none
              focus:ring-1"
        :class="isAddressValid || !form.address
          ? 'border-[#FFAA0C] focus:ring-[#FFAA0C]'
          : 'border-red-500 focus:ring-red-500'"
      />

      <p v-if="form.address && !isAddressValid" class="text-red-500 text-sm mt-1">
        Address must be a valid URL (Google Maps link)
      </p>
    </div>

    <!-- Note -->
    <div>
      <label class="block font-medium text-gray-800 mb-1">
        Note
      </label>

      <textarea
        v-model="form.note"
        rows="3"
        placeholder="Text something to the deliverer"
        class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
              outline-none resize-none focus:ring-1 focus:ring-[#FFAA0C]"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'

const emit = defineEmits<{
  (e: 'valid-change', value: boolean): void
}>()

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  note: '',
})

/* Numbers only for phone */
function sanitizePhone() {
  form.phone = form.phone.replace(/\D/g, '')
}

// Check Validate phone number format
const isPhoneValid = computed(() =>
  /^[0-9]{8,9}$/.test(form.phone)
)

// Check Validate address format (simple URL check)
const isAddressValid = computed(() =>
  /^https?:\/\/.+/.test(form.address)
)

const isFormValid = computed(() =>
  !!(
    form.firstName &&
    form.lastName &&
    isPhoneValid.value &&
    isAddressValid.value
  )
)

/* Notify parent */
watch(isFormValid, (val) => emit('valid-change', val))
</script>
