"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface OccasionSelectorProps {
  onOccasionSelect?: (occasion: string) => void;
  initialOccasion?: string;
  className?: string;
}

export default function OccasionSelector({
  onOccasionSelect,
  initialOccasion = "Birthday",
  className = "",
}: OccasionSelectorProps) {
  const [occasion, setOccasion] = useState(initialOccasion);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Core row items (matches your layout images)
  const primaryOccasions = ["Birthday", "Anniversary", "Wedding", "Graduation"];

  // Extended items shown inside the "more+" popover
  const extraOccasions = [
    "Father's Day",
    "Mother's Day",
    "Valentine's Day",
    "Eid Celebrations",
    "Christmas",
    "New Year",
    "Just Because",
  ];

  const isExtraSelected = extraOccasions.includes(occasion);

  // Close dropdown when clicking anywhere outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: string) => {
    setOccasion(item);
    if (onOccasionSelect) onOccasionSelect(item);
    setIsDropdownOpen(false);
  };

  return (
    <div className={`w-full text-[#113224] ${className}`}>
      <label className="block font-medium mb-3">
        Choose an Occasion
      </label>
      
      {/* Container row matching your requested UI theme */}
      <div className="bg-[#e9e6df] p-1 flex items-center gap-1 relative font-sans">
        {primaryOccasions.map((item) => {
          const isSelected = occasion === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => handleSelect(item)}
              className={`flex-1 py-3 px-4 text-xs sm:text-sm font-medium tracking-wide transition-all duration-150 text-center
                ${isSelected
                  ? "bg-[#113224] text-white shadow-sm font-semibold"
                  : "text-[#113224]/80 hover:bg-[#dcd8ce] bg-[#c3cbbf]/20"
                }
              `}
            >
              {item}
            </button>
          );
        })}

        {/* Dynamic "more+" action item with absolute dropdown context */}
        <div className="flex-1 relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className={`w-full py-3 px-4 text-xs sm:text-sm font-medium tracking-wide transition-all duration-150 flex items-center justify-center gap-1
              ${isExtraSelected
                ? "bg-[#113224] text-white shadow-sm font-semibold"
                : "text-[#113224]/80 hover:bg-[#dcd8ce] bg-[#c3cbbf]/20"
              }
            `}
          >
            <span className="truncate">
              {isExtraSelected ? occasion : "more+"}
            </span>
            <ChevronDown 
              size={14} 
              className={`transform transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} 
            />
          </button>

          {/* Popover Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden z-30">
              <div className="py-1 max-h-60 overflow-y-auto">
                {extraOccasions.map((item) => {
                  const isSelected = occasion === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSelect(item)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                        ${isSelected
                          ? "bg-[#113224] text-white font-medium"
                          : "text-gray-700 hover:bg-[#f2ece3]"
                        }
                      `}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}