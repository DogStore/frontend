<template>
  <div class="p-6">
    <!-- HEADER -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
      <div>
        <h1 class="text-3xl font-bold">View Orders</h1>
        <p class="text-sm text-gray-500 mt-1">Manage and track all customer orders</p>
      </div>

      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <!-- SEARCH -->
        <div class="relative">
          <input
            v-model="search"
            type="text"
            placeholder="Search by order ID or customer"
            class="border border-gray-300 px-4 py-2 pr-10 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <svg class="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- STATUS FILTER -->
        <select
          v-model="statusFilter"
          class="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="canceled">Canceled</option>
        </select>

        <!-- EXPORT -->
        <button
          @click="exportPDF"
          class="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export PDF
        </button>
      </div>
    </div>

    <!-- LOADING STATE -->
    <div v-if="store.loading" class="space-y-6">
      <!-- Pending Orders Skeleton -->
      <div class="bg-orange-50 border border-orange-200 p-6 rounded-xl">
        <div class="h-6 bg-orange-200 rounded w-48 mb-4 animate-pulse"></div>
        <div v-for="i in 2" :key="i" class="bg-white p-4 mb-3 rounded-lg animate-pulse">
          <div class="flex justify-between items-center">
            <div class="space-y-2">
              <div class="h-5 bg-gray-200 rounded w-32"></div>
              <div class="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div class="flex gap-2">
              <div class="h-8 bg-gray-200 rounded w-20"></div>
              <div class="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Skeleton -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="space-y-3">
          <div v-for="i in 5" :key="i" class="flex items-center gap-4 animate-pulse">
            <div class="h-4 bg-gray-200 rounded flex-1"></div>
            <div class="h-4 bg-gray-200 rounded w-32"></div>
            <div class="h-4 bg-gray-200 rounded w-24"></div>
            <div class="h-4 bg-gray-200 rounded w-20"></div>
            <div class="h-6 bg-gray-200 rounded-full w-20"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ERROR STATE -->
    <div v-else-if="store.error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Failed to load orders</h3>
      <p class="text-red-600 mb-4">{{ store.error }}</p>
      <button
        @click="store.loadOrders()"
        class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
      >
        Try Again
      </button>
    </div>

    <!-- CONTENT -->
    <div v-else>
      <!-- EMPTY STATE -->
      <div v-if="filteredOrders.length === 0 && !store.loading" class="text-center py-16">
        <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
        <p class="text-gray-500">
          {{ search || statusFilter !== 'all'
            ? 'Try adjusting your filters'
            : 'Orders will appear here once customers start placing them'
          }}
        </p>
      </div>

      <div v-else>
        <!-- PENDING ORDERS -->
        <div
          v-if="pendingOrders.length"
          class="bg-orange-50 border border-orange-200 p-6 rounded-xl mb-6"
        >
          <h2 class="font-bold text-lg mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pending Orders
            <span class="bg-orange-500 text-white text-xs px-2 py-1 rounded-full ml-1">
              {{ pendingOrders.length }}
            </span>
          </h2>

          <div class="space-y-3">
            <div
              v-for="order in pendingOrders"
              :key="order._id"
              class="bg-white p-4 rounded-lg shadow-sm border border-orange-100 hover:shadow-md transition"
            >
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p class="font-semibold text-lg">#{{ order.orderNumber }}</p>
                  <p class="text-gray-600">{{ order.customerName || 'Guest' }}</p>
                  <p class="text-orange-600 font-semibold mt-1">${{ order.totalAmount.toFixed(2) }}</p>
                </div>

                <div class="flex gap-2">
                  <button
                    type="button"
                    class="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition font-semibold flex items-center gap-1"
                    @click.stop="store.changeStatus(order._id, 'paid')"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </button>

                  <button
                    type="button"
                    class="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition font-semibold flex items-center gap-1"
                    @click.stop="store.changeStatus(order._id, 'canceled')"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ALL ORDERS TABLE -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-6 border-b border-gray-100">
            <h2 class="font-bold text-lg flex items-center gap-2">
              <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              All Orders
              <span class="text-gray-400 text-sm font-normal ml-1">
                ({{ filteredOrders.length }} total)
              </span>
            </h2>
          </div>
          <OrderTable :orders="filteredOrders" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAdminOrderStore } from '@/stores/adminOrderStore'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import OrderTable from '@/components/admin/Order/OrderTable.vue'

const store = useAdminOrderStore()

const search = ref('')
const statusFilter = ref<'all' | 'pending' | 'paid' | 'canceled'>('all')

onMounted(() => {
  store.loadOrders()
})

// FILTERED ORDERS
const filteredOrders = computed(() => {
  return store.orders.filter(o => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.value.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(search.value.toLowerCase())

    const matchStatus =
      statusFilter.value === 'all' || o.status === statusFilter.value

    return matchSearch && matchStatus
  })
})

// PENDING ORDERS
const pendingOrders = computed(() =>
  filteredOrders.value.filter(o => o.status === 'pending')
)

// EXPORT PDF
function exportPDF() {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(18)
  doc.text('Order List', 14, 15)

  // Add date
  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 22)

  autoTable(doc, {
    startY: 30,
    head: [['Order ID', 'Number', 'Date', 'Items', 'Total', 'Status']],
    body: filteredOrders.value.map(o => [
      o.orderNumber,
      o.phone || 'No Number',
      o.updatedAt
        ? new Date(o.updatedAt).toLocaleDateString()
        : '-',
      o.items.length,
      `$${o.totalAmount.toFixed(2)}`,
      o.status.charAt(0).toUpperCase() + o.status.slice(1),
    ]),
    headStyles: {
      fillColor: [249, 115, 22], // Orange color
      textColor: 255,
      fontSize: 10,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [255, 247, 237], // Light orange
    },
  })

  doc.save(`orders-${new Date().toISOString().split('T')[0]}.pdf`)
}
</script>
