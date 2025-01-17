import { Service } from "@prisma/client";
import { mutate } from "swr";

export async function fetchServices(): Promise<Service[]> {
  // Add a timestamp query param to bust any CDN cache
  const res = await fetch(`/api/services?ts=${Date.now()}`, {
    cache: "no-store", // Tells Next.js fetch to bypass static caching
  });
  if(res.ok){
    mutate("/api/services");
  }
  else{
    throw new Error("Failed to fetch services.");
  }
  return res.json();
}
