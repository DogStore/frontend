<template>
  <div class="p-4">
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">View Order</h1>

      <div class="flex items-center gap-6">
        <!-- SEARCH -->
         <div class="flex gap-2">
            <input
              v-model="search"
              type="text"
              placeholder="Search by order ID or customer"
              class="border px-4 py-2 rounded-md w-100"
            />
            <img src="@/assets/Search.png" alt="" class="w-6 h-6 -ml-10 mt-2 mr-2"/>
         </div>

        <!-- STATUS FILTER -->
        <select
          v-model="statusFilter"
          class="border px-3 py-2 rounded-md"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
        </select>

        <!-- EXPORT -->
        <button
          @click="exportPDF"
          class="bg-orange-500 text-black font-bold px-4 py-2 rounded-md">
          <img src="@/assets/Export Pdf.png" alt="Export PDF" class="inline-block w-7 h-7 mr-1" />
          Export
        </button>
      </div>
    </div>

    <!-- ERROR -->
    <p v-if="store.error" class="text-red-500 mb-4">
      {{ store.error }}
    </p>

    <!-- LOADING -->
    <p v-if="store.loading" class=" text-center mb-6 mt-6">Loading orders...</p>

    <!-- EMPTY -->
    <p v-if="!store.loading && filteredOrders.length === 0">
      No orders found
    </p>

    <!-- PENDING ORDERS -->
    <div
      v-if="pendingOrders.length"
      class="bg-orange-200 p-4 rounded mb-6"
    >
      <h2 class="font-bold mb-4">
        Pending Orders ({{ pendingOrders.length }})
      </h2>

      <div
        v-for="order in pendingOrders"
        :key="order._id"
        class="bg-white p-4 mb-3 flex justify-between items-center rounded">
        <div>
          <p class="font-semibold">#{{ order.orderNumber }}</p>
          <p>${{ order.totalAmount.toFixed(2) }}</p>
        </div>

        <div class="flex gap-2">
          <button
            type="button"
            class="bg-green-500 text-white px-4 py-1 rounded relative z-10 pointer-events-auto"
            @click.stop="store.changeStatus(order._id, 'paid')">
            Approve
          </button>

          <button
            type="button"
            class="bg-red-500 text-white px-4 py-1 rounded relative z-10 pointer-events-auto"
            @click.stop="store.changeStatus(order._id, 'canceled')">
            Reject
          </button>

        </div>
      </div>
    </div>

    <!-- ALL ORDERS TABLE -->
    <OrderTable :orders="filteredOrders" />


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
const statusFilter = ref<'all' | 'pending' | 'paid' | 'shipped'>('all')

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
  doc.text('Order List', 14, 10)

  autoTable(doc, {
    head: [['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Status']],
    body: filteredOrders.value.map(o => [
      o.orderNumber,
      o.customerName || '-',
      o.updatedAt
        ? new Date(o.updatedAt).toLocaleDateString()
        : '-',
      o.items.length,
      `$${o.totalAmount.toFixed(2)}`,
      o.status,
    ]),
  })

  doc.save('orders.pdf')
}
</script>
