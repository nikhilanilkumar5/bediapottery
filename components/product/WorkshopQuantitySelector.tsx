"use client";

import React, { useState, useEffect } from "react";
import { Content } from "../ui";

interface WorkshopQuantitySelectorProps {
  unitPrice?: number;
  currency: string;
  maxLimit?: number; // Overall combined cap (e.g. 25)
  buttonLabel?: string;
  onChange?: (details: {
    wheelCount: number;
    handCount: number;
    totalPrice: number;
  }) => void;
  onCart: (details: {
    wheelCount: number;
    handCount: number;
    totalPrice: number;
  }) => void;
  className?: string;
}

export const WorkshopQuantitySelector: React.FC<
  WorkshopQuantitySelectorProps
> = ({
  unitPrice = 0,
  currency,
  maxLimit = 25,
  buttonLabel = "Add to Cart",
  onChange,
  onCart,
  className = "",
}) => {
  // Individual Limits
  const WHEEL_MIN = 0;
  const WHEEL_MAX = 16;

  const HAND_MIN = 0;
  const HAND_MAX = 25;

  // Total Combined Limits
  const TOTAL_MIN = 12; // Minimum total required for event booking
  const TOTAL_MAX = Math.min(25, maxLimit); // Hard cap at 25 total participants

  // Default initial selection
  const [wheelCount, setWheelCount] = useState<number>(12);
  const [handCount, setHandCount] = useState<number>(0);

  const totalPersons = wheelCount + handCount;
  const totalPrice = totalPersons * unitPrice;
  const isTotalValid = totalPersons >= TOTAL_MIN && totalPersons <= TOTAL_MAX;

  // Sync state changes back up to the parent component in real time
  useEffect(() => {
    if (onChange) {
      onChange({ wheelCount, handCount, totalPrice });
    }
  }, [wheelCount, handCount, totalPrice, onChange]);

  // --- Wheel Handlers ---
  const handleWheelIncrease = () => {
    if (wheelCount < WHEEL_MAX && totalPersons < TOTAL_MAX) {
      setWheelCount((prev) => prev + 1);
    }
  };

  const handleWheelDecrease = () => {
    if (wheelCount > WHEEL_MIN) {
      setWheelCount((prev) => prev - 1);
    }
  };

  // --- Hand Building Handlers ---
  const handleHandIncrease = () => {
    if (handCount < HAND_MAX && totalPersons < TOTAL_MAX) {
      setHandCount((prev) => prev + 1);
    }
  };

  const handleHandDecrease = () => {
    if (handCount > HAND_MIN) {
      setHandCount((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (isTotalValid) {
      onCart({ wheelCount, handCount, totalPrice });
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Description Header */}
      <div>
        <Content className="leading-relaxed !text-black font-semibold">
          Select Participants for Each Technique
        </Content>
        <Content className="leading-relaxed text-sm text-gray-600">
          Minimum 12 participants • Maximum 25 participants (combined
          total){" "}
        </Content>
      </div>

      <div className="flex flex-col gap-5 w-full">
        {/* --- POTTERY ON WHEEL CONTROL (0 to 16) --- */}
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-black text-sm md:text-base">
              Pottery on Wheel
            </h4>
            <p className="text-xs text-gray-500">
              Guided wheel session (Max {WHEEL_MAX})
            </p>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 min-w-[140px]">
            <button
              type="button"
              onClick={handleWheelDecrease}
              disabled={wheelCount <= WHEEL_MIN}
              className="w-10 h-10 border border-black/30 flex items-center justify-center disabled:opacity-30 transition bg-white"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="black"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>

            <Content className="text-center font-medium !text-black w-8">
              {wheelCount.toString().padStart(2, "0")}
            </Content>

            <button
              type="button"
              onClick={handleWheelIncrease}
              disabled={wheelCount >= WHEEL_MAX || totalPersons >= TOTAL_MAX}
              className="w-10 h-10 border border-black/30 flex items-center justify-center disabled:opacity-30 transition bg-white"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="black"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* --- HAND BUILDING CONTROL (0 to 25) --- */}
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-black text-sm md:text-base">
              Handbuilding
            </h4>
            <p className="text-xs text-gray-500">
              Mold clay with hands (Max {HAND_MAX})
            </p>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 min-w-[140px]">
            <button
              type="button"
              onClick={handleHandDecrease}
              disabled={handCount <= HAND_MIN}
              className="w-10 h-10 border border-black/30 flex items-center justify-center disabled:opacity-30 transition bg-white"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="black"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>

            <Content className="text-center font-medium !text-black w-8">
              {handCount.toString().padStart(2, "0")}
            </Content>

            <button
              type="button"
              onClick={handleHandIncrease}
              disabled={handCount >= HAND_MAX || totalPersons >= TOTAL_MAX}
              className="w-10 h-10 border border-black/30 flex items-center justify-center disabled:opacity-30 transition bg-white"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="black"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Validation Warning */}
        {totalPersons < TOTAL_MIN && (
          <p className="text-xs text-amber-700 font-medium">
            * Private events require a minimum of {TOTAL_MIN} total
            participants.
          </p>
        )}
        {totalPersons > TOTAL_MAX && (
          <p className="text-xs text-red-600 font-medium">
            * Maximum allowed total capacity is {TOTAL_MAX} participants.
          </p>
        )}

        {/* --- PRICE + ADD TO CART BAR --- */}
        <div className="flex items-center justify-between bg-[#0f4a3c] text-white w-full py-3 pl-4 pr-3 md:py-[9px] md:pl-7 mt-2">
          <div className="flex flex-col">
            <Content className="font-medium !text-white whitespace-nowrap text-base md:text-lg">
              {totalPrice} {currency}
            </Content>
            <span className="text-[11px] text-gray-300">
              Total Participants: {totalPersons} / {TOTAL_MAX}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isTotalValid}
            className="flex items-center gap-3 md:gap-4 group hover:shadow-sm shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-sm md:text-base">{buttonLabel}</span>
            <span className="flex items-center justify-center w-10 h-10 bg-white transition-transform duration-300 group-hover:translate-x-1 shrink-0">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-[#0D463D]"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkshopQuantitySelector;
