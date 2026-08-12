"use client"

import React, { useState } from "react"
import { FAQItem } from "@/constants/faqData"
import FaqItemSmall from "./FaqItemSmall"

interface FaqListProps {
  items: FAQItem[]
}

const FaqListSmall: React.FC<FaqListProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(null)

  const firstColumn = items.slice(0, 4)
  const secondColumn = items.slice(4, 8)

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-[40px] items-start">
      {/* LEFT - 1 to 4 */}
      <div className="flex flex-col gap-3">
        {firstColumn.map((faq) => (
          <FaqItemSmall
            key={faq._id}
            question={faq.question}
            answer={faq.answer}
            isOpen={openId === faq._id}
            onToggle={() => handleToggle(faq._id)}
          />
        ))}
      </div>

      {/* RIGHT - 5 to 8 */}
      <div className="flex flex-col gap-3">
        {secondColumn.map((faq) => (
          <FaqItemSmall
            key={faq._id}
            question={faq.question}
            answer={faq.answer}
            isOpen={openId === faq._id}
            onToggle={() => handleToggle(faq._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default FaqListSmall