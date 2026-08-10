import { FAQItem } from "@/constants/faqData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function assertApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set in environment variables"
    );
  }
}
export async function getFaqData(
  category?: string,
  page = 1,
  limit = 100,
  searchLetters?: string,
): Promise<FAQItem[]> {
  assertApiBaseUrl();

  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  const trimmedSearch = searchLetters?.trim();
  if (trimmedSearch && trimmedSearch.length >= 3) {
    params.set("search", trimmedSearch);
  }

  params.set("page", String(page));
  params.set("limit", String(limit));

  const url = `${API_BASE_URL}/faq/all?${params.toString()}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const raw = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      `FAQ data failed: ${res.status} ${res.statusText}${
        raw ? ` - ${JSON.stringify(raw)}` : ""
      }`
    );
  }

  return raw?.result?.faqs || [];
}