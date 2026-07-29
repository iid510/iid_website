import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { ANNOUNCEMENTS_QUERY } from "@/lib/sanityQueries";
import { ANNOUNCEMENTS, type Announcement } from "@/data/announcements";

export function useSanityAnnouncements() {
  return useQuery<Announcement[]>({
    queryKey: ["announcements"],
    queryFn: async () => {
      if (!isSanityConfigured) return ANNOUNCEMENTS;
      try {
        const results = await sanityClient.fetch<Announcement[]>(ANNOUNCEMENTS_QUERY);
        return results?.length ? results : ANNOUNCEMENTS;
      } catch {
        return ANNOUNCEMENTS;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: ANNOUNCEMENTS,
  });
}
