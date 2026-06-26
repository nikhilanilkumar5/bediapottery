"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import DateSelector from "../product/DateSelector";
import TimeSlotSelector from "../product/TimeSlotSelector";
import { BookingService } from "@/services/booking.service";
import { getAvailabilityData } from "@/services/avaliablity.service";
import { Availability } from "@/types";
import { useAuthStore } from "@/store/authStore";
import { confirmGiftRedeem } from "@/services/gift.service";

interface PresetBookingPayload {
  bookingId: string;
  giftStatus: string;
  occasion: string;
  personalMessage: string;
  workshop: {
    _id: string;
    title: string;
    slug: string;
    defaultSlots: Array<{
      _id: string;
      label: string;
      startTime: string;
      endTime: string;
      capacity: number;
    }>;
  };
  items: Array<{
    optionId: string;
    optionTitle: string;
    price: number;
    people: number;
    adult: number;
    child: number;
    subtotal: number;
  }>;
  totalPeople: number;
  grandTotal: number;
  currency: string;
}

interface GiftCardHeroProps {
  bookingData: PresetBookingPayload;
}

export default function GiftCardHero({ bookingData }: GiftCardHeroProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [dateError, setDateError] = useState("");
  const [slotError, setSlotError] = useState("");
  const [availabilityError, setAvailabilityError] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const bookingService = new BookingService();

  const bookingItem = bookingData?.items?.[0] || {
    optionId: "",
    optionTitle: "N/A",
    price: 0,
    people: 1,
    adult: 0,
    child: 0,
  };
  const workshop = bookingData?.workshop || {
    _id: "",
    title: "",
    defaultSlots: [],
  };
  const occasion = bookingData?.occasion || "General";

  const formattedDate = useMemo(() => {
    return selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    const isSameDate =
      selectedDate && date.toDateString() === selectedDate.toDateString();

    if (isSameDate && selectedSlotId !== null) {
      setSelectedSlotId(null);
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
      setSelectedSlotId(null);
    }

    setDateError("");
    setAvailabilityError("");
  };

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlotId(slotId);
    setSlotError("");
    setAvailabilityError("");
  };

  const validateSelection = () => {
    let isValid = true;

    if (!selectedDate) {
      setDateError("Please select a date before continuing.");
      isValid = false;
    } else {
      setDateError("");
    }

    if (!selectedSlotId) {
      setSlotError("Please select a time slot before continuing.");
      isValid = false;
    } else {
      setSlotError("");
    }

    if (!couponCode.trim()) {
      setAvailabilityError("Please enter a valid coupon/voucher code.");
      isValid = false;
    }

    return isValid;
  };

  const handleRedeem = async () => {
    if (!validateSelection()) return;

    setIsSubmitting(true);
    setAvailabilityError("");

    // 1. Verify Slot Availability
    const availabilityData: Availability = {
      workshopId: workshop._id,
      bookingDate: formattedDate,
      slotId: selectedSlotId!,
      guests: bookingItem.people,
    };

    try {
      const availabilityResponse = await getAvailabilityData(availabilityData);
      const isAvailable = availabilityResponse?.result?.available === true;

      if (!isAvailable) {
        setAvailabilityError(
          availabilityResponse?.result?.reason ||
            "Selected slot is not available.",
        );
        setIsSubmitting(false);
        return;
      }


      const redeemPayload = {
        bookingId: bookingData.bookingId,
        voucherCode: couponCode.trim(),
        bookingDate: formattedDate,
        slotId: selectedSlotId!,
        recipientName: "Sarah Smith",
        recipientPhone: "+971501234567",
        recipientEmail: "sarah@email.com",
      };

      const token = useAuthStore.getState().user?.token || undefined;
      const response = await confirmGiftRedeem(redeemPayload, token);

      if (response.success) {
        router.push("/cart");
      }
    } catch (error) {
      setAvailabilityError(
        (error as Error)?.message || "An unexpected error occurred.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#f2ece3] min-h-screen py-12 font-sans text-[#113224]">
      <div className="page-wrapper px-[17px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Media Gallery */}
        <div className="space-y-4 h-full flex flex-col">
          <div className="relative w-full flex-1 bg-gray-200 overflow-hidden rounded">
            <img
              src="/images/product/gift-card-1.png"
              alt="Gift boxes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 hover:bg-white/50 transition duration-300">
                <Play className="text-white fill-white ml-1" size={24} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              {
                _id: "1",
                image: "/images/product/gift-card-2.jpg",
                title: "Gift thumbnail 1",
              },
              {
                _id: "2",
                image: "/images/product/gift-card-3.jpg",
                title: "Gift thumbnail 2",
              },
              {
                _id: "3",
                image: "/images/product/gift-card-4.jpg",
                title: "Gift thumbnail 3",
              },
            ].map((img) => (
              <div
                key={img._id}
                className="aspect-video bg-gray-200 overflow-hidden rounded"
              >
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Content & Form */}
        <div className="flex flex-col">
          <div className="mb-8">
            <h1 className="text-5xl font-neiko mb-4 text-[#113224]">
              {workshop.title}
            </h1>
            <p className="text-[#113224]/80 leading-relaxed text-[17px]">
              Review your gift customization configurations and finalize your
              setup below by choosing a valid schedule availability.
            </p>
          </div>

          <div className="flex flex-col overflow-hidden">
            <div className="space-y-6">
              {/* Pre-filled Config Summary Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end bg-white p-4 border border-gray-100">
                {/* Occasion */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                    Occasion
                  </label>
                  <div className="w-full bg-[#113224] text-white py-2 px-3 rounded text-sm font-medium text-center truncate">
                    {occasion}
                  </div>
                </div>

                {/* Clay Type Option */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                    Selected Material Option
                  </label>
                  <div className="w-full bg-[#113224] text-white py-2 px-3 rounded text-sm font-medium text-center truncate">
                    {bookingItem.optionTitle}
                  </div>
                </div>
              </div>

              {/* Date Selector */}
              <div className="bg-white p-4">
                <DateSelector
                  onDateSelect={handleDateSelect}
                  selectedDate={selectedDate}
                />
                {dateError && (
                  <p className="mt-3 text-sm text-red-600">{dateError}</p>
                )}
              </div>

              {/* Time Slots */}
              {workshop.defaultSlots?.length > 0 && (
                <div className="bg-white p-4">
                  <TimeSlotSelector
                    slots={workshop.defaultSlots.map((slot) => ({
                      ...slot,
                      capacity: Boolean(slot.capacity),
                    }))}
                    selectedSlotId={selectedSlotId}
                    onSlotSelect={handleSlotSelect}
                  />
                  {slotError && (
                    <p className="mt-3 text-sm text-red-600">{slotError}</p>
                  )}
                </div>
              )}

              {/* Coupon input field container */}
              <div className="bg-white p-4">
                <div className="flex mb-4 border border-gray-200 rounded overflow-hidden">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-grow p-3 border-none focus:ring-0 text-sm bg-white outline-none"
                  />
                </div>
 {availabilityError && (
                <p className="text-sm text-red-600 font-medium">
                  {availabilityError}
                </p>
              )}
                {/* Submission Action Anchor */}
                <div className="mt-5">
                  <button
                    onClick={handleRedeem}
                    disabled={isSubmitting}
                    className="w-full bg-[#113224] text-white py-3 px-4 font-medium hover:bg-[#0c251a] transition-colors text-center text-sm disabled:bg-gray-400"
                  >
                    {isSubmitting ? "Redeeming..." : "Redeem Coupon"}
                  </button>
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
