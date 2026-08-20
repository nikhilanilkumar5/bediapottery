"use client";
import { WorkshopItem } from "@/services/category.service";
import { useState } from "react";
import { Content, Title } from "../ui";
interface ClayDescProps {
  product: WorkshopItem;
  hide?: boolean; // Optional prop to control visibility
}

export default function ClayDesc({ product, hide }: ClayDescProps) {
  // Group options by clayTypeId and keep only the first option
  const clayOptions =
    product?.options?.filter(
      (option, index, self) =>
        index === self.findIndex((item) => item.clayTypeId === option.clayTypeId)
    ) || [];

  const [activeTab, setActiveTab] = useState(clayOptions[0]?._id);

  return (
    <section
      className={
        "bg-secondary-dark" +
        (hide ? "" : "") +
        " pt-16 font-sans text-[#0D463D]"
      }
    >
      <div className="page-wrapper space-y-24">
        <div className="bg-white lg:p-6 p-3 sm:p-10 shadow-sm rounded-sm">

          {/* Tab Headers */}
          <div className="bg-[#e2e6e3] p-2 flex flex-wrap lg:flex-nowrap gap-2 mb-8">
            {clayOptions.map((tab) => (
              <button
                key={tab._id}
                onClick={() => setActiveTab(tab._id)}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === tab._id
                    ? "bg-[#0D463D] text-white shadow-sm"
                    : "bg-[#c5ccc8] text-[#0D463D] hover:bg-[#b5beb9]"
                }`}
              >
                {tab.title.replace(/\s*-\s*(Kids|Adults)\s*$/i, "")}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <Content className="!text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
            <span
              dangerouslySetInnerHTML={{
                __html:
                  clayOptions.find((t) => t._id === activeTab)?.description ||
                  "Select a tab to see more details.",
              }}
            />
          </Content>
        </div>
      </div>
    </section>
  );
}
