import { BookingData } from '@/types'

/**
 * BookingService
 * Single Responsibility: Handle booking business logic
 * Dependency Inversion: Abstract service that can be replaced
 */
export interface IBookingService {
  addToCart(data: BookingData): Promise<void>
  bookNow(data: BookingData): Promise<void>
}

export class BookingService implements IBookingService {
  async addToCart(data: BookingData): Promise<void> {
    // Implementation for adding to cart
    console.log('Adding to cart:', data)
    // TODO: Implement actual cart logic
  }

  async bookNow(data: BookingData): Promise<void> {
    // Implementation for booking
    console.log('Booking now:', data)
    // TODO: Implement actual booking logic
  }
}
