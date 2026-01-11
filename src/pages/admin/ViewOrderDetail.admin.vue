<template>
  <div class="p-6 max-w-6xl mx-auto font-Nunito">

    <!-- BACK -->
    <button
      class="text-black-500 mb-6 hover:bg-amber-600/50 bg-amber-700/60 px-3 py-1 rounded"
      @click="$router.back()">
      ← Back to Orders
    </button>

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold">
        Order #{{ order?.orderNumber }}
      </h1>

      <span
        v-if="order"
        :class="statusClass(order.status)"
      >
        {{ order.status }}
      </span>
    </div>

    <!-- STATES -->
    <p v-if="store.loading" class="text-center ">Loading order...</p>
    <p v-if="store.error" class="text-red-500">{{ store.error }}</p>

    <div v-if="order" class="space-y-8">

      <!-- ORDER INFO -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-xl shadow">

        <div>
          <p class="text-gray-500 text-sm">Customer</p>
          <p class="font-semibold">{{ order.customerName || '—' }}</p>
          <p class="text-gray-600 text-sm">{{ order.phone || '—' }}</p>
        </div>

        <div>
          <p class="text-gray-500 text-sm">Order Date</p>
          <p class="font-semibold">
            {{ formatDate(order.createdAt) }}
          </p>
        </div>

        <div>
          <p class="text-gray-500 text-sm">Last Update</p>
          <p class="font-semibold">
            {{ formatDate(order.updatedAt) }}
          </p>
        </div>

      </div>

      <!-- SHIPPING -->
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="font-bold mb-4">Shipping Address</h2>

        <p>{{ order.shippingAddress?.title }}</p>
        <p>{{ order.shippingAddress?.street }}</p>
        <p>
          {{ order.shippingAddress?.city }},
          {{ order.shippingAddress?.country }}
          {{ order.shippingAddress?.postalCode }}
        </p>
      </div>

      <!-- ITEMS -->
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="font-bold mb-4">Order Items</h2>

        <table class="w-full text-sm">
          <thead class="border-b">
            <tr class="text-left text-gray-600">
              <th class="py-2">Product</th>
              <th class="py-2 text-center">Qty</th>
              <th class="py-2 text-right">Price</th>
              <th class="py-2 text-right">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in order.items"
              :key="item.slug"
              class="border-b last:border-none"
            >
              <td class="py-3 flex items-center gap-3">
                <img
                  :src="item.image"
                  class="w-12 h-12 rounded object-cover border"
                />
                <span>{{ item.name }}</span>
              </td>

              <td class="py-3 text-center">
                {{ item.quantity }}
              </td>

              <td class="py-3 text-right">
                ${{ item.price.toFixed(2) }}
              </td>

              <td class="py-3 text-right font-semibold">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- SUMMARY -->
<div class="bg-white p-6 rounded-xl shadow max-w-md ml-auto">
  <h2 class="font-bold mb-4">Order Summary</h2>

  <div class="flex justify-between mb-2">
    <span>Items</span>
    <span>{{ order.items.length }}</span>
  </div>

  <div class="flex justify-between mb-2">
    <span>Subtotal</span>
    <span>${{ subtotal.toFixed(2) }}</span>
  </div>

  <div
    v-if="order.appliedCoupon"
    class="flex justify-between mb-2 text-green-600"
  >
    <span>Discount ({{ order.appliedCoupon.code }})</span>
    <span>- ${{ discount.toFixed(2) }}</span>
  </div>

  <div class="flex justify-between font-bold text-lg border-t pt-3 mt-3">
    <span>Total</span>
    <span>${{ finalTotal.toFixed(2) }}</span>
  </div>
</div>


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
  return new Date(date).toLocaleString()
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
  const base = "inline-block px-4 py-1 rounded-full text-sm font-semibold capitalize"

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
