import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { MEMBERS_QUERY } from "@/lib/sanityQueries";
import { MEMBERS, type Member } from "@/data/members";

export function useSanityMembers() {
  return useQuery<Member[]>({
    queryKey: ["members"],
    queryFn: async () => {
      if (!isSanityConfigured) return MEMBERS;
      try {
        const results = await sanityClient.fetch<Member[]>(MEMBERS_QUERY);
        return results?.length ? results : MEMBERS;
      } catch {
        return MEMBERS;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: MEMBERS,
  });
}
