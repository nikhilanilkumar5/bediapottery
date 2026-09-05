
import { CartData, CartItem, getCartData } from '@/services/cart.service'
import { BookingService } from '@/services/booking.service'
import { useAuthStore } from '@/store/authStore'
import { BookingData } from '@/types'
import {
  GuestCartDisplayInfo,
  GuestCartItem,
  useGuestCartStore,
} from '@/store/guestCartStore'

const inFlightBookingKeys = new Set<string>()

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
 * This is the ONLY key used to determine duplicates.
 *
 * Same:
 *   workshop
 *   date
 *   start time
 *   end time
 *
 * = duplicate
 */
type BookingKeyInput = {
  workshopId?: unknown
  bookingDate?: string
  startTime?: string
  endTime?: string
}

function getBookingKey(bookingData: BookingKeyInput) {
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

function isSameBooking(
  item: CartItem,
  bookingData: Omit<BookingData, 'userId'>
) {
  if (
    normalizeWorkshopId(item.workshopId) !==
    normalizeWorkshopId(bookingData.workshopId) ||
    normalizeDate(item.bookingDate) !==
    normalizeDate(bookingData.bookingDate)
  ) {
    return false
  }

  const hasTimes =
    normalizeTime(item.startTime) &&
    normalizeTime(item.endTime) &&
    normalizeTime(bookingData.startTime) &&
    normalizeTime(bookingData.endTime)

  if (hasTimes) {
    return (
      normalizeTime(item.startTime) === normalizeTime(bookingData.startTime) &&
      normalizeTime(item.endTime) === normalizeTime(bookingData.endTime)
    )
  }

  return Boolean(item.slotId && bookingData.slotId) &&
    item.slotId === bookingData.slotId
}

export function guestCartToCartData(
  items: GuestCartItem[]
): CartData[] {
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

    startTime:
      item.bookingData.startTime ??
      item.display.startTime,

    endTime:
      item.bookingData.endTime ??
      item.display.endTime,

    bookingType: item.bookingData.bookingType,

    optionId: item.bookingData.optionId,

    optionTitle: item.display.optionTitle,

    people: item.bookingData.people,

    price: item.display.price,

    subtotal: item.display.subtotal,

    currency: item.display.currency,

    wheelPottery:
      item.display.wheelPottery ??
      item.bookingData.wheelPottery,

    handBuild:
      item.display.handBuild ??
      item.bookingData.handBuild,
  }))

  const totalAmount = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.subtotal,
    0
  )

  const totalPeople = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.people,
    0
  )

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

  const bookingKey = getBookingKey(bookingData)

  /**
   * ============================
   * GUEST USER
   * ============================
   */
  if (!user?.token || !user?.userId) {
    const added = useGuestCartStore
      .getState()
      .addItem({
        bookingData,
        display,
      })

    if (!added) {
      throw new Error(
        'This workshop is already in your cart for the selected date and time.'
      )
    }

    return
  }

  /**
   * ============================
   * PREVENT DOUBLE CLICK
   * ============================
   */
  if (inFlightBookingKeys.has(bookingKey)) {
    throw new Error(
      'This workshop is already being added for the selected date and time.'
    )
  }

  inFlightBookingKeys.add(bookingKey)

  try {
    /**
     * ============================
     * GET SERVER CART
     * ============================
     */
    const cart = await getCartData()

    const existingItems = cart.flatMap(
      cartData => cartData.items ?? []
    )

    /**
     * ============================
     * CHECK DUPLICATE
     * ============================
     */
    const isDuplicate = existingItems.some(existingItem =>
      isSameBooking(existingItem, bookingData)
    )

    if (isDuplicate) {
      throw new Error(
        'This workshop is already in your cart for the selected date and time.'
      )
    }

    /**
     * ============================
     * ADD TO SERVER
     * ============================
     */
    const {
      startTime,
      endTime,
      ...cleanedBookingData
    } = bookingData as Omit<BookingData, 'userId'> & {
      startTime?: unknown
      endTime?: unknown
    }

    await bookingService.addToCart({
      ...cleanedBookingData,
      userId: user.userId,
    } as BookingData)
  } finally {
    inFlightBookingKeys.delete(bookingKey)
  }
}

export async function syncGuestCartToServer(
  userId: string
): Promise<void> {
  const {
    items,
    clearCart,
  } = useGuestCartStore.getState()

  if (items.length === 0) {
    return
  }

  const bookingService = new BookingService()

  const existingCart = await getCartData()

  const existingItems = existingCart.flatMap(
    cartData => cartData.items ?? []
  )

  /**
   * Keep track of guest items that were already synced.
   */
  const syncedKeys = new Set<string>()

  for (const item of items) {
    const bookingKey = getBookingKey(
      item.bookingData
    )

    /**
     * Already synced from guest cart
     */
    if (syncedKeys.has(bookingKey)) {
      continue
    }

    /**
     * Already exists on server
     */
    const alreadyExistsOnServer = existingItems.some(existingItem =>
      isSameBooking(existingItem, item.bookingData)
    )

    if (alreadyExistsOnServer) {
      continue
    }

    const {
      startTime,
      endTime,
      ...cleanedBookingData
    } = item.bookingData as Omit<BookingData, 'userId'> & {
      startTime?: unknown
      endTime?: unknown
    }

    await bookingService.addToCart({
      ...cleanedBookingData,
      userId,
    } as BookingData)

    syncedKeys.add(bookingKey)
  }

  clearCart()
}
