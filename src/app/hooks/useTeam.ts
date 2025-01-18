
import { AboutOurTeam } from "@prisma/client";
import { useSWRWithConfig } from "./useSWRWithConfig";

export function useTeam() {
  const {
    data: team,
    error,
    isLoading,
    mutate
  } = useSWRWithConfig<AboutOurTeam[]>("/api/team");

  return {
    team,
    error,
    isLoading,
    mutate,
  };
}