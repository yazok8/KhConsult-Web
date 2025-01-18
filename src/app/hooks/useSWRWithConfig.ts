// hooks/useSWRWithConfig.ts

import useSWR, { SWRConfiguration } from "swr";

const defaultFetcher = (url: string) =>
  fetch(url, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  }).then((r) => {
    if (!r.ok) throw new Error(`Failed to fetch data from ${url}`);
    return r.json();
  });

const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0, // Disable automatic polling
  dedupingInterval: 0, // Disable deduping to always fetch fresh data
  revalidateOnMount: true, // Always revalidate when component mounts
  shouldRetryOnError: true,
  errorRetryCount: 3,
};

export function useSWRWithConfig<T>(
  endpoint: string,
  customConfig?: SWRConfiguration,
  customFetcher?: (url: string) => Promise<T>
) {
  const {
    data,
    error,
    isLoading,
    mutate
  } = useSWR<T>(
    endpoint,
    customFetcher || defaultFetcher,
    { ...defaultConfig, ...customConfig }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}