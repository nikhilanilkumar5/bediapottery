'use client'

import React from 'react'

/**
 * BookingActions Component
 * Single Responsibility: Handle booking action buttons only
 * Open/Closed: Extensible through props, closed for modification
 */
interface BookingActionsProps {
  onBookNow: () => void
  isBookingDisabled?: boolean
  className?: string
}

const BookingActions: React.FC<BookingActionsProps> = ({
  onBookNow,
  isBookingDisabled = false,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <button
        onClick={onBookNow}
        disabled={isBookingDisabled}
        className="w-full bg-primary text-white px-6 py-4  font-medium hover:bg-primary-dark transition-colors duration-200  "
      >
        Book Now
      </button>
    </div>
  )
}

export default BookingActions
