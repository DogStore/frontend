// src/types/product.ts

export interface Product {
  id: string
  name: string
  images: string[]
  price: number
  originalPrice: number
  discount: number
  rating: number
  countryFlag?: string | null
  isActive: boolean
  isFavorite: boolean
  inCart: boolean
  category: string | { _id: string; name: string; slug: string }
  stock: number
  description: string
  size?: string
  soldCount?: number
  isPromoted?: boolean
  addedAt?: number
  countryName: string
}
export interface CartProduct extends Product {
  quantity?: number
}

export interface FavoriteProduct extends Product {
  addedAt: number
}
