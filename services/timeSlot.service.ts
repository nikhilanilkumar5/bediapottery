import { TimeSlot } from '@/types'

/**
 * TimeSlotService
 * Single Responsibility: Generate time slots for a given date
 * Dependency Inversion: Abstract service interface
 */
export interface ITimeSlotService {
  getTimeSlotsForDate(date: Date): TimeSlot[]
}

export class TimeSlotService implements ITimeSlotService {
  getTimeSlotsForDate(date: Date): TimeSlot[] {
    // Example implementation - can be replaced with API call
    return [
      { id: '1', time: '10:00 AM', available: true },
      { id: '2', time: '12:00 PM', available: true },
      { id: '3', time: '2:00 PM', available: true },
      { id: '4', time: '4:00 PM', available: true },
      { id: '5', time: '6:00 PM', available: false },
      { id: '6', time: '8:00 PM', available: true },
    ]
  }
}
