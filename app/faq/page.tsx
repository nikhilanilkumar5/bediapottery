import FaqList from "@/components/faq/FaqList"
import { faqData } from "@/constants/faqData"
import { Title, Content } from "@/components/ui"
import { FaqSearch } from "@/components/faq/FaqSearch"

export const metadata = {
  title: "FAQ | Bedia Pottery",
  description: "Frequently asked questions about Bedia Pottery workshops."
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE8]">
      <section className="page-wrapper py-24">
          <Title className="mb-12 text-center">
            General Frequently Asked Questions
          </Title>
         <FaqSearch />


        {/* FAQ LIST */}
        <div className="">
          <FaqList items={faqData} />
        </div>
      </section>
    </main>
  )
}
