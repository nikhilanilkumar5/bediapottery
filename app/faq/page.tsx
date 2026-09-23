
import { Title } from "@/components/ui"
import { FaqSearch } from "@/components/faq/FaqSearch"
import { getFaqData } from "@/services/faq.service"

import { constructMetadata } from "@/constants/seoData";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata('faq');
export default async function FAQPage() {
  const faqData = await getFaqData("general", 1, 100,)

  return (
    <main className="min-h-screen bg-[#F3EFE8]">
      <section className="page-wrapper px-[17px] lg:py-24 md:py-12 py-8">
        <Title className="lg:mb-12 mb-6 text-center">
          Frequently Asked Questions
        </Title>

        <FaqSearch initialItems={faqData} category="general" />
      </section>
    </main>
  )
}
