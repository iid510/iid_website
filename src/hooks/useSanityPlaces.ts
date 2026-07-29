import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { PLACES_QUERY } from "@/lib/sanityQueries";
import { PLACES, type Place } from "@/data/places";

const BADGE_COLOR_CLASSES: Record<string, string> = {
  accent: "bg-accent text-white",
  blue: "bg-blue-700 text-white",
  emerald: "bg-emerald-700 text-white",
  orange: "bg-orange-600 text-white",
  rose: "bg-rose-600 text-white",
  cyan: "bg-cyan-600 text-white",
};

function resolveBadgeColor(place: Place): Place {
  if (place.badgeColor && !place.badgeColor.startsWith("bg-")) {
    return { ...place, badgeColor: BADGE_COLOR_CLASSES[place.badgeColor] ?? BADGE_COLOR_CLASSES.accent };
  }
  return place;
}

export function useSanityPlaces() {
  return useQuery<Place[]>({
    queryKey: ["places"],
    queryFn: async () => {
      if (!isSanityConfigured) return PLACES;
      try {
        const results = await sanityClient.fetch<Place[]>(PLACES_QUERY);
        return results?.length ? results.map(resolveBadgeColor) : PLACES;
      } catch {
        return PLACES;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: PLACES,
  });
}
