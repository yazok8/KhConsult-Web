// app/(site)/_components/useServicesSWR.ts

import useSWR from "swr";
import { Service } from "@prisma/client";

// We'll add a timestamp query param to avoid caching issues
const fetcher = (url: string) =>
  fetch(`${url}?ts=${Date.now()}`, { cache: "no-store" }).then((r) => {
    if (!r.ok) throw new Error("Failed to fetch services");
    return r.json();
  });

// A reusable hook for fetching Services
export function useServicesSWR() {
  const {
    data: services,
    error,
    isLoading,
    mutate
  } = useSWR<Service[]>("/api/services", fetcher, {
    // Optional SWR config
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 30_000,
  });

  return {
    services,
    isLoading,
    error,
    mutate, // in case you want to manually refresh data
  };
}
