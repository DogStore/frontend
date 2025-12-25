// src/types/cart.ts
import type { BaseEntity, ID } from './common'
import type { Product } from './product'

export interface CartItem {
  product: ID | Product
  name: string
  slug: string
  image: string
  price: number
  quantity: number
}

export interface Cart extends BaseEntity {
  user: ID
  items: CartItem[]
  updatedAt: string
}
