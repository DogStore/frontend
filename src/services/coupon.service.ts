import { adminApi } from '@/services/api'

export const fetchAdminCoupons = async () => {
  const res = await adminApi.get('/admin/coupons')
  return res.data.coupons
}

export const createCoupon = async (payload: any) => {
  return adminApi.post('/admin/coupons', payload)
}

export const updateCoupon = async (id: string, payload: any) => {
  return adminApi.put(`/admin/coupons/${id}`, payload)
}

export const deactivateCoupon = async (id: string) => {
  return adminApi.delete(`/admin/coupons/${id}`)
}
