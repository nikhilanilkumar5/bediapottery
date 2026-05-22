'use client';
import { useState } from 'react';
import { Minus, Plus, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BirthdayHero() {
  const [activeTab, setActiveTab] = useState('notes');
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState('Jan 01');

  const dates = [
    { day: 'Mon', date: 'Jan 01' },
    { day: 'Thu', date: 'Jan 02' },
    { day: 'Wed', date: 'Jan 03' },
    { day: 'Thu', date: 'Jan 04' },
    { day: 'Fri', date: 'Jan 05' },
    { day: 'Sat', date: 'Jan 06' },
    { day: 'Sun', date: 'Jan 07' },
  ];

  return (
    <section className="bg-[#f5f1eb] min-h-screen py-12 font-sans text-[#113224]">
      <div className="page-wrapper px-[17px]  grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Column: Image Grid */}
        <div className="flex flex-col gap-4 h-full">
          {/* Main Large Image */}
          <div className="w-full aspect-[4/3] bg-gray-200 overflow-hidden relative">
            <img 
              src="/images/product/kids-birthday-1.png" 
              alt="Kids celebrating birthday with cake" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Bottom Thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
               <img src="/images/product/kids-birthday-2.jpg" alt="Party scene 1" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
               <img src="/images/product/kids-birthday-3.jpg" alt="Party scene 2" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
               <img src="/images/product/kids-birthday-4.png" alt="Party scene 3" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Right Column: Content & Forms */}
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[2.5rem] leading-tight font-neiko text-[#113224] mb-1">
              Kids Birthday Party Package
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
              <div className="flex gap-2 mb-4">
                <button 
                  onClick={() => setActiveTab('notes')}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === 'notes' ? 'bg-[#113224] text-white' : 'bg-[#e9eceb] text-[#113224] hover:bg-[#dce1df]'}`}
                >
                  Note For The Parents
                </button>
                <button 
                  onClick={() => setActiveTab('venue')}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === 'venue' ? 'bg-[#113224] text-white' : 'bg-[#e9eceb] text-[#113224] hover:bg-[#dce1df]'}`}
                >
                  Venue Details
                </button>
                <button 
                  onClick={() => setActiveTab('package')}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === 'package' ? 'bg-[#113224] text-white' : 'bg-[#e9eceb] text-[#113224] hover:bg-[#dce1df]'}`}
                >
                  Package Includes
                </button>
              </div>

              <div className="bg-[#fcfcfa] border border-[#e5e5e5] p-6 relative">
                {/* Simulated scrollbar line indicator from design */}
                <div className="absolute right-6 top-6 bottom-6 w-[2px] bg-[#e5e5e5]">
                  <div className="w-full h-1/3 bg-[#113224]/20 rounded-full"></div>
                </div>

                <ul className="list-disc pl-5 space-y-4 text-[13px] text-gray-700 pr-8">
                  <li>Cake is allowed to be cut inside the studio</li>
                  <li>Outside food and drink are allowed within the provided time, or else additional charges may incur per hour.</li>
                  <li>Cutlery and other food-serving essentials should be brought from your end.</li>
                  <li>The studio will provide a knife and lighter for the cake, if required.</li>
                  <li>We recommend arranging pick-up and drop-off for the kids attending the workshop.</li>
                  <li>Pets are not allowed inside the studio premises.</li>
                </ul>
              </div>

              <div className="mt-6 text-center">
                <p className="font-bold text-sm text-[#113224]">To Know More, Read The Description Below.</p>
              </div>
            </div>

            {/* Date Selector */}
            <div className="bg-white p-4 shadow-sm flex items-center justify-between gap-4">
              <button className="text-gray-400 hover:text-[#113224] transition-colors p-2">
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2 overflow-x-auto flex-grow scrollbar-hide">
                {dates.map((d, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedDate(d.date)}
                    className={`flex flex-col items-center justify-center p-3 min-w-[72px] border transition-colors flex-shrink-0 ${selectedDate === d.date ? 'border-[#113224] bg-[#f9fafa]' : 'border-gray-200 hover:border-[#113224]/50'}`}
                  >
                    <span className="text-[11px] text-gray-500 mb-1">{d.day}</span>
                    <span className="text-sm font-bold text-[#113224] whitespace-nowrap">{d.date}</span>
                  </button>
                ))}
              </div>

              <button className="text-gray-400 hover:text-[#113224] transition-colors p-2">
                <ChevronRight size={20} />
              </button>
            </div>

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