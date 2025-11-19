import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Product, CartItem, WishlistItem } from '@/lib/types'

interface StoreState {
  // Cart
  cart: CartItem[]
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void
  removeFromCart: (productId: string, size: string, color: string) => void
  updateCartItemQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemsCount: () => number

  // Wishlist
  wishlist: string[]
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],

      addToCart: (product, size, color, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color
          )

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id &&
                item.selectedSize === size &&
                item.selectedColor === color
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }

          return {
            cart: [
              ...state.cart,
              {
                product,
                quantity,
                selectedSize: size,
                selectedColor: color,
              },
            ],
          }
        })
      },

      removeFromCart: (productId, size, color) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor === color
              )
          ),
        }))
      },

      updateCartItemQuantity: (productId, size, color, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        }))
      },

      clearCart: () => {
        set({ cart: [] })
      },

      getCartTotal: () => {
        const state = get()
        return state.cart.reduce((total, item) => {
          const price = item.product.salePrice || item.product.price
          return total + price * item.quantity
        }, 0)
      },

      getCartItemsCount: () => {
        const state = get()
        return state.cart.reduce((count, item) => count + item.quantity, 0)
      },

      // Wishlist state
      wishlist: [],

      addToWishlist: (productId) => {
        set((state) => {
          if (!state.wishlist.includes(productId)) {
            return { wishlist: [...state.wishlist, productId] }
          }
          return state
        })
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== productId),
        }))
      },

      isInWishlist: (productId) => {
        return get().wishlist.includes(productId)
      },
    }),
    {
      name: 'verde-fashion-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
