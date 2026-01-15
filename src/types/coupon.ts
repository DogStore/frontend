// src/types/coupon.ts
import type { BaseEntity } from './common'

export type CouponType = 'percent' | 'fixed'

export interface Coupon extends BaseEntity {
  code: string
  title?: string
  type: CouponType
  value: number
  minOrderAmount?: number
  usageLimitTotal?: number
  usageLimitPerUser: number
  usedCount: number
  validUntil?: string
  isActive: boolean
}
