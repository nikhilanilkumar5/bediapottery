"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import { getReviewsData } from "@/services/reviewService";

interface GoogleReviewsHeaderProps {
  googleMapsUrl: string;
}

interface ReviewsData {
  ratingSummary?: {
    averageRating?: number;
    totalReviews?: number;
  };
}

export default function GoogleReviewsHeader({
  googleMapsUrl,
}: GoogleReviewsHeaderProps) {
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    const loadReviews = async () => {
      try {
        const data: ReviewsData = await getReviewsData(1, 10);

        if (!mounted) return;

        setRating(data?.ratingSummary?.averageRating || 0);
        setReviewCount(data?.ratingSummary?.totalReviews || 0);
      } catch (error) {
        console.error("Failed to load Google reviews:", error);
      }
    };

    loadReviews();

    return () => {
      mounted = false;
    };
  }, []);

  const openGoogleReviews = () => {
    window.open(
      googleMapsUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div
      className="
        bg-[#E6DFD566]
        p-6
        mb-12
        flex
        flex-col
        w-full
        md:flex-row
        md:items-center
        md:justify-between
        gap-6
        cursor-pointer
      "
      onClick={openGoogleReviews}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          openGoogleReviews();
        }
      }}
    >
      <div className="flex items-center gap-4">
        {/* Google Logo */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Image
              src="/images/logo-fav.svg"
              alt="Google"
              width={28}
              height={28}
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <RatingStars
              rating={Math.round(rating * 10) / 10}
            />

            <span className="text-xl font-bold text-[#F6BB06]">
              {Number(rating).toFixed(1)}
            </span>
          </div>

          <p className="text-gray-700">
            {reviewCount.toLocaleString()} reviews on{" "}

            <svg
              fill="none"
              viewBox="0 0 56 19"
              className="inline-block w-auto h-5 ml-1"
            >
              <g clipPath="url(#clip0_1099_1358)">
                <path
                  d="M23.8307 9.90631C23.8307 12.5354 21.7739 14.4728 19.2498 14.4728C16.7257 14.4728 14.6689 12.5354 14.6689 9.90631C14.6689 7.25867 16.7257 5.33984 19.2498 5.33984C21.7739 5.33984 23.8307 7.25867 23.8307 9.90631ZM21.8254 9.90631C21.8254 8.26337 20.6334 7.13926 19.2498 7.13926C17.8663 7.13926 16.6742 8.26337 16.6742 9.90631C16.6742 11.5328 17.8663 12.6734 19.2498 12.6734C20.6334 12.6734 21.8254 11.5307 21.8254 9.90631Z"
                  fill="#EA4335"
                />

                <path
                  d="M33.7125 9.90631C33.7125 12.5354 31.6558 14.4728 29.1317 14.4728C26.6075 14.4728 24.5508 12.5354 24.5508 9.90631C24.5508 7.26073 26.6075 5.33984 29.1317 5.33984C31.6558 5.33984 33.7125 7.25867 33.7125 9.90631ZM31.7073 9.90631C31.7073 8.26337 30.5152 7.13926 29.1317 7.13926C27.7481 7.13926 26.5561 8.26337 26.5561 9.90631C26.5561 11.5328 27.7481 12.6734 29.1317 12.6734C30.5152 12.6734 31.7073 11.5328 31.7073 9.90631Z"
                  fill="#FBBC05"
                />

                <path
                  d="M43.1838 5.61573V13.814C43.1838 17.1863 41.195 18.5637 38.8438 18.5637C36.6306 18.5637 35.2985 17.0834 34.7962 15.8728L36.542 15.146C36.8529 15.8893 37.6147 16.7663 38.8417 16.7663C40.3467 16.7663 41.2794 15.8378 41.2794 14.0898V13.4331H41.2094C40.7606 13.9869 39.8959 14.4707 38.8047 14.4707C36.5215 14.4707 34.4297 12.4819 34.4297 9.92278C34.4297 7.34514 36.5215 5.33984 38.8047 5.33984C39.8938 5.33984 40.7585 5.82367 41.2094 6.36102H41.2794V5.61779H43.1838V5.61573ZM41.4215 9.92278C41.4215 8.31484 40.3488 7.13926 38.9838 7.13926C37.6003 7.13926 36.4412 8.31484 36.4412 9.92278C36.4412 11.5143 37.6003 12.6734 38.9838 12.6734C40.3488 12.6734 41.4215 11.5143 41.4215 9.92278Z"
                  fill="#4285F4"
                />

                <path
                  d="M46.3231 0.8125V14.1949H44.3672V0.8125H46.3231Z"
                  fill="#34A853"
                />

                <path
                  d="M53.9457 11.4113L55.5022 12.449C54.9998 13.1922 53.7893 14.4728 51.6975 14.4728C49.1034 14.4728 47.166 12.4675 47.166 9.90631C47.166 7.19073 49.1198 5.33984 51.4731 5.33984C53.8428 5.33984 55.0019 7.22573 55.3807 8.24484L55.5887 8.76367L49.4843 11.2919C49.9516 12.2081 50.6784 12.6754 51.6975 12.6754C52.7187 12.6754 53.4269 12.1731 53.9457 11.4113ZM49.1548 9.76837L53.2354 8.07396C53.011 7.50367 52.3357 7.10631 51.541 7.10631C50.5219 7.10631 49.1034 8.00602 49.1548 9.76837Z"
                  fill="#EA4335"
                />

                <path
                  d="M7.26569 8.72179V6.78444H13.7942C13.858 7.12209 13.891 7.5215 13.891 7.95385C13.891 9.40738 13.4936 11.2047 12.213 12.4853C10.9675 13.7824 9.37598 14.4741 7.26775 14.4741C3.3601 14.4741 0.0742188 11.2912 0.0742188 7.38356C0.0742188 3.47591 3.3601 0.292969 7.26775 0.292969C9.42951 0.292969 10.9695 1.1412 12.1266 2.24679L10.7595 3.61385C9.92981 2.83562 8.80569 2.23032 7.26569 2.23032C4.41216 2.23032 2.1804 4.53003 2.1804 7.38356C2.1804 10.2371 4.41216 12.5368 7.26569 12.5368C9.11657 12.5368 10.1707 11.7936 10.846 11.1183C11.3936 10.5706 11.7539 9.78826 11.896 8.71973L7.26569 8.72179Z"
                  fill="#4285F4"
                />
              </g>

              <defs>
                <clipPath id="clip0_1099_1358">
                  <rect
                    width="56"
                    height="18.9412"
                    fill="white"
                    transform="translate(0 0.195312)"
                  />
                </clipPath>
              </defs>
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}