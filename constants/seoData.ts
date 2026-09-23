import { Metadata } from 'next';

interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
}

export const pageSeoData: Record<string, PageSEO> = {
  about: {
    title: 'About Bedia Pottery | Premium Pottery Studio in Dubai',
    description:
      'Learn about Bedia Pottery, a premium pottery studio in Dubai offering beginner-friendly pottery workshops, creative experiences and private events.',
    keywords: [
      'Bedia Pottery Dubai',
      'pottery studio Dubai',
      'premium pottery studio Dubai',
      'pottery workshop Dubai',
      'ceramic studio Dubai',
      'pottery experience Dubai',
    ],
  },
  faq: {
    title: 'Pottery Workshop FAQ | Bedia Pottery Dubai',
    description:
      'Find answers to common questions about Bedia Pottery workshops in Dubai, including bookings, clay types, pottery collection, age groups, parking and rescheduling.',
    keywords: [
      'Bedia Pottery FAQ',
      'pottery workshop Dubai FAQ',
      'pottery classes Dubai',
      'pottery class questions',
      'pottery workshop booking',
      'pottery studio Dubai',
    ],
  },
  cancellationPolicy: {
    title: 'Cancellation & Refund Policy | Bedia Pottery Dubai',
    description:
      "Read Bedia Pottery's cancellation, rescheduling, refund and no-show policy for pottery workshops and bookings in Dubai.",
    keywords: [
      'Bedia Pottery cancellation policy',
      'pottery workshop refund policy',
    ],
  },
  terms: {
    title: 'Terms & Conditions | Bedia Pottery Dubai',
    description:
      'Read the terms and conditions for bookings, workshops, services and experiences at Bedia Pottery in Dubai.',
    keywords: ['Bedia Pottery terms and conditions'],
  },
  privacyPolicy: {
    title: 'Privacy Policy | Bedia Pottery Dubai',
    description:
      "Read Bedia Pottery's privacy policy to understand how we collect, use and protect information when you use our website and services.",
    keywords: [
      'Bedia Pottery privacy policy',
      'privacy policy Dubai studio',
    ],
  },
  refundPolicy: {
    title: 'Refund Policy | Bedia Pottery Dubai',
    description:
      "Read Bedia Pottery's refund policy for pottery workshops, bookings, gift vouchers and other services in Dubai.",
    keywords: [
      'Refund Policy Bedia Pottery',
      'Bedia Pottery refund policy',
    ],
  },
};

/**
 * Helper function to generate Next.js Metadata object from central config
 */
export function constructMetadata(pageKey: keyof typeof pageSeoData): Metadata {
  const seo = pageSeoData[pageKey];
  if (!seo) return {};

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  };
}