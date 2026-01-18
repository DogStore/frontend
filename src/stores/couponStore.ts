// src/stores/couponStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Coupon } from '@/types/coupon'
import { adminApi } from '@/services/api'

export const useCouponStore = defineStore('coupon', () => {
  const coupons = ref<Coupon[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCoupons() {
    loading.value = true
    error.value = null

    try {
      const res = await adminApi.get('/admin/coupons')
      coupons.value = res.data.coupons
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      error.value = 'Failed to load coupons'
    } finally {
      loading.value = false
    }
  }

  return {
    coupons,
    loading,
    error,
    fetchCoupons,
  }
})
