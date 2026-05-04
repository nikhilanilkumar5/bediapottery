"use client";

import React, { useState, useRef } from "react";
import { heroSlides } from "@/constants/data";
import { Title, Subtitle, Content } from "@/components/ui";
import ExploreButton from "../ui/ExploreButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const HeroSection: React.FC = () => {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<any>(null);

  // const getSlidePosition = (index: number) => {
  //   if (index === currentSlide) return "translate-x-0 opacity-100 z-20";
  //   if (index < currentSlide) return "-translate-x-full opacity-0 z-10";
  //   return "translate-x-full opacity-0 z-10";
  // };

  return (
    <section className="relative min-h-[calc(100vh-var(--header-h))] overflow-hidden bg-secondary-dark">
      <div className="h-full">
        <div className="flex h-full gap-[35px]">

          {/* ================= LEFT BIG SLIDER ================= */}
          <div className="relative w-1/2 h-[calc(100vh-var(--header-h))] overflow-hidden">
           <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              speed={1400}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="h-full"
            >
              {heroSlides.map((slide) => (
                <SwiperSlide key={slide._id}>
                  <div
                    className="w-full h-full bg-cover bg-center flex items-end justify-center relative pb-[120px]"
                    style={{ backgroundImage: `url(${slide.imageUrl})` }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_-23.93%,rgba(0,0,0,0.9)_100%)]" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* TEXT */}
            {heroSlides.map((slide, index) => (
              <div
                key={`text-${slide._id}`}
                className={`absolute bottom-[120px] w-full flex justify-center text-center z-30
                transition-opacity duration-[900ms] delay-300 ease-out
                ${
                  index === currentSlide
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="max-w-2xl">
                  <Subtitle className="!text-white mb-2">
                    {slide.shortDescription}
                  </Subtitle>
                  <Title className="!text-white mb-4 font-normal">
                    {slide.title}
                  </Title>
                  <Content className="!text-white ">
                    {slide.description}
                  </Content>
                </div>
              </div>
            ))}

            {/* ================= DOTS ================= */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
              <div className="relative flex items-center gap-4">

                {/* Active Indicator */}
                <span
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none
                  transition-transform duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform: `translateX(${currentSlide * 28 - 7}px) translateY(-50%)`,
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <circle cx="13" cy="13" r="13" fill="#D9D9D9" fillOpacity="0.4" />
                    <circle cx="13" cy="13" r="7" fill="#D9D9D9" />
                  </svg>
                </span>

                {/* Normal Dots */}
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => { if (swiperRef.current) swiperRef.current.slideTo(index); else setCurrentSlide(index); }}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300
                    ${
                      index === currentSlide
                        ? "bg-transparent scale-0"
                        : "bg-[#D9D9D9] scale-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="relative flex-1 h-[calc(100vh-var(--header-h))] overflow-hidden">
            {heroSlides.map((slide, index) => (
              <div
                key={`cards-${slide._id}`}
                className={`absolute inset-0 grid grid-cols-2 grid-rows-2
                gap-[30px] py-9 pr-9 h-full
                transition-[opacity,transform] duration-[1000ms] delay-200 ease-out
                ${
                  index === currentSlide
                    ? "opacity-100  z-20"
                    : "opacity-0  pointer-events-none z-10"
                }`}
              >
                {slide.cards.map((card) => (
                  <div
                    key={card._id}
                    className={`w-full h-full overflow-hidden
                    ${
                      card.type === "cta"
                        ? "bg-primary flex flex-col justify-center p-6"
                        : ""
                    }`}
                  >
                    {slide.title === "Bedia Prive" && card.type !== "cta" ? (
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${card.bannerImage})` }}
                      />
                    )  : slide.title === "Pottery classes" && card.type !== "cta" ? (
                      <div className="relative w-full h-full overflow-hidden  group">
                        {/* IMAGE */}
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url(${card.bannerImage})` }}
                        />

                        {/* DARK OVERLAY */}
                        <div
                          className="
      absolute inset-0 
     bg-[linear-gradient(180deg,rgba(0,0,0,0)_-23.93%,rgba(0,0,0,0.9)_100%)]
      opacity-0 
      group-hover:opacity-100 
      transition-opacity duration-500
    "
                        />

                        {/* CONTENT */}
                        <div
                          className="
      relative z-10
      h-full w-full
      flex flex-col items-center justify-center
      text-center px-6
      opacity-0 translate-y-6
      group-hover:opacity-100 group-hover:translate-y-0
      transition-all duration-500
    "
                        >
                        <Subtitle className="!text-secondary-off mb-2">
                         {card.type}
                        </Subtitle>
                        <Title className="!text-secondary-off mb-4 text-[41px] font-normal">
                           {card.title}
                        </Title>
                        <Content className="!text-secondary-off  mb-10">
                          {card.shortDescription}
                        </Content>
                        <ExploreButton href="/explore" />
                      </div>
                      </div>
                    ):(
                      <div className="text-center">
                        <Subtitle className="!text-secondary-off mb-2">
                           {card.title}
                        </Subtitle>
                        <Title className="!text-secondary-off mb-4 text-[41px] font-normal">
                          {card.subtitle}
                        </Title>
                        <Content className="!text-secondary-off  mb-10">
                          {card.shortDescription}
                        </Content>
                        <ExploreButton href="/explore" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
