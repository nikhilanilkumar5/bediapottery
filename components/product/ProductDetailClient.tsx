'use client'

import React, { useState, useMemo, useEffect } from 'react'
import {  BookingData,Availability, AvailabilityResponse } from '@/types'
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
import { getAvailabilityData } from '@/services/avaliablity.service'
import { Content, Title } from '../ui'
import { useRouter } from "next/navigation";

interface ProductDetailClientProps {
  product: WorkshopItem
  bookingService?: IBookingService
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  bookingService = new BookingService(),
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
  const [formattedDate, setFormattedDate] = useState<string>('')
  const [dateError, setDateError] = useState<string>('')
  const [slotError, setSlotError] = useState<string>('')
  const [availabilityError, setAvailabilityError] = useState<string>('')
const router = useRouter()
  // Derived state - computed values
  const selectedMaterial = useMemo(
    () => product.options?.find((m) => m._id === selectedMaterialId),
    [product.options, selectedMaterialId]
  )



  // Event handlers - single responsibility per handler
  const handleDateSelect = (date: Date) => {
    const isSameDate =
      selectedDate &&
      date.toDateString() === selectedDate.toDateString()

    if (isSameDate ) {
      // Toggle off if same date clicked
      setSelectedSlotId(null)
      setSelectedDate(null)
      setFormattedDate('')
    } else {
      // Show slots for new date
      setSelectedDate(date)
      setFormattedDate(date.toISOString().split('T')[0]) // Format as YYYY-MM-DD
      setSelectedSlotId(null)
    }

    setDateError('')
  }

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlotId(slotId)
    setSlotError('')
  }

  const validateSelection = () => {
    let isValid = true
    if (!selectedDate) {
      setDateError('Please select a date before continuing.')
      isValid = false
    } else {
      setDateError('')
    }

    if (!selectedSlotId) {
      setSlotError('Please select a time slot before continuing.')
      isValid = false
    } else {
      setSlotError('')
    }

    return isValid
  }

  const handleAddToCart = async () => {
    if (!validateSelection()) {
      return
    }

    const bookingData: BookingData = {
      userId: '65f1a2b3c4d5e6f7890a1234',
      workshopId: product._id,
      optionId: selectedMaterialId,
      bookingDate: formattedDate,
      slotId: selectedSlotId!,
      people: quantity,
    }

    const availabilityData: Availability = {
      workshopId: product._id,
      bookingDate: formattedDate,
      slotId: selectedSlotId!,
      guests: quantity,
    }

    const availabilityResponse = await getAvailabilityData(
      availabilityData
    )

    const isAvailable = availabilityResponse?.result?.available === true
    const isAvailableMessage = availabilityResponse?.result?.reason
    console.log('Availability response:', isAvailable, availabilityResponse)
    if (!isAvailable) {
      setAvailabilityError(
        isAvailableMessage || 'Selected slot is not available. Please choose another date or time.'
      )
      return
    }

    setAvailabilityError('')

    await bookingService.addToCart(bookingData)
    router.push('/cart')
  }

  const handleBookNow = async () => {
    if (!validateSelection()) {
      return
    }

    const bookingData: BookingData = {
      userId: '',
      workshopId: product._id,
      optionId: selectedMaterialId,
      bookingDate: formattedDate,
      slotId: selectedSlotId!,
      people: quantity,
    }
  
    const availabilityData: Availability = {
      workshopId: product._id,
      bookingDate: formattedDate,
      slotId: selectedSlotId!,
      guests: quantity,
    }

    const availabilityResponse = await getAvailabilityData(
      availabilityData
    )

    const isAvailable = availabilityResponse?.result?.available === true
    const isAvailableMessage = availabilityResponse?.result?.reason
    console.log('Availability response:', isAvailable, availabilityResponse)
    if (!isAvailable) {
      setAvailabilityError(
        isAvailableMessage || 'Selected slot is not available. Please choose another date or time.'
      )
      return
    }

    setAvailabilityError('')

    await bookingService.bookNow(bookingData)
    router.push('/booking-confirmation')
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
            />
            {dateError && (
              <p className="mt-3 text-sm text-red-600">
                {dateError}
              </p>
            )}
          </div>

          {/* Time Slots */}
          {product?.defaultSlots.length > 0 && (
            <div className="p-[18px] bg-white">
              <TimeSlotSelector
                slots={product.defaultSlots.map((slot) => ({
                  ...slot,
                  capacity: Boolean(slot.capacity),
                }))}
                selectedSlotId={selectedSlotId}
                onSlotSelect={handleSlotSelect}
              />
              {slotError && (
                <p className="mt-3 text-sm text-red-600">
                  {slotError}
                </p>
              )}
            </div>
          )}

          {/* Quantity Selector */}
            <div className="p-[18px] bg-white">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity(quantity + 1)}
            onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
            unitPrice={selectedMaterial ? selectedMaterial.price : 0  }
            currency={selectedMaterial ? selectedMaterial.currency :'AED' }
                  onCart={handleAddToCart}
          />
</div>
          {/* Booking Actions */}
          {availabilityError && (
            <p className="text-sm text-red-600">{availabilityError}</p>
          )}
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
