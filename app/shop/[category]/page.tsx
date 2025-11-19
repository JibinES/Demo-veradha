'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { ChevronDown, Filter, X } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import Button from '@/components/ui/Button'
import productsData from '@/data/products.json'
import { Product } from '@/lib/types'

const products = productsData as Product[]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Best Rating' },
]

const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const priceRanges = [
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 - ₹2,000', min: 1000, max: 2000 },
  { label: '₹2,000 - ₹3,000', min: 2000, max: 3000 },
  { label: '₹3,000 - ₹5,000', min: 3000, max: 5000 },
  { label: 'Over ₹5,000', min: 5000, max: Infinity },
]

export default function ShopPage() {
  const params = useParams()
  const category = params.category as string

  const [sortBy, setSortBy] = useState('featured')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const categoryTitle = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products as Product[]

    // Filter by category
    if (category === 'new-arrivals') {
      filtered = filtered.slice(0, 20)
    } else if (category === 'sale') {
      filtered = filtered.filter(p => p.salePrice)
    } else if (['women', 'men', 'accessories'].includes(category)) {
      filtered = filtered.filter(p => p.category === category)
    }

    // Filter by size
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p =>
        p.sizes.some(size => selectedSizes.includes(size))
      )
    }

    // Filter by price
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange]
      filtered = filtered.filter(p => {
        const price = p.salePrice || p.price
        return price >= range.min && price < range.max
      })
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low-high':
          return (a.salePrice || a.price) - (b.salePrice || b.price)
        case 'price-high-low':
          return (b.salePrice || b.price) - (a.salePrice || a.price)
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return 0
        default:
          return 0
      }
    })

    return sorted
  }, [category, sortBy, selectedSizes, selectedPriceRange])

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  const clearFilters = () => {
    setSelectedSizes([])
    setSelectedPriceRange(null)
  }

  const activeFiltersCount = selectedSizes.length + (selectedPriceRange !== null ? 1 : 0)

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {allSizes.map(size => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                selectedSizes.includes(size)
                  ? 'border-verde-600 bg-verde-50 text-verde-600'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => setSelectedPriceRange(index === selectedPriceRange ? null : index)}
              className={`w-full text-left px-4 py-2 border rounded-md text-sm transition-colors ${
                selectedPriceRange === index
                  ? 'border-verde-600 bg-verde-50 text-verde-600'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="outline" fullWidth onClick={clearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            {categoryTitle}
          </h1>
          <p className="text-gray-600 mt-2">
            {filteredAndSortedProducts.length} products
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {activeFiltersCount > 0 && (
                  <span className="text-sm text-verde-600">
                    {activeFiltersCount} active
                  </span>
                )}
              </div>
              <FiltersContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters & Sort */}
            <div className="lg:hidden flex gap-2 mb-6">
              <Button
                variant="outline"
                onClick={() => setMobileFiltersOpen(true)}
                className="flex-1"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
              </Button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verde-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop Sort */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Showing {filteredAndSortedProducts.length} products
              </p>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verde-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg mb-4">No products found</p>
                <Button variant="primary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <FiltersContent />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
