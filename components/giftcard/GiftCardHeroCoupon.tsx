"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import DateSelector from "../product/DateSelector";
import TimeSlotSelector from "../product/TimeSlotSelector";
import QuantitySelector from "../product/QuantitySelector";
import BookingActions from "../product/BookingActions";
import { WorkshopItem } from "@/services/workshop.service";
import { BookingService } from "@/services/booking.service";
import { getAvailabilityData } from "@/services/avaliablity.service";
import { BookingData, Availability } from "@/types";
import { useAuthStore } from "@/store/authStore";
import MaterialSelector from "../product/MaterialSelector";

interface GiftCardHeroProps {
  product: WorkshopItem;
}

export default function GiftCardHero({ product }: GiftCardHeroProps) {
  const [quantity, setQuantity] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");
  const [recipient, setRecipient] = useState("Kids");
  const [experience, setExperience] = useState("Private VIP Experience");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [dateError, setDateError] = useState("");
  const [slotError, setSlotError] = useState("");
  const [availabilityError, setAvailabilityError] = useState("");
  const [selectedMaterialId, setSelectedMaterialId] = useState(
    product.options?.[0]?._id || "",
  );
  const [childCount, setChildCount] = useState(1);
  const router = useRouter();
  const bookingService = new BookingService();
  const userId = useAuthStore.getState().user?.userId ?? "";
  const selectedClay = useMemo(
    () => product.options?.find((m) => m._id === selectedMaterialId),
    [product.options, selectedMaterialId],
  );
  const selectedMaterial = useMemo(() => {
    if (!selectedClay) return null;

    return product.options?.find(
      (option) =>
        option.clayTypeId === selectedClay.clayTypeId &&
        option.title.toLowerCase().includes(recipient.toLowerCase()),
    );
  }, [product.options, selectedClay, recipient]);
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

    return isValid;
  };

  const handleCheck = async () => {
    if (!validateSelection()) {
      return false;
    }

    const bookingData: BookingData = {
  userId,
  bookingType: "gift",
  workshopId: product._id,
  optionId: selectedMaterial?._id || "",
  bookingDate: formattedDate,
  slotId: selectedSlotId!,
  people:
    recipient === "Adults & Kids"
      ? quantity + childCount
      : quantity,

  ...(recipient === "Adults & Kids" && {
    adult: quantity,
    child: childCount,
  }),
};

    const availabilityData: Availability = {
      workshopId: product._id,
      bookingDate: formattedDate,
      slotId: selectedSlotId!,
      guests: quantity,
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

  const handleAddToCart = async () => {
    const token = useAuthStore.getState().user?.token || null;
    if (!token) {
      router.push("/login");
      return;
    }
    const success = await handleCheck();
    if (success) {
      router.push("/cart");
    }
  };

  const handleBookNow = async () => {
    const token = useAuthStore.getState().user?.token || null;
    if (!token) {
      router.push("/login");
      return;
    }
    const success = await handleCheck();
    if (success) {
      router.push("/checkout");
    }
  };

  const isBookingDisabled = !selectedDate || !selectedSlotId;
  const uniqueMaterials = product?.options
    ?.filter(
      (option) =>
        option.title.toLowerCase().includes("adults") &&
        !option.title.toLowerCase().includes("adults & kids"),
    )
    .map((option) => ({
      ...option,
      title: option.title.replace(/\s*-\s*Adults$/i, ""),
    }));
  return (
    <section className="bg-[#f2ece3] min-h-screen py-12 font-sans text-[#113224]">
      <div className="page-wrapper px-[17px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Media Gallery */}
        <div className="space-y-4 h-full flex flex-col">
          <div className="relative w-full flex-1 bg-gray-200 overflow-hidden">
            <img
              src={product.bannerImage || "/images/product/gift-card-1.png"}
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
            {(product.images?.length > 0
              ? product.images.slice(0, 3)
              : [
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
                ]
            ).map((img, i) => (
              <div
                key={img._id ?? i}
                className="aspect-video bg-gray-200 overflow-hidden rounded"
              >
                <img
                  src={img.image}
                  alt={img.title || `Gift thumbnail ${i + 1}`}
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
              {product.title || "A Gift Made by Hand, from the Heart"}
            </h1>
            <p className="text-[#113224]/80 leading-relaxed text-[17px]">
              {product.shortDescription ||
                "Give the gift of creativity, experiences, and lasting memories. Perfect for anyone who loves to create something truly unique and meaningful."}
            </p>
          </div>

          <div className="bg-white shadow-xl shadow-black/5 flex flex-col">
            <div className="bg-[#113224] text-white text-center py-6 px-4 relative overflow-hidden">
              <h2 className="text-lg font-medium mb-1 relative z-10">
                Customize Your Gift Card
              </h2>
              <p className="text-sm text-white/80 relative z-10">
                Make it personal, make it memorable
              </p>
            </div>

            <div className="p-8 space-y-8">
              {/* Occasion */}
              <div>
                <label className="block font-medium mb-3">
                  Choose an Occasion
                </label>
                <div className="bg-[#e9e6df] p-1 flex flex-wrap gap-1">
                  {[
                    "Birthday",
                    "Anniversary",
                    "Wedding",
                    "Graduation",
                    "more+",
                  ].map((item) => (
                    <button
                      key={item}
                      onClick={() => setOccasion(item)}
                      className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium transition-colors ${
                        occasion === item
                          ? "bg-[#113224] text-white"
                          : "text-gray-600 hover:bg-[#d8d4cb]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient */}
              <div>
                <label className="block font-medium mb-3">
                  Who is this Gift for?
                </label>
                <div className="bg-[#e9e6df] p-1 flex gap-1">
                  {["Adults", "Kids", "Adults & Kids"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setRecipient(item)}
                      className={`flex-1 py-3 text-sm font-medium transition-colors ${
                        recipient === item
                          ? "bg-[#113224] text-white"
                          : "text-gray-600 hover:bg-[#d8d4cb]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {uniqueMaterials && uniqueMaterials.length > 0 && (
                <div>
                  <label className="block font-medium mb-3">
                    choose your clay
                  </label>
                  <MaterialSelector
                    materials={uniqueMaterials}
                    selectedMaterialId={selectedMaterialId}
                    onMaterialSelect={setSelectedMaterialId}
                  />
                </div>
              )}
              {/* Experience */}
              {/* <div>
                <label className="block font-medium mb-3">Select Experience Type</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  {[
                    {
                      title: 'Group Workshop',
                      desc: 'Join others in a fun, collaborative pottery session',
                      price: 'From AED 150',
                    },
                    {
                      title: 'Private VIP Experience',
                      desc: 'Exclusive one-on-one session with expert instructor',
                      price: 'From AED 450',
                    },
                  ].map((item) => (
                    <button
                      key={item.title}
                      onClick={() => setExperience(item.title)}
                      className={`flex-1 flex flex-col items-center justify-center p-4 text-center transition-colors ${
                        experience === item.title
                          ? 'bg-[#113224] text-white'
                          : 'bg-[#e9e6df] text-gray-600 hover:bg-[#d8d4cb]'
                      }`}
                    >
                      <span className="text-sm font-semibold mb-2">{item.title}</span>
                      <span
                        className={`text-[11px] leading-tight mb-4 px-2 ${
                          experience === item.title ? 'text-white/80' : 'text-gray-500'
                        }`}
                      >
                        {item.desc}
                      </span>
                      <span className="text-xs font-bold mt-auto">{item.price}</span>
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Message */}

              {/* Date Selector */}
              <div>
                <DateSelector
                  onDateSelect={handleDateSelect}
                  selectedDate={selectedDate}
                />
                {dateError && (
                  <p className="mt-3 text-sm text-red-600">{dateError}</p>
                )}
              </div>

              {/* Time Slots */}
              {product.defaultSlots?.length > 0 && (
                <div>
                  <TimeSlotSelector
                    slots={product.defaultSlots.map((slot) => ({
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
              <div>
                <label className="block font-medium mb-3">
                  Add a personal message{" "}
                  <span className="text-gray-400 font-normal text-sm">
                    (0 / 250 characters)
                  </span>
                </label>
                <textarea
                  className="w-full bg-[#dce1dd] text-[#113224] placeholder-[#113224]/50 border-none p-4 h-24 text-sm focus:ring-0 focus:outline-none resize-none"
                  placeholder="Hope you enjoy getting your hands dirty and creating something beautiful"
                />
              </div>
              {/* Quantity & Add to Cart */}
              {recipient!= "Adults & Kids" ? (
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity(quantity + 1)}
                  onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
                  unitPrice={selectedMaterial?.price }
                  currency={selectedMaterial?.currency ?? "AED"}
                  onCart={handleAddToCart}
                />
              ) : (
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity(quantity + 1)}
                  onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
                  onchildIncrease={() => setChildCount(childCount + 1)}
                  onchildDecrease={() =>
                    setChildCount(Math.max(1, childCount - 1))
                  }
                  totalPrice={selectedMaterial?.price ? selectedMaterial.price * (quantity + childCount) : undefined}
                  currency={selectedMaterial?.currency || "AED"}
                  onCart={handleAddToCart}
                  child={true}
                  childCount={childCount}
                />
              )}
              {availabilityError && (
                <p className="text-sm text-red-600">{availabilityError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
