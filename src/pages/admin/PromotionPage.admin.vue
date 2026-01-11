<template>
  <div class="p-6">
    <div class="flex justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">Promotion</h1>
        <p class="text-sm text-gray-500">
          Create and manage discount codes and promotional campaigns
        </p>
      </div>

      <button
        class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        @click="openCreate"
      >
        + Create Promotion
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <div v-for="i in 4" :key="i" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div class="flex items-start justify-between mb-6">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-gray-200"></div>
            <div>
              <div class="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div class="h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
        <div class="h-12 bg-gray-200 rounded-lg mb-4"></div>
        <div class="h-12 bg-gray-200 rounded-lg mb-4"></div>
        <div class="h-6 bg-gray-200 rounded mb-6"></div>
        <div class="flex gap-3">
          <div class="flex-1 h-10 bg-gray-200 rounded-lg"></div>
          <div class="flex-1 h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>

    <!-- Coupons Grid -->
    <div v-else-if="store.coupons.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <CouponCard
        v-for="c in store.coupons"
        :key="c._id"
        :coupon="c"
        @edit="openEdit"
        @view-details="openDetails"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <div class="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
        <svg class="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">No promotions yet</h3>
      <p class="text-gray-500 mb-6">Get started by creating your first promotion</p>
      <button
        class="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition font-semibold"
        @click="openCreate"
      >
        + Create Promotion
      </button>
    </div>

    <!-- Form Modal (Create/Edit) -->
    <CouponFormModal
      v-if="showFormModal"
      :coupon="editing"
      @close="closeFormModal"
      @save="save"
    />

    <!-- Details Modal -->
    <CouponDetailsModal
      v-if="showDetailsModal"
      :coupon="selectedCoupon"
      @close="closeDetailsModal"
      @edit="openEditFromDetails"
      @toggle-status="toggleStatus"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAdminCouponStore } from '@/stores/adminCouponStore'
import CouponCard from '@/components/admin/Promotion/CouponCard.vue'
import CouponFormModal from '@/components/admin/Promotion/CouponFormModal.vue'
import CouponDetailsModal from '@/components/admin/Promotion/CouponDetailModal.vue'

const store = useAdminCouponStore()

const showFormModal = ref(false)
const showDetailsModal = ref(false)
const editing = ref<any>(null)
const selectedCoupon = ref<any>(null)
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  await store.loadCoupons()
  loading.value = false
})

function openCreate() {
  editing.value = null
  showFormModal.value = true
}

function openEdit(coupon: any) {
  editing.value = coupon
  showFormModal.value = true
}

function openDetails(coupon: any) {
  selectedCoupon.value = coupon
  showDetailsModal.value = true
}

function openEditFromDetails(coupon: any) {
  showDetailsModal.value = false
  editing.value = coupon
  showFormModal.value = true
}

function closeFormModal() {
  showFormModal.value = false
  editing.value = null
}

function closeDetailsModal() {
  showDetailsModal.value = false
  selectedCoupon.value = null
}

async function save(payload: any) {
  if (editing.value) {
    await store.update(editing.value._id, payload)
  } else {
    await store.create(payload)
  }
  closeFormModal()
}

async function toggleStatus(coupon: any) {
  await store.update(coupon._id, { isActive: !coupon.isActive })
  closeDetailsModal()
}
</script>
