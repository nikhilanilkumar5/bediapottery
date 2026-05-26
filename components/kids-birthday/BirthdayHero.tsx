'use client';
import { Key, useEffect, useState } from 'react';
import { Minus, Plus, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import DateSelector from '../product/DateSelector';
import { WorkshopItem } from '@/services/workshop.service';
interface BirthdayProps {
  product: WorkshopItem
}

const BirthdayHero: React.FC<BirthdayProps> = ({
  product
}) => {
  useEffect(() => {
    console.log('Received product data in BirthdayHero:', product)
  }, [product])
  const [quantity, setQuantity] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [showTimeSlots, setShowTimeSlots] = useState(false)
     const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(
  product.moreDetails?.[0]?._id || ''
)

const activeContent = product.moreDetails.find(
  item => item._id === activeTab
)
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
  return (
    <section className="bg-[#f5f1eb] min-h-screen py-12 font-sans text-[#113224]">
      <div className="page-wrapper px-[17px]  grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Column: Image Grid */}
        <div className="flex flex-col gap-4 h-full">
          {/* Main Large Image */}
          <div className="w-full aspect-[4/3] bg-gray-200 overflow-hidden relative">
            <img 
              src={product.bannerImage || "/images/product/kids-birthday-1.png"} 
              alt="Kids celebrating birthday with cake" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Bottom Thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
               <img src={product.images[0].image || "/images/product/kids-birthday-2.jpg"} alt="Party scene 1" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
               <img src={product.images[1].image || "/images/product/kids-birthday-3.jpg"} alt="Party scene 2" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
               <img src={product.images[2].image || "/images/product/kids-birthday-4.png"} alt="Party scene 3" className="w-full h-full object-cover" />
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
              (3 - 13 Years)
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
              {/* Date Selector */}
          <div className="p-[18px] bg-white">
          <DateSelector
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          /></div>

            {/* Booking Box */}
            <div className="bg-white p-6 shadow-sm">
              <h3 className="font-bold text-[15px] mb-2">Select Quantity & Book Your Slot</h3>
              <p className="text-[13px] text-gray-600 mb-6">
                Choose the number of participants and add the workshop to your cart to confirm your booking.
              </p>

              {/* Add to Cart Row */}
              <div className="flex items-stretch gap-4 mb-4">
                {/* Quantity Control */}
                <div className="flex items-center border border-gray-300 w-32 justify-between px-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-600 hover:text-black transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-medium text-sm">
                    {quantity < 10 ? `0${quantity}` : quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-600 hover:text-black transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button className="flex-grow bg-[#113224] text-white flex items-center justify-between pl-6 pr-2 py-2 hover:bg-[#0d261b] transition-colors group">
                  <span className="font-medium text-[15px]">{400 * quantity} AED</span>
                  <span className="font-medium text-[14px]">Add to Cart</span>
                  <div className="bg-white text-[#113224] p-2 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight size={16} />
                  </div>
                </button>
              </div>

              {/* Main Book Now Button */}
              <button className="w-full bg-[#113224] text-white font-medium py-4 text-[15px] hover:bg-[#0d261b] transition-colors">
                Book Now
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default BirthdayHero;