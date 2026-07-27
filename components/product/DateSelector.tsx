'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { format, addDays, subDays } from 'date-fns'
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateSelectorProps {
  onDateSelect: (date: Date) => void
  selectedDate?: Date | null
  className?: string
  nonAvailabilityDays?: string[]
}

// -----------------------------
// ✅ Utils (SRP)
// -----------------------------

const dayMap: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
}

const normalizeDate = (date: Date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

const isSameDay = (d1: Date, d2: Date) =>
  normalizeDate(d1).getTime() === normalizeDate(d2).getTime()

// -----------------------------
// ✅ Hook: Responsive Days Count
// -----------------------------

const useDaysCount = () => {
  const [days, setDays] = useState(5)

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth
      if (width >= 1920) setDays(7)
      else if (width >= 1280) setDays(6)
      else if (width >= 1024) setDays(5)
      else if (width >= 768) setDays(3)
      else setDays(2)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return days
}

// -----------------------------
// ✅ Hook: Disabled Days
// -----------------------------

const useDisabledDays = (nonAvailabilityDays: string[]) => {
  return useMemo(
    () => nonAvailabilityDays.map((day) => dayMap[day.toLowerCase()]),
    [nonAvailabilityDays]
  )
}

// -----------------------------
// ✅ Hook: Generate Dates
// -----------------------------

const useWeekDates = (
  baseDate: Date,
  daysCount: number,
  disabledDays: number[]
) => {
  return useMemo(() => {
    const start = normalizeDate(baseDate)
    const dates: Date[] = []
    let i = 0

    while (dates.length < daysCount) {
      const d = addDays(start, i)
      if (!disabledDays.includes(d.getDay())) {
        dates.push(d)
      }
      i++
    }

    return dates
  }, [baseDate, daysCount, disabledDays])
}

// -----------------------------
// ✅ Main Component
// -----------------------------

const DateSelector: React.FC<DateSelectorProps> = ({
  onDateSelect,
  selectedDate,
  className = '',
  nonAvailabilityDays = [''],
}) => {
  const disabledDays = useDisabledDays(nonAvailabilityDays)

  const getInitialAvailableDate = useCallback((base: Date) => {
    let target = normalizeDate(base)
    while (disabledDays.includes(target.getDay())) {
      target = addDays(target, 1)
    }
    return target
  }, [disabledDays])

  const [date, setDate] = useState<Date>(() => 
    getInitialAvailableDate(selectedDate || new Date())
  )
  const [calendarMonth, setCalendarMonth] = useState<Date>(date)
  
  // Track popover open state per side ('left' | 'right' | null)
  const [activePopover, setActivePopover] = useState<'left' | 'right' | null>(null)
  
  const daysCount = useDaysCount()
  const weekDates = useWeekDates(date, daysCount, disabledDays)

  const today = normalizeDate(new Date())
  
  // Show Left Arrow only when first date is strictly after today
  const canGoBack = weekDates.length > 0 && normalizeDate(weekDates[0]) > today

  useEffect(() => {
    if (!selectedDate || disabledDays.includes(selectedDate.getDay())) {
      const initialAvailable = getInitialAvailableDate(new Date())
      setDate(initialAvailable)
      onDateSelect(initialAvailable)
    }
  }, [disabledDays, getInitialAvailableDate])

  const handleSelect = (selected: Date | undefined) => {
    if (!selected) return
    const nextAvailable = getInitialAvailableDate(selected)
    setDate(nextAvailable)
    onDateSelect(nextAvailable)
    setActivePopover(null)
  }

  // ✅ Open left popover viewing the start of the week strip WITHOUT selecting a new date
  const handleLeftClick = () => {
    if (weekDates.length > 0) {
      setCalendarMonth(weekDates[0])
    }
    setActivePopover('left')
  }

  // ✅ Open right popover viewing the end of the week strip WITHOUT selecting a new date
  const handleRightClick = () => {
    if (weekDates.length > 0) {
      setCalendarMonth(weekDates[weekDates.length - 1])
    }
    setActivePopover('right')
  }

  const isDisabledDate = (d: Date) => {
    if (normalizeDate(d) < today) return true
    if (disabledDays.includes(d.getDay())) return true
    return false
  }

  return (
    <div className={`flex items-center gap-3 relative ${className}`}>
      {/* ✅ Left Arrow Popover */}
      {canGoBack && (
        <Popover 
          open={activePopover === 'left'} 
          onOpenChange={(open) => setActivePopover(open ? 'left' : null)}
        >
          <PopoverTrigger asChild>
            <button
              type="button"
              onClick={handleLeftClick}
              className="p-2 hover:scale-105 transition flex-shrink-0 absolute -left-5 top-1/2 -translate-y-1/2 z-10"
              aria-label="Open Calendar (Left)"
            >
              <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.24367 6.5L6.78874 11.6134C7.07042 11.9303 7.07042 12.4454 6.78874 12.7623C6.50707 13.0792 6.04917 13.0792 5.76749 12.7623L0.711797 7.07447C0.429399 6.75758 0.429399 6.24242 0.711797 5.92553L5.76749 0.237671C6.04917 -0.0792236 6.50707 -0.0792236 6.78874 0.237671C7.07042 0.554565 7.07042 1.06972 6.78874 1.38662L2.24367 6.5Z"
                  fill="#113224"
                />
              </svg>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              month={calendarMonth}
              onMonthChange={setCalendarMonth}
              selected={date}
              onSelect={handleSelect}
              disabled={isDisabledDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}

      {/* ✅ Date Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 flex-1">
        {weekDates.map((d, i) => {
          const isSelected = isSameDay(d, date)

          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                setDate(d)
                onDateSelect(d)
              }}
              className={`w-full px-3.5 py-3 border text-center transition-all 
                ${isSelected
                  ? "bg-primary text-white border-primary font-bold"
                  : "bg-white text-primary border-gray-200 hover:border-black "
                }
              `}
            >
              <div className="text-sm ">{format(d, "EEE")}</div>
              <div className="text-base font-semibold mt-0.5">
                {format(d, "MMM dd")}
              </div>
            </button>
          )
        })}
      </div>

      {/* ✅ Right Arrow Popover */}
      <Popover 
        open={activePopover === 'right'} 
        onOpenChange={(open) => setActivePopover(open ? 'right' : null)}
      >
        <PopoverTrigger asChild>
          <button
            type="button"
            onClick={handleRightClick}
            className="p-2 absolute -right-5 hover:scale-105 transition flex-shrink-0"
            aria-label="Open Calendar (Right)"
          >
            <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.75633 6.5L0.211256 11.6134C-0.0704188 11.9303 -0.0704188 12.4454 0.211256 12.7623C0.49293 13.0792 0.950831 13.0792 1.23251 12.7623L6.2882 7.07447C6.5706 6.75758 6.5706 6.24242 6.2882 5.92553L1.23251 0.237671C0.950831 -0.0792236 0.49293 -0.0792236 0.211256 0.237671C-0.0704188 0.554565 -0.0704188 1.06972 0.211256 1.38662L4.75633 6.5Z"
                fill="#113224"
              />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            month={calendarMonth}
            onMonthChange={setCalendarMonth}
            selected={date}
            onSelect={handleSelect}
            disabled={isDisabledDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateSelector