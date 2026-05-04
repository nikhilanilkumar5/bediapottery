'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Wallet, FileCheck2 } from 'lucide-react';

import CartStep from './CartStep';
import CheckoutStep from './CheckoutStep';
import OrderCompleteStep from './OrderCompleteStep';

export default function CheckoutFlow() {
  // Step 1 = Detailed Cart Review
  // Step 2 = Billing / Checkout
  // Step 3 = Order Complete
  const [step, setStep] = useState(1);

  const fadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] font-sans text-[#113224]">
      
      {/* Top Progress Indicator Bar */}
      <div className="w-full bg-[#f3f0e8] py-8 mb-12 border-t border-b border-[#e5e1d8]">
        <div className="max-w-7xl mx-auto flex items-center justify-center px-4">
          
          <button onClick={() => step > 1 && setStep(1)} className={`flex items-center gap-3 ${step > 1 ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${step >= 1 ? 'bg-[#113224] text-white' : 'bg-white text-[#113224]'}`}>
              <ShoppingBag size={18} />
            </div>
            <span className={`font-medium hidden sm:block ${step >= 1 ? 'text-[#113224]' : 'text-gray-500'}`}>Shopping Cart</span>
          </button>

          <div className="w-12 sm:w-24 h-[1px] bg-[#d1cec7] mx-4 sm:mx-6"></div>

          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${step >= 2 ? 'bg-[#113224] text-white' : 'bg-white text-[#113224]'}`}>
              <Wallet size={18} />
            </div>
            <span className={`font-medium hidden sm:block ${step >= 2 ? 'text-[#113224]' : 'text-gray-400'}`}>Checkout</span>
          </div>

          <div className="w-12 sm:w-24 h-[1px] bg-[#d1cec7] mx-4 sm:mx-6"></div>

          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${step >= 3 ? 'bg-[#113224] text-white' : 'bg-white text-[#113224]'}`}>
              <FileCheck2 size={18} />
            </div>
            <span className={`font-medium hidden sm:block ${step >= 3 ? 'text-[#113224]' : 'text-gray-400'}`}>Order Complete</span>
          </div>

        </div>
      </div>

      {/* Dynamic Step Content */}
      <div className="max-w-7xl mx-auto px-4 pb-24 relative min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col lg:flex-row gap-12 items-start w-full"
          >
            {step === 1 && <CartStep onNext={() => setStep(2)} />}
            {step === 2 && <CheckoutStep onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <OrderCompleteStep />}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}