"use client";

import { useEffect, useState } from "react";
import { getWorkshopData, WorkshopItem } from "@/services/workshop.service";
import { BookingService } from "@/services/booking.service";
import { BookingData } from "@/types";

import GiftCardHero from "./GiftCardHero";
import InfoAndTimeline from "./InfoAndTimeline";
import TestimonialsSection from "../testimonial/TestimonialsSection";
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
        "a-gift-made-by-hand-from-the-heart",
      );

      setData(result);
    };

    loadWorkshop();
  }, []);


  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#fcfbf9] font-sans text-[#113224]">
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
    </div>
  );
}
