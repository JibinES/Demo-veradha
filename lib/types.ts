export interface Product {
  id: string
  name: string
  slug: string
  category: 'women' | 'men' | 'accessories'
  subcategory: string
  brand: string
  price: number
  salePrice?: number
  images: string[]
  sizes: string[]
  colors: string[]
  description: string
  features: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  sku: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize: string
  selectedColor: string
}

export interface WishlistItem {
  productId: string
}

export interface FilterOptions {
  categories: string[]
  sizes: string[]
  priceRange: [number, number]
  colors: string[]
  brands: string[]
}

export interface SortOption {
  value: string
  label: string
}

export type Category = 'women' | 'men' | 'accessories' | 'new-arrivals' | 'sale'
