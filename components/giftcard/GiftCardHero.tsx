"use client";

import { useMemo, useState, useEffect } from "react";
import { Play, User2 } from "lucide-react";
import QuantitySelector from "../product/QuantitySelector";
import { WorkshopItem } from "@/services/workshop.service";
import { BookingService } from "@/services/booking.service";
import MaterialSelector from "../product/MaterialSelector";
import { WorkshopOption } from "@/services/workshop.service";
import { addToCartOrGuest } from "@/utils/guestCart";
import OccasionSelector from "./OccasionSelector";
import Link from "next/link";
import ImageGrid from "../common/ImageGrid";
import ProductMedia from "../product/ProductMedia";
import { Title } from "../ui";

function getUniqueMaterials(options?: WorkshopOption[]) {
  return (
    options
      ?.filter(
        (option) =>
          !option.title.toLowerCase().includes("adults & kids") &&
          option.title.toLowerCase().includes("adults"),
      )
      .map((option) => ({
        ...option,
        title: option.title.replace(/\s*-\s*Adults$/i, ""),
      })) ?? []
  );
}

interface GiftCardHeroProps {
  product: WorkshopItem;
}

export default function GiftCardHero({ product }: GiftCardHeroProps) {
  const bookingService = new BookingService();
  const [quantity, setQuantity] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");
  const [recipient, setRecipient] = useState("Adults");
  const [message, setMessage] = useState("");
  const [availabilityError, setAvailabilityError] = useState("");
  const [showCartToast, setShowCartToast] = useState(false);

  const uniqueMaterials = useMemo(
    () => getUniqueMaterials(product?.options),
    [product?.options],
  );

  const [selectedMaterialId, setSelectedMaterialId] = useState(
    () => getUniqueMaterials(product?.options)[0]?._id ?? "",
  );

  useEffect(() => {
    if (
      uniqueMaterials.length > 0 &&
      !uniqueMaterials.some((m) => m._id === selectedMaterialId)
    ) {
      setSelectedMaterialId(uniqueMaterials[0]._id);
    }
  }, [uniqueMaterials, selectedMaterialId]);

  const selectedClay = useMemo(
    () => product?.options?.find((m) => m._id === selectedMaterialId),
    [product?.options, selectedMaterialId],
  );

  const selectedMaterial = useMemo(() => {
    if (!selectedClay) return null;

    return product?.options?.find(
      (option) =>
        option.clayTypeId === selectedClay.clayTypeId &&
        option.title.toLowerCase().includes(recipient.toLowerCase()),
    );
  }, [product?.options, selectedClay, recipient]);
  const handleCheck = async () => {
    setAvailabilityError("");

    const bookingPayload = {
      bookingType: "gift" as const,
      workshopId: product._id,
      optionId: selectedMaterial?._id || "",
      people: quantity,
      giftDetails: {
        occasion: occasion,
        personalMessage: message,
      },
      ...(recipient === "Adults" && {
        adult: quantity,
      }),
      ...(recipient === "Kids" && {
        child: quantity,
      }),
    };

    const unitPrice = selectedMaterial?.price ?? 0;
    const currency = selectedMaterial?.currency ?? "AED";

    try {
      await addToCartOrGuest(
        bookingPayload,
        {
          workshopTitle: product.title,
          optionTitle: selectedMaterial?.title ?? "",
          price: unitPrice,
          subtotal: unitPrice * quantity,
          currency,
          bannerImage: product.bannerImage || "/images/product/1.png",
          image: product.images?.[0]?.image,
        },
        bookingService,
      );
      setShowCartToast(true);
      setTimeout(() => setShowCartToast(false), 8000);
      return true;
    } catch (error) {
      setAvailabilityError(
        (error as Error)?.message ||
          "Unable to add booking to cart. Please try again.",
      );
      return false;
    }
  };

  return (
    <section className="page-wrapper ">
      {showCartToast && (
        <div className="fixed top-20 left-0 right-0 w-full bg-[#68bc60] text-white py-3.5 px-6 z-[9999] shadow-sm animate-in fade-in slide-in-from-top duration-300">
          <div className="page-wrapper flex justify-end items-center text-sm font-medium">
            <div>
              Your item has been added to bag.{" "}
              <Link
                href="/cart"
                className="underline underline-offset-2 font-bold hover:opacity-90 ml-1"
              >
                Checkout now
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-4 -ml-">
        {/* Left Section - Media */}
         <div className="mb-4 lg:hidden block pt-8">
           <Title className="mb-1 font-normal">{product?.title}</Title>
            <p className="xl:text-base text-sm  text-gray-800 leading-relaxed pr-4">
          {product.description}
            </p>
          </div>
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

        {/* Right Column: Content & Form */}
        <div className="flex flex-col lg:sticky lg:top-24 h-fit self-start lg:mt-14 mt-4">
      
 <div className="mb-6 lg:block hidden">
            <h1 className="text-[2.5rem] leading-tight font-neiko text-[#0D463D] mb-1">
              {product.title}
            </h1>
            <p className="xl:text-base text-sm  text-gray-800 leading-relaxed pr-4">
          {product.description}
            </p>
          </div>
          <div className="bg-white shadow-xl shadow-black/5 flex flex-col">
               <div className="relative  bg-primary  px-6  overflow-hidden text-center text-white">
            {/* Scattered Absolute Background Doodle Icons */}
            <img
              src="/images/gift/1.png"
              alt=""
              className="absolute top-4 left-6 w-6  pointer-events-none "
            />
            <img
              src="/images/gift/2.png"
              alt=""
              className="absolute -top-2 left-36 w-12  pointer-events-none"
            />
            <img
              src="/images/gift/3.png"
              alt=""
              className="absolute bottom-2 left-20 w-10  pointer-events-none"
            />
            <img
              src="/images/gift/4.png"
              alt=""
              className="absolute -top-4 right-1/2 w-10  pointer-events-none md:block hidden"
            />
            <img
              src="/images/gift/5.png"
              alt=""
              className="absolute -top-1 right-1/4 w-10  pointer-events-none md:block hidden"
            />
            <img
              src="/images/gift/6.png"
              alt=""
              className="absolute bottom-4 right-32 w-8  pointer-events-nonen"
            />
            <img
              src="/images/gift/7.png"
              alt=""
              className="absolute top-2 right-10 w-10  pointer-events-none"
            />
            <img
              src="/images/gift/8.png"
              alt=""
              className="absolute bottom-0 -right-4 w-12  pointer-events-none"
            />

            {/* Foreground Content */}
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className=" text-white text-center py-6 px-4 relative overflow-hidden">
              <h2 className="text-lg font-medium mb-1 relative z-10">
                Customize Your Gift Card
              </h2>
              <p className="text-sm text-white/80 relative z-10">
                Make it personal, make it memorable
              </p>
            </div>

            </div>
          </div>
            <div className="lg:p-8 p-3 space-y-8">
              {/* Occasion Section */}
              <div>
                <OccasionSelector
                  initialOccasion={occasion}
                  onOccasionSelect={(selectedItem) => setOccasion(selectedItem)}
                />
              </div>

              {/* Recipient Selection */}
              <div>
                <label className="block text-black font-medium mb-3">
                  Who is this Gift for?
                </label>
                <div className="bg-white border-[0.5px] border-[#0D463D66] p-3 flex gap-3">
                  {["Adults", "Kids"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setRecipient(item)}
                      className={`flex-1 py-4 text-sm md:text-base font-normal transition-colors ${
                        recipient === item
                          ? "bg-primary text-white"
                          : "text-black hover:bg-primary bg-[#0D463D33] hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clay Type Selector */}
              {uniqueMaterials && uniqueMaterials.length > 0 && (
                <div>
                  <label className="block text-black font-medium mb-3 text-capitalize">
                    Choose your clay
                  </label>
                  <div className="bg-white border-[0.5px] border-[#0D463D66] p-3 flex gap-3">
                    <MaterialSelector
                      className="!mb-0 w-full"
                      materials={uniqueMaterials}
                      selectedMaterialId={selectedMaterialId}
                      onMaterialSelect={setSelectedMaterialId}
                    />
                  </div>
                </div>
              )}

              {/* Message Input text field */}
              <div>
                <label className="block text-black font-medium mb-3">
                  Add a personal message{" "}
                  <span className="text-gray-400 font-normal text-sm">
                    ({message.length} / 250 characters)
                  </span>
                </label>
                <div className="bg-white border-[0.5px] border-[#0D463D66] p-3 flex gap-3">
                  <textarea
                    name="personalMessage"
                    maxLength={250}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#0D463D33] text-primary placeholder-primary/50 border-none p-4 h-24 text-sm focus:ring-0 focus:outline-none resize-none"
                    placeholder="Hope you enjoy getting your hands dirty and creating something beautiful"
                  />
                </div>
              </div>

              {/* Quantity Handler */}
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((prev) => prev + 1)}
                onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
                limit={1}
                unitPrice={selectedMaterial?.price}
                currency={selectedMaterial?.currency ?? "AED"}
                onCart={handleCheck}
                buttonlabel={"Add to cart"}
              />
              {availabilityError && (
                <p className="text-sm text-red-600">
                  {availabilityError}{" "}
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2  border border-primary px-6 py-1 font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    go to login
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
