"use client";

import { useEffect, useState } from "react";
import { getWorkshopData, WorkshopItem } from "@/services/workshop.service";
import { BookingService } from "@/services/booking.service";
import { BookingData } from "@/types";

import GiftCardHero from "./GiftCardHero";
import InfoAndTimeline from "./InfoAndTimeline";
import TestimonialsSection from "../testimonial/TestimonialsSection";
import GiftCheckoutStep from "./GiftCheckoutStep";

import { FileCheck2, ShoppingBag, Wallet } from "lucide-react";

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;

  recipientName: string;
  giftEmail: string;
  giftPhone: string;
  giftFor: string;
}

const bookingService = new BookingService();

export default function GiftPageClient() {
  const [data, setData] = useState<WorkshopItem | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [grandTotal, setGrandTotal] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const loadWorkshop = async () => {
      const result = await getWorkshopData(
        "a-gift-made-by-hand-from-the-heart"
      );

      setData(result);
    };

    loadWorkshop();
  }, []);

  const handleCheckout = async (formData: CheckoutFormData) => {
    try {
      if (!bookingData) {
        console.error("Booking data missing");
        return;
      }

      const payload = {
        bookingType: "gift",

        giftDetails: {
          recipientName: formData.recipientName,
          giftEmail: formData.giftEmail,
          giftPhone: formData.giftPhone,
          giftFor: formData.giftFor,
        occasion: "birthday" ,
  personalMessage: bookingData.message || "",
        },

        workshops: [
          {
            workshopId: bookingData.workshopId,
            bookingDate: bookingData.bookingDate,
            slotId: bookingData.slotId,

            items: [
              {
                optionId: bookingData.optionId,
                people: bookingData.people,
                adult: bookingData.adult ?? 0,
                child: bookingData.child ?? 0,
              },
            ],
          },
        ],

        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
        },
      };

      console.log("Checkout Payload", payload);

      const response = await bookingService.bookGiftNow(payload);

      console.log("Checkout Success", response);

      setStep(3);
    } catch (error) {
      console.error("Checkout Error", error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#fcfbf9] font-sans text-[#113224]">
      {step === 2 && (
        <div className="w-full bg-[#f3f0e8] py-8 mb-12 border-t border-b border-[#e5e1d8]">
          <div className="max-w-7xl mx-auto flex items-center justify-center px-4">
            <button
              onClick={() => step > 1 && setStep(1)}
              className={`flex items-center gap-3 ${
                step > 1
                  ? "cursor-pointer hover:opacity-80"
                  : "cursor-default"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? "bg-[#113224] text-white"
                    : "bg-white text-[#113224]"
                }`}
              >
                <ShoppingBag size={18} />
              </div>

              <span className="font-medium hidden sm:block">
                Shopping Cart
              </span>
            </button>

            <div className="w-12 sm:w-24 h-[1px] bg-[#d1cec7] mx-4 sm:mx-6" />

            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? "bg-[#113224] text-white"
                    : "bg-white text-[#113224]"
                }`}
              >
                <Wallet size={18} />
              </div>

              <span className="font-medium hidden sm:block">
                Checkout
              </span>
            </div>

            <div className="w-12 sm:w-24 h-[1px] bg-[#d1cec7] mx-4 sm:mx-6" />

            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 3
                    ? "bg-[#113224] text-white"
                    : "bg-white text-[#113224]"
                }`}
              >
                <FileCheck2 size={18} />
              </div>

              <span className="font-medium hidden sm:block">
                Order Complete
              </span>
            </div>
          </div>
        </div>
      )}

      {step === 1 ? (
        <>
          <GiftCardHero
            product={data}
            onBookingDataChange={setBookingData}
            onNext={() => setStep(2)}
            setGrandTotal={setGrandTotal}
          />

          <InfoAndTimeline product={data} />
          <TestimonialsSection />
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <GiftCheckoutStep
            grandTotal={grandTotal}
            onCheckoutDataChange={handleCheckout}
          />
        </div>
      )}
    </div>
  );
}