
import { Title } from "@/components/ui"
import { FaqSearch } from "@/components/faq/FaqSearch"
import { getFaqData } from "@/services/faq.service"

export const metadata = {
  title: "FAQ | Bedia Pottery",
  description: "Frequently asked questions about Bedia Pottery workshops."
}

export default async function FAQPage() {
  const faqData = await getFaqData("general", 1, 100,)

  return (
    <main className="min-h-screen bg-[#F3EFE8]">
      <section className="page-wrapper px-[17px]  py-24">
        <Title className="mb-12 text-center">
          General Frequently Asked Questions
        </Title>

        <FaqSearch initialItems={faqData} category="general" />
      </section>
    </main>
  )
}
