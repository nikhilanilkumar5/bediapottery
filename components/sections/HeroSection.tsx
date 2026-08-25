"use client";

import React, { useEffect, useRef, useState } from "react";
import type { HeroSlide } from "@/types";
import { Title, Subtitle, Content } from "@/components/ui";
import ExploreButton from "../ui/ExploreButton";

interface HeroSectionProps {
  slides?: HeroSlide[];
}

interface HeroCardProps {
  card: any;
  index: number;
  isActive: boolean;
  onIntersect: () => void;
}

const HeroCard: React.FC<HeroCardProps> = ({
  card,
  index,
  isActive,
  onIntersect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const cardHref = card.category?.slug
    ? `/workshops/${card.category.slug}`
    : "#";

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      // Active zone: card center is within 25% of the viewport height from screen center
      const isNearCenter = Math.abs(cardCenter - viewportCenter) < window.innerHeight * 0.25;

      if (isNearCenter) {
        onIntersect();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onIntersect]);

  return (
    <div
      ref={cardRef}
      className={`w-full overflow-hidden ${
        index === 3
          ? "bg-primary flex flex-col justify-center lg:min-h-0"
          : "lg:min-h-0 lg:h-full"
      }`}
    >
      {index < 3 ? (
        <div className="relative w-full h-full min-h-[420px] md:min-h-[40vw] lg:min-h-0 overflow-hidden group">
          {/* Background Image */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${
              isActive ? "scale-105 lg:scale-100" : "scale-100"
            } lg:group-hover:scale-105`}
            style={{
              backgroundImage: `url(${card.category?.image})`,
            }}
          />

          {/* Dark Overlay (Only 1 active at a time on mobile; standard hover on desktop) */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-500 ${
              isActive ? "opacity-70 lg:opacity-0" : "opacity-0"
            } lg:group-hover:opacity-70`}
          />

          {/* Card Content Wrapper */}
          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-3 lg:px-6 pb-5">
            <div
              className={`transition-all duration-500 ${
                isActive
                  ? "opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-4"
                  : "opacity-0 translate-y-4"
              } lg:group-hover:opacity-100 lg:group-hover:translate-y-0`}
            >
              <Subtitle className="!text-secondary-off mb-1 lg:mb-2">
                {card.category?.title}
              </Subtitle>

              <Title className="!text-secondary-off mb-2 lg:mb-4 !text-base lg:!text-[32px] font-normal">
                {card.category?.subtitle}
              </Title>

              <Content className="!text-secondary-off mb-4 lg:mb-10">
                {card.category?.shortDescription}
              </Content>

              <ExploreButton href={cardHref} />
            </div>
          </div>
        </div>
      ) : (
        /* 4th Card Block */
        <div className="text-center min-h-[420px] lg:min-h-full relative z-10 flex flex-col items-center px-3 lg:px-6 pb-5 justify-center">
          <Subtitle className="!text-secondary-off mb-1 lg:mb-2">
            {card.category?.title}
          </Subtitle>

          <Title className="!text-secondary-off mb-2 lg:mb-4 !text-base lg:!text-[32px] font-normal">
            {card.category?.subtitle}
          </Title>

          <Content className="!text-secondary-off mb-4 lg:mb-10">
            {card.category?.shortDescription}
          </Content>

          <ExploreButton href={cardHref} />
        </div>
      )}
    </div>
  );
};

const HeroSection: React.FC<HeroSectionProps> = ({ slides }) => {
  const slide = slides?.[0];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#EDE7D9]">
      <div className="flex flex-col lg:flex-row lg:h-[calc(100dvh-var(--header-h))] lg:gap-[15px]">
        {/* ================= LEFT SECTION ================= */}
        <div className="relative w-full lg:w-1/2 h-[55vw] min-h-[300px] lg:h-full overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center flex items-end justify-center relative pb-[80px] lg:pb-[120px]"
            style={{ backgroundImage: `url(${slide?.imageUrl})` }}
          />

          {/* TEXT */}
          <div className="absolute bottom-[80px] lg:bottom-[120px] w-full flex justify-center text-center z-30 px-4">
            <div className="max-w-xl">
              <Subtitle className="!text-white mb-1 lg:mb-2">
                {slide?.title}
              </Subtitle>
              <Title className="!text-white mb-2 lg:mb-4 font-normal text-lg !md:text-2xl lg:!text-3xl">
                {slide?.shortDescription}
              </Title>
              <Content className="!text-white">
                {slide?.description}
              </Content>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="relative w-full lg:flex-1 lg:h-full overflow-hidden">
          <div className="grid grid-cols-1 p-3 lg:absolute lg:inset-0 lg:grid-cols-2 lg:grid-rows-2 gap-[15px] lg:py-[15px] lg:pr-[15px] lg:pl-0">
            {slide?.cards?.slice(0, 4)?.map((card: any, index: number) => (
              <HeroCard
                key={card._id ?? card.id}
                card={card}
                index={index}
                isActive={activeIndex === index}
                onIntersect={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;