import { useAuthStore } from "@/store/authStore";
import { Availability, AvailabilityResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function assertApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set in environment variables");
  }
}

export async function getAvailabilityData(
  availabilityData: Availability
): Promise<AvailabilityResponse> {
  assertApiBaseUrl();
  const token: string | null = useAuthStore.getState().user?.token || null
  const res = await fetch(`${API_BASE_URL}/workshop/pottery-availability`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(availabilityData),
  });

  const raw = await res.json().catch(() => null);

  console.log("Availability data API:", raw);
  if (!res.ok) {
    throw new Error(
      `Availability data failed: ${res.status} ${res.statusText}${
        raw ? ` - ${JSON.stringify(raw)}` : ""
      }`
    );
  }

  const response = raw?.result ? raw : raw?.data ?? raw;
  if (!response) {
    throw new Error('Availability response is empty');
  }

  return response as AvailabilityResponse;
}
