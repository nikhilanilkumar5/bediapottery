import { useAuthStore } from "@/store/authStore";

/**
 * OrderService
 * Single Responsibility: Handle order-related API calls
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "";

function assertApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set in environment variables"
    );
  }
}

/* =========================
   ORDER TYPES
========================= */

export interface OrderItem {
  optionId: string;
  optionTitle: string;
  price: number;
  people: number;
  adult: number;
  child: number;
  handBuild?: number;
  wheelPottery?: number;
  subtotal: number;
}

export interface Customer {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  country?: string;
  city?: string;
}

export interface WorkshopImage {
  _id: string;
  image: string;
  title: string;
}

export interface WorkshopInfo {
  _id: string;
  title: string;
  bannerImage: string;
  images: WorkshopImage[];
}

export interface BookingDetails {
  _id: string;
  bookingNumber: string;
  bookingDate: string;
  slotId: string;

  items: OrderItem[];

  totalPeople: number;
  totalAmount: number;

  currency: string;

  taxPercent: number;
  taxAmount: number;
  grandTotal: number;

  bookingStatus: string;
  paymentStatus: string;
  bookingType: string;
  giftStatus: string;

  userId: string;

  customer: Customer;

  workshopId: WorkshopInfo;

  createdAt: string;
  updatedAt: string;

  isDeleted?: boolean;
  __v?: number;
}

export interface OrderItemWithBooking {
  workshopId: string;
  bookingDate: string;
  slotId: string;
  totalAmount: number;
startTime: string;
endTime: string;
  bookingId: BookingDetails;
}

export interface OrderDetails {
  _id: string;
  orderNumber: string;
  userId: string;

  items: OrderItemWithBooking[];

  subtotal: number;
  taxPercent: number;
  taxAmount: number;
  grandTotal: number;

  currency: string;
  paymentStatus: string;

  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;

  __v?: number;
}

export interface OrderResponse {
  success: boolean;
  message?: string;
  data?: OrderDetails;
}

/* =========================
   GET ORDER
========================= */

export async function getOrderById(
  orderId: string
): Promise<OrderDetails | undefined> {
  assertApiBaseUrl();

  const token =
    useAuthStore.getState().user?.token || null;

  const res = await fetch(
    `${API_BASE_URL}/workshop/order/${orderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
      cache: "no-store",
    }
  );

  const raw: OrderResponse | null = await res
    .json()
    .catch(() => null);

  console.log("Order API response:", raw);

  if (!res.ok) {
    throw new Error(
      `Order validation failed: ${res.status} ${res.statusText}${
        raw
          ? ` - ${JSON.stringify(raw)}`
          : ""
      }`
    );
  }

  console.log("Order details:", raw?.data);

  return raw?.data;
}