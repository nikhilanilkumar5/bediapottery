"use client";

import React from "react";
import { Title, Subtitle, Content } from "@/components/ui";

interface AboutHeroProps {
  title: string;
  subtitle: string;
  description: string;
  points: string;
  imageUrl: string;
}

const AboutHeroSection: React.FC<AboutHeroProps> = ({
  title,
  subtitle,
  description,
    points,
  imageUrl,
}) => {
  return (
    <section className="relative min-h-[calc(100vh-70px)] bg-secondary-off overflow-hidden">
      <div className="flex flex-col lg:flex-row h-full gap-0 lg:gap-[35px] items-center">
        {/* LEFT IMAGE */}
        <div className="w-full lg:w-1/2 relative h-[55vw] min-h-[260px] lg:h-[calc(100vh-70px)] overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
             <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_-23.93%,rgba(0,0,0,0.9)_100%)]" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 px-[17px] lg:px-9 py-10 lg:py-16">
          <Subtitle className=" mb-4">{subtitle}</Subtitle>
          <Title className=" mb-6 font-normal max-w-md !leading-[120%]">
            {title}
          </Title>
          {/* <Content className="!font-medium leading-relaxed mb-6">
            {points}
          </Content> */}
          <Content className=" leading-relaxed">
            Bedia means something truly unique, created by hand, that no one can ever duplicate. Every handmade piece carries its own story, and that belief is the foundation of our studio.
<br />
<br />
Founded in 2023, Bedia Pottery was created with one vision: pottery should be more than a workshop “it should be an experience.“
<br />
<br />
We set out to redefine pottery in Dubai by creating a clean, hygienic, premium, and cozy pottery studio where everyone feels welcome. Whether you're joining a pottery wheel class, handbuilding workshop, or a creative experience with friends, family, or a loved one, our goal is simple: to help you relax, create, and make lasting memories. Our beginner-friendly workshops are guided by passionate instructors, but what truly defines Bedia is our hospitality. Every guest is welcomed with care, every detail is thoughtfully considered, and every visit is designed to feel warm, personal, and unforgettable.

          </Content>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
