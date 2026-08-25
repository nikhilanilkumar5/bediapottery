'use client'

import React from 'react'

interface MobileQuantityBarProps {
  materialTitle?: string
  currency?: string
  totalPrice: number
  isVisible: boolean
  onScrollToQuantity: () => void
  actionLabel?: string
}

const MobileQuantityBar: React.FC<MobileQuantityBarProps> = ({
  materialTitle,
  currency = 'AED',
  totalPrice,
  isVisible,
  onScrollToQuantity,
  actionLabel = 'Select Quantity',
}) => {
  if (!isVisible || !materialTitle) return null

  return (
    <div
      onClick={onScrollToQuantity}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 px-4 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] z-40 flex items-center justify-between cursor-pointer transition-opacity duration-300"
    >
      <div>
        <span className="text-[11px] text-gray-500 uppercase tracking-wider block font-medium">
          {materialTitle}
        </span>
        <span className="text-lg font-bold text-black">
          {currency} {totalPrice}
        </span>
      </div>
      <button
        type="button"
        className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded shadow-sm flex items-center gap-1"
      >
        {actionLabel} &rarr;
      </button>
    </div>
  )
}

export default MobileQuantityBar