import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BookingData {
  userId: string;
  workshopId: string;
  optionId: string;
  bookingDate: string;
  slotId: string;
  people: number;
}

interface BookingStore {
  booking: BookingData | null;

  setBooking: (booking: BookingData) => void;

  clearBooking: () => void;

  getBooking: () => BookingData | null;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      booking: null,

      setBooking: booking => {
        set({ booking });
      },

      clearBooking: () => {
        set({ booking: null });
      },

      getBooking: () => {
        return get().booking;
      },
    }),
    {
      name: "booking-storage",
    }
  )
);