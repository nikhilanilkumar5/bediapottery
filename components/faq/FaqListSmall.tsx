"use client"

import React, { useEffect, useState } from "react"
import { FAQItem } from "@/constants/faqData"
import FaqItemSmall from "./FaqItemSmall"

interface FaqListProps {
  items: FAQItem[]
}

const FaqListSmall: React.FC<FaqListProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(null)
  useEffect(() => {
    console.log("FAQ data in page:", items)
  }, [items])
return (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3  items-start">
    {items.slice(0, 8).map((faq) => (
      <FaqItemSmall
        key={faq._id}
        question={faq.question}
        answer={faq.answer}
        isOpen={openId === faq._id}
        onToggle={() =>
          setOpenId(openId === faq._id ? null : faq._id)
        }
      />
    ))}
  </div>
)
}

export default FaqListSmall
