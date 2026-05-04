'use client';
import Image from 'next/image';

export default function CartStep({ onNext }) {
  return (
    <>
      <div className="w-full lg:w-2/3">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <span className="text-gray-500">(2)</span>
        </div>

        {/* Cart Item */}
        <div className="flex gap-6 border-b border-gray-200 pb-8 mb-8">
          <div className="w-32 h-32 bg-gray-200 rounded object-cover flex-shrink-0">
             {/* <Image src="/pottery-1.jpg" alt="Workshop" width={128} height={128} /> */}
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <div className="bg-[#f4f1eb] p-3 text-sm flex justify-between items-center rounded mb-4">
              <span>If you'd like to add or change items, please use</span>
              <button className="bg-[#113224] text-white px-4 py-1 rounded text-xs">Edit</button>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Couples' Pottery Workshop - Air Dry Clay</h3>
                <div className="text-sm text-gray-500 mt-2 space-y-1">
                  <p>x 2 AED 450</p>
                  <p className="text-[#113224] font-medium mt-4">Natural [Red] Clay (2 Pax)</p>
                  <p>x 1 AED 450</p>
                </div>
              </div>
              <div className="text-right">
                <button className="text-gray-400 hover:text-gray-600 mb-2 border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs">x</button>
                <p className="font-medium mt-4">AED 900</p>
                <p className="font-medium mt-6">AED 450</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtotal Footer */}
         <div className="flex justify-between font-medium pt-4">
            <span>Subtotal</span>
            <span>AED 2250</span>
         </div>
      </div>

      {/* Summary Sidebar */}
      <div className="w-full lg:w-1/3 bg-[#ece9e2] p-8 rounded-sm sticky top-8">
        <div className="space-y-4 mb-6 text-sm">
          <div className="flex justify-between font-medium">
            <span>Subtotal</span>
            <span>AED 2948</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>AED 0.00</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Costs</span>
            <span>AED 10.00</span>
          </div>
        </div>

        <div className="flex mb-8">
          <input type="text" placeholder="Coupon code" className="flex-grow p-3 border-none focus:ring-0 text-sm" />
          <button className="bg-[#113224] text-white px-6 py-3 text-sm font-medium">Apply Coupon</button>
        </div>

        <div className="border-t border-gray-300 pt-6 mb-6">
          <p className="text-sm font-medium mb-2">Get Free Shipping for orders over <span className="font-bold">AED 1000</span></p>
          <button className="text-sm border-b border-[#113224] pb-0.5 mb-6 hover:text-opacity-80">Continue Shopping</button>
          
          <button onClick={onNext} className="w-full bg-[#113224] text-white py-4 font-medium flex justify-center items-center gap-2 hover:bg-[#0c251a] transition-colors">
            <span>Checkout</span>
            <span className="text-gray-400">|</span>
            <span>AED 2958</span>
          </button>
        </div>

        <div className="text-center text-xs text-gray-500">
          <p className="mb-2">Secure payments provided by</p>
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
    </>
  );
}