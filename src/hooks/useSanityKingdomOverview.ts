import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { KINGDOM_OVERVIEW_QUERY } from "@/lib/sanityQueries";

export interface KingdomOverview {
  orgChartImage?: string;
  councilOfObasImage?: string;
  grade1Description?: string;
  satelliteTowns: string[];
}

const FALLBACK_KINGDOM_OVERVIEW: KingdomOverview = {
  orgChartImage: "/images/ijebu-traditional-council-chart.webp",
  councilOfObasImage: "/images/ijebu-igbo-council-of-obas.webp",
  grade1Description: "The supreme traditional ruler of Ijebu-Igbo, presiding over all seven quarters and their communities.",
  satelliteTowns: ["Agunboye", "Odo-Alamo", "Asigidi"],
};

export function useSanityKingdomOverview() {
  return useQuery<KingdomOverview>({
    queryKey: ["kingdomOverview"],
    queryFn: async () => {
      if (!isSanityConfigured) return FALLBACK_KINGDOM_OVERVIEW;
      try {
        const result = await sanityClient.fetch<KingdomOverview | null>(KINGDOM_OVERVIEW_QUERY);
        return result ?? FALLBACK_KINGDOM_OVERVIEW;
      } catch {
        return FALLBACK_KINGDOM_OVERVIEW;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: FALLBACK_KINGDOM_OVERVIEW,
  });
}
