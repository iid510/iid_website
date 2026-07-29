import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { TOWNS_QUERY, TOWN_BY_SLUG_QUERY } from "@/lib/sanityQueries";
import type { TownSeed } from "@/data/townContent/types";

import atikori from "@/data/townContent/atikori";
import japara from "@/data/townContent/japara";
import okeSopen from "@/data/townContent/okeSopen";
import okeAgbo from "@/data/townContent/okeAgbo";
import aparaki from "@/data/townContent/aparaki";
import ojowo from "@/data/townContent/ojowo";
import imopeIjebu from "@/data/townContent/imopeIjebu";

export type Town = TownSeed;

const FALLBACK_TOWNS: Town[] = [atikori, japara, okeSopen, okeAgbo, aparaki, ojowo, imopeIjebu];

export function useSanityTowns() {
  return useQuery<Town[]>({
    queryKey: ["towns"],
    queryFn: async () => {
      if (!isSanityConfigured) return FALLBACK_TOWNS;
      try {
        const results = await sanityClient.fetch<Town[]>(TOWNS_QUERY);
        return results?.length ? results : FALLBACK_TOWNS;
      } catch {
        return FALLBACK_TOWNS;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: FALLBACK_TOWNS,
  });
}

export function useSanityTownBySlug(slug: string) {
  return useQuery<Town | undefined>({
    queryKey: ["town", slug],
    queryFn: async () => {
      const fallback = FALLBACK_TOWNS.find((t) => t.slug === slug);
      if (!isSanityConfigured) return fallback;
      try {
        const result = await sanityClient.fetch<Town | null>(TOWN_BY_SLUG_QUERY, { slug });
        return result ?? fallback;
      } catch {
        return fallback;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: FALLBACK_TOWNS.find((t) => t.slug === slug),
  });
}
