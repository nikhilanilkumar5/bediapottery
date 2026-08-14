"use client";

import React, { useState, useMemo, useEffect } from "react";
import { format, isToday } from "date-fns";
import { useFilteredTimeSlots } from "@/hooks/useFilteredTimeSlots";
import { BookingData, Availability } from "@/types";
import { WorkshopItem } from "@/services/workshop.service";
import ProductMedia from "./ProductMedia";
import MaterialSelector from "./MaterialSelector";
import MaterialDescription from "./MaterialDescription";
import DateSelector from "./DateSelector";
import TimeSlotSelector from "./TimeSlotSelector";
import QuantitySelector from "./QuantitySelector";
import WorkshopQuantitySelector from "./WorkshopQuantitySelector";
import BookingActions from "./BookingActions";
import { BookingService, IBookingService } from "@/services/booking.service";
import {
  getAvailabilityData,
  getPotteryCapacity,
  PotteryCapacityResult,
} from "@/services/avaliablity.service";
import { Content, Title } from "../ui";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface ProductDetailClientProps {
  product: WorkshopItem;
  category: string;
  slug: string;
  bookingService?: IBookingService;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  bookingService = new BookingService(),
  product,
  category,
  slug,
}) => {
  const [selectedMaterialId, setSelectedMaterialId] = useState(
    product.options?.[0]?._id || "",
  );
  const isCouplesPackage = slug === "couples-pottery-package";
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const minQuantity =
    category === "corporate-events" ? 12 : isCouplesPackage ? 2 : 1;

  const maxQuantity =
    category === "corporate-events" ? 25 : isCouplesPackage ? 12 : 12;
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(minQuantity);
  const [wheelCount, setWheelCount] = useState(0);
  const [handCount, setHandCount] = useState(0);
  const [dateError, setDateError] = useState<string>("");
  const [slotError, setSlotError] = useState<string>("");
  const userId: string = useAuthStore.getState().user?.userId ?? "";
  const [availabilityError, setAvailabilityError] = useState<string>("");
  const [capacityInfo, setCapacityInfo] =
    useState<PotteryCapacityResult | null>(null);
  const [capacityLoading, setCapacityLoading] = useState(false);
  const [capacityError, setCapacityError] = useState<string>("");
  const router = useRouter();
  // Derived state - computed values
  const selectedMaterial = useMemo(
    () => product.options?.find((m) => m._id === selectedMaterialId),
    [product.options, selectedMaterialId],
  );

  const quantityLimit = Math.min(
    maxQuantity,
    capacityInfo?.remainingCapacity ?? maxQuantity,
  );
  useEffect(() => {
    if (capacityInfo && quantity > capacityInfo.remainingCapacity) {
      setQuantity(Math.max(minQuantity, capacityInfo.remainingCapacity));
    }
  }, [capacityInfo, quantity, minQuantity]);

  const formattedDate = useMemo(() => {
    return selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  }, [selectedDate]);

  // Filter time slots for today based on UAE timezone using custom hook
  const availableSlots = useFilteredTimeSlots(selectedDate, product.defaultSlots);

  const handleDateSelect = (date: Date) => {
    const isSameDate =
      selectedDate && date.toDateString() === selectedDate.toDateString();

    if (isSameDate) {
      setSelectedDate(null);
      setSelectedSlotId(null);
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
  useEffect(() => {
    if (
      capacityInfo &&
      capacityInfo.remainingCapacity >= minQuantity &&
      quantity > capacityInfo.remainingCapacity
    ) {
      setQuantity(capacityInfo.remainingCapacity);
    }
  }, [capacityInfo, quantity, minQuantity]);
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
          bookingDate: formattedDate,
          startTime: slot.startTime,
          endTime: slot.endTime,
          ...(category === "corporate-events" && { bookingType: "events" }),
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

  const handleAddToCart = async (overrideCounts?: {
    people?: number;
    hand?: number;
    wheel?: number;
  }) => {
    const token: string | null = useAuthStore.getState().user?.token || null;
    if (!token) {
      router.push("/login");
      return;
    }
    const success = await handlecheck("cart", overrideCounts);
    if (success) {
      router.push("/cart");
    }
  };

  const handleBookNow = async () => {
    const token: string | null = useAuthStore.getState().user?.token || null;
    if (!token) {
      router.push("/login");
      return;
    }
    const success = await handlecheck("checkout");
    if (success) {
      router.push("/checkout");
    }
  };
  // const [activeTab, setActiveTab] = useState(
  //   product.moreDetails?.[0]?._id || "",
  // );
  const handlecheck = async (
    destination: "cart" | "checkout",
    overrideCounts?: { people?: number; hand?: number; wheel?: number },
  ) => {
    if (!validateSelection()) {
      return false;
    }

    const peopleCount = overrideCounts?.people ?? quantity;
    const handPeople = overrideCounts?.hand ?? handCount;
    const wheelPeople = overrideCounts?.wheel ?? wheelCount;

    const bookingData: BookingData = {
      userId: userId,
      workshopId: product._id,
      optionId: selectedMaterialId,
      bookingDate: formattedDate,
      slotId: selectedSlotId!,
      people: peopleCount,
      ...(category === "corporate-events"
        ? {
            bookingType: "events",
            handBuild: handPeople,
            wheelPottery: wheelPeople,
          }
        : { bookingType: "pottery" }),
    };

    const availabilityData: Availability = {
      workshopId: product._id,
      bookingDate: formattedDate,
      slotId: selectedSlotId!,
      guests: peopleCount,
      ...(category === "corporate-events" && { bookingType: "events" }),
      ...(category === "corporate-events" && {
        handBuild: handPeople,
        wheelPottery: wheelPeople,
      }),
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

  const isBookingDisabled = !selectedDate || !selectedSlotId || quantity < 1;

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
                  // The "|| ''" guarantees TypeScript a string is always provided
                  thumbnailUrl: option.clayTypethumbnailImage || "",
                  videoUrl: option.clayTypeVideo || "",
                })) || []
            }
          />
        </div>

        <div className="flex flex-col h-full md:p-6 lg:p-8 lg:pb-0 space-y-6">
          <div>
            <Title className="2xl:mb-7 text-2xl mb-5 font-normal">
              {product?.title}
            </Title>
            <div>
              {product?.description && (
                <Content className=" leading-relaxed mb-1">
                  {product?.description}
                </Content>
              )}
              <Content className=" leading-relaxed !text-black  font-semibold">
                {" "}
                All-inclusive: Clay, tools, aprons, instructor &  {category === "corporate-events" ? "2-hour event." : "1.5-hour session."}
                 
              </Content>
            </div>
          </div>
          {category === "corporate-events" && (
            <div className="bg-white p-6 shadow-sm">
              {/* Header Label */}
              <div className="mb-4">
                <div className="py-3 px-4 xl:text-base text-sm font-medium bg-primary w-full text-white inline-block">
                  Package Includes
                </div>
              </div>

              {/* Content Area */}
              <div className="bg-[#fcfcfa] border border-[#e5e5e5] max-h-72 overflow-y-auto p-6 relative">
                <ul className="list-disc pl-5 space-y-3 xl:text-base text-sm text-gray-700 pr-8">
                  {product.includes?.map((item) => (
                    <li key={item._id}>{item.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="p-[18px] bg-white">
            {/* Material Selector */}
            {product?.options && product.options.length > 0 && (
              <MaterialSelector
                materials={product?.options}
                selectedMaterialId={selectedMaterialId}
                onMaterialSelect={setSelectedMaterialId}
              />
            )}

            {/* Material Description */}
            {selectedMaterial && selectedMaterial.description && (
              <MaterialDescription
                materialName={selectedMaterial.title}
                description={selectedMaterial.description}
              />
            )}
          </div>
          {/* Date Selector */}
          <div className="p-[18px] bg-white">
            <DateSelector
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
              nonAvailabilityDays={product?.nonAvailabilityDays || []}
            />
            {dateError && (
              <p className="mt-3 text-sm text-red-600">{dateError}</p>
            )}
          </div>

          {/* Time Slots */}
          {availableSlots.length > 0 && (
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

              {/* Capacity Info */}
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
                    Sorry, this time slot is fully booked. Please select another
                    time slot or date.
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
          
          {/* No slots available for today message */}
          {selectedDate && isToday(selectedDate) && availableSlots.length === 0 && (
            <div className="p-[18px] bg-white">
              <p className="text-sm text-orange-600">
                All time slots for today have passed. Please select another date.
              </p>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="p-[18px] bg-white">
            {category === "corporate-events" ? (
              <WorkshopQuantitySelector
                maxLimit={quantityLimit}
                unitPrice={selectedMaterial ? selectedMaterial.price : 0}
                currency={selectedMaterial ? selectedMaterial.currency : "AED"}
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
            ) : (
              <QuantitySelector
                quantity={quantity}
                limit={quantityLimit}
                onIncrease={() => {
                  if (isCouplesPackage) {
                    if (quantity + 2 <= quantityLimit) {
                      setQuantity(quantity + 2);
                    }
                  } else {
                    if (quantity < quantityLimit) {
                      setQuantity(quantity + 1);
                    }
                  }
                }}
                onDecrease={() => {
                  if (isCouplesPackage) {
                    setQuantity(Math.max(2, quantity - 2));
                  } else {
                    setQuantity(Math.max(minQuantity, quantity - 1));
                  }
                }}
                unitPrice={selectedMaterial ? selectedMaterial.price : 0}
                currency={selectedMaterial ? selectedMaterial.currency : "AED"}
                onCart={handleAddToCart}
              />
            )}
          </div>
          {/* Booking Actions */}
          {availabilityError && (
            <p className="text-sm text-red-600">{availabilityError}</p>
          )}
          <BookingActions
            onBookNow={handleBookNow}
            isBookingDisabled={isBookingDisabled}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetailClient;
