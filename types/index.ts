export interface NavigationItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export interface HeroSlideCard {
  _id?: string
  id?: string
  type?: string
  title?: string
  subtitle?: string
  description?: string
  shortDescription?: string
  bannerImage?: string
  imageUrl?: string
  images?: string[]
  ctaText?: string
  ctaLink?: string
  slug?: string
}

export interface HeroSlide {
  _id?: string
  id?: string
  title: string
  subtitle?: string
  description?: string
  shortDescription?: string
  imageUrl: string
  layout?: string
  cards?: HeroSlideCard[]
}
export interface GoogleReview {
  _id: string
  authorName: string
   placeId: string
  rating: number
  text: string
  profilePhotoUrl: string
  reviewTime: number
  media?: {
    videos?: string[]
    images?: string[]
  }
  source?: string
  isActive?: boolean
}

export interface ContentCard {
  id: string
  type: 'image' | 'cta' | 'imagecard'
  imageUrl?: string
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
}

export interface Testimonial {
  id: string
  author: string
  authorImage: string
  rating: number
  text: string
  daysAgo: number
  isVideo?: boolean
}

export interface FooterLink {
  label: string
  href: string
}

export interface SocialMedia {
  name: string
  icon: string
  href: string
}

export interface AboutSectionProps {
  title: string
  description: string
  imageUrl: string
  imagePosition?: "left" | "right"
}

export interface AboutPageData {
  hero: {
    title: string
    subtitle: string
    description: string
    imageUrl: string
    points: string
  }
  mission: AboutSectionProps & { imagePosition: "right" }
  vision: AboutSectionProps & { imagePosition: "left" }
  fullWidth: {
    title: string
    subtitle: string
    backgroundImageUrl: string
  }
}

export interface Product {
  id: string
  title: string
  price?: number
  originalPrice?: number
  imageUrl: string
  videoUrl?: string
  category?: string
  slug: string
  mainSlug: string
  description?: string
  longDescription?: string
  materials?: MaterialOption[]
  materialDescriptions?: Record<string, string>
}

export interface MaterialOption {
  id: string
  name: string
  description?: string
}

export interface TimeSlot {
  id: string
  time: string
  available: boolean
}

export interface BookingData {
  productId: string
  materialId?: string
  date?: Date
  timeSlotId?: string
  quantity: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  subtitle?: string
}