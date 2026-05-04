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
    <div className="h-[380px] w-1/3 overflow-hidden  ">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    </div>
  );

  const contentSection = (
    <div className={``}>
      <Title className={` mt-[30px] mb-[54px] font-normal`}>{title}</Title>
      <Content className={` leading-relaxed bg-[#EDE8E266] h-[256px] rounded-[20px] p-[30px]`}>{description}</Content>
    </div>
  );

  return (
    <section className={``}>
      <div className="page-wrapper flex shadow-soft  p-6">
        {imagePosition === "left" ? (
          <>
            {imageSection}
            <div className="pl-6 w-2/3 ">
            {contentSection}
            </div>
          </>
        ) : (
          <>
           <div className="pr-6 w-2/3  ">
            {contentSection}
            </div>
            {imageSection}
          </>
        )}
      </div>
    </section>
  );
};

export default TwoColumnSection;
