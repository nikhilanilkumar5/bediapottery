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
  return (
    <section className="w-full mb-16 page-wrapper xl:block hidden">
      <div className="flex flex-wrap items-baseline gap-y-4 gap-x-6 bg-secondary-dark px-8 py-6 rounded-sm">
        {/* Category Title Badge */}
        <div className="shrink-0 bg-[#124137] text-white px-6 py-3 text-sm font-medium tracking-wide">
          {categoryTitle}
        </div>

        {/* Workshop Items (Inline on large, wraps to next line on small/overflow) */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-2 text-sm text-gray-900 font-normal min-w-0 flex-1">
          {workshops.map((workshop, index) => (
            <React.Fragment key={workshop._id}>
              <span className="whitespace-nowrap">{workshop.title}</span>
              {index < workshops.length - 1 && (
                <span className="text-gray-400 font-light mx-1">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}