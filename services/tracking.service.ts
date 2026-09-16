const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function assertApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set in environment variables",
    );
  }
}

export interface TrackingStep {
  status: string;
  label: string;
  state: "completed" | "current" | "upcoming" | string;
  date: string | null;
}

export interface WorkshopTracking {
  bookingNumber: string;
  workshopTitle: string;
  customerName: string;
  bookingDate: string;
  clayCategory: string;
  clayLabel: string;
  itemCodes: string[];
  status: string;
  statusLabel: string;
  title: string;
  description: string;
  isDelayed: boolean;
  steps: TrackingStep[];
  createdAt: string;
  estimatedReadyFrom: string;
  estimatedReadyTo: string;
  estimatedCollectionDate: string | null;
  collectionDeadline: string | null;
  discardWarningDate: string | null;
  paintingWindowEnd: string;
  collection: {
    hours: string;
    studio: string;
    address: string;
    mapUrl: string;
  };
  totalPeople: number;
  totalAmount: number;
  currency: string;
}

export interface TrackingResponse {
  success?: boolean;
  message?: string;
  result?: WorkshopTracking;
  data?: WorkshopTracking;
}

export async function getWorkshopTracking(
  trackingId: string,
): Promise<WorkshopTracking> {
  assertApiBaseUrl();

  const response = await fetch(
    `${API_BASE_URL}/workshop/tracking/${trackingId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  const raw: TrackingResponse | WorkshopTracking | null = await response
    .json()
    .catch(() => null);
console.log("Workshop tracking response:", raw);
  if (!response.ok) {
    throw new Error(
      `Workshop tracking failed: ${response.status} ${response.statusText}${
        raw ? ` - ${JSON.stringify(raw)}` : ""
      }`,
    );
  }

  const tracking =
    (raw && "result" in raw && raw.result) ||
    (raw && "data" in raw && raw.data) ||
    raw;

  if (!tracking || typeof tracking !== "object") {
    throw new Error("Workshop tracking response did not contain tracking data");
  }

  return tracking as WorkshopTracking;
}