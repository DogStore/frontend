// src/types/order.ts
import type { BaseEntity, ID } from './common'
import type { Product } from './product'

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'canceled'

export interface OrderItem {
  product: ID | Product
  name: string
  slug: string
  image: string
  price: number
  quantity: number
}

export interface ShippingAddress {
  title?: string
  street?: string
  city?: string
  country?: string
  postalCode?: string
}

export interface Order extends BaseEntity {
  orderNumber: string
  user: ID
  customerName: string
  phone?: string

  items: OrderItem[]
  totalAmount: number

  shippingAddress: ShippingAddress
  status: OrderStatus

  appliedCoupon?: {
    code: string
    discountAmount: number
  }
}

