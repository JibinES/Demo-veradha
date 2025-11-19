'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const SHIPPING_THRESHOLD = 999
const SHIPPING_COST = 99

export default function CartPage() {
  const router = useRouter()
  const { cart, updateCartItemQuantity, removeFromCart, getCartTotal } = useStore()
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)

  const subtotal = getCartTotal()
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const discount = discountApplied ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === 'VERDE10') {
      setDiscountApplied(true)
    } else {
      alert('Invalid discount code')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added anything to your cart yet.
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
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                className="bg-white rounded-lg p-4 md:p-6 flex gap-4"
              >
                <div className="relative w-24 h-32 md:w-32 md:h-40 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between gap-4 mb-2">
                      <div>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-semibold text-gray-900 hover:text-verde-600"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.product.brand}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          removeFromCart(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor
                          )
                        }
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex gap-4 text-sm text-gray-600 mb-3">
                      <span>Size: {item.selectedSize}</span>
                      <span>Color: {item.selectedColor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateCartItemQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartItemQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-bold text-gray-900">
                      {formatPrice(
                        (item.product.salePrice || item.product.price) * item.quantity
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-verde-600' : ''}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-verde-600">
                    <span>Discount (VERDE10)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {subtotal < SHIPPING_THRESHOLD && (
                <div className="bg-verde-50 border border-verde-200 rounded-md p-3 mb-6">
                  <p className="text-sm text-verde-800">
                    Add {formatPrice(SHIPPING_THRESHOLD - subtotal)} more to get FREE shipping!
                  </p>
                </div>
              )}

              {!discountApplied && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={handleApplyDiscount}>
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Try code: VERDE10
                  </p>
                </div>
              )}

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => router.push('/checkout')}
                className="mb-4"
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="outline"
                fullWidth
                onClick={() => router.push('/shop/women')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
