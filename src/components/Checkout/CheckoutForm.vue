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
        <!-- Country Code -->
        <select
          v-model="form.phoneCode"
          class="px-3 bg-white border-r border-[#FFAA0C] outline-none
                font-semibold text-gray-700"
        >
          <option
            v-for="c in countryCodes"
            :key="c.code"
            :value="c.code"
          >
            {{ c.label }} ({{ c.code }})
          </option>
        </select>

        <!-- Phone Input -->
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

      <div class="grid grid-cols-2 gap-4">
        <input
          v-model.trim="form.address.homeNo"
          type="text"
          placeholder="Home No"
          class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
                outline-none focus:ring-1 focus:ring-[#FFAA0C]"
        />

        <input
          v-model.trim="form.address.street"
          type="text"
          placeholder="Street"
          class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
                outline-none focus:ring-1 focus:ring-[#FFAA0C]"
        />

        <input
          v-model.trim="form.address.city"
          type="text"
          placeholder="City"
          class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
                outline-none focus:ring-1 focus:ring-[#FFAA0C]"
        />

        <input
          v-model.trim="form.address.country"
          type="text"
          placeholder="Country"
          class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
                outline-none focus:ring-1 focus:ring-[#FFAA0C]"
        />

        <input
          v-model="form.address.postalCode"
          type="text"
          inputmode="numeric"
          placeholder="Postal Code"
          @input="sanitizePostalCode"
          class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
                outline-none focus:ring-1 focus:ring-[#FFAA0C] col-span-2"
        />
      </div>

      <p v-if="form.address.postalCode && !isPostalCodeValid" class="text-red-500 text-sm mt-1">
        Postal code must contain numbers only
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
  phoneCode: '+855', // 👈 dynamic
  phone: '',
  address: {
    homeNo: '',
    street: '',
    city: '',
    country: '',
    postalCode: '',
  },
  note: '',
})

const countryCodes = [
  { code: '+855', label: 'Cambodia' },
  { code: '+84', label: 'Vietnam' },
  { code: '+33', label: 'France' },
  { code: '+1', label: 'USA' },
  { code: '+44', label: 'UK' },
]

/* Numbers only for phone */
function sanitizePhone() {
  form.phone = form.phone.replace(/\D/g, '')
}

/* Numbers only for postal code */
function sanitizePostalCode() {
  form.address.postalCode = form.address.postalCode.replace(/\D/g, '')
}

/* Phone validation */
const isPhoneValid = computed(() =>
  /^[0-9]{8,9}$/.test(form.phone)
)
// const fullPhoneNumber = computed(() =>
//   `${form.phoneCode}${form.phone}`
// )


/* Postal code validation */
const isPostalCodeValid = computed(() =>
  /^[0-9]{4,10}$/.test(form.address.postalCode)
)

/* Address validation */
const isAddressValid = computed(() =>
  !!(
    form.address.homeNo &&
    form.address.street &&
    form.address.city &&
    form.address.country &&
    isPostalCodeValid.value
  )
)

/* Final form validation */
const isFormValid = computed(() =>
  !!(
    form.firstName &&
    form.lastName &&
    isPhoneValid.value &&
    isAddressValid.value
  )
)

/* Notify parent */
watch(isFormValid, (val) => emit('valid-change', val), {
  immediate: true,
})
</script>
