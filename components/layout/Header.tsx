'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Heart, Menu, X, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import Badge from '@/components/ui/Badge'

const categories = [
  { name: 'Women', href: '/shop/women' },
  { name: 'Men', href: '/shop/men' },
  { name: 'Accessories', href: '/shop/accessories' },
  { name: 'New Arrivals', href: '/shop/new-arrivals' },
  { name: 'Sale', href: '/shop/sale', highlight: true },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { getCartItemsCount, wishlist } = useStore()
  const cartCount = getCartItemsCount()

  return (
    <>
      {/* Top Banner */}
      <div className="bg-verde-600 text-white py-2 text-center text-sm">
        Free shipping on orders over ₹999 | 30-day returns
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-display font-bold">
                <span className="text-gray-900">Verde</span>
                <span className="text-verde-600"> Fashion</span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    category.highlight
                      ? 'text-verde-600 hover:text-verde-700'
                      : 'text-gray-700 hover:text-verde-600'
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button
                className="p-2 text-gray-600 hover:text-verde-600 transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account */}
              <Link
                href="/account"
                className="hidden md:block p-2 text-gray-600 hover:text-verde-600 transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative p-2 text-gray-600 hover:text-verde-600 transition-colors">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-1 -right-1">
                    {wishlist.length}
                  </Badge>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-verde-600 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="py-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for products..."
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-verde-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
            <nav className="absolute left-0 top-0 bottom-0 w-64 bg-white p-6 overflow-y-auto">
              <div className="space-y-4">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className={`block text-lg font-medium ${
                      category.highlight ? 'text-verde-600' : 'text-gray-900'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/account"
                    className="block text-lg font-medium text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Account
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
