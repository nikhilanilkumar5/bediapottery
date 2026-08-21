'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CartData } from '@/services/cart.service';

interface CartStepProps {
  onNext: () => void;
  data: CartData[];
  onDeleteItem: (itemIndex: number) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export default function CartStep({ onNext, data, onDeleteItem, loading = false, error }: CartStepProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (loading) {
    return (
      <div className="w-full text-center py-24 text-gray-600">
        Loading cart details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-24 text-red-600">
        <p>Unable to load your cart.</p>
        <p className="mt-2 text-sm">{error}</p>
      </div>
    );
  }
  const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short", // Use 'long' for "August" or '2-digit' for "08"
    year: "numeric"
  });
}
  const cartItems = data?.[0]?.items || [];
  const cartTotal = data?.[0]?.totalAmount ?? 0;
  const cartGrandTotal = data?.[0]?.grandTotal ?? 0;
  const cartTax = data?.[0]?.taxAmount ?? 0;
  const cartCount = cartItems.length;

  if (cartCount === 0) {
    return (
      <div className="w-full text-center py-24 text-gray-700">
        <h2 className="text-2xl font-normal mb-3">Your cart is empty</h2>
        <p className="text-sm text-gray-500">Add items to your cart and return here to complete checkout.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
            <span className="text-black ">Your Cart</span>
            <span className="text-black ">({cartCount})</span>
          </div>

          {/* Edit Notification Banner */}
          <div className="bg-[#ece9e2] p-4 rounded-sm flex items-center justify-between mb-8">
            <p className="text-sm text-gray-700 font-normal">
              If you’d like to add or change items, please use
            </p>
            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              className="bg-[#0D463D] text-white text-sm px-6 py-2 rounded-sm hover:bg-[#0c251a] transition-colors font-medium"
            >
              {isEditing ? 'Done' : 'Edit'}
            </button>
          </div>

          <div className="space-y-8">
            {cartItems.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-6 border-b border-gray-200 pb-8">
                <div className="w-32 h-32 bg-gray-200 rounded-sm shrink-0 overflow-hidden relative">
                  <Image
                    src={item.workshopId.images?.[0]?.image || '/images/products/pottery1.png'}
                    alt={item.workshopId.title}
                    width={128}
                    height={128}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-normal text-black text-[15px]">{item.workshopId.title}-{item.optionTitle}</h3>
                  
                      {/* Conditional Remove Button */}
                      {isEditing && (
                        <button
                          className="text-gray-500 hover:text-black border border-gray-400 rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                          onClick={() => onDeleteItem(index)}
                          disabled={loading}
                          type="button"
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      )}
                    </div>
     <h3 className="font-normal text-[15px] text-black mb-2 leading-tight">
                  {formatDate(item.bookingDate)}<label className="ml-2 text-gray-600 text-[13px] ">{item.startTime} - {item.endTime}</label>
                </h3>
                    {item.workshopId.title !== "Adult's Birthday Party" ? (
                      /* IF NOT "Adult's Birthday Party" -> Show standard price breakdown */
                      <p className="text-sm text-gray-500">
                        x {item.people}{" "}
                        <span className="ml-1">
                          {item.currency} {item.price.toFixed(2)}
                        </span>
                      </p>
                    ) : (
                      /* ELSE ("Adult's Birthday Party") -> Show custom technique breakdown */
                      <div className="text-sm text-gray-500 space-y-1">
                        {(item.wheelPottery ?? 0) > 0 && (
                          <p>
                            x {item.wheelPottery} Wheel Pottery
                            <span className="ml-1">
                              {item.currency}{" "}
                              {Number(item.price ?? 0).toFixed(2)}
                            </span>
                          </p>
                        )}
                        {(item.handBuild ?? 0) > 0 && (
                          <p>
                            x {item.handBuild} HandBuilding
                            <span className="ml-1">
                              {item.currency} {item.price.toFixed(2)}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="text-right mt-4 sm:mt-0">
                    <p className="font-semibold text-black">
                      {item.currency} {item.subtotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Summary Sidebar */}
        <div className="w-full lg:w-1/3 bg-secondary-dark p-8 rounded-sm h-fit sticky top-8 text-black">
          <div className="space-y-4 mb-6 text-sm">
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>AED {cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>VAT amount</span>
              <span>AED {cartTax.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={onNext} 
            className="w-full bg-[#0D463D] text-white py-4 font-medium flex justify-center items-center gap-3 hover:bg-[#0c251a] transition-colors mb-6 rounded-sm shadow-sm"
          >
            <span>Checkout</span>
            <span className="text-[#81998f]">|</span>
            <span>AED {cartGrandTotal.toFixed(2)}</span>
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