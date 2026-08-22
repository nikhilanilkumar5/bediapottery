"use client";
import { WorkshopItem } from "@/services/category.service";
import { useState } from "react";
import { Content, Title } from "../ui";
interface GiftCardHeroProps {
  product: WorkshopItem;
  hide?: boolean; // Optional prop to control visibility
}

export default function InfoAndTimeline({ product, hide }: GiftCardHeroProps) {
  const [activeTab, setActiveTab] = useState(product?.moreDetails?.[0]?._id);

  return (
    <section className={"bg-secondary-dark " + (hide ? "" : "min-h-screen") + "  lg:py-16 py-8 font-sans text-[#0D463D]"}>
      <div className="page-wrapper px-[17px]  lg:space-y-24 space-y-8">
        {/* --- TABS SECTION --- */}
        <div className="bg-white lg:p-6 p-3 sm:p-10 shadow-sm rounded-sm">
          {/* Tab Headers */}
          <div className="bg-[#e2e6e3] p-2 flex flex-wrap lg:flex-nowrap gap-2 mb-8">
            {product?.moreDetails?.map((tab) => (
              <button
                key={tab._id}
                onClick={() => setActiveTab(tab._id)}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === tab._id
                    ? "bg-[#0D463D] text-white shadow-sm"
                    : "bg-[#c5ccc8] text-[#0D463D] hover:bg-[#b5beb9]"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <Content className="!text-sm text-gray-800 leading-relaxed  whitespace-pre-wrap">
            <span
              dangerouslySetInnerHTML={{
                __html:
                  product?.moreDetails?.find((t) => t._id === activeTab)
                    ?.description || "Select a tab to see more details.",
              }}
            />
          </Content>
        </div>
{!hide && (
          <div className="text-center">
            <Title className="mb-2.5 font-normal">Gifting Made Easy</Title>
            <Content className="">
              Three simple steps to send a creative experience they'll love.
            </Content>

          {/* Desktop Arc Layout (Hidden on small screens) */}
          <div className="hidden lg:block relative w-[900px] h-[550px] mx-auto mt-32">
            {/* Dashed Semi-Circle Arc */}
            {/* 540px wide arc, centered */}
            <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-[540px] h-[270px] border-t-[1px] border-l-[1px] border-r-[1px] border-dashed border-[#0D463D]/40 rounded-t-[300px]"></div>

            {/* Central Video */}
            <div className="absolute top-[250px] left-1/2 -translate-x-1/2 w-[280px] h-[280px] z-0">
              <video
                src="/video/bowl.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            {/* Step 02 (Top Center) */}
            <div className="absolute top-[120px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center font-bold text-2xl text-[#0D463D] shadow-sm z-10">
              02
              {/* Anchored Text: Above */}
              <div className="absolute bottom-full mb-6 w-[360px] text-center left-1/2 -translate-x-1/2">
                <h4 className="font-semibold text-lg text-black mb-2 tracking-tight">
                  Create Something Special
                </h4>
                <p className="text-[14px] text-gray-800 leading-relaxed">
                  Get hands-on with clay, learn new skills, and
                  <br />
                  enjoy the process while we handle the rest.
                </p>
              </div>
            </div>

            {/* Step 01 (Bottom Left) */}
            {/* 180px from left edge precisely aligns with the 540px arc inside the 900px container */}
            <div className="absolute top-[390px] left-[180px] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center font-bold text-2xl text-[#0D463D] shadow-sm z-10">
              01
              {/* Anchored Text: Left */}
              <div className="absolute right-full mr-8 w-[280px] top-1/2 -translate-y-1/2 text-right">
                <h4 className="font-semibold text-lg text-black mb-2 tracking-tight">
                  Choose Your Experience
                </h4>
                <p className="text-[14px] text-gray-800 leading-relaxed">
                  Select your studio, date, and session
                  <br />
                  —then lock in a creative experience
                  <br />
                  you'll love.
                </p>
              </div>
            </div>

            {/* Step 03 (Bottom Right) */}
            <div className="absolute top-[390px] right-[180px] translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center font-bold text-2xl text-[#0D463D] shadow-sm z-10">
              03
              {/* Anchored Text: Right */}
              <div className="absolute left-full ml-8 w-[280px] top-1/2 -translate-y-1/2 text-left">
                <h4 className="font-semibold text-lg text-black mb-2 tracking-tight">
                  Take Home Your Creations
                </h4>
                <p className="text-[14px] text-gray-800 leading-relaxed">
                  We finish your pieces with care. Come
                  <br />
                  back to collect your beautifully crafted,
                  <br />
                  ready-to-use pottery.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Stacked Layout (Hidden on large screens) */}
          <div className="flex flex-col items-center gap-12 lg:hidden mt-12">
            {/* Central Video for Mobile */}
            <div className="w-[240px] h-[240px] rounded-full overflow-hidden shadow-lg border-[4px] border-[#f2ece3] mb-4">
              <video
                src="/video/bowl.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            {[
              {
                num: "01",
                title: "Choose Your Experience",
                desc: "Select your studio, date, and session —then lock in a creative experience you'll love.",
              },
              {
                num: "02",
                title: "Create Something Special",
                desc: "Get hands-on with clay, learn new skills, and enjoy the process while we handle the rest.",
              },
              {
                num: "03",
                title: "Take Home Your Creations",
                desc: "We finish your pieces with care. Come back to collect your beautifully crafted, ready-to-use pottery.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex flex-col items-center text-center max-w-sm px-4"
              >
                <div className="bg-white text-[#0D463D] w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl shadow-sm mb-4">
                  {step.num}
                </div>
                <h4 className="font-semibold text-lg text-black mb-2">
                  {step.title}
                </h4>
                <p className="text-[14px] text-gray-800 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
