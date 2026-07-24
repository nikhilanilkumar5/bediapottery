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
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allOccasions = [
    "Birthday",
    "Anniversary",
    "Wedding",
    "Graduation",
    "Father's Day",
    "Mother's Day",
    "Valentine's Day",
    "Eid Celebrations",
    "Christmas",
    "New Year",
    "Just Because",
  ];

  // Primary visible items
  const primaryOccasions = ["Birthday", "Anniversary", "Wedding", "Graduation"];

  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Measure container width directly instead of window.innerWidth
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Dynamically calculate visible items based on actual component width (not viewport screen width)
  const getVisibleAndExtra = () => {
    // If container is very narrow (< 420px), show 2 items
    if (containerWidth > 0 && containerWidth < 420) {
      return {
        visible: ["Birthday", "Anniversary"],
        extra: allOccasions.filter((i) => !["Birthday", "Anniversary"].includes(i)),
      };
    }
    // If container is medium (< 580px), show 3 items
    if (containerWidth >= 420 && containerWidth < 580) {
      return {
        visible: ["Birthday", "Anniversary", "Wedding"],
        extra: allOccasions.filter((i) => !["Birthday", "Anniversary", "Wedding"].includes(i)),
      };
    }
    // Otherwise show 4 main items
    return {
      visible: primaryOccasions,
      extra: allOccasions.filter((i) => !primaryOccasions.includes(i)),
    };
  };

  const { visible, extra } = getVisibleAndExtra();
  const isExtraSelected = extra.includes(occasion);

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
    <div className={`w-full text-primary ${className}`}>
      <label className="block font-medium mb-3 text-sm sm:text-base text-black">
        Choose an Occasion
      </label>

      {/* Main Bar */}
      <div
        ref={containerRef}
        className="bg-secondary-dark p-2 sm:p-3 flex items-center gap-2 relative font-sans w-full max-w-full overflow-hidden"
      >
        {visible.map((item) => {
          const isSelected = occasion === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => handleSelect(item)}
              className={`py-2.5 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm font-medium tracking-wide transition-all duration-150 flex-1 text-center whitespace-nowrap
                ${
                  isSelected
                    ? "bg-primary text-white shadow-sm"
                    : "text-black hover:bg-primary bg-[#0D463D33] hover:text-white"
                }
              `}
            >
              {item}
            </button>
          );
        })}

        {/* Dropdown Menu */}
        <div className="flex-1 min-w-[80px] relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className={`w-full py-2.5 px-2 sm:px-3 text-xs sm:text-sm font-medium tracking-wide transition-all duration-150 flex items-center justify-center gap-1 whitespace-nowrap
              ${
                isExtraSelected
                  ? "bg-primary text-white shadow-sm"
                  : "text-black hover:bg-primary bg-[#0D463D33] hover:text-white"
              }
            `}
          >
            <span className="truncate">
              {isExtraSelected ? occasion : "more+"}
            </span>
            <ChevronDown
              size={14}
              className={`transform transition-transform duration-200 flex-shrink-0 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 sm:w-56 bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden z-30">
              <div className="py-1 max-h-60 overflow-y-auto">
                {extra.map((item) => {
                  const isSelected = occasion === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSelect(item)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                        ${
                          isSelected
                            ? "bg-primary text-white font-medium"
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