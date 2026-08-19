"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
// @ts-ignore: side-effect import has no type declarations in this project
import "swiper/css";
// @ts-ignore: side-effect import has no type declarations in this project
import "swiper/css/pagination";

import VideoTestimonialCard from "./VideoTestimonialCard";
import TestimonialCard from "./TestimonialCard";
import { getReviewsData } from "@/services/reviewService";

interface TestimonialsSliderProps {
  initialReviews: any[];
  totalPages: number;
}

const TestimonialsSlider = ({
  initialReviews,
  totalPages,
}: TestimonialsSliderProps) => {
  // Use the passed down initial reviews to hydrate the state immediately
  const [testimonials, setTestimonials] = useState<any[]>(initialReviews);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(1 < totalPages);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchNextReviews = async (pageToFetch: number) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const data = await getReviewsData(pageToFetch, 100);

      setTestimonials((prev) => [...prev, ...data.reviews]);
      setPage(data.currentPage);

      if (data.currentPage >= data.totalPages || data.reviews.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load next reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReachEnd = () => {
    if (hasMore && !isLoading) {
      fetchNextReviews(page + 1);
    }
  };

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, ]} // 3. Pass Autoplay here
        spaceBetween={16}
        slidesPerView={1}
        onReachEnd={handleReachEnd}
        autoplay={{
          delay: 3000, // Time between slides in milliseconds (3 seconds)
          disableOnInteraction: false, // Keeps autoplay running even after the user swipes manually
          pauseOnMouseEnter: true, // Optional: pauses autoplay when hovering over the slider
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1560: { slidesPerView: 4 },
        }}
        className="pb-14"
      >
        {testimonials.map((item: any) => (
          <SwiperSlide key={item._id} className="!h-[420px]">
            <div className="w-full h-full">
              {item.media?.videos.length > 0 ? (
                <VideoTestimonialCard testimonial={item} />
              ) : (
                <TestimonialCard testimonial={item} />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {isLoading && (
        <div className="text-center text-sm text-gray-500 mt-2">
          Loading more reviews...
        </div>
      )}
    </div>
  );
};

export default TestimonialsSlider;
