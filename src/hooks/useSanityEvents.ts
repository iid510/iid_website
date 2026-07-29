import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { EVENTS_QUERY } from "@/lib/sanityQueries";
import { EVENTS, type SanityEvent } from "@/data/events";

export type { SanityEvent };

export function useSanityEvents() {
  return useQuery<SanityEvent[]>({
    queryKey: ["events"],
    queryFn: async () => {
      if (!isSanityConfigured) return EVENTS;
      try {
        const results = await sanityClient.fetch<SanityEvent[]>(EVENTS_QUERY);
        return results?.length ? results : EVENTS;
      } catch {
        return EVENTS;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: EVENTS,
  });
}
