import { CartData, CartItem } from '@/services/cart.service'
import { BookingService } from '@/services/booking.service'
import { useAuthStore } from '@/store/authStore'
import { BookingData } from '@/types'
import {
  GuestCartDisplayInfo,
  GuestCartItem,
  useGuestCartStore,
} from '@/store/guestCartStore'

export function guestCartToCartData(items: GuestCartItem[]): CartData[] {
  if (items.length === 0) {
    return []
  }

  const cartItems: CartItem[] = items.map(item => ({
    workshopId: {
      _id: item.bookingData.workshopId,
      title: item.display.workshopTitle,
      bannerImage: item.display.bannerImage,
      images: item.display.image
        ? [
            {
              image: item.display.image,
              title: item.display.workshopTitle,
              _id: item.bookingData.workshopId,
            },
          ]
        : [],
    },
    bookingDate: item.bookingData.bookingDate || '',
    slotId: item.bookingData.slotId ?? '',
    bookingType: item.bookingData.bookingType,
    optionId: item.bookingData.optionId,
    optionTitle: item.display.optionTitle,
    people: item.bookingData.people,
    price: item.display.price,
    subtotal: item.display.subtotal,
    currency: item.display.currency,
    wheelPottery:
      item.display.wheelPottery ?? item.bookingData.wheelPottery,
    handBuild: item.display.handBuild ?? item.bookingData.handBuild,
  }))

  const totalAmount = cartItems.reduce((sum, cartItem) => sum + cartItem.subtotal, 0)
  const totalPeople = cartItems.reduce((sum, cartItem) => sum + cartItem.people, 0)

  return [
    {
      _id: 'guest',
      userId: 'guest',
      items: cartItems,
      totalPeople,
      totalAmount,
      taxPercent: 0,
      taxAmount: 0,
      grandTotal: totalAmount,
      __v: 0,
    },
  ]
}

export async function addToCartOrGuest(
  bookingData: Omit<BookingData, 'userId'>,
  display: GuestCartDisplayInfo,
  bookingService = new BookingService()
): Promise<void> {
  const { user } = useAuthStore.getState()

  if (!user?.token || !user?.userId) {
    useGuestCartStore.getState().addItem({ bookingData, display })
    return
  }

  // Safely extract startTime and endTime without breaking BookingData type inference
  const { startTime, endTime, ...cleanedBookingData } = bookingData as Omit<
    BookingData,
    'userId'
  > & { startTime?: unknown; endTime?: unknown }

  await bookingService.addToCart({
    ...cleanedBookingData,
    userId: user.userId,
  } as BookingData)
}

export async function syncGuestCartToServer(userId: string): Promise<void> {
  const { items, clearCart } = useGuestCartStore.getState()

  if (items.length === 0) {
    return
  }

  const bookingService = new BookingService()

  for (const item of items) {
    // Safely extract startTime and endTime before syncing guest items to server
    const { startTime, endTime, ...cleanedBookingData } = item.bookingData as Omit<
      BookingData,
      'userId'
    > & { startTime?: unknown; endTime?: unknown }

    await bookingService.addToCart({
      ...cleanedBookingData,
      userId,
    } as BookingData)
  }

  clearCart()
}