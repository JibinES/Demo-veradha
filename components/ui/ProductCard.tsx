'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Product } from '@/lib/types'
import { useStore } from '@/store/useStore'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import Card from './Card'
import Button from './Button'
import Badge from './Badge'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageIndex, setImageIndex] = useState(0)
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useStore()
  const inWishlist = isInWishlist(product.id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    const defaultSize = product.sizes[0]
    const defaultColor = product.colors[0]
    addToCart(product, defaultSize, defaultColor, 1)
    setShowQuickAdd(false)
  }

  // Generate color from product ID for consistent placeholder
  const getPlaceholderGradient = () => {
    const gradients = [
      'from-purple-400 to-pink-600',
      'from-blue-400 to-cyan-600',
      'from-green-400 to-emerald-600',
      'from-yellow-400 to-orange-600',
      'from-red-400 to-pink-600',
      'from-indigo-400 to-purple-600',
      'from-teal-400 to-cyan-600',
      'from-orange-400 to-red-600',
    ]
    const index = parseInt(product.id.replace(/\D/g, '')) || 0
    return gradients[index % gradients.length]
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/products/${product.slug}`}>
        <Card className="overflow-hidden group">
          <div
            className="relative aspect-[3/4] overflow-hidden"
            onMouseEnter={() => setImageIndex(1)}
            onMouseLeave={() => setImageIndex(0)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${getPlaceholderGradient()} transition-transform duration-300 group-hover:scale-105 flex items-center justify-center`}>
              <div className="text-white text-center p-6">
                <div className="text-4xl mb-2">👕</div>
                <p className="text-sm font-medium opacity-80">{product.name.split(' ').slice(0, 2).join(' ')}</p>
              </div>
            </div>

            {product.salePrice && (
              <div className="absolute top-2 left-2">
                <Badge variant="error">
                  {calculateDiscount(product.price, product.salePrice)}% OFF
                </Badge>
              </div>
            )}

            <button
              onClick={handleWishlistToggle}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-50"
            >
              <Heart
                className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={handleQuickAdd}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>

          <div className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {product.brand}
            </p>
            <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {product.salePrice ? (
                  <>
                    <span className="text-lg font-bold text-verde-600">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 mt-2">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(product.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                ({product.reviewCount})
              </span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
