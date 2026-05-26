'use client'

import React, { useState, useMemo, useEffect } from 'react'
import {  BookingData } from '@/types'
import{ WorkshopItem} from '@/services/workshop.service'
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


interface ProductDetailClientProps {
  product: WorkshopItem
  bookingService?: IBookingService
  timeSlotService?: ITimeSlotService
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  bookingService = new BookingService(),
  timeSlotService = new TimeSlotService(),
  product
}) => {
  useEffect(() => {   
    console.log('Received product data:', product)
  }, [product])
  const [selectedMaterialId, setSelectedMaterialId] = useState(
    product.options?.[0]?._id || ''
  )
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [showTimeSlots, setShowTimeSlots] = useState(false)

  // Derived state - computed values
  const selectedMaterial = useMemo(
    () => product.options?.find((m) => m._id === selectedMaterialId),
    [product.options, selectedMaterialId]
  )


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
      productId: product._id,
      materialId: selectedMaterialId || undefined,
      date: selectedDate || undefined,
      timeSlotId: selectedSlotId || undefined,
      quantity,
    }
    await bookingService.addToCart(bookingData)
  }

  const handleBookNow = async () => {
    const bookingData: BookingData = {
      productId: product._id,
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
          imageUrl={product?.images?.[0]?.image || '/images/product/1.png'}
          alt={product?.title}
        />

        {/* Right Section - Booking Panel */}
        <div className=" p-6 lg:p-8 space-y-6 ">
          <div>
                <Title className="2xl:mb-7 mb-5 font-normal">{product?.title}</Title>
            {product?.description && (
               <Content className=" leading-relaxed mb-7">
                       {product?.description}
                        </Content>
             
            )}
          </div>

<div className="p-[18px] bg-white">
          {/* Material Selector */}
          {product?.options && product.options.length > 0 && (
            <MaterialSelector
              materials={product?.options}
              selectedMaterialId={selectedMaterialId}
              onMaterialSelect={setSelectedMaterialId}
            />
          )}

          {/* Material Description */}
          {selectedMaterial && selectedMaterial.description && (
            <MaterialDescription
              materialName={selectedMaterial.title}
              description={selectedMaterial.description}
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
            unitPrice={selectedMaterial ? selectedMaterial.price : 0  }
            currency={selectedMaterial ? selectedMaterial.currency :'AED' }
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
