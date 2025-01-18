
import { AboutOurServices } from "@prisma/client";
import { useSWRWithConfig } from "./useSWRWithConfig";

export function useAboutServices() {
  const {
    data: aboutServices,
    error,
    isLoading,
    mutate
  } = useSWRWithConfig<AboutOurServices>("/api/aboutServices");

  return {
    aboutServices,
    error,
    isLoading,
    mutate,
  };
}