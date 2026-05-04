'use client'

import React, { useState, useMemo } from 'react'
import { Product, BookingData } from '@/types'
import ProductMedia from './ProductMedia'
import PriceDisplay from './PriceDisplay'
import MaterialSelector from './MaterialSelector'
import MaterialDescription from './MaterialDescription'
import DateSelector from './DateSelector'
import TimeSlotSelector from './TimeSlotSelector'
import QuantitySelector from './QuantitySelector'
import BookingActions from './BookingActions'
import { BookingService, IBookingService } from '@/services/booking.service'
import { TimeSlotService, ITimeSlotService } from '@/services/timeSlot.service'
import { Content, Title } from '../ui'

/**
 * ProductDetailClient Component
 * Single Responsibility: Orchestrate product detail UI and booking flow
 * Dependency Inversion: Depends on service interfaces, not concrete implementations
 */
interface ProductDetailClientProps {
  product: Product
  bookingService?: IBookingService
  timeSlotService?: ITimeSlotService
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  bookingService = new BookingService(),
  timeSlotService = new TimeSlotService(),
}) => {
  // State management - each state has single responsibility
  const [selectedMaterialId, setSelectedMaterialId] = useState(
    product.materials?.[0]?.id || ''
  )
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [showTimeSlots, setShowTimeSlots] = useState(false)

  // Derived state - computed values
  const selectedMaterial = useMemo(
    () => product.materials?.find((m) => m.id === selectedMaterialId),
    [product.materials, selectedMaterialId]
  )

  const materialDescription = useMemo(() => {
    return (
      product.materialDescriptions?.[selectedMaterialId] ||
      selectedMaterial?.description ||
      ''
    )
  }, [product.materialDescriptions, selectedMaterialId, selectedMaterial])

  const timeSlots = useMemo(() => {
    if (!selectedDate) return []
    return timeSlotService.getTimeSlotsForDate(selectedDate)
  }, [selectedDate, timeSlotService])

  // Event handlers - single responsibility per handler
  const handleDateSelect = (date: Date) => {
    const isSameDate =
      selectedDate &&
      date.toDateString() === selectedDate.toDateString()

    if (isSameDate && showTimeSlots) {
      // Toggle off if same date clicked
      setShowTimeSlots(false)
      setSelectedSlotId(null)
      setSelectedDate(null)
    } else {
      // Show slots for new date
      setSelectedDate(date)
      setShowTimeSlots(true)
      setSelectedSlotId(null)
    }
  }

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlotId(slotId)
  }

  const handleAddToCart = async () => {
    const bookingData: BookingData = {
      productId: product.id,
      materialId: selectedMaterialId || undefined,
      date: selectedDate || undefined,
      timeSlotId: selectedSlotId || undefined,
      quantity,
    }
    await bookingService.addToCart(bookingData)
  }

  const handleBookNow = async () => {
    const bookingData: BookingData = {
      productId: product.id,
      materialId: selectedMaterialId || undefined,
      date: selectedDate || undefined,
      timeSlotId: selectedSlotId || undefined,
      quantity,
    }
    await bookingService.bookNow(bookingData)
  }

  const isBookingDisabled = !selectedDate || !selectedSlotId

  return (
    <div className="page-wrapper ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Media */}
        <ProductMedia
          imageUrl={'/images/product/1.png'}
          videoUrl={product.videoUrl}
          alt={product.title}
        />

        {/* Right Section - Booking Panel */}
        <div className=" p-6 lg:p-8 space-y-6 ">
          <div>
                <Title className="2xl:mb-7 mb-5 font-normal">{product.title}</Title>
            {product.description && (
               <Content className=" leading-relaxed mb-7">
                       {product.description}
                        </Content>
             
            )}
          </div>

          {/* Price Display */}
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
          />
<div className="p-[18px] bg-white">
          {/* Material Selector */}
          {product.materials && product.materials.length > 0 && (
            <MaterialSelector
              materials={product.materials}
              selectedMaterialId={selectedMaterialId}
              onMaterialSelect={setSelectedMaterialId}
            />
          )}

          {/* Material Description */}
          {selectedMaterial && materialDescription && (
            <MaterialDescription
              materialName={selectedMaterial.name}
              description={materialDescription}
            />
          )}
</div>
          {/* Date Selector */}
          <div className="p-[18px] bg-white">
          <DateSelector
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          /></div>

          {/* Time Slots */}
          {/* {showTimeSlots && selectedDate && timeSlots.length > 0 && (
            <div className="pt-4 border-t-2 border-gray-300 animate-dotIn">
              <TimeSlotSelector
                slots={timeSlots}
                selectedSlotId={selectedSlotId}
                onSlotSelect={handleSlotSelect}
              />
            </div>
          )} */}

          {/* Quantity Selector */}
            <div className="p-[18px] bg-white">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity(quantity + 1)}
            onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
            unitPrice={product.price}
          />
</div>
          {/* Booking Actions */}
          <BookingActions
            onBookNow={handleBookNow}
            isBookingDisabled={isBookingDisabled}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailClient
