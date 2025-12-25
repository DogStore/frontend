import type { Category } from "./category";
import type { BaseEntity, ID } from "./common";

export interface Product extends BaseEntity{
  name: string
  size?: string
  slug: string
  description?: string
  rating: number
  images: string[]
  regularPrice: number
  discount: number
  salePrice?: number
  category: ID | Category
  stock: number
  soldCount: number
  isPromoted: boolean
  isActive: boolean
  countryFlag?: string | null
}
