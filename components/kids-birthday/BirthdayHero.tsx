"use client";
import { useEffect, useMemo, useState } from "react";
import { format, isToday } from "date-fns";
import { useFilteredTimeSlots } from "@/hooks/useFilteredTimeSlots";
import DateSelector from "../product/DateSelector";
import { WorkshopItem } from "@/services/workshop.service";
import TimeSlotSelector from "../product/TimeSlotSelector";
import { useRouter } from "next/navigation";
import { BookingService } from "@/services/booking.service";
import {
  getAvailabilityData,
  getPotteryCapacity,
  PotteryCapacityResult,
} from "@/services/avaliablity.service";
import { BookingData, Availability } from "@/types";
import { useAuthStore } from "@/store/authStore";
import QuantitySelector from "../product/QuantitySelector";
import BookingActions from "../product/BookingActions";
import MaterialSelector from "../product/MaterialSelector";
import MaterialDescription from "../product/MaterialDescription";
import ProductMedia from "../product/ProductMedia";
import WorkshopQuantitySelector from "../product/WorkshopQuantitySelector";

interface BirthdayProps {
  product: WorkshopItem;
  type?: "kids" | "adults";
}

const BirthdayHero: React.FC<BirthdayProps> = ({ product, type }) => {
  const minQuantity = type === "kids" ? 12 : 25;
  const maxQuantity = 25;

  // Single quantity state (Kids)
  const [quantity, setQuantity] = useState(12);

  // Split quantity state (Adults)
  const [wheelCount, setWheelCount] = useState(0);
  const [handCount, setHandCount] = useState(0);

  const totalAdultParticipants = wheelCount + handCount;
  const currentTotalPeople =
    type === "kids" ? quantity : totalAdultParticipants;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string>("");
  const [slotError, setSlotError] = useState<string>("");
  const [availabilityError, setAvailabilityError] = useState<string>("");
  const [capacityInfo, setCapacityInfo] =
    useState<PotteryCapacityResult | null>(null);
  const [capacityLoading, setCapacityLoading] = useState(false);
  const [capacityError, setCapacityError] = useState<string>("");
  const router = useRouter();
  const bookingService = new BookingService();
  const userId: string = useAuthStore.getState().user?.userId ?? "";

  const [selectedMaterialId, setSelectedMaterialId] = useState(
    product.options?.[0]?._id || "",
  );
  const selectedMaterial = useMemo(
    () => product.options?.find((m) => m._id === selectedMaterialId),
    [product.options, selectedMaterialId],
  );

  const formattedDate = useMemo(
    () => (selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""),
    [selectedDate],
  );

  // Filter time slots for today based on UAE timezone using custom hook
  const availableSlots = useFilteredTimeSlots(selectedDate, product.defaultSlots);

  const quantityLimit = Math.min(
    maxQuantity,
    capacityInfo?.remainingCapacity ?? maxQuantity,
  );

  useEffect(() => {
    if (
      type === "kids" &&
      capacityInfo &&
      capacityInfo.remainingCapacity >= 12 &&
      quantity > capacityInfo.remainingCapacity
    ) {
      setQuantity(capacityInfo.remainingCapacity);
    }
  }, [capacityInfo, quantity, type]);

  const handleDateSelect = (date: Date) => {
    const isSameDate =
      selectedDate && date.toDateString() === selectedDate.toDateString();

    if (isSameDate && showTimeSlots) {
      setShowTimeSlots(false);
      setSelectedSlotId(null);
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
      setShowTimeSlots(true);
      setSelectedSlotId(null);
    }

    setDateError("");
    setAvailabilityError("");
    setCapacityError("");
    setCapacityInfo(null);
  };

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlotId(slotId);
    setSlotError("");
    setAvailabilityError("");
    setCapacityError("");
  };

  useEffect(() => {
    const fetchCapacity = async () => {
      if (!selectedDate || !selectedSlotId) {
        setCapacityInfo(null);
        setCapacityError("");
        return;
      }

      const slot = product.defaultSlots.find((s) => s._id === selectedSlotId);
      if (!slot) return;

      setCapacityLoading(true);
      setCapacityError("");
      try {
        const res = await getPotteryCapacity({
          workshopId: product._id,
          bookingDate: formattedDate,
          startTime: slot.startTime,
          endTime: slot.endTime,
          bookingType: "events",
        });

        setCapacityInfo(res.result ?? null);
      } catch (err: any) {
        console.error("Capacity fetch error", err);
        setCapacityError(err?.message || "Unable to fetch capacity");
        setCapacityInfo(null);
      } finally {
        setCapacityLoading(false);
      }
    };

    fetchCapacity();
  }, [
    selectedDate,
    selectedSlotId,
    formattedDate,
    product.defaultSlots,
    product._id,
  ]);

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

    return isValid;
  };

  const handleCheck = async (
    destination: "cart" | "checkout",
    overrideCounts?: { people?: number; hand?: number; wheel?: number },
  ) => {
    if (!validateSelection()) return false;

    setAvailabilityError("");
    
    const hand = overrideCounts?.hand ?? handCount;
    const wheel = overrideCounts?.wheel ?? wheelCount;
    const peopleCount = overrideCounts?.people ?? (type === "kids" ? quantity : hand + wheel);

    const bookingData: BookingData = {
      userId,
      bookingType: "events",
      workshopId: product._id,
      optionId: selectedMaterialId || product.options?.[0]?._id || "",
      bookingDate: formattedDate,
      slotId: selectedSlotId!,
      people: peopleCount,
      handBuild: hand,
      wheelPottery: wheel,
    };

    const availabilityData: Availability = {
      workshopId: product._id,
      bookingDate: formattedDate,
      slotId: selectedSlotId!,
      guests: peopleCount,
      bookingType: "events",
      handBuild: hand,
      wheelPottery: wheel,
    };

    const availabilityResponse = await getAvailabilityData(availabilityData);
    const isAvailable = availabilityResponse?.result?.available === true;
    const isAvailableMessage = availabilityResponse?.result?.reason;

    if (!isAvailable) {
      setAvailabilityError(
        isAvailableMessage ||
          "Selected slot is not available. Please choose another date or time.",
      );
      return false;
    }

    setAvailabilityError("");

    try {
      await bookingService.addToCart(bookingData);
      return true;
    } catch (error) {
      setAvailabilityError(
        (error as Error)?.message ||
          "Unable to add booking to cart. Please try again.",
      );
      return false;
    }
  };

  const handleAddToCart = async (overrideCounts?: { people?: number; hand?: number; wheel?: number }) => {
    const token: string | null = useAuthStore.getState().user?.token || null;
    if (!token) {
      router.push("/login");
      return;
    }
    const success = await handleCheck("cart", overrideCounts);
    if (success) router.push("/cart");
  };

  const handleBookNow = async () => {
    const token: string | null = useAuthStore.getState().user?.token || null;
    if (!token) {
      router.push("/login");
      return;
    }
    const success = await handleCheck("checkout");
    if (success) router.push("/checkout");
  };

  // Enable check: Date and slot must be selected, and total people must meet bounds
