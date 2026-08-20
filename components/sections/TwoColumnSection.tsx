"use client";

import React from "react";
import { Title, Content } from "@/components/ui";

interface TwoColumnSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  imagePosition: "left" | "right";
}

const TwoColumnSection: React.FC<TwoColumnSectionProps> = ({
  title,
  description,
  imageUrl,
  imagePosition,
}) => {

  const imageSection = (
    <div className="h-[240px] lg:h-[380px] w-full  overflow-hidden">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    </div>
  );

  const contentSection = (
    <div className={``}>
      <Title className={`mt-[20px] lg:mt-[30px] mb-[30px] lg:mb-[54px] font-normal lg:text-left text-center`}>{title}</Title>
      <Content className={`leading-relaxed bg-[#EDE8E266]  p-5 lg:p-[30px] text-justify`}>{description}</Content>
    </div>
  );

  return (
    <section className={``}>
      <div className="page-wrapper px-[17px]  flex flex-col lg:flex-row shadow-soft p-4 lg:p-6">
      {imagePosition === "left" ? (
  <>
    <div className="w-full lg:w-1/3 order-2 lg:order-1">
      {imageSection}
    </div>
    <div className="w-full lg:w-2/3 lg:pl-6 lg:order-2">
      {contentSection}
    </div>
  </>
) : (
  <>
    {/* Desktop: Content on left, Image on right */}
    {/* Mobile (< 1024px): Image renders first via order utilities */}
    <div className="w-full lg:w-2/3 lg:pr-6 ">
      {contentSection}
    </div>
    <div className="w-full lg:w-1/3 order-1 ">
      {imageSection}
    </div>
  </>
)}
      </div>
    </section>
  );
};

export default TwoColumnSection;
