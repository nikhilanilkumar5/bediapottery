'use client';
import { useState } from 'react';
import { Info, MapPin, Package, Calendar } from 'lucide-react';

export default function KidsBirthdayPage() {
  const [activeTab, setActiveTab] = useState('notes');

  return (
    <main className="max-w-7xl mx-auto px-4 py-16 text-[#113224] font-sans">
      
      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden">
          {/* Main Image/Video placeholder */}
        </div>
        
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-serif mb-4">Kids Birthday Party Package<br/><span className="text-xl text-gray-500">(3-13 Years)</span>[cite: 4]</h1>
          <p className="text-gray-600 mb-8">
            Celebrate your kid's birthday at Bedia Pottery Studio! Enjoy a fun pottery experience in a serene setting. This booking is for a minimum of 12 kids. If you have more, we'll help accommodate.[cite: 4]
          </p>

          {/* Quick Info Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200 pb-4">
            <button className={`flex items-center gap-2 text-sm font-medium ${activeTab === 'notes' ? 'text-[#113224]' : 'text-gray-400'}`}>
               <Info size={16}/> Note For The Parents[cite: 4]
            </button>
            <button className={`flex items-center gap-2 text-sm font-medium ${activeTab === 'venue' ? 'text-[#113224]' : 'text-gray-400'}`}>
               <MapPin size={16}/> Venue Details[cite: 4]
            </button>
            <button className={`flex items-center gap-2 text-sm font-medium ${activeTab === 'package' ? 'text-[#113224]' : 'text-gray-400'}`}>
               <Package size={16}/> Package Includes[cite: 4]
            </button>
          </div>

          <ul className="list-disc pl-4 space-y-2 text-sm text-gray-700 mb-8">
            <li>Cake is allowed to be cut inside the studio[cite: 4]</li>
            <li>Outside food and drink are allowed within the provided time...[cite: 4]</li>
            <li>Cutlery and other food-serving essentials should be brought...[cite: 4]</li>
          </ul>

          {/* Booking Widget */}
          <div className="bg-[#f4f1eb] p-6 rounded-sm">
            <h3 className="font-semibold mb-4">Select Quantity & Book Your Slot[cite: 4]</h3>
            
            {/* Horizontal Calendar Scroll */}
            <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
              {['Jan 01', 'Jan 02', 'Jan 03', 'Jan 04', 'Jan 05'].map((date, i) => (
                <div key={i} className={`flex flex-col items-center justify-center p-3 min-w-[70px] border rounded-sm cursor-pointer ${i === 0 ? 'bg-[#113224] text-white border-[#113224]' : 'bg-white border-gray-200 hover:border-[#113224]'}`}>
                  <span className="text-xs uppercase">Mon</span>
                  <span className="font-semibold">{date.split(' ')[1]}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
               <button className="bg-white border border-gray-300 px-6 py-3 font-medium w-32">01 +</button>
               <div className="font-semibold text-xl">400 AED[cite: 4]</div>
               <button className="bg-[#113224] text-white px-8 py-3 font-medium flex-grow text-center">Book Now[cite: 4]</button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="mb-24">
        <h2 className="text-2xl font-serif text-center mb-12">Birthday Pottery Event Timeline[cite: 4]</h2>
        <div className="flex flex-col md:flex-row justify-between items-start relative">
          {/* Background line for desktop */}
          <div className="hidden md:block absolute top-6 left-0 w-full h-[1px] bg-gray-300 -z-10"></div>
          
          {[
            { num: '01', title: 'Arrival & Welcome', time: '15 Mins', desc: 'Kids Settle In And Get Ready For The Fun' },
            { num: '02', title: 'Pottery Workshop', time: '60 Mins', desc: 'Hands-On Pottery Making With Instructors' },
            { num: '03', title: 'Drying & Packing', time: '10 Mins', desc: 'Pottery Is Carefully Packed To Take Home' },
            { num: '04', title: 'Cake Cutting', time: '45 Mins', desc: 'Celebration Time With Cake And Snacks' },
            { num: '05', title: 'Take-Home Gifts', time: '05 Mins', desc: 'Each Child Leaves With Their Creation' }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center max-w-[200px] mb-8 md:mb-0">
              <div className="bg-[#113224] text-[#d4af37] w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 border-4 border-white shadow-sm">
                {step.num}
              </div>
              <h3 className="font-semibold mb-1">{step.title}[cite: 4]</h3>
              <p className="text-xs font-medium text-gray-500 mb-3">{step.time}[cite: 4]</p>
              <p className="text-sm text-gray-600 leading-snug">{step.desc}[cite: 4]</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}