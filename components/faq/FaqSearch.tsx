"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { FAQItem } from "@/constants/faqData"
import { getFaqData } from "@/services/faq.service"
import FaqList from "./FaqList"

interface FaqSearchProps {
  initialItems: FAQItem[]
  category?: string
  page?: number
  limit?: number
}

export function FaqSearch({
  initialItems,
  category,
  page = 1,
  limit = 100,
}: FaqSearchProps) {
  const [query, setQuery] = useState("")
  const [items, setItems] = useState(initialItems)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  useEffect(() => {
    let active = true
    const searchValue = query.trim()

    if (searchValue.length === 0) {
      setItems(initialItems)
      setMessage("")
      setLoading(false)
      return
    }

    if (searchValue.length < 3) {
      setItems(initialItems)
      setMessage("Type at least 3 characters to search.")
      setLoading(false)
      return
    }

    setLoading(true)
    setMessage("Searching FAQ...")

    const timer = window.setTimeout(() => {
      void getFaqData(category, page, limit, searchValue)
        .then((data) => {
          if (!active) return
          setItems(data)
          setMessage(data.length ? "" : "No matching questions found.")
        })
        .catch(() => {
          if (!active) return
          setMessage("Unable to search FAQs. Please try again.")
        })
        .finally(() => {
          if (!active) return
          setLoading(false)
        })
    }, 300)

    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [query, category, page, limit, initialItems])

  return (
    <div className="space-y-6">
      <div className="relative w-full max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for a question"
          className="pl-10 py-6 h-11 bg-white focus-visible:shadow-sm border border-transparent focus-visible:ring-0 focus-visible:ring-primary"
        />
      </div>

      {loading && (
        <p className="text-sm text-center text-muted-foreground mt-3">Searching FAQ...</p>
      )}
      {!loading && message && (
        <p className="text-sm text-center text-muted-foreground mt-3">{message}</p>
      )}

      <FaqList items={items} />
    </div>
  )
}
