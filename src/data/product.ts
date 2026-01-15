export interface Product {
  id: string
  name: string
  price: number
  category: string | { _id: string; name: string; slug: string }
  country: string
  image?: string
  flag?: String
  star?: String
  reviews?: Review[]
  slug: String

  // For product details page
  images?: string[]
  rating?: number
  variants?: {
    label: string
    price: number
  }[]
  reviewCount?: number
  description?: string
}

export interface Review {
  id: number
  author: String
  rating: number
  comment: String
  date: string
}
