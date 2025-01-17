import useSWR from "swr";
import { Service } from "@prisma/client";

const fetcher = (url: string) =>
  fetch(url, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  }).then((r) => {
    if (!r.ok) throw new Error("Failed to fetch services");
    return r.json();
  });

export function useServicesSWR() {
  const {
    data: services,
    error,
    isLoading,
    mutate
  } = useSWR<Service[]>("/api/services", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 5000, // Poll every 5 seconds
    dedupingInterval: 2000, // Dedupe requests within 2 seconds
  });

  return {
    services,
    isLoading,
    error,
    mutate, // Expose mutate for manual revalidation
  };
}