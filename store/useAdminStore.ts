import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AdminState {
  isAuthenticated: boolean
  adminPassword: string
  login: (password: string) => boolean
  logout: () => void

  // Mock orders for demo
  orders: Order[]
  addOrder: (order: Order) => void
}

export interface Order {
  id: string
  customerName: string
  email: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: {
    productName: string
    quantity: number
    price: number
  }[]
  createdAt: string
  shippingAddress: string
}

const ADMIN_PASSWORD = 'admin123' // Default password

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      adminPassword: ADMIN_PASSWORD,

      login: (password: string) => {
        const state = get()
        if (password === state.adminPassword) {
          set({ isAuthenticated: true })
          return true
        }
        return false
      },

      logout: () => {
        set({ isAuthenticated: false })
      },

      // Mock orders
      orders: [
        {
          id: 'ORD-001',
          customerName: 'Priya Sharma',
          email: 'priya@example.com',
          total: 4598,
          status: 'delivered',
          items: [
            { productName: 'Classic Cotton T-Shirt', quantity: 2, price: 1299 },
            { productName: 'Linen Button-Down Shirt', quantity: 1, price: 1999 },
          ],
          createdAt: new Date('2024-11-15').toISOString(),
          shippingAddress: '123 Main St, Mumbai, MH 400001',
        },
        {
          id: 'ORD-002',
          customerName: 'Rahul Verma',
          email: 'rahul@example.com',
          total: 3999,
          status: 'shipped',
          items: [
            { productName: 'Flowy Maxi Dress', quantity: 1, price: 3999 },
          ],
          createdAt: new Date('2024-11-16').toISOString(),
          shippingAddress: '456 Park Ave, Delhi, DL 110001',
        },
        {
          id: 'ORD-003',
          customerName: 'Ananya Patel',
          email: 'ananya@example.com',
          total: 8497,
          status: 'processing',
          items: [
            { productName: 'High-Waisted Wide Leg Pants', quantity: 1, price: 2799 },
            { productName: 'Wrap Midi Dress', quantity: 1, price: 3499 },
            { productName: 'Silk Camisole', quantity: 1, price: 2199 },
          ],
          createdAt: new Date('2024-11-17').toISOString(),
          shippingAddress: '789 Beach Rd, Goa, GA 403001',
        },
        {
          id: 'ORD-004',
          customerName: 'Amit Kumar',
          email: 'amit@example.com',
          total: 6498,
          status: 'pending',
          items: [
            { productName: 'Denim Jacket', quantity: 1, price: 3299 },
            { productName: 'Men\'s Oxford Shirt', quantity: 1, price: 2199 },
            { productName: 'Men\'s V-Neck Tee', quantity: 1, price: 999 },
          ],
          createdAt: new Date('2024-11-18').toISOString(),
          shippingAddress: '321 Tech Park, Bangalore, KA 560001',
        },
        {
          id: 'ORD-005',
          customerName: 'Sneha Reddy',
          email: 'sneha@example.com',
          total: 4999,
          status: 'delivered',
          items: [
            { productName: 'Leather Crossbody Bag', quantity: 1, price: 4999 },
          ],
          createdAt: new Date('2024-11-14').toISOString(),
          shippingAddress: '567 Lake View, Hyderabad, TG 500001',
        },
      ],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }))
      },
    }),
    {
      name: 'verde-admin-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
