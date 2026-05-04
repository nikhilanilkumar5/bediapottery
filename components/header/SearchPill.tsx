"use client";

import { useState } from "react";

export default function SearchPill() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div
      className={`flex items-center 2xl:gap-[45px] xl:gap-4 bg-primary rounded-full px-[23px] py-[17px] transition-all duration-300 ease-in-out ${
        isExpanded ? "w-[420px]" : "w-fit"
      }`}
    >
          <svg
            width="18"
            height="18"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-secondary-off"
          >
            <path
              d="M9.27539 0.162842C14.3058 0.162897 18.388 4.17581 18.3887 9.13257C18.3887 11.3936 17.5288 13.4507 16.127 15.0271L21.5107 20.325C21.8437 20.6533 21.8437 21.1872 21.5098 21.5154L21.5088 21.5144C21.177 21.8409 20.6404 21.8419 20.3086 21.5154L14.8945 16.1873C13.3458 17.384 11.397 18.1023 9.27539 18.1023C4.24495 18.1023 0.163088 14.0894 0.163086 9.13257C0.163086 4.17575 4.24495 0.162842 9.27539 0.162842ZM9.27539 1.84253C5.18021 1.84253 1.86523 5.10884 1.86523 9.13257C1.86524 13.1563 5.18021 16.4226 9.27539 16.4226C13.3706 16.4226 16.6855 13.1563 16.6855 9.13257C16.6855 5.10888 13.3706 1.84258 9.27539 1.84253Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.325"
            />
          </svg>


      {/* User Icon */}
      <button
        className="text-secondary-off shrink-0 hover:text-white transition-colors duration-200"
        aria-label="User account"
      >
        <svg
          width="20"
          height="22"
          viewBox="0 0 24 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6377 0.866211C14.8732 0.86644 17.5215 3.51543 17.5215 6.75098C17.5213 9.98636 14.8731 12.6345 11.6377 12.6348C8.40219 12.6348 5.75313 9.9865 5.75293 6.75098C5.75293 3.51528 8.40202 0.866211 11.6377 0.866211Z"
            stroke="currentColor"
            strokeWidth="1.73333"
            fill="none"
          />
          <path
            d="M6.70898 14.8525C6.71648 14.8511 6.74084 14.849 6.77832 14.8584C6.81617 14.8679 6.84991 14.8851 6.87305 14.9023L6.87891 14.9062C8.26987 15.9329 9.92532 16.4609 11.6387 16.4609C13.352 16.4609 15.0075 15.9329 16.3984 14.9062L16.4033 14.9023C16.4181 14.8913 16.503 14.8524 16.6426 14.8643C18.6087 15.1407 20.374 16.198 21.5908 17.8125L21.8281 18.1436L21.833 18.1514C22.0384 18.4481 22.2145 18.7556 22.3545 19.0723C22.1497 19.4248 21.9183 19.7616 21.6523 20.1074L21.6465 20.1143L21.6416 20.1211C21.2674 20.6288 20.8315 21.0943 20.3701 21.5557C19.985 21.9407 19.5448 22.3259 19.1084 22.6533C16.9317 24.2788 14.3139 25.1337 11.6094 25.1338C8.91142 25.1338 6.29952 24.2829 4.12598 22.665C3.65205 22.28 3.22008 21.9281 2.84766 21.5557L2.8291 21.5371L2.49219 21.2051C2.16476 20.8675 1.86313 20.5106 1.57617 20.1211L1.57227 20.1152L1.18457 19.5781C1.08301 19.4299 0.987133 19.2792 0.898438 19.1309C1.04927 18.7959 1.23861 18.4485 1.44434 18.1514L1.4541 18.1357C2.6427 16.3398 4.54452 15.1518 6.65625 14.8613L6.68262 14.8574L6.70898 14.8525Z"
            stroke="currentColor"
            strokeWidth="1.73333"
            fill="none"
          />
        </svg>
      </button>

      {/* Menu/Grid Icon - 2x3 grid with specific filled circles */}
      <button
        className="text-secondary-off shrink-0 hover:text-white transition-colors duration-200"
        aria-label="Menu"
      >
        <svg
          width="28"
          height="18"
          viewBox="0 0 34 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top row */}
          <circle
            cx="4.26052"
            cy="4.26052"
            r="3.92766"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.665706"
          />
          <circle
            cx="16.3269"
            cy="4.26064"
            r="3.92766"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.665706"
          />
          <circle
            cx="28.3933"
            cy="4.26052"
            r="3.92961"
            stroke="currentColor"
            strokeWidth="0.661816"
            fill="none"
          />
          {/* Bottom row */}
          <circle
            cx="4.26052"
            cy="16.327"
            r="3.92766"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.665706"
          />
          <circle
            cx="16.3269"
            cy="16.327"
            r="3.92766"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.665706"
          />
          <circle
            cx="28.3933"
            cy="16.327"
            r="3.92961"
            stroke="currentColor"
            strokeWidth="0.661816"
            fill="none"
          />
        </svg>
      </button>
    </div>
  );
}
