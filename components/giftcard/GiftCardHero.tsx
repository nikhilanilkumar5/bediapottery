'use client';
import { useState } from 'react';
import { Play, Minus, Plus, ArrowRight } from 'lucide-react';

export default function GiftCardHero() {
  const [quantity, setQuantity] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');
  const [recipient, setRecipient] = useState('Kids');
  const [clay, setClay] = useState('Air-Dry Clay');
  const [experience, setExperience] = useState('Private VIP Experience');

  return (
    <section className="bg-[#f2ece3] min-h-screen py-12 font-sans text-[#113224]">
      <div className="page-wrapper px-[17px]  grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Media Gallery */}
        <div className="space-y-4 h-full flex flex-col">
          {/* Main Video/Image Wrapper */}
          <div className="relative w-full flex-1 bg-gray-200 overflow-hidden">
            <img 
              src="/images/product/gift-card-1.png" 
              alt="Gift boxes" 
              className="w-full h-full object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 hover:bg-white/50 transition duration-300">
                <Play className="text-white fill-white ml-1" size={24} />
              </button>
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-video bg-gray-200 overflow-hidden rounded">
               <img src="/images/product/gift-card-2.jpg" alt="Gift thumbnail 1" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-video bg-gray-200 overflow-hidden rounded">
               <img src="/images/product/gift-card-3.jpg" alt="Gift thumbnail 2" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-video bg-gray-200 overflow-hidden rounded">
               <img src="/images/product/gift-card-4.jpg" alt="Gift thumbnail 3" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Right Column: Content & Form */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-neiko mb-4 text-[#113224]">A Gift Made by Hand, from the Heart</h1>
            <p className="text-[#113224]/80 leading-relaxed text-[17px]">
              Give the gift of creativity, experiences, and lasting memories. Perfect for anyone who loves to create something truly unique and meaningful.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white shadow-xl shadow-black/5 flex flex-col">
            
            {/* Green Banner */}
            <div className="bg-[#113224] text-white text-center py-6 px-4 relative overflow-hidden">
              {/* Subtle background pattern could go here */}
              <h2 className="text-lg font-medium mb-1 relative z-10">Customize Your Gift Card</h2>
              <p className="text-sm text-white/80 relative z-10">Make it personal, make it memorable</p>
            </div>

            {/* Form Fields Wrapper */}
            <div className="p-8 space-y-8">
              
              {/* Occasion */}
              <div>
                <label className="block font-medium mb-3">Choose an Occasion</label>
                <div className="bg-[#e9e6df] p-1 flex flex-wrap gap-1">
                  {['Birthday', 'Anniversary', 'Wedding', 'Graduation', 'more+'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setOccasion(item)}
                      className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium transition-colors ${
                        occasion === item ? 'bg-[#113224] text-white' : 'text-gray-600 hover:bg-[#d8d4cb]'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient */}
              <div>
                <label className="block font-medium mb-3">Who is this Gift for?</label>
                <div className="bg-[#e9e6df] p-1 flex gap-1">
                  {['Adults', 'Kids', 'Adults & Kids'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setRecipient(item)}
                      className={`flex-1 py-3 text-sm font-medium transition-colors ${
                        recipient === item ? 'bg-[#113224] text-white' : 'text-gray-600 hover:bg-[#d8d4cb]'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clay */}
              <div>
                <label className="block font-medium mb-3">Choose your Clay</label>
                <div className="flex gap-2">
                  {['Air-Dry Clay', 'Terracotta Clay', 'Ceramic Clay'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setClay(item)}
                      className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                        clay === item ? 'bg-[#113224] text-white' : 'bg-[#e9e6df] text-gray-600 hover:bg-[#d8d4cb]'
                      }`}
                    >
                      <span className="text-sm font-medium">{item}</span>
                      <span className={`text-[10px] mt-1 ${clay === item ? 'text-white/70' : 'text-gray-400'}`}>Hover for details</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block font-medium mb-3">Select Experience Type</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  {[
                    { title: 'Group Workshop', desc: 'Join others in a fun, collaborative pottery session', price: 'From AED 150' },
                    { title: 'Private VIP Experience', desc: 'Exclusive one-on-one session with expert instructor', price: 'From AED 450' }
                  ].map((item) => (
                    <button
                      key={item.title}
                      onClick={() => setExperience(item.title)}
                      className={`flex-1 flex flex-col items-center justify-center p-4 text-center transition-colors ${
                        experience === item.title ? 'bg-[#113224] text-white' : 'bg-[#e9e6df] text-gray-600 hover:bg-[#d8d4cb]'
                      }`}
                    >
                      <span className="text-sm font-semibold mb-2">{item.title}</span>
                      <span className={`text-[11px] leading-tight mb-4 px-2 ${experience === item.title ? 'text-white/80' : 'text-gray-500'}`}>{item.desc}</span>
                      <span className="text-xs font-bold mt-auto">{item.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-medium mb-3">
                  Add a personal message <span className="text-gray-400 font-normal text-sm">(0 / 250 characters)</span>
                </label>
                <textarea 
                  className="w-full bg-[#dce1dd] text-[#113224] placeholder-[#113224]/50 border-none p-4 h-24 text-sm focus:ring-0 focus:outline-none resize-none"
                  placeholder="Hope you enjoy getting your hands dirty and creating something beautiful"
                ></textarea>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-stretch gap-4 pt-4">
                {/* Quantity */}
                <div className="flex items-center border border-gray-300 bg-white">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-500 hover:text-black transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium text-sm">
                    {quantity < 10 ? `0${quantity}` : quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-gray-500 hover:text-black transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button className="flex-grow bg-[#113224] text-white flex items-center justify-between px-4 hover:bg-[#0d261b] transition-colors">
                  <span className="font-semibold">{450 * quantity} AED</span>
                  <span className="font-medium">Add to Cart</span>
                  <div className="bg-white text-[#113224] p-1.5 flex items-center justify-center">
                    <ArrowRight size={16} />
                  </div>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}