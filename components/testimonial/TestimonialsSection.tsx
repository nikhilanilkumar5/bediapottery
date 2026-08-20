"use client";

import React, { useEffect, useState } from "react";
import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialsSlider from "./TestimonialsSlider";
import GoogleReviewsHeader from "./GoogleReviewsHeader";
import { getReviewsData } from "@/services/reviewService";

export default  function TestimonialsSection() {
  const [initialReviews, setInitialReviews] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadInitialData() {
      try {
        // Fetch page 1 initially to check if data exists
        const data = await getReviewsData(1, 10);
        setInitialReviews(data.reviews);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to load initial testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  // While checking the API, return nothing (or a skeleton loader if preferred)
  if (isLoading) return null;

  // CRITICAL: If no testimonials exist, don't render the section at all
  if (initialReviews.length === 0) return (
    <section className="pb-16  bg-white"></section>
  );

  return (
  //   <></>
    <section className="md:pb-16  pb-8 md:pt-16 pt-8 bg-white">
      <div className="page-wrapper px-[17px]">
        {/* Google Reviews Header at Top */}
        <TestimonialsHeader />
        <GoogleReviewsHeader
          googleMapsUrl="https://www.google.com/maps/place/Bedia+Pottery+%7C+Adults+%26+Kids+Birthday+Party+Packages+%2B+Fun+Beginners+Workshop/@25.1396865,55.2286163,17z/data=!4m8!3m7!1s0x3e5f69be5e716b71:0x79d624863c4c5812!8m2!3d25.1396865!4d55.2286163!9m1!1b1!16s%2Fg%2F11vdldm6g6?hl=en&entry=ttu&g_ep=EgoyMDI2MDgxNi4wIKXMDSoASAFQAw%3D%3D"
        />
        

        <TestimonialsSlider 
          initialReviews={initialReviews} 
          totalPages={totalPages} 
        />
      </div>
    </section>
  );
}