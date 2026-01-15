// src/types/wishlist.ts
import type { BaseEntity, ID } from './common'
import type { Product } from './product'

export interface Wishlist extends BaseEntity {
  user: ID
  products: Array<ID | Product>
}
