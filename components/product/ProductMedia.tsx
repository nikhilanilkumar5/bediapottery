'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface VideoItem {
  id: string | number
  thumbnailUrl: string
  videoUrl: string
}

interface ProductMediaProps {
  imageUrl: string
  videos?: VideoItem[]
  alt: string
  className?: string
}

const ProductMedia: React.FC<ProductMediaProps> = ({
  imageUrl,
  videos = [],
  alt,
  className = '',
}) => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null)
  const displayVideos = videos.slice(0, 3)

  return (
    <div className={`flex lg:!-ml-20 lg:-mt-12 flex-col gap-2 ${className}`}>
      
      {/* Main Feature Window - ALWAYS stays as the Banner Image */}
      <div className="relative w-full h-[450px] lg:h-[calc(100vh-var(--header-h))]  overflow-hidden  bg-black">
        <Image
          src={imageUrl || '/images/product/1.png'}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Bottom Horizontal Video Thumbnails */}
      {displayVideos.length > 0 && (
      <div 
    className={`flex gap-2 w-full transition-all duration-300
      ${displayVideos.length === 1 ? 'h-[300px]' : ''}
      ${displayVideos.length === 2 ? 'h-[380px]' : ''}
      ${displayVideos.length === 3 ? 'lg:h-[120px] h-[100px]' : ''}
    `}
  >
          {displayVideos.map((video) => {
            return (
              <button
                key={video.id}
                onClick={() => setActiveVideoUrl(video.videoUrl)}
                className="flex-1 relative h-full  overflow-hidden transition-all duration-200 group hover:opacity-95 focus:outline-none"
                aria-label={`Play video ${video.id} in full screen`}
              >
                <Image
                  src={video.thumbnailUrl}
                  alt={`Video thumbnail preview ${video.id}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 15vw"
                />

                <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors group-hover:bg-black/40">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 flex items-center justify-center shadow-md backdrop-blur-sm transition-transform group-hover:scale-105">
                              <Image
                           src="/images/icons/play.png"
                           alt="playbutton"
                           width={64}
                           height={64}
                           className=" w-full h-full object-cover"
                         />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Fullscreen Video Overlay Modal */}
      {activeVideoUrl && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveVideoUrl(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 focus:outline-none z-[60]"
            onClick={() => setActiveVideoUrl(null)}
            aria-label="Close fullscreen video"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Video Player Box - bound to handle the custom aspect ratio safely */}
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the player area
          >
            <video
              className="w-auto max-w-full h-[85vh] object-contain rounded-md shadow-2xl"
              controls
              autoPlay
              src={activeVideoUrl}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

    </div>
  )
}

export default ProductMedia