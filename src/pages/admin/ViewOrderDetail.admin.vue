<template>
  <div class="p-6 max-w-6xl mx-auto font-Nunito">

    <!-- BACK -->
    <button
      class="text-white mb-6 hover:bg-orange-600 bg-orange-500 px-4 py-2 rounded-lg transition font-semibold"
      @click="$router.back()">
      ← Back to Orders
    </button>

    <!-- Loading State -->
    <div v-if="store.loading" class="space-y-6">
      <!-- Header Skeleton -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div class="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div class="h-8 bg-gray-200 rounded-full w-24 animate-pulse mt-4 md:mt-0"></div>
      </div>

      <!-- Order Info Skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-xl shadow">
        <div v-for="i in 3" :key="i" class="animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-20 mb-2"></div>
          <div class="h-5 bg-gray-200 rounded w-32 mb-1"></div>
          <div class="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      <!-- Shipping Skeleton -->
      <div class="bg-white p-6 rounded-xl shadow animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-40 mb-4"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Items Skeleton -->
      <div class="bg-white p-6 rounded-xl shadow animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div class="space-y-3">
          <div v-for="i in 3" :key="i" class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gray-200 rounded"></div>
            <div class="flex-1">
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>

      <!-- Summary Skeleton -->
      <div class="bg-white p-6 rounded-xl shadow max-w-md ml-auto animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div class="space-y-3">
          <div v-for="i in 4" :key="i" class="flex justify-between">
            <div class="h-4 bg-gray-200 rounded w-20"></div>
            <div class="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="store.error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Failed to load order</h3>
      <p class="text-red-600 mb-4">{{ store.error }}</p>
      <button
        @click="store.loadOrder(route.params.id as string)"
        class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
      >
        Try Again
      </button>
    </div>

    <!-- Order Content -->
    <div v-else-if="order" class="space-y-6">

      <!-- HEADER -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 class="text-3xl font-bold mb-4 md:mb-0">
          Order #{{ order.orderNumber }}
        </h1>

        <span
          :class="statusClass(order.status)"
        >
          {{ order.status }}
        </span>
      </div>

      <!-- ORDER INFO -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">

        <div>
          <p class="text-gray-500 text-sm mb-1">Customer</p>
          <p class="font-semibold text-lg">{{ order.customerName || '—' }}</p>
          <p class="text-gray-600 text-sm">{{ order.phone || '—' }}</p>
        </div>

        <div>
          <p class="text-gray-500 text-sm mb-1">Order Date</p>
          <p class="font-semibold">
            {{ formatDate(order.createdAt) }}
          </p>
        </div>

        <div>
          <p class="text-gray-500 text-sm mb-1">Last Update</p>
          <p class="font-semibold">
            {{ formatDate(order.updatedAt) }}
          </p>
        </div>

      </div>

      <!-- SHIPPING -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 class="font-bold text-lg mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Shipping Address
        </h2>

        <div class="text-gray-700">
          <p class="font-semibold">{{ order.shippingAddress?.title }}</p>
          <p>{{ order.shippingAddress?.street }}</p>
          <p>
            {{ order.shippingAddress?.city }},
            {{ order.shippingAddress?.country }}
            {{ order.shippingAddress?.postalCode }}
          </p>
        </div>
      </div>

      <!-- ITEMS -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 class="font-bold text-lg mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Order Items
        </h2>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="border-b border-gray-200">
              <tr class="text-left text-gray-600">
                <th class="py-3 font-semibold">Product</th>
                <th class="py-3 text-center font-semibold">Qty</th>
                <th class="py-3 text-right font-semibold">Price</th>
                <th class="py-3 text-right font-semibold">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in order.items"
                :key="item.slug"
                class="border-b border-gray-100 last:border-none hover:bg-gray-50 transition"
              >
                <td class="py-4 flex items-center gap-3">
                  <img
                    :src="item.image"
                    class="w-14 h-14 rounded-lg object-cover border border-gray-200"
                    :alt="item.name"
                  />
                  <span class="font-medium">{{ item.name }}</span>
                </td>

                <td class="py-4 text-center">
                  <span class="inline-block bg-gray-100 px-3 py-1 rounded-full font-medium">
                    {{ item.quantity }}
                  </span>
                </td>

                <td class="py-4 text-right text-gray-600">
                  ${{ item.price.toFixed(2) }}
                </td>

                <td class="py-4 text-right font-semibold">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- SUMMARY -->
      <div class="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl shadow-sm border border-orange-100 max-w-md ml-auto">
        <h2 class="font-bold text-lg mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Order Summary
        </h2>

        <div class="space-y-3">
          <div class="flex justify-between text-gray-600">
            <span>Items</span>
            <span class="font-medium">{{ order.items.length }}</span>
          </div>

          <div class="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
          </div>

          <div
            v-if="order.appliedCoupon"
            class="flex justify-between text-green-600 bg-green-50 -mx-2 px-2 py-2 rounded-lg"
          >
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Discount ({{ order.appliedCoupon.code }})
            </span>
            <span class="font-semibold">- ${{ discount.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between font-bold text-xl border-t border-orange-200 pt-4 mt-4">
            <span>Total</span>
            <span class="text-orange-600">${{ finalTotal.toFixed(2) }}</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Empty State (Order Not Found) -->
    <div v-else class="text-center py-16">
      <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Order not found</h3>
      <p class="text-gray-500 mb-6">The order you're looking for doesn't exist</p>
      <button
        @click="$router.back()"
        class="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition font-semibold"
      >
        Back to Orders
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { useAdminOrderStore } from "@/stores/adminOrderStore"

const route = useRoute()
const store = useAdminOrderStore()

onMounted(() => {
  store.loadOrder(route.params.id as string)
})

const order = computed(() => store.selectedOrder)

function formatDate(date?: string) {
  if (!date) return "—"
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const subtotal = computed(() =>
  order.value.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
)

const discount = computed(() =>
  order.value.appliedCoupon?.discountAmount ?? 0
)

const finalTotal = computed(() =>
  Math.max(subtotal.value - discount.value, 0)
)

function statusClass(status: string) {
  const base = "inline-block px-4 py-2 rounded-lg text-sm font-semibold capitalize"

  return {
    pending: `${base} bg-orange-100 text-orange-700`,
    paid: `${base} bg-green-100 text-green-700`,
    processing: `${base} bg-gray-100 text-gray-700`,
    shipped: `${base} bg-blue-100 text-blue-700`,
    delivered: `${base} bg-purple-100 text-purple-700`,
    canceled: `${base} bg-red-100 text-red-700`,
  }[status]
}
</script>
