// src/types/category.ts
import type { BaseEntity } from './common'

export interface Category extends BaseEntity {
  name: string
  slug: string
  image?: string
}
