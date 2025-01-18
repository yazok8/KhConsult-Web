
import { faq } from "@prisma/client";
import { useSWRWithConfig } from "./useSWRWithConfig";

export function useFAQ() {
  const {
    data: faqs,
    error,
    isLoading,
    mutate
  } = useSWRWithConfig<faq[]>("/api/faqs");

  return {
    faqs,
    error,
    isLoading,
    mutate,
  };
}