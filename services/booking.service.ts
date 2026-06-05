import { useAuthStore } from '@/store/authStore'
import { BookingData } from '@/types'
/**
 * BookingService
 * Single Responsibility: Handle booking API logic
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || ''

function assertApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error(
      'NEXT_PUBLIC_API_BASE_URL is not set in environment variables'
    )
  }
}

export interface IBookingService {
  addToCart(data: BookingData): Promise<any>
  bookNow(data: BookingData): Promise<any>
}

export class BookingService
  implements IBookingService
{

  async addToCart(
    data: BookingData
  ): Promise<any> {
    assertApiBaseUrl()
const token : string | null = useAuthStore.getState().user?.token || null

    const res = await fetch(
      `${API_BASE_URL}/workshop/cart`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )

    const raw = await res
      .json()
      .catch(() => null)

    console.log('Add to cart API:', raw)

    if (!res.ok) {
      throw new Error(
        `Add to cart failed: ${res.status} ${
          res.statusText
        }${
          raw
            ? ` - ${JSON.stringify(raw)}`
            : ''
        }`
      )
    }

    return raw
  }

  async bookNow(
    data: BookingData
  ): Promise<any> {
    assertApiBaseUrl()

    const token : string | null = useAuthStore.getState().user?.token || null

    const res = await fetch(
      `${API_BASE_URL}/booking/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )

    const raw = await res
      .json()
      .catch(() => null)

    console.log('Book now API:', raw)

    if (!res.ok) {
      throw new Error(
        `Booking failed: ${res.status} ${
          res.statusText
        }${
          raw
            ? ` - ${JSON.stringify(raw)}`
            : ''
        }`
      )
    }

    return raw
  }
}