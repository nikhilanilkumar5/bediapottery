"use client";

import React, { useEffect } from "react";
import { heroSlides } from "@/constants/data";
import type { HeroSlide } from "@/types";
import { Title, Subtitle, Content } from "@/components/ui";
import ExploreButton from "../ui/ExploreButton";
import Link from "next/link";
import { getCategoryData } from "@/services/category.service";

interface HeroSectionProps {
  slides?: HeroSlide[]
}

const HeroSection: React.FC<HeroSectionProps> = ({ slides }) => {
  const slide = slides?.[0] ; // Use API hero slide if available
   const data =  getCategoryData("adults-workshop") // Fallback data for static export;
useEffect(() => {
  console.log("Received hero slides:", slide);
  console.log("Received workshop data:", data);
}, [slide, data]);
  return (
    <section className="relative overflow-hidden bg-secondary-dark">
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-var(--header-h))] lg:gap-[15px]">

        {/* ================= LEFT SECTION ================= */}
        <div className="relative w-full lg:w-1/2 h-[55vw] min-h-[300px] lg:h-full overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center flex items-end justify-center relative pb-[80px] lg:pb-[120px]"
            style={{ backgroundImage: `url(${slide?.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_-23.93%,rgba(0,0,0,0.9)_100%)]" />
          </div>

          {/* TEXT */}
          <div className="absolute bottom-[80px] lg:bottom-[120px] w-full flex justify-center text-center z-30 px-4">
            <div className="max-w-md">
              <Subtitle className="!text-white mb-1 lg:mb-2 !text-[10px] lg:!text-sm">
                
                 {slide?.title}
              </Subtitle>
              <Title className="!text-white mb-2 lg:mb-4 font-normal !text-lg lg:!text-3xl">
               {slide?.shortDescription}
              </Title>
              <Content className="!text-white hidden lg:block">
                {slide?.description}
              </Content>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="relative w-full lg:flex-1 lg:h-full overflow-hidden">
          <div className="lg:absolute lg:inset-0 grid grid-cols-2 grid-rows-2 gap-3 lg:gap-[15px] p-3 lg:py-[15px] lg:pr-[15px] lg:pl-0">
      {slide?.cards?.slice(0, 4)?.map((card: any, index: number) => (
  <div
    key={card._id ?? card.id}
    className={`w-full overflow-hidden ${
      index === 3
        ? "bg-primary flex flex-col justify-center p-4 lg:p-6"
        : "min-h-[35vw] lg:min-h-0 lg:h-full"
    }`}
  >
    {/* FIRST 3 CARDS → IMAGE */}
    {index < 3 ? (
      <div className="relative w-full h-full min-h-[35vw] lg:min-h-0 overflow-hidden group">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${card.bannerImage})` }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_-23.93%,rgba(0,0,0,0.9)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 h-full w-full flex flex-col items-center justify-end text-center px-3 lg:px-6 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
    
          <Title className="!text-black bg-[#c9c9c9] w-[calc(100%-40px)] py-2 mb-2 lg:mb-4 leading-9 !text-base  font-normal">
            {card.title}
          </Title>
 <Link
      href={`/workshops/${card.slug}`}
      className="group inline-flex items-center gap-2 fixed top-0 left-0 lg:gap-4 bg-primary text-secondary-off 
       px-3 py-1.5 lg:px-5 lg:py-2 transition-all duration-300 hover:bg-primary-dark "
    >
       <Content className="!text-secondary-off ">
                       Explore Now
                     </Content>

    </Link>

        </div>
      </div>
    ) : (
      /* 4TH CARD → COLOR BG ONLY */
      <div className="text-center flex flex-col items-center justify-center h-full">
        <Subtitle className="!text-secondary-off mb-1 lg:mb-2 !text-[10px] lg:!text-sm">
          {card.title}
        </Subtitle>

        <Title className="!text-secondary-off mb-2 lg:mb-4 !text-base lg:!text-[32px] font-normal">
          {card.subtitle}
        </Title>

        <Content className="!text-secondary-off mb-4 lg:mb-10 hidden lg:block">
          {card.shortDescription}
        </Content>

        <ExploreButton href={`/workshops/${card.slug}`}/>
      </div>
    )}
  </div>
))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

