<template>
  <div class="bg-white rounded-xl shadow overflow-hidden">

    <!-- EMPTY STATE -->
    <div
      v-if="filteredOrders.length === 0"
      class="py-20 text-center text-gray-500"
    >
      No orders found
    </div>

    <!-- TABLE -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full border-collapse">

        <!-- HEADER -->
        <thead class="bg-gray-100 sticky top-0 z-10">
          <tr class="text-left text-sm font-semibold text-gray-700">
            <th class="px-4 py-3">Order ID</th>
            <th class="px-4 py-3">Customer</th>
            <th class="px-4 py-3">Date</th>
            <th class="px-4 py-3 text-center">Items</th>
            <th class="px-4 py-3">Total</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>

        <!-- BODY -->
        <tbody>
          <tr
            v-for="order in filteredOrders"
            :key="order._id"
            class="border-t text-sm hover:bg-orange-50 transition"
          >
            <td class="px-4 py-3 font-medium">
              #{{ order.orderNumber }}
            </td>

            <td class="px-4 py-3">
              {{ order.customerName || '—' }}
            </td>

            <td class="px-4 py-3 text-gray-500">
              {{ formatDate(order.updatedAt) }}
            </td>

            <td class="px-4 py-3 text-center">
              {{ order.items.length }}
            </td>

            <td class="px-4 py-3 font-semibold">
              ${{ order.totalAmount.toFixed(2) }}
            </td>

            <td class="px-4 py-3">
              <span :class="statusClass(order.status)">
                {{ order.status }}
              </span>
            </td>

            <td class="px-4 py-3 text-center">
              <router-link
                :to="`/admin/orders/${order._id}`"
                class="text-orange-500 hover:underline font-medium"
              >
                View
              </router-link>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from "@/types/order"
import { computed } from "vue"

const props = defineProps<{
  orders: Order[]
}>()

const filteredOrders = computed(() => props.orders)

// FORMAT DATE
function formatDate(date?: string) {
  if (!date) return "—"
  return new Date(date).toLocaleDateString()
}

// STATUS BADGES
function statusClass(status: string) {
  const base = "inline-block text-xs font-semibold px-3 py-1 rounded-full capitalize"

  return {
    pending: `${base} bg-orange-100 text-orange-700`,
    paid: `${base} bg-green-100 text-green-700`,
    processing: `${base} bg-gray-100 text-gray-700`,
    shipped: `${base} bg-blue-100 text-blue-700`,
    delivered: `${base} bg-purple-100 text-purple-700`,
    canceled: `${base} bg-red-100 text-red-700`,
  }[status] || `${base} bg-gray-100 text-gray-700`
}
</script>
