// src/stores/adminCouponStore.ts
import { defineStore } from 'pinia'
import {
  fetchAdminCoupons,
  createCoupon,
  updateCoupon,
  deactivateCoupon,
} from '@/services/coupon.service'

export const useAdminCouponStore = defineStore('adminCoupon', {
  state: () => ({
    coupons: [] as any[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async loadCoupons() {
      this.loading = true
      try {
        this.coupons = await fetchAdminCoupons()
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    async create(payload: any) {
      await createCoupon(payload)
      await this.loadCoupons()
    },

    async update(id: string, payload: any) {
      await updateCoupon(id, payload)
      await this.loadCoupons()
    },

    async deactivate(id: string) {
      await deactivateCoupon(id)
      await this.loadCoupons()
    },
  },
})
