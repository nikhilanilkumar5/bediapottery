
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
  startTime?: string
  endTime?: string
  wheelPottery?: number
}

export interface GuestCartItem {
  id: string
  bookingData: Omit<BookingData, 'userId'>
  display: GuestCartDisplayInfo
}

interface GuestCartStore {
  items: GuestCartItem[]
  addItem: (item: Omit<GuestCartItem, 'id'>) => boolean
  removeItem: (index: number) => void
  clearCart: () => void
  getItemCount: () => number
}

function normalizeDate(date?: string) {
  if (!date) return ''

  return date.split('T')[0].trim()
}

function normalizeTime(time?: string) {
  if (!time) return ''

  return time.trim()
}

function normalizeWorkshopId(workshopId: unknown): string {
  if (!workshopId) return ''

  if (typeof workshopId === 'string') {
    return workshopId
  }

  if (typeof workshopId === 'object') {
    const value = workshopId as {
      _id?: string
      id?: string
    }

    return value._id ?? value.id ?? ''
  }

  return String(workshopId)
}

/**
 * IMPORTANT:
 *
 * Only these 4 values determine whether an item is already
 * in the cart:
 *
 * workshop + date + startTime + endTime
 *
 * optionId, optionTitle, people, price, etc. are ignored.
 */
function getDuplicateKey(
  bookingData: Partial<BookingData> & {
    workshopId?: unknown
    bookingDate?: string
    startTime?: string
    endTime?: string
  }
) {
  const workshopId = normalizeWorkshopId(bookingData.workshopId)
  const date = normalizeDate(bookingData.bookingDate)
  const startTime = normalizeTime(bookingData.startTime)
  const endTime = normalizeTime(bookingData.endTime)

  return [
    workshopId,
    date,
    startTime,
    endTime,
  ].join('|')
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
        const newKey = getDuplicateKey(item.bookingData)

        const isDuplicate = get().items.some(existingItem => {
          const existingKey = getDuplicateKey(
            existingItem.bookingData
          )

          return existingKey === newKey
        })

        if (isDuplicate) {
          return false
        }

        set(state => ({
          items: [
            ...state.items,
            {
              ...item,
              id: crypto.randomUUID(),
            },
          ],
        }))

        dispatchCartUpdated()

        return true
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
