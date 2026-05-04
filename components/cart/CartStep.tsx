'use client';
import Image from 'next/image';

export default function CartStep({ onNext }) {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-serif font-medium text-[#113224]">Your Cart</h2>
            <span className="text-gray-500 font-medium">(2)</span>
          </div>

          <div className="space-y-8">
            {/* --- Cart Item 1 --- */}
            <div className="flex flex-col sm:flex-row gap-6 border-b border-gray-200 pb-8">
              <div className="w-32 h-32 bg-gray-200 rounded-sm shrink-0 overflow-hidden relative">
                 {/* <Image src="/pottery-1.jpg" alt="Workshop" fill className="object-cover" /> */}
              </div>
              
              <div className="flex-grow flex flex-col">
                {/* Notice Banner */}
                <div className="bg-[#f4f1eb] p-3 text-[13px] text-[#113224] flex justify-between items-center rounded-sm mb-6">
                  <span>If you'd like to add or change items, please use</span>
                  <button className="bg-[#113224] text-white px-5 py-1.5 rounded-sm font-medium hover:bg-[#0c251a] transition-colors">Edit</button>
                </div>
                
                {/* Main Product */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-[#113224] mb-2 text-[15px]">Couples' Pottery Workshop - Air Dry Clay</h3>
                    <p className="text-sm text-gray-500">x 2 <span className="ml-2">AED 450</span></p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <button className="text-gray-400 hover:text-[#113224] mb-3 border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors">✕</button>
                    <p className="font-semibold text-[#113224]">AED 900</p>
                  </div>
                </div>

                {/* Variant 1 */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-medium text-[#113224] mb-1 text-sm">Natural [Red] Clay (2 Pax)</p>
                    <p className="text-sm text-gray-500">x 1 <span className="ml-2">AED 450</span></p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <button className="text-gray-300 hover:text-[#113224] mb-2 border border-gray-200 rounded-full w-5 h-5 flex items-center justify-center text-[10px] transition-colors">✕</button>
                    <p className="font-medium text-[#113224]">AED 450</p>
                  </div>
                </div>

                {/* Variant 2 */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-[#113224] mb-1 text-sm">Ceramic Clay (2 Pax)</p>
                    <p className="text-sm text-gray-500">x 2 <span className="ml-2">AED 450</span></p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <button className="text-gray-300 hover:text-[#113224] mb-2 border border-gray-200 rounded-full w-5 h-5 flex items-center justify-center text-[10px] transition-colors">✕</button>
                    <p className="font-medium text-[#113224]">AED 900</p>
                  </div>
                </div>
                
                {/* Item Subtotal */}
                <div className="flex justify-between font-medium pt-6 mt-6 border-t border-gray-100 text-[#113224]">
                  <span>Subtotal</span>
                  <span className="font-bold">AED 2250</span>
                </div>
              </div>
            </div>

            {/* --- Cart Item 2 --- */}
            <div className="flex flex-col sm:flex-row gap-6 pb-8">
              <div className="w-32 h-32 bg-gray-200 rounded-sm shrink-0 overflow-hidden relative">
                 {/* <Image src="/pottery-2.jpg" alt="Beginners Workshop" fill className="object-cover" /> */}
              </div>
              
              <div className="flex-grow flex flex-col justify-start pt-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-[#113224] mb-2 text-[15px]">Pottery On Wheel For Beginners</h3>
                    <p className="text-sm text-gray-500">x 2 <span className="ml-2">AED 249</span></p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <button className="text-gray-400 hover:text-[#113224] mb-3 border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors">✕</button>
                    <p className="font-semibold text-[#113224]">AED 498</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Summary Sidebar */}
        <div className="w-full lg:w-1/3 bg-[#ece9e2] p-8 rounded-sm h-fit sticky top-8 text-[#113224]">
          <div className="space-y-4 mb-6 text-sm">
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>AED 2948</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Discount</span>
              <span>AED 0.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping Costs</span>
              <span>AED 10.00</span>
            </div>
          </div>

          <div className="flex mb-8">
            <input 
              type="text" 
              placeholder="Coupon code" 
              className="flex-grow p-3 border-none focus:ring-0 text-sm bg-white" 
            />
            <button className="bg-[#113224] text-white px-6 py-3 text-sm font-medium hover:bg-[#0c251a] transition-colors">
              Apply Coupon
            </button>
          </div>

          <div className="border-t border-[#d1cec7] pt-6 mb-8">
            <p className="text-sm mb-3">Get Free Shipping for orders over <span className="font-bold">AED 1000</span></p>
            <button className="text-sm font-medium border-b border-[#113224] pb-0.5 hover:text-opacity-70 transition-opacity">
              Continue Shopping
            </button>
          </div>

          <button 
            onClick={onNext} 
            className="w-full bg-[#113224] text-white py-4 font-medium flex justify-center items-center gap-3 hover:bg-[#0c251a] transition-colors mb-6 rounded-sm shadow-sm"
          >
            <span>Checkout</span>
            <span className="text-[#81998f]">|</span>
            <span>AED 2958</span>
          </button>

          <div className="text-center text-xs text-gray-500">
            <p className="mb-2 uppercase tracking-wide">Secure payments provided by</p>
            <div className="flex justify-center gap-2">
              <Image 
                src="/images/icons/card.png" 
                alt="Payment Cards" 
                width={250} 
                height={30}
                className="h-auto w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}