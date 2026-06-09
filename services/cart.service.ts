export interface CartWorkshopImage {
  image: string;
  title: string;
  _id: string;
}

export interface CartWorkshop {
  _id: string;
  title: string;
  bannerImage: string;
  images: CartWorkshopImage[];
}

export interface CartItem {
  workshopId: CartWorkshop;
  bookingDate: string;
  slotId: string;
  optionId: string;
  people: number;
  price: number;
  subtotal: number;
  currency: string;
}

export interface CartData {
  _id: string;
  userId: string;
  items: CartItem[];
  totalPeople: number;
  totalAmount: number;
  taxPercent: number;
  taxAmount: number;
  grandTotal: number;
  __v: number;
}
export interface deleteCartData  {
  userId: string;
  itemIndex: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function assertApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set in environment variables");
  }
}

export async function getCartData(): Promise<CartData[]> {
  assertApiBaseUrl();

  const res = await fetch(`${API_BASE_URL}/workshop/cart/65f1a2b3c4d5e6f7890a1234`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const raw = await res.json().catch(() => null);

  console.log("Cart data API:", raw);
  if (!res.ok) {
    console.error(
      `Cart data failed: ${res.status} ${res.statusText}${
        raw ? ` - ${JSON.stringify(raw)}` : ""
      }`
    );
    return [];
  }

  const result = raw?.data ?? raw;
  if (!result) {
    return [];
  }

  return Array.isArray(result) ? result : [result];

}
export async function deleteCart(deleteData: deleteCartData): Promise<CartData[]> {
  assertApiBaseUrl();

  const res = await fetch(`${API_BASE_URL}/workshop/cart/item`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deleteData),
    cache: "no-store",
  });

  const raw = await res.json().catch(() => null);

  console.log("Cart data API:", raw);
  if (!res.ok) {
    throw new Error(
      `Cart data failed: ${res.status} ${res.statusText}${
        raw ? ` - ${JSON.stringify(raw)}` : ""
      }`
    );
  }

  const result = raw.data ?? raw;
  if (!result) {
    return [];
  }

  return Array.isArray(result) ? result : [result];

}