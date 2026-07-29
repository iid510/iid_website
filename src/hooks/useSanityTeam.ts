import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { TEAM_QUERY } from "@/lib/sanityQueries";
import { TEAM_DATA, type TeamGroup, type TeamMember, type TeamData } from "@/data/team";

export type { TeamGroup, TeamMember, TeamData };

function groupMembers(members: TeamMember[]): TeamData {
  return {
    patronMatron: members.filter((m) => m.group === "patronMatron"),
    advisers: members.filter((m) => m.group === "adviser"),
    currentExecutives: members.filter((m) => m.group === "currentExecutive"),
    pastPresidents: members.filter((m) => m.group === "pastPresident"),
    pastExecutiveTeam: members.filter((m) => m.group === "pastExecutive"),
    generalMembers: members.filter((m) => m.group === "general"),
  };
}

export function useSanityTeam() {
  return useQuery<TeamData>({
    queryKey: ["team"],
    queryFn: async () => {
      if (!isSanityConfigured) return TEAM_DATA;
      try {
        const results = await sanityClient.fetch<TeamMember[]>(TEAM_QUERY);
        if (!results?.length) return TEAM_DATA;
        return groupMembers(results);
      } catch {
        return TEAM_DATA;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: TEAM_DATA,
  });
}
