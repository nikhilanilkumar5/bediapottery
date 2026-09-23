import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { Content, Title } from "@/components/ui";
import TestimonialsSection from "@/components/testimonial/TestimonialsSection";
import WorkshopCategoryList from "@/components/workshops/WorkshopCategoryList";
import { getCategoryData } from "@/services/category.service";
import { getWorkshopData } from "@/services/workshop.service";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}const CATEGORY_SEO_MAP: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  // Adults
  adults: {
    title: "Adult Pottery Classes in Dubai | Beginner Pottery Workshop",
    description:
      "Join beginner-friendly pottery classes for adults in Dubai. Learn pottery wheel and handbuilding techniques at Bedia Pottery with expert guidance.",
    keywords: [
      "adult pottery classes Dubai",
      "pottery classes for adults Dubai",
      "adult pottery workshop Dubai",
      "pottery wheel class Dubai",
      "beginner pottery class Dubai",
      "handbuilding pottery Dubai",
      "ceramic classes Dubai",
    ],
  },
  "adult-pottery": {
    title: "Adult Pottery Classes in Dubai | Beginner Pottery Workshop",
    description:
      "Join beginner-friendly pottery classes for adults in Dubai. Learn pottery wheel and handbuilding techniques at Bedia Pottery with expert guidance.",
    keywords: [
      "adult pottery classes Dubai",
      "pottery classes for adults Dubai",
      "adult pottery workshop Dubai",
    ],
  },

  // Kids
  kids: {
    title: "Kids Pottery Classes in Dubai | Pottery Workshop for Kids",
    description:
      "Give your child a fun, creative pottery experience in Dubai. Beginner-friendly kids pottery classes with pottery wheel and handbuilding activities at Bedia.",
    keywords: [
      "kids pottery classes Dubai",
      "pottery for kids Dubai",
      "kids pottery workshop Dubai",
      "kids art workshop Dubai",
      "pottery class for children Dubai",
      "kids activities Dubai",
      "clay workshop for kids",
    ],
  },
  "kids-pottery": {
    title: "Kids Pottery Classes in Dubai | Pottery Workshop for Kids",
    description:
      "Give your child a fun, creative pottery experience in Dubai. Beginner-friendly kids pottery classes with pottery wheel and handbuilding activities at Bedia.",
    keywords: ["kids pottery classes Dubai", "pottery for kids Dubai"],
  },

  // Corporate
  corporate: {
    title: "Corporate Team Building Dubai | Pottery Team Building",
    description:
      "Bring your team together with a creative pottery team-building experience in Dubai. Enjoy hands-on pottery activities designed for corporate groups and events.",
    keywords: [
      "corporate team building Dubai",
      "pottery team building Dubai",
      "corporate events Dubai",
    ],
  },
  "corporate-events": {
    title: "Corporate Team Building Dubai | Pottery Team Building",
    description:
      "Bring your team together with a creative pottery team-building experience in Dubai. Enjoy hands-on pottery activities designed for corporate groups and events.",
    keywords: [
      "corporate team building Dubai",
      "pottery team building Dubai",
    ],
  },

  // Family
  
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  
  // Normalize slug string
  const slugKey = category.toLowerCase().trim();

  // 1. Check direct match or partial match in static SEO map
  const staticSeo =
    CATEGORY_SEO_MAP[slugKey] ||
    Object.keys(CATEGORY_SEO_MAP).find((key) => slugKey.includes(key))
      ? CATEGORY_SEO_MAP[
          Object.keys(CATEGORY_SEO_MAP).find((key) => slugKey.includes(key))!
        ]
      : null;

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

  // 2. Dynamic Fallback
  try {
    const data = await getCategoryData(category);
    if (!data || !data.category) return {};

    const dynamicTitle = `${data.category.title} | Bedia Pottery`;
    const dynamicDesc =
      data.category.description ||
      data.category.shortDescription ||
      `Explore ${data.category.title} workshops at Bedia Pottery Studio in Dubai.`;

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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const data = await getCategoryData(category);
  const giftData = await getWorkshopData("a-gift-made-by-hand-from-the-heart");

  // Check category exists
  if (!data.totalCount || data.totalCount === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white page-wt">
      <div className="md:pt-16 pt-8">
        {/* Header Section */}
        <div className="flex flex-col page-wrapper lg:flex-row lg:items-end lg:justify-between md:gap-6 gap-4 md:mb-16 mb-8">
          <div className="flex-1">
            <Title className="mb-2.5 font-normal">{data.category.title}</Title>

            <Title className="mb-2.5 font-normal !text-lg xl:!text-2xl">
              ({data.category.shortDescription})
            </Title>
          </div>

          {data.category.description && (
            <div className="lg:max-w-lg flex-1">
              <Content>{data.category.description}</Content>
            </div>
          )}
        </div>

        <WorkshopCategoryList
          categoryTitle={data.category.title}
          workshops={data.workshops}
        />

        {/* Products Grid */}
        {data?.workshops.length > 0 ? (
          <div className="page-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.workshops.map((workshop) => (
              <ProductCard
                key={workshop._id}
                product={{
                  id: workshop._id,
                  title: workshop.title,
                  imageUrl: workshop.bannerImage,
                  slug: workshop.slug,
                  mainSlug: category,
                  description: workshop.shortDescription,
                  price: workshop.price,
                  currency: workshop.currency,
                }}
              />
            ))}
            <ProductCard
              product={{
                id: giftData._id,
                title: giftData.title,
                imageUrl: giftData.bannerImage,
                slug: "",
                mainSlug: "gift-cards",
                description: giftData.shortDescription,
                price: giftData.options[1].price,
                currency: giftData.options[1].currency,
              }}
            />
          </div>
        ) : (
          <div className="text-center lg:py-16 py-8">
            <p className="text-gray-600 text-lg">
              No workshops available in this category.
            </p>
          </div>
        )}
      </div>

      <TestimonialsSection />
    </main>
  );
}