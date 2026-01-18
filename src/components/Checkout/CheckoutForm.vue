<template>
  <div class="p-6 space-y-5 rounded-2xl bg-white shadow-sm">
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
          v-model.trim="checkout.customer.firstName"
          placeholder="First Name"
          class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
                  outline-none focus:ring-1 focus:ring-[#FFAA0C]"
        />
        <input
          v-model.trim="checkout.customer.lastName"
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
        :class="checkout.isPhoneValid || !checkout.customer.phone
          ? 'border-[#FFAA0C]'
          : 'border-red-500'"
      >
        <select
          v-model="checkout.customer.phoneCode"
          class="px-3 bg-white border-r border-[#FFAA0C]
                  outline-none font-semibold text-gray-700"
        >
          <option
            v-for="c in countryCodes"
            :key="c.code"
            :value="c.code"
          >
            {{ c.label }} ({{ c.code }})
          </option>
        </select>

        <input
          v-model="checkout.customer.phone"
          placeholder="12 345 678"
          inputmode="numeric"
          @input="checkout.sanitizePhone"
          class="flex-1 px-3 py-2 outline-none"
        />
      </div>

      <p
        v-if="checkout.customer.phone && !checkout.isPhoneValid"
        class="text-red-500 text-sm mt-1"
      >
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
          v-model.trim="checkout.customer.address.title"
          placeholder="House No"
          class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
                  outline-none focus:ring-1 focus:ring-[#FFAA0C]"
        />
        <input
          v-model.trim="checkout.customer.address.street"
          placeholder="Street"
          class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
                  outline-none focus:ring-1 focus:ring-[#FFAA0C]"
        />
        <input
          v-model.trim="checkout.customer.address.city"
          placeholder="City"
          class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
                  outline-none focus:ring-1 focus:ring-[#FFAA0C]"
        />
        <input
          v-model.trim="checkout.customer.address.country"
          placeholder="Country"
          class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
                  outline-none focus:ring-1 focus:ring-[#FFAA0C]"
        />
        <input
          v-model="checkout.customer.address.postalCode"
          placeholder="Postal Code"
          inputmode="numeric"
          @input="checkout.sanitizePostalCode"
          class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
                  outline-none focus:ring-1 focus:ring-[#FFAA0C]"
        />
      </div>

      <p
        v-if="checkout.customer.address.postalCode && !checkout.isPostalCodeValid"
        class="text-red-500 text-sm mt-1"
      >
        Postal code must contain numbers only
      </p>
    </div>

    <!-- Note -->
    <div>
      <label class="block font-medium text-gray-800 mb-1">
        Note
      </label>

      <textarea
        v-model="checkout.customer.note"
        rows="3"
        placeholder="Text something to the deliverer"
        class="border border-[#FFAA0C] rounded-[10px] px-3 py-2 w-full
                outline-none focus:ring-1 focus:ring-[#FFAA0C] resize-none"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCheckoutStore } from '@/stores/checkoutStore'

const checkout = useCheckoutStore()

const countryCodes = [
  { code: '+855', label: 'Cambodia' },
  { code: '+84', label: 'Vietnam' },
  { code: '+33', label: 'France' },
  { code: '+1', label: 'USA' },
  { code: '+44', label: 'UK' },
]
</script>