const isBookingDisabled =
  !selectedDate ||
  !selectedSlotId ||
  currentTotalPeople < 12 ||
  currentTotalPeople > quantityLimit;

  return (
    <section className="bg-[#f5f1eb] min-h-screen py-12 font-sans text-[#0D463D]">
      <div className="page-wrapper px-[17px] grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="flex flex-col gap-4 h-full">
          <ProductMedia
            imageUrl={product?.bannerImage || "/images/product/1.png"}
            alt={product?.title}
            images={product?.images}
            videos={
              product?.options
                ?.filter(
                  (option) =>
                    option.clayTypeVideo && option.clayTypethumbnailImage,
                )
                ?.map((option) => ({
                  id: option._id,
                  thumbnailUrl: option.clayTypethumbnailImage || "",
                  videoUrl: option.clayTypeVideo || "",
                })) || []
            }
          />
        </div>

        <div className="flex flex-col h-full">
          <div className="mb-6">
            <h1 className="text-[2.5rem] leading-tight font-neiko text-[#0D463D] mb-1">
              {product.title}
            </h1>
            {/* <h2 className="text-[2rem] font-neiko text-[#0D463D] mb-4">
              {type === "kids" ? "(3 - 13 Years)" : "(14 years & above)"}
            </h2> */}
            <p className="xl:text-base text-sm text-gray-800 leading-relaxed pr-4">
              {product.description}
            </p>
          </div>

          <div className="space-y-6">
            {type === "adults" && (
              <div className="p-[18px] bg-white">
                {product?.options && product.options.length > 0 && (
                  <MaterialSelector
                    materials={product?.options}
                    selectedMaterialId={selectedMaterialId}
                    onMaterialSelect={setSelectedMaterialId}
                  />
                )}
                {selectedMaterial && selectedMaterial.description && (
                  <MaterialDescription
                    materialName={selectedMaterial.title}
                    description={selectedMaterial.description}
                  />
                )}
              </div>
            )}

            <div className="p-[18px] bg-white">
              <DateSelector
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />
              {dateError && (
                <p className="mt-3 text-sm text-red-600">{dateError}</p>
              )}
            </div>

            {availableSlots?.length > 0 && (
              <div className="p-[18px] bg-white">
                <TimeSlotSelector
                  slots={availableSlots.map((slot) => ({
                    ...slot,
                    capacity: Boolean(slot.capacity),
                  }))}
                  selectedSlotId={selectedSlotId}
                  onSlotSelect={handleSlotSelect}
                />
                {slotError && (
                  <p className="mt-3 text-sm text-red-600">{slotError}</p>
                )}

                {capacityLoading && (
                  <p className="mt-3 text-sm text-gray-600">
                    Checking capacity...
                  </p>
                )}
                {capacityError && (
                  <p className="mt-3 text-sm text-red-600">{capacityError}</p>
                )}
                {capacityInfo &&
                  (capacityInfo.remainingCapacity === 0 ? (
                    <p className="mt-3 text-sm text-red-600">
                      Sorry, this time slot is fully booked. Please select
                      another time slot or date.
                    </p>
                  ) : (
                    <div className="mt-3 text-sm text-green-700">
                      <p>
                        <strong>Available slots:</strong>{" "}
                        {capacityInfo.remainingCapacity}
                      </p>
                    </div>
                  ))}
              </div>
            )}

            <div className="p-[18px] bg-white">
              {/* {type === "kids" ? (
                <QuantitySelector
                  quantity={quantity}
                  limit={quantityLimit}
                  onIncrease={() => {
                    if (quantity < quantityLimit) setQuantity(quantity + 1);
                  }}
                  onDecrease={() =>
                    setQuantity(Math.max(12, quantity - 1))
                  }
                  unitPrice={selectedMaterial ? selectedMaterial.price : 0}
                  currency={
                    selectedMaterial ? selectedMaterial.currency : "AED"
                  }
                  onCart={() => handleAddToCart({ people: quantity })}
                />
              ) : ( */}
                <WorkshopQuantitySelector
                  maxLimit={quantityLimit}
                  unitPrice={selectedMaterial ? selectedMaterial.price : 0}
                  currency={
                    selectedMaterial ? selectedMaterial.currency : "AED"
                  }
                  onChange={({ wheelCount: wCount, handCount: hCount }) => {
                    setWheelCount(wCount);
                    setHandCount(hCount);
                  }}
                  onCart={({ wheelCount: wCount, handCount: hCount }) => {
                    setWheelCount(wCount);
                    setHandCount(hCount);
                    handleAddToCart({
                      people: wCount + hCount,
                      hand: hCount,
                      wheel: wCount,
                    });
                  }}
                />
              {/* )} */}
            </div>

            {availabilityError && (
              <p className="text-sm text-red-600">{availabilityError}</p>
            )}
            <BookingActions
              onBookNow={handleBookNow}
              isBookingDisabled={isBookingDisabled}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BirthdayHero;