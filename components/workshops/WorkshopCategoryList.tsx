import React from "react";
import type { WorkshopItem } from "@/services/category.service";

interface WorkshopCategoryListProps {
  categoryTitle: string;
  workshops: WorkshopItem[];
}

export default function WorkshopCategoryList({
  categoryTitle,
  workshops,
}: WorkshopCategoryListProps) {
  // Cap at 6 maximum items
  const displayWorkshops = workshops.slice(0, 6);

  return (
    <section className="w-full mb-16 page-wrapper xl:block hidden">
      <div className="flex flex-wrap items-baseline gap-y-4 gap-x-6 bg-secondary-dark px-8 py-6 rounded-sm">
        {/* Category Title Badge */}
        <div className="shrink-0 bg-[#124137] text-white px-6 py-3 text-sm font-medium tracking-wide">
          {categoryTitle}
        </div>

        {/* Workshop Items */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-2 text-sm text-gray-900 font-normal min-w-0 flex-1">
          {displayWorkshops.map((workshop, index) => {
            // Index 0..3 are always visible (default state)
            // Index 4 shows only at 1498px and wider
            // Index 5 shows only at 1658px and wider
            const visibilityClass =
              index === 4
                ? "hidden min-[1498px]:inline-flex items-center gap-x-2"
                : index === 5
                ? "hidden min-[1658px]:inline-flex items-center gap-x-2"
                : "inline-flex items-center gap-x-2";

            return (
              <div key={workshop._id} className={visibilityClass}>
                <span className="whitespace-nowrap">{workshop.title}</span>
                {index < displayWorkshops.length - 1 && (
                  <span
                    className={`text-gray-400 font-light mx-1 ${
                      index === 4
                        ? "hidden min-[1498px]:inline"
                        : index === 5
                        ? "hidden min-[1658px]:inline"
                        : "inline"
                    }`}
                  >
                    /
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}