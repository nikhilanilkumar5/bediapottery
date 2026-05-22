"use client";

import React from "react";
import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialsSlider from "./TestimonialsSlider";

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-white">
      <div className="page-wrapper px-[17px] ">
        <TestimonialsHeader />
        <TestimonialsSlider />
      </div>
    </section>
  );
}

