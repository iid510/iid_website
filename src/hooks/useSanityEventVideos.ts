import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { EVENT_VIDEOS_QUERY } from "@/lib/sanityQueries";
import { EVENT_VIDEOS, type VideoTag, type EventVideo } from "@/data/eventVideos";

export type { VideoTag, EventVideo };

export function useSanityEventVideos() {
  return useQuery<EventVideo[]>({
    queryKey: ["eventVideos"],
    queryFn: async () => {
      if (!isSanityConfigured) return EVENT_VIDEOS;
      try {
        const results = await sanityClient.fetch<EventVideo[]>(EVENT_VIDEOS_QUERY);
        return results?.length ? results : EVENT_VIDEOS;
      } catch {
        return EVENT_VIDEOS;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: EVENT_VIDEOS,
  });
}
