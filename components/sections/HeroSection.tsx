"use client";

import React, { useEffect } from "react";
import { heroSlides } from "@/constants/data";
import type { HeroSlide } from "@/types";
import { Title, Subtitle, Content } from "@/components/ui";
import ExploreButton from "../ui/ExploreButton";
import Link from "next/link";
import { getCategoryData } from "@/services/category.service";

interface HeroSectionProps {
  slides?: HeroSlide[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ slides }) => {
  const slide = slides?.[0]; // Use API hero slide if available
  const data = getCategoryData("adults-workshop"); // Fallback data for static export;
  useEffect(() => {
    console.log("Received hero slides:", slide);
    console.log("Received workshop data:", data);
  }, [slide, data]);
  return (
    <section className="relative overflow-hidden bg-[#EDE7D9]">
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-var(--header-h))] gap-[5px]">
        {/* ================= LEFT SECTION ================= */}
        <div className="relative w-full lg:w-1/2 h-[55vw] min-h-[300px] lg:h-full overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center flex items-end justify-center relative pb-[80px] lg:pb-[120px]"
            style={{ backgroundImage: `url(${slide?.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_-23.93%,rgba(0,0,0,0.9)_100%)]" />
          </div>

          {/* TEXT */}
          <div className="absolute bottom-[80px] lg:bottom-[120px] w-full flex justify-start text-left z-30 page-wrapper">
            <div className="max-w-xl">
              {/* <Subtitle className="!text-white mb-1 lg:mb-2 !text-[10px] lg:!text-sm">
                
                 {slide?.title}
              </Subtitle> */} 
              <Title className="!text-white mb-2 lg:mb-4 font-normal !text-lg lg:!text-3xl text-left">
                {slide?.shortDescription}
              </Title>
              {/* <Content className="!text-white hidden lg:block">
                {slide?.description}
              </Content> */}
            </div>
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="relative w-full lg:flex-1 lg:h-full overflow-hidden">
          {/* Stacks 1-column on mobile, turns into a 2x2 grid on lg screens */}
          <div className="grid grid-cols-1  p-3 lg:absolute lg:inset-0 lg:grid-cols-2 lg:grid-rows-2 gap-[5px] py-[0px] pr-[5px] pl-0">
            {slide?.cards?.slice(0, 4)?.map((card: any, index: number) => {
              const cardHref = card.category?.slug ? `/workshops/${card.category.slug}` : "#";

              return (
                <Link
                  key={card._id ?? card.id}
                  href={cardHref}
                  className={`block w-full overflow-hidden ${
                    index === 3
                      ? "bg-primary flex flex-col justify-center p-4 lg:p-6 min-h-[40vw] lg:min-h-0"
                      : "min-h-[45vw] lg:min-h-0 lg:h-full"
                  }`}
                >
                  {/* FIRST 3 CARDS → IMAGE */}
                  {index < 3 ? (
                    <div className="relative w-full h-full min-h-[45vw] lg:min-h-0 overflow-hidden group">
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${card.category?.image})` }}
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_-23.93%,rgba(0,0,0,0.9)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Content Container (Now always present, layout handled internally) */}
                      <div className="relative z-10 h-full w-full flex flex-col items-center justify-end text-center px-3 lg:px-6 pb-5">
                        {/* TITLE: Hidden by default, slides up and fades in on hover */}
                        <div className="opacity-0 translate-y-4 bg-slate-100 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 order-2">
                          <Title className="!text-primary leading-9 !text-lg font-normal px-3 py-1.5 text-center">
                            {card.category?.title}
                          </Title>
                        </div>

                        {/* BUTTON: Visible by default, fades out and moves slightly on hover */}
                        <div className="absolute top-5 left-0 inline-flex items-center gap-2 lg:gap-4 bg-primary text-secondary-off px-1.5 py-1 transition-all duration-500 hover:bg-primary-dark visible opacity-100 group-hover:invisible group-hover:opacity-0 group-hover:pointer-events-none">
                          <Content className="!text-secondary-off">
                            Explore Now
                          </Content>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* 4TH CARD → COLOR BG ONLY */
                    <div className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full p-4">
                      {/* EXPLORE NOW BUTTON: Visible by default, fades/hides on hover */}
                      <div className="bg-slate-100 transition-all mb-5 duration-300 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none ">
                        <Title className="!text-primary leading-none !text-base lg:!text-lg font-normal px-4 py-2 text-center whitespace-nowrap">
                          Explore Now
                        </Title>
                      </div>

                      <Content className="!text-white ">{card.title}</Content>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
