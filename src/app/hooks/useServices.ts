
import { Service } from "@/types/services";
import { useSWRWithConfig } from "./useSWRWithConfig";

export function useServices() {
  const {
    data: services,
    error,
    isLoading,
    mutate
  } = useSWRWithConfig<Service[]>("/api/services");

  return {
    services,
    error,
    isLoading,
    mutate,
  };
}