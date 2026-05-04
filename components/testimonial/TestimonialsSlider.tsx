import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import VideoTestimonialCard from "./VideoTestimonialCard";
import { testimonials } from '@/constants/data';
import TestimonialCard from './TestimonialCard';


const TestimonialsSlider = () => {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      pagination={{ clickable: true }}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1560: { slidesPerView: 4 },
      }}
      className="pb-14"
    >
      {testimonials.map((item: any) => (
        <SwiperSlide key={item._id} className="!h-[480px]">
          <div className="w-full h-full">
            {item.media ? (
              <VideoTestimonialCard testimonial={item} />
            ) : (
              <TestimonialCard testimonial={item} />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialsSlider;
