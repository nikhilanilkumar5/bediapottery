import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BookingData } from '@/types'

export interface GuestCartDisplayInfo {
  workshopTitle: string
  optionTitle: string
  price: number
  subtotal: number
  currency: string
  bannerImage: string
  image?: string
  handBuild?: number
  wheelPottery?: number
}

export interface GuestCartItem {
  id: string
  bookingData: Omit<BookingData, 'userId'>
  display: GuestCartDisplayInfo
}

interface GuestCartStore {
  items: GuestCartItem[]
  addItem: (item: Omit<GuestCartItem, 'id'>) => void
  removeItem: (index: number) => void
  clearCart: () => void
  getItemCount: () => number
}

function dispatchCartUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cart:updated'))
  }
}

export const useGuestCartStore = create<GuestCartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: item => {
        set(state => ({
          items: [
            ...state.items,
            { ...item, id: crypto.randomUUID() },
          ],
        }))
        dispatchCartUpdated()
      },

      removeItem: index => {
        set(state => ({
          items: state.items.filter((_, i) => i !== index),
        }))
        dispatchCartUpdated()
      },

      clearCart: () => {
        set({ items: [] })
        dispatchCartUpdated()
      },

      getItemCount: () => get().items.length,
    }),
    {
      name: 'guest-cart-storage',
    }
  )
)
