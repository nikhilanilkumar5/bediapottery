import { GoogleReview } from "@/types";
import GoogleIcon from "./GoogleIcon";
import RatingStars from "./RatingStars";
import Image from "next/image";
import { Content } from "../ui";

interface Props {
  testimonial: GoogleReview;
}
const formatRelativeTime = (reviewTime: string | number): string => {
  if (!reviewTime) return "";

  // 1. Convert the input into a JavaScript Date object
  let reviewDate: Date;

  if (typeof reviewTime === "number" || !isNaN(Number(reviewTime))) {
    const numTime = Number(reviewTime);
    // If the timestamp is in seconds (10 digits), convert to milliseconds (13 digits)
    reviewDate =
      numTime < 10000000000 ? new Date(numTime * 1000) : new Date(numTime);
  } else {
    // Treat as an ISO date string (e.g., "2026-07-15T12:00:00Z")
    reviewDate = new Date(reviewTime);
  }

  // 2. Calculate the difference in milliseconds from right now
  const now = new Date();
  const diffInMs = now.getTime() - reviewDate.getTime();

  // Guard clause for future dates or instant matches
  if (diffInMs <= 0) return "Just now";

  // 3. Convert differences into readable units
  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  // 4. Return the appropriate breakdown
  if (diffInMins < 1) {
    return "Just now";
  }
  if (diffInMins < 60) {
    return `${diffInMins} ${diffInMins === 1 ? "minute" : "minutes"} ago`;
  }
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  }
  return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
};
const getAvatarColor = (name: string) => {
  const colors = [
    "bg-primary/10",
    // "bg-indigo-300",
    // "bg-emerald-200",
    // "bg-rose-300",
    // "bg-sky-300",
    // "bg-violet-200",
    // "bg-teal-300",
    // "bg-fuchsia-7=300",
  ];

  if (!name) return "bg-amber-700";

  // Create a quick hash from the string characters
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Select a deterministic index from the color array
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const TestimonialCard: React.FC<Props> = ({ testimonial }) => {
  return (
    <div className="bg-[#E6DFD566] hover:shadow-sm  p-6 h-full flex flex-col justify-between  transition">
      {/* Header */}
      <div className=" flex flex-col justify-between transition">
        {/* Header */}
        <div className="flex items-start justify-between mb-[30px]">
          {testimonial.profilePhotoUrl ? (
            <Image
              src={testimonial.profilePhotoUrl}
              alt={testimonial.authorName}
              width={65}
              height={65}
              className="w-[65px] h-[65px] rounded-full object-cover"
            />
          ) : (
            <div
              className={`w-[65px] h-[65px] rounded-full ${getAvatarColor(testimonial.authorName)} text-primary flex items-center justify-center text-xl font-semibold select-none`}
            >
              {testimonial.authorName
                ? testimonial.authorName.charAt(0).toUpperCase()
                : "N"}
            </div>
          )}

          <div></div>
          <GoogleIcon />
        </div>
      </div>

      {/* Text */}

      <Content className="  leading-1.5 font-normal mb-5">
        {testimonial.text}
      </Content>
      <div className="">
        <Content className=" leading-none font-medium mb-1">
          {testimonial.authorName}
        </Content>
        <p className="text-lg leading-none text-[#00000066] mb-2.5">
          {formatRelativeTime(testimonial.reviewTime)}
        </p>
        <RatingStars rating={testimonial.rating} />
      </div>
      {/* Stars */}
    </div>
  );
};

export default TestimonialCard;
