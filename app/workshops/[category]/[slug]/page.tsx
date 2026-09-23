import React from 'react';
import { Metadata } from 'next';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { getWorkshopData } from '@/services/workshop.service';
import ClientLogosSlider from '@/components/testimonial/ClientLogosSlider';
import { Title } from '@/components/ui';
import FaqListSmall from '@/components/faq/FaqListSmall';
import { getFaqData } from '@/services/faq.service';
import InfoAndTimeline from '@/components/giftcard/InfoAndTimeline';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// Static SEO Map for Workshops
const WORKSHOP_SEO_MAP: Record<
  string,
  { title: string; description: string; keywords?: string[] }
> = {
  // Kids Pottery Wheel
  "kids-pottery-wheel": {
    title: "Kids Pottery Wheel Class Dubai | Pottery for Children",
    description:
      "Let kids experience pottery on the wheel in Dubai. Our beginner-friendly pottery sessions offer hands-on clay fun with guidance from experienced instructors.",
    keywords: [
      "kids pottery wheel Dubai",
      "kids pottery class Dubai",
      "pottery wheel for kids Dubai",
      "children pottery workshop Dubai",
      "kids clay workshop Dubai",
      "kids activities Dubai",
    ],
  },
  // Kids Handbuilding
  "kids-handbuilding": {
    title: "Kids Handbuilding Pottery Workshop Dubai | Bedia",
    description:
      "A creative handbuilding pottery workshop for kids in Dubai. Children can shape clay by hand, explore their creativity and make their own pottery.",
    keywords: [
      "kids handbuilding Dubai",
      "kids clay workshop Dubai",
      "kids pottery workshop Dubai",
      "children art workshop Dubai",
      "pottery for children",
      "kids creative activities Dubai",
    ],
  },
  // Pottery Wheel Workshop
  "pottery-wheel-workshop": {
    title: "Pottery Wheel Workshop in Dubai | Beginner Classes",
    description:
      "Try a beginner-friendly pottery wheel workshop in Dubai. Learn to shape clay on the wheel with step-by-step guidance and create your own pottery at Bedia.",
    keywords: [
      "pottery wheel Dubai",
      "pottery wheel workshop Dubai",
      "pottery wheel class Dubai",
      "beginner pottery wheel class",
      "pottery making Dubai",
      "ceramic classes Dubai",
      "wheel throwing Dubai",
    ],
  },
  // Handbuilding Workshop
  "handbuilding-workshop": {
    title: "Handbuilding Pottery Workshop Dubai | Bedia Pottery",
    description:
      "Create your own handmade pottery without a wheel. Join a beginner-friendly handbuilding pottery workshop in Dubai and learn with expert guidance.",
    keywords: [
      "handbuilding pottery Dubai",
      "handbuilding workshop Dubai",
      "pottery workshop Dubai",
      "clay workshop Dubai",
      "pottery making Dubai",
      "ceramic workshop Dubai",
      "beginner pottery Dubai",
    ],
  },
  // Turkish Coffee & Clay
  "turkish-coffee-and-clay": {
    title: "Turkish Coffee & Clay Dubai | Pottery & Coffee Experience",
    description:
      "Experience Turkish coffee and pottery in Dubai with Bedia. Enjoy a relaxing clay-making workshop paired with authentic Turkish coffee in a unique creative setting.",
    keywords: [
      "turkish coffee and clay dubai",
      "pottery and coffee experience dubai",
      "bedia pottery",
    ],
  },
  "turkish-coffee-clay": {
    title: "Turkish Coffee & Clay Dubai | Pottery & Coffee Experience",
    description:
      "Experience Turkish coffee and pottery in Dubai with Bedia. Enjoy a relaxing clay-making workshop paired with authentic Turkish coffee in a unique creative setting.",
  },
  // Couples Pottery
  "couples-pottery": {
    title: "Couples Pottery Class Dubai | Pottery Date Experience",
    description:
      "Enjoy a fun and creative clay date in Dubai. Create together, get hands-on with clay and make something memorable with your partner at Bedia Pottery.",
    keywords: [
      "couples pottery class dubai",
      "pottery date experience dubai",
      "couples pottery dubai",
    ],
  },
  // Weekday Wheel Offer
  "weekday-wheel-offer": {
    title: "Weekday Pottery Wheel Offer Dubai | Bedia Pottery",
    description:
      "Enjoy a pottery wheel experience in Dubai with our weekday offer. Learn the basics, get creative with clay and create your own pottery at Bedia.",
    keywords: [
      "weekday pottery wheel offer dubai",
      "weekday pottery offer",
      "bedia pottery",
    ],
  },
};

// Generate Dynamic SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugKey = slug.toLowerCase().trim();

  // 1. Check exact or partial slug match in static map
  const staticKey = Object.keys(WORKSHOP_SEO_MAP).find(
    (key) => slugKey === key || slugKey.includes(key)
  );
  const staticSeo = staticKey ? WORKSHOP_SEO_MAP[staticKey] : null;

  if (staticSeo) {
    return {
      title: staticSeo.title,
      description: staticSeo.description,
      keywords: staticSeo.keywords,
      openGraph: {
        title: staticSeo.title,
        description: staticSeo.description,
        type: "website",
      },
    };
  }

  // 2. Fallback to API workshop data if slug is not matched in static map
  try {
    const data = await getWorkshopData(slug);
    if (!data) return {};

    const dynamicTitle = `${data.title} | Bedia Pottery Studio Dubai`;
    const dynamicDesc =
      data.shortDescription ||
      data.description ||
      `Book ${data.title} experience at Bedia Pottery Studio in Dubai.`;

    return {
      title: dynamicTitle,
      description: dynamicDesc,
      openGraph: {
        title: dynamicTitle,
        description: dynamicDesc,
        type: "website",
      },
    };
  } catch (error) {
    return {};
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug, category } = await params;

  const data = await getWorkshopData(slug);
  const faqData = await getFaqData(category, 1, 8);

  return (
    <main className="min-h-screen bg-secondary-dark">
      <ProductDetailClient product={data} category={category} slug={slug} />
      {category === 'corporate-events' && (
        <>
          <InfoAndTimeline product={data} hide={true} />
          <ClientLogosSlider />
        </>
      )}
      {faqData.length > 0 && (
        <section className="page-wrapper md:py-12 lg:py-24 py-8">
          <Title className="lg:mb-12 mb-8 text-center">
            Frequently Asked Questions
          </Title>
          <FaqListSmall items={faqData} />
        </section>
      )}
    </main>
  );
}