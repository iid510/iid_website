import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { PAGE_QUERY } from "@/lib/sanityQueries";

export interface PageHero {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export interface PageSection {
  sectionId?: string;
  eyebrow?: string;
  heading?: string;
  body?: string[];
  image?: string;
}

export interface TimelineMilestone {
  era?: string;
  year?: string;
  title?: string;
  description?: string;
}

export interface PageContent {
  key: string;
  hero?: PageHero;
  sections?: PageSection[];
  timeline?: TimelineMilestone[];
}

/** Finds a section by its stable sectionId, falling back to undefined if absent. */
export function findSection(sections: PageSection[] | undefined, sectionId: string): PageSection | undefined {
  return sections?.find((s) => s.sectionId === sectionId);
}

/**
 * Fetches editable copy for a single page (hero text + narrative sections) from the
 * `page` document matching `key`. Falls back to the given local content if Sanity is
 * unreachable, unconfigured, or that page hasn't been populated in Studio yet.
 */
export function useSanityPage(key: string, fallback: PageContent) {
  return useQuery<PageContent>({
    queryKey: ["page", key],
    queryFn: async () => {
      if (!isSanityConfigured) return fallback;
      try {
        const result = await sanityClient.fetch<PageContent | null>(PAGE_QUERY, { key });
        return result ?? fallback;
      } catch {
        return fallback;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: fallback,
  });
}
