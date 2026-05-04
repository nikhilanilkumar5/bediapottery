'use client';
import { useState } from 'react';
import CartStep from './CartStep';
import CheckoutStep from './CheckoutStep';
import OrderCompleteStep from './OrderCompleteStep';
import { ShoppingBag, Wallet, FileCheck2 } from 'lucide-react';// Assuming lucide-react for icons

export default function CheckoutFlow() {
  const [step, setStep] = useState(1);

  return (
    <>
      {/* Progress Indicator */}
      <div className="w-screen bg-[#f3f0e8] py-8 relative left-[calc(-50vw+50%)]">
        <div className="page-wrapper flex items-center justify-center">
    
    {/* Step 1: Shopping Cart */}
    <button 
      onClick={() => step > 1 && setStep(1)} 
      className={`flex items-center gap-3 ${step > 1 ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${step >= 1 ? 'bg-[#113224] text-white' : 'bg-white text-[#113224]'}`}>
        <ShoppingBag size={18} />
      </div>
      <span className={`font-medium ${step >= 1 ? 'text-[#113224]' : 'text-gray-500'}`}>Shopping Cart</span>
    </button>

    {/* Separator 1 */}
    <div className="w-24 h-[1px] bg-[#d1cec7] mx-6"></div>

    {/* Step 2: Checkout */}
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${step >= 2 ? 'bg-[#113224] text-white' : 'bg-white text-[#113224]'}`}>
        <Wallet size={18} />
      </div>
      <span className={`font-medium ${step >= 2 ? 'text-[#113224]' : 'text-[#113224]'}`}>Checkout</span>
    </div>

    {/* Separator 2 */}
    <div className="w-24 h-[1px] bg-[#d1cec7] mx-6"></div>

    {/* Step 3: Order Complete */}
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${step >= 3 ? 'bg-[#113224] text-white' : 'bg-white text-[#113224]'}`}>
        <FileCheck2 size={18} />
      </div>
      <span className={`font-medium ${step >= 3 ? 'text-[#113224]' : 'text-[#113224]'}`}>Order Complete</span>
    </div>

  </div>
      </div>

      {/* Dynamic Content */}
      <div className="page-wrapper py-12 text-[#113224] font-sans">
        <div className="flex flex-col lg:flex-row gap-12 items-start max-w-7xl mx-auto">
          {step === 1 && <CartStep onNext={() => setStep(2)} />}
          {step === 2 && <CheckoutStep onNext={() => setStep(3)} />}
          {step === 3 && <OrderCompleteStep />}
        </div>
      </div>
    </>
  );
}