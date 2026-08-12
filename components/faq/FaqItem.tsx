"use client"

import Image from "next/image"
import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Content } from "../ui"

interface FaqItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FaqItem: React.FC<FaqItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      value={isOpen ? "faq" : ""}
      onValueChange={(value) => {
        if (value === "faq") {
          onToggle()
        } else if (isOpen) {
          onToggle()
        }
      }}
      className="bg-white shadow-sm"
    >
      <AccordionItem value="faq" className="border-0">
        <AccordionTrigger
          className="
            group
            px-6 py-5
            text-left
            hover:no-underline
            [&>svg]:hidden
          "
        >
          <span className="font-medium text-lg text-darkblack">
            {question}
          </span>

          <Image
            src="/images/icons/circle-arrow.svg"
            alt="Toggle"
            width={46}
            height={46}
            className="
              w-[46px] h-[46px]
              shrink-0
              transition-transform
              duration-300
              ease-in-out
              group-data-[state=open]:rotate-90
            "
          />
        </AccordionTrigger>

        <AccordionContent className="px-6 pb-5">
          <div className="bg-[#EDE8E266] border-[0.5px] border-[#0D463D33] p-5 rounded-xl">
            <Content>
              <span
                dangerouslySetInnerHTML={{
                  __html: answer,
                }}
              />
            </Content>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default FaqItem