import React from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';

export default function MobileCart({ onCheckout }: { onCheckout: () => void }) {
  return (
    <main className="page-wrapper px-[17px]  bg-[#fcfbf9] min-h-screen font-sans text-[#113224]">
      
      {/* Header */}
      <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-6 mt-4 sm:mt-8">
        <h1 className="text-2xl font-serif">Your Cart</h1>
        <span className="text-gray-500 font-medium">(2)</span>
      </div>

      <div className="space-y-8">
        
        {/* Item 1: Couples Workshop */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex gap-4">
            {/* Thumbnail with Play Button */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-sm shrink-0 relative overflow-hidden">
              <Image 
                src="/images/banner/cart-page.png" 
                alt="Couples pottery" 
                width={112}
                height={112}
                priority
                unoptimized
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/30 rounded-full p-2 backdrop-blur-sm">
                  <Play size={16} className="text-white fill-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Item Details */}
            <div className="flex-grow flex flex-col justify-between text-sm">
              <div className="space-y-4">
                {/* Main Product */}
                <div>
                  <h3 className="font-semibold text-[15px] mb-1 leading-tight">Couples' Pottery Workshop - Air Dry Clay</h3>
                  <div className="flex justify-between items-center text-gray-500">
                    <p>x 2 <span className="ml-1">AED 450</span></p>
                    <p className="font-medium text-[#113224]">AED 900</p>
                  </div>
                </div>

                {/* Variant 1 */}
                <div>
                  <p className="text-[#113224] font-medium mb-1">Natural [Red] Clay (2 Pax)</p>
                  <div className="flex justify-between items-center text-gray-500">
                    <p>x 1 <span className="ml-1">AED 450</span></p>
                    <p className="font-medium text-[#113224]">AED 450</p>
                  </div>
                </div>

                {/* Variant 2 */}
                <div>
                  <p className="text-[#113224] font-medium mb-1">Ceramic Clay (2 Pax)</p>
                  <div className="flex justify-between items-center text-gray-500">
                    <p>x 2 <span className="ml-1">AED 450</span></p>
                    <p className="font-medium text-[#113224]">AED 900</p>
                  </div>
                </div>
              </div>

              {/* Item Subtotal */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                 <span className="font-medium">Subtotal</span>
                 <span className="font-bold text-[15px]">AED 2250</span>
              </div>
            </div>
          </div>
        </div>

        {/* Item 2: Beginners Workshop */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex gap-4">
            {/* Thumbnail */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-sm shrink-0 overflow-hidden">
              <Image 
                src="/images/banner/image-4.png" 
                alt="Beginners pottery" 
                width={112}
                height={112}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>

            {/* Item Details */}
            <div className="flex-grow flex flex-col justify-center text-sm">
              <h3 className="font-semibold text-[15px] mb-2 leading-tight">Pottery On Wheel For Beginners</h3>
              <div className="flex justify-between items-center text-gray-500">
                <p>x 2 <span className="ml-1">AED 249</span></p>
                <p className="font-medium text-[#113224]">AED 498</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Cart Totals & Checkout */}
      <div className="mt-8 space-y-6">
        <div className="flex justify-between items-center text-lg">
          <span className="font-semibold text-gray-800">TOTAL</span>
          <span className="font-bold">AED 2948</span>
        </div>

        {/* 
          This button uses the onCheckout prop passed down from MasterCartFlow 
          to transition to Step 1 (the detailed CartStep) 
        */}
        <button 
          onClick={onCheckout}
          className="w-full bg-[#113224] text-white py-4 font-medium text-[15px] hover:bg-[#0c251a] transition-colors rounded-sm shadow-sm"
        >
          Checkout
        </button>

        {/* Payment Methods */}
        <div className="text-center pb-8">
          <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide font-medium">Secure payments provided by</p>
          <div className="flex justify-center gap-2">
            <Image 
              src="/images/icons/card.png" 
              alt="Payment Cards" 
              width={200} 
              height={30}
              unoptimized
            />
          </div>
        </div>
      </div>

    </main>
  );
}