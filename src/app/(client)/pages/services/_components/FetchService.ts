import { Service } from "@prisma/client";

export async function fetchServices(): Promise<Service[]> {
  // Add a timestamp query param to bust any CDN cache
  const res = await fetch(`/api/services?ts=${Date.now()}`, {
    cache: "no-store", // Tells Next.js fetch to bypass static caching
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch services.");
  }
  return res.json();
}
