"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// @ts-ignore: side-effect import has no type declarations in this project
import "swiper/css";
// @ts-ignore: side-effect import has no type declarations in this project
import "swiper/css/pagination";

import { Subtitle, Title } from "../ui";

// 1. Update your array to reference your brand assets
const clientLogos = [
  // --- Your Prioritized Order ---
  { name: "LinkedIn", src: "/images/clients/LinkedIn.png" },
  { name: "kayali", src: "/images/clients/kayali.jpeg" },
  { name: "HUDA Beauty", src: "/images/clients/HUDA-beauty.jpg" },
  // { name: "Chalhoub Group", src: "/images/clients/ch2m.png" }, 
  { name: "Dubai Chamber", src: "/images/clients/Dubai_Chamber.png" },
  { name: "Dubai Airport Freezone", src: "/images/clients/Dubai_Airport_Freezone_Logo.svg" },
  { name: "dfwac", src: "/images/clients/dfwac.png" }, 
  { name: "Roche", src: "/images/clients/Roche.png" },
  { name: "The Kanoo Group", src: "/images/clients/The-Kanoo-Group-Logo-01.jpg" },
  { name: "continental", src: "/images/clients/continental.png" },

  // --- Remaining Brand Assets ---
  { name: "bytedance", src: "/images/clients/bytedance.png" },
  { name: "inc", src: "/images/clients/inc.png" },
  { name: "boston", src: "/images/clients/boston.png" },
  { name: "forsite", src: "/images/clients/forsite.jpeg" },
  { name: "ghd", src: "/images/clients/ghd.jpg" },
  { name: "gulfdrug", src: "/images/clients/gulfdrug.jpg" },
  { name: "brooks", src: "/images/clients/brooks.jpg" },
  { name: "Fortsite Creative", src: "/images/clients/Fortsite creative.png" },
  { name: "ICBC", src: "/images/clients/ICBC.png" },
  { name: "wealth", src: "/images/clients/wealth.webp" },
  { name: "original", src: "/images/clients/original.png" },
  { name: "Purehealth", src: "/images/clients/Purehealth.png" },
];

const ClientLogosSlider = () => {
  return (
    <div className="mt-5   bg-secondary-dark p-6 md:p-8 lg:p-10 !pb-16">
      
      {/* Optional Top Heading Track */}
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c08b3b]">
      
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-[#2f2a24] md:text-3xl">
         
        </h3>
      </div>
<div className="text-center mb-[50px] flex flex-col items-center">
      <Subtitle className="mb-[30px]">    Our Trusted Partners</Subtitle>
      <Title className="mb-2.5 font-normal">
         Companies We Work With
      </Title>
    </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={32}
        slidesPerView={2}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 2500, // Slightly faster slider loop for clean brand scrolling
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
        className="flex items-center"
      >
        {clientLogos.map((logo, index) => (
          <SwiperSlide key={`${logo.name}-${index}`}>
            {/* Logo Wrapper Container with uniform dimensions and centering */}
            <div className="flex h-[100px] w-full items-center justify-center  bg-white p-4 border border-[#efe2cf]/60 shadow-sm  transition-all duration-300">
              <div className="relative w-full h-full max-h-[50px]">
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ClientLogosSlider;