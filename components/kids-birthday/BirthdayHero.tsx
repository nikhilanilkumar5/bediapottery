'use client';
import { Key, useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { Minus, Plus, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import DateSelector from '../product/DateSelector';
import { WorkshopItem } from '@/services/workshop.service';
import TimeSlotSelector from '../product/TimeSlotSelector';
import { useRouter } from 'next/navigation';
import { BookingService } from '@/services/booking.service';
import { getAvailabilityData } from '@/services/avaliablity.service';
import { BookingData, Availability } from '@/types';
import { useAuthStore } from '@/store/authStore';
import QuantitySelector from '../product/QuantitySelector';
import BookingActions from '../product/BookingActions';
import MaterialSelector from '../product/MaterialSelector';
interface BirthdayProps {
  product: WorkshopItem;
  type?: 'kids' | 'adults';
}

const BirthdayHero: React.FC<BirthdayProps> = ({
  product,
  type ,
}) => {
  useEffect(() => {
    console.log('Received product data in BirthdayHero:', product)
  }, [product])
  const makeTypes = [
  { id: 'wheel', label: 'Wheel' },
  { id: 'hand-building', label: 'Hand Building' },
];

const [makeType, setMakeType] = useState('');
  const [quantity, setQuantity] = useState(type === 'kids' ? 12 : 10);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string>('');
  const [slotError, setSlotError] = useState<string>('');
  const [availabilityError, setAvailabilityError] = useState<string>('');
  const router = useRouter();
  const bookingService = new BookingService();
  const [selectedMaterialId, setSelectedMaterialId] = useState(
    product.options?.[0]?._id || ''
  )
   const selectedMaterial = useMemo(
      () => product.options?.find((m) => m._id === selectedMaterialId),
      [product.options, selectedMaterialId]
    )
  
  const [activeTab, setActiveTab] = useState(
    product.moreDetails?.[0]?._id || ''
  );

const activeContent = product.moreDetails.find(
  item => item._id === activeTab
)
const formattedDate = useMemo(() => {
  return selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''
}, [selectedDate])

const handleDateSelect = (date: Date) => {
  const isSameDate =
    selectedDate &&
    date.toDateString() === selectedDate.toDateString()

  if (isSameDate && showTimeSlots) {
    setShowTimeSlots(false)
    setSelectedSlotId(null)
    setSelectedDate(null)
  } else {
    setSelectedDate(date)
    setShowTimeSlots(true)
    setSelectedSlotId(null)
  }

  setDateError('')
  setAvailabilityError('')
}

const handleSlotSelect = (slotId: string) => {
  setSelectedSlotId(slotId)
  setSlotError('')
  setAvailabilityError('')
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

const handleCheck = async (destination: 'cart' | 'checkout') => {
  if (!validateSelection()) {
    return false
  }

  const bookingData: BookingData = {
    userId: '65f1a2b3c4d5e6f7890a1234',
    workshopId: product._id,
    optionId: product.options?.[0]?._id || '',
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

  const availabilityResponse = await getAvailabilityData(availabilityData)
  const isAvailable = availabilityResponse?.result?.available === true
  const isAvailableMessage = availabilityResponse?.result?.reason

  if (!isAvailable) {
    setAvailabilityError(
      isAvailableMessage ||
        'Selected slot is not available. Please choose another date or time.'
    )
    return false
  }

  setAvailabilityError('')

  try {
    await bookingService.addToCart(bookingData)
    return true
  } catch (error) {
    setAvailabilityError(
      (error as Error)?.message ||
        'Unable to add booking to cart. Please try again.'
    )
    return false
  }
}

const handleAddToCart = async () => {
  const token: string | null = useAuthStore.getState().user?.token || null
  if (!token) {
    router.push('/login');
    return;
  }
  const success = await handleCheck('cart')
  if (success) {
    router.push('/cart')
  }
}

const handleBookNow = async () => {
  const token: string | null = useAuthStore.getState().user?.token || null
  if (!token) {
    router.push('/login');
    return;
  }
  const success = await handleCheck('checkout')
  if (success) {
    router.push('/checkout')
  }
}
 const isBookingDisabled = !selectedDate || !selectedSlotId
  return (
    <section className="bg-[#f5f1eb] min-h-screen py-12 font-sans text-[#113224]">
      <div className="page-wrapper px-[17px]  grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Column: Image Grid */}
        <div className="flex flex-col gap-4 h-full">
          {/* Main Large Image */}
          <div className="w-full aspect-[4/3] bg-gray-200 overflow-hidden relative">
            <img 
              src={product?.bannerImage || "/images/product/kids-birthday-1.png"} 
              alt="Kids celebrating birthday with cake" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Bottom Thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
               <img src={product?.images[0]?.image || "/images/product/kids-birthday-2.jpg"} alt="Party scene 1" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
               <img src={product?.images[1]?.image || "/images/product/kids-birthday-3.jpg"} alt="Party scene 2" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
               <img src={product?.images[2]?.image || "/images/product/kids-birthday-4.png"} alt="Party scene 3" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Right Column: Content & Forms */}
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[2.5rem] leading-tight font-neiko text-[#113224] mb-1">
              {product.title}
            </h1>
            <h2 className="text-[2rem] font-neiko text-[#113224] mb-4">
              {type === 'kids' ? '(3 - 13 Years)' : '(above 18 Years)'}
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed pr-4">
              Celebrate your kid's birthday at Bedia Pottery Studio! Enjoy a fun pottery experience in a serene setting. This booking is for a minimum of 12 kids. If you have more, we'll help accommodate.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Tabs Section */}
        <div className="bg-white p-6 shadow-sm">
  <div className="flex gap-2 mb-4 flex-wrap">
    {product.moreDetails?.map(detail => (
      <button
        key={detail._id}
        onClick={() => setActiveTab(detail._id)}
        className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
          activeTab === detail._id
            ? 'bg-[#113224] text-white'
            : 'bg-[#e9eceb] text-[#113224] hover:bg-[#dce1df]'
        }`}
      >
        {detail.title}
      </button>
    ))}

    <button
      onClick={() => setActiveTab('package')}
      className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
        activeTab === 'package'
          ? 'bg-[#113224] text-white'
          : 'bg-[#e9eceb] text-[#113224] hover:bg-[#dce1df]'
      }`}
    >
      Package Includes
    </button>
  </div>

  <div className="bg-[#fcfcfa] border border-[#e5e5e5] max-h-72 overflow-y-auto  p-6 relative">
   
      

    {activeTab === 'package' ? (
      <ul className="list-disc pl-5 space-y-4 text-[13px] text-gray-700 pr-8">
        {product.includes?.map(item => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    ) : (
      <div className="pr-8">
<ul className="list-disc pl-5 space-y-4 text-[13px] text-gray-700 pr-8">
  {activeContent?.description
    ?.split(".")
    .filter((item: string) => item.trim() !== "")
    .map((item: string, index: Key | null | undefined) => (
      <li key={index}>{item.trim()}</li>
    ))}
</ul>
      </div>
    )}
  </div>

  {/* <div className="mt-6 text-center">
    <p className="font-bold text-sm text-[#113224]">
      To Know More, Read The Description Below.
    </p>
  </div> */}
</div>
<div className="p-[18px] bg-white">
          {/* Material Selector */}
          {product?.options && product.options.length > 0 && type === 'adults' && (
            <MaterialSelector
              materials={product?.options}
              selectedMaterialId={selectedMaterialId}
              onMaterialSelect={setSelectedMaterialId}
            />
          )}
          </div>
          <div className="p-[18px] bg-white space-y-3">
            <h3 className="text-lg font-medium text-gray-900">Choose Your Make Type</h3>
            {type === 'adults' && (
          <div className="grid grid-cols-2 gap-3">
  {makeTypes.map((type) => (
    <button
      key={type.id}
      onClick={() => setMakeType(type.id)}
      className={`px-4 py-3 font-medium transition-colors duration-200 ${
        makeType === type.id
          ? 'bg-primary text-white border border-primary'
          : 'bg-white text-gray-700 border border-gray-300 hover:border-primary'
      }`}
    >
      {type.label}
    </button>
  ))}
</div>
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
    </section>
  );
}

export default BirthdayHero;