"use client"

import React from "react"
import Image from "next/image"
import { Content } from "../ui"
import { motion, AnimatePresence } from "framer-motion"

interface FaqItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FaqItemSmall: React.FC<FaqItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="group w-full flex items-center justify-between px-3 py-2 text-left"
      >
        <span className="font-medium text-sm text-darkblack">
          {question}
        </span>

        <Image
          src="/images/icons/circle-arrow.svg"
          alt="Toggle"
          width={46}
          height={46}
          className={`
            w-[32px] h-[32px] shrink-0
            transition-transform duration-300 ease-in-out
            ${isOpen ? "rotate-90" : "rotate-0"}
          `}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.2,
              },
            }}
            className="overflow-hidden"
          >
            <div className="mx-3 mb-2 bg-[#EDE8E266] border-[0.5px] border-[#0D463D33] p-2">
              <Content className="!text-sm">
                <span
                  dangerouslySetInnerHTML={{
                    __html: answer,
                  }}
                />
              </Content>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FaqItemSmall