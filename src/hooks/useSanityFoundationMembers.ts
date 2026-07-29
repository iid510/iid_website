import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { FOUNDATION_MEMBERS_QUERY } from "@/lib/sanityQueries";
import { FOUNDATION_EXECUTIVES, FOUNDATION_MEMBERS } from "@/data/foundationMembers";

export interface FoundationMemberEntry {
  name: string;
  position?: string;
  group: "Executive" | "General";
}

const FALLBACK_FOUNDATION_MEMBERS: FoundationMemberEntry[] = [
  ...FOUNDATION_EXECUTIVES.map((e) => ({ name: e.name, position: e.position, group: "Executive" as const })),
  ...FOUNDATION_MEMBERS.map((name) => ({ name, group: "General" as const })),
];

export function useSanityFoundationMembers() {
  return useQuery<FoundationMemberEntry[]>({
    queryKey: ["foundationMembers"],
    queryFn: async () => {
      if (!isSanityConfigured) return FALLBACK_FOUNDATION_MEMBERS;
      try {
        const results = await sanityClient.fetch<FoundationMemberEntry[]>(FOUNDATION_MEMBERS_QUERY);
        return results?.length ? results : FALLBACK_FOUNDATION_MEMBERS;
      } catch {
        return FALLBACK_FOUNDATION_MEMBERS;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: FALLBACK_FOUNDATION_MEMBERS,
  });
}
