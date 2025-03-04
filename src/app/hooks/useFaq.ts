

import { faq } from "@/types/faq";
import { useSWRWithConfig } from "./useSWRWithConfig";

export function useFAQ() {
  const {
    data: faqs,
    error,
    isLoading,
    mutate
  } = useSWRWithConfig<faq[]>("/api/faq");

  return {
    faqs,
    error,
    isLoading,
    mutate,
  };
}