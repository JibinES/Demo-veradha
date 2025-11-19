'use client'

import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { useStore } from '@/store/useStore'
import ProductCard from '@/components/ui/ProductCard'
import Button from '@/components/ui/Button'
import productsData from '@/data/products.json'
import { Product } from '@/lib/types'

const products = productsData as Product[]

export default function WishlistPage() {
  const router = useRouter()
  const { wishlist } = useStore()

  const wishlistProducts = products.filter(p => wishlist.includes(p.id))

  if (wishlist.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h1>
        <p className="text-gray-600 mb-8">
          Save your favorite items for later!
        </p>
        <Button onClick={() => router.push('/shop/women')}>
          Start Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            My Wishlist
          </h1>
          <p className="text-gray-600 mt-2">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
