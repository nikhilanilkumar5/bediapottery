import { useMemo } from "react";
import { isToday } from "date-fns";

/**
 * Custom hook to filter time slots based on whether today is selected
 * Removes past slots for today based on UAE timezone (UTC+4)
 *
 * @param selectedDate - The currently selected date
 * @param slots - Array of available time slots (supports any slot type with startTime)
 * @returns Filtered array of available slots
 */
export const useFilteredTimeSlots = <T extends { startTime: string; [key: string]: any }>(
  selectedDate: Date | null,
  slots: T[]
): T[] => {
  // Helper function to convert 12-hour format to 24-hour format for comparison
  const convert12To24Hour = (time12h: string): string => {
    const [time, period] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    let hour = parseInt(hours, 10);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return `${String(hour).padStart(2, "0")}:${minutes}`;
  };

  return useMemo(() => {
    if (!selectedDate || !isToday(selectedDate)) {
      return slots;
    }

    // Get current time in UAE timezone (UTC+4)
    const now = new Date();
    const uaeTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Dubai" }));
    const currentHours = String(uaeTime.getHours()).padStart(2, "0");
    const currentMinutes = String(uaeTime.getMinutes()).padStart(2, "0");
    const currentTime = `${currentHours}:${currentMinutes}`;

    // Filter slots: only show slots that haven't started yet
    return slots.filter((slot) => {
      // Convert slot start time from 12-hour to 24-hour format for comparison
      const slotStartTime24h = convert12To24Hour(slot.startTime);
      // Compare start time with current time - only show upcoming slots
      return slotStartTime24h > currentTime;
    });
  }, [selectedDate, slots]);
};
