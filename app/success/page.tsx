import { getOrderById } from "@/services/order.service";
import { FileCheck2, ShoppingBag, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Payment Successful',
  description: 'Your order was placed successfully.',
};

interface SuccessPageProps {
  searchParams: Promise<{
    orderId?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { orderId } = await searchParams;
  const orderdata = await getOrderById(orderId || "");

  // Safely extract booking details if available
  const firstBooking = orderdata?.items?.[0]?.bookingId;
  const customerName = firstBooking?.customer.firstName + " " + firstBooking?.customer.lastName || "N/A";
  const customerEmail = firstBooking?.customer?.email  || "N/A";
  // const bookingDate = firstBooking?.bookingDate 
  // const timeSlot = firstBooking?.timeSlot || firstBooking?.slot || "N/A";

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Top Progress Indicator Bar */}
      <div className="w-full bg-secondary-dark py-8 mb-12 border-t border-b border-[#e5e1d8]">
        <div className="max-w-7xl mx-auto flex items-center justify-center px-4">
          <button className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-[#0D463D] text-white">
              <ShoppingBag size={18} />
            </div>
            <span className="font-medium hidden sm:block text-black">Shopping Cart</span>
          </button>

          <div className="w-12 sm:w-24 h-[1px] bg-[#d1cec7] mx-4 sm:mx-6"></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-[#0D463D] text-white">
              <Wallet size={18} />
            </div>
            <span className="font-medium hidden sm:block text-black">Checkout</span>
          </div>

          <div className="w-12 sm:w-24 h-[1px] bg-[#d1cec7] mx-4 sm:mx-6"></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-[#0D463D] text-white">
              <FileCheck2 size={18} />
            </div>
            <span className="font-medium hidden sm:block text-black">Order Complete</span>
          </div>
        </div>
      </div>

      {/* Dynamic Step Content */}
      <div className="max-w-7xl mx-auto px-4 pb-24 relative min-h-[600px]">
        {orderdata && (
          <>
            {/* Header / Status */}
            <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-7">
              <span className="text-black font-medium">Your Cart</span>
              <span className="inline-flex items-center gap-2 text-[#0D463D] font-medium">
                <svg width="25" height="25" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="33" height="33" fill="#0D463D"/>
                  <path d="M11.8145 16.5009L14.9345 19.6209L21.1855 13.3809" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Paid
              </span>
            </div>

            {/* Order Items List */}
            <div className="space-y-8  lg:block hidden">
              {orderdata.items.map((item, index) => (
                <div key={index} className="flex  flex-col  sm:flex-row items-center gap-6 border-b border-gray-200 pb-8 justify-start">
                  <div className="w-24 h-24 bg-gray-200 rounded-sm shrink-0 overflow-hidden relative">
                    <Image
                      src={item.bookingId.workshopId.images?.[0]?.image || '/images/products/pottery1.png'}
                      alt={item.bookingId.workshopId.title}
                      width={128}
                      height={128}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                   
                  </div>

                  <div className="flex-grow flex flex-col justify-between w-full">
                      <div className="flex  items-start mb-2">
                        <div className="w-5/12">
                        <h3 className="font-normal  text-black text-[15px]">
                          {item.bookingId.workshopId.title}-{item.bookingId.items[0]?.optionTitle}
                        </h3>
                          </div>
                          <div className="w-7/12 flex justify-between items-start">
                        <div className="text-sm text-gray-500 space-y-1">
                          {(item.bookingId.items[0]?.wheelPottery ?? 0) > 0 && (
                            <p>
                              x {item.bookingId.items[0]?.wheelPottery} Wheel Pottery
                              <span className="ml-1 text-black">
                                {item.bookingId.currency}{" "}
                                {Number(item.bookingId.items[0]?.price ?? 0).toFixed(2)}
                              </span>
                            </p>
                          )}
                          {(item.bookingId.items[0]?.handBuild ?? 0) > 0 && (
                            <p>
                              x {item.bookingId.items[0]?.handBuild} HandBuilding
                              <span className="ml-1 text-black">
                                {item.bookingId.currency} {item.bookingId.items[0]?.price.toFixed(2)}
                              </span>
                            </p>
                          )}
                          <p>
                            {item.bookingId.items[0]?.people} x
                            <span className="ml-1 text-black">
                              {item.bookingId.currency} {item.bookingId.items[0]?.price.toFixed(2)}
                            </span>
                          </p>
                        </div>
                        <p>
                          <span className="ml-1 text-gray-500">
                            {item.bookingId.currency} {item.bookingId.items[0]?.subtotal.toFixed(2)}
                          </span>
                        </p>
                          </div>
                    </div>
                    </div>
                  </div>
              ))}
            </div>
              <div className="space-y-8 lg:hidden block">
                    {orderdata.items.map((item, i) => (
                      <div className="border-b border-gray-200 pb-6" key={i}>
                        <div className="flex gap-4">
                          {/* Thumbnail */}
                          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-sm shrink-0 overflow-hidden">
                            <Image
                                src={item.bookingId.workshopId.images?.[0]?.image || '/images/products/pottery1.png'}
                      alt={item.bookingId.workshopId.title}
                              width={112}
                              height={112}
                              unoptimized
                              className="w-full h-full object-cover"
                            />
                          </div>
            
                          {/* Item Details */}
                          <div className="flex-grow flex flex-col justify-center text-sm relative">
     
            
                            <h3 className="font-semibold text-[15px] text-black mb-2 leading-tight">
                              {item.bookingId.workshopId.title}-{item.bookingId.items[0]?.optionTitle}
                            </h3>
                            <div className="flex justify-between items-center text-gray-500">
                              <>
                          {(item.bookingId.items[0]?.wheelPottery ?? 0) > 0 && (
                            <p>
                              x {item.bookingId.items[0]?.wheelPottery} Wheel Pottery
                              <span className="ml-1 text-black">
                                {item.bookingId.currency}{" "}
                                {Number(item.bookingId.items[0]?.price ?? 0).toFixed(2)}
                              </span>
                            </p>
                          )}
                          {(item.bookingId.items[0]?.handBuild ?? 0) > 0 && (
                            <p>
                              x {item.bookingId.items[0]?.handBuild} HandBuilding
                              <span className="ml-1 text-black">
                                {item.bookingId.currency} {item.bookingId.items[0]?.price.toFixed(2)}
                              </span>
                            </p>
                          )}
                          <p>
                            {item.bookingId.items[0]?.people} x
                            <span className=" text-black">
                              {item.bookingId.currency} {item.bookingId.items[0]?.price.toFixed(2)}
                            </span>
                          </p>
                          </>
                          <p className=" text-black">
                            {item.bookingId.currency} {item.bookingId.items[0]?.subtotal.toFixed(2)}
                          </p>
                        </div>
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
<div className="flex justify-between items-end py-2 pt-7">

                      <span className="text-black font-medium">Subtotal</span>

                      <span className=" text-black font-medium">

{orderdata.currency} {Number(orderdata.subtotal).toFixed(2)}</span>

                    </div>

         <div className="flex justify-between items-end py-2">

                      <span className="text-black font-medium">TaxAmount</span>

                      <span className=" text-black font-medium">

{orderdata.currency} {Number(orderdata.taxAmount).toFixed(2)}</span>

                    </div>

         <div className="flex justify-between items-end  border-b border-gray-200 py-2 pb-7">

                      <span className="text-black font-medium">Total</span>

                      <span className=" text-black font-medium">

{orderdata.currency} {Number(orderdata.grandTotal).toFixed(2)}</span>

                    </div>


      

            {/* 2-Column Summary Section */}
            <div className=" border-b border-gray-200 py-6 mb-10">
              <div className="grid grid-cols-1 gap-8 text-sm">
                
                {/* Left Side: Customer & Booking Info */}
                <div className="space-y-4">
                  <div className="flex justify-between  md:gap-16">
                    <span className="text-gray-500 w-24">Name</span>
                    <span className="text-black font-medium">{customerName}</span>
                  </div>
                  <div className="flex justify-between  md:gap-16">
                    <span className="text-gray-500 w-24">Email</span>
                    <span className="text-black font-medium">{customerEmail}</span>
                  </div>
                 
                </div>

                {/* Right Side: Price Breakdown */}
                {/* <div className="space-y-4">
                  <div className="flex justify-between  md:gap-16">
                    <span className="text-gray-500 w-24">Date</span>
                    <span className="text-black font-medium">{bookingDate}</span>
                  </div>
                  <div className="flex justify-between  md:gap-16">
                    <span className="text-gray-500 w-24">Time slot</span>
                    <span className="text-black font-medium">{timeSlot}</span>
                  </div>
                </div> */}

              </div>
            </div>

            {/* Bottom Call to Action Section */}
            <div className="text-center space-y-6 pt-7">
              <p className="text-black font-normal">
                New Order, Click button below
              </p>
              <div>
                <Link
                  href="/"
                  className="inline-block bg-[#0D463D] text-white md:px-40 px-16 py-3.5 text-sm font-medium hover:bg-[#0a3730] transition-colors rounded-sm shadow-sm"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}