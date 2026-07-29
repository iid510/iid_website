import { client } from "./client";
import { imageRef } from "./uploadImages";
import { TEAM_DATA, type TeamGroup } from "../../src/data/team";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function seedTeamMembers(assetMap: Record<string, string>) {
  const groups: { group: TeamGroup; members: typeof TEAM_DATA.patronMatron }[] = [
    { group: "patronMatron", members: TEAM_DATA.patronMatron },
    { group: "adviser", members: TEAM_DATA.advisers },
    { group: "currentExecutive", members: TEAM_DATA.currentExecutives },
    { group: "pastPresident", members: TEAM_DATA.pastPresidents },
    { group: "pastExecutive", members: TEAM_DATA.pastExecutiveTeam },
    { group: "general", members: TEAM_DATA.generalMembers },
  ];

  let count = 0;
  let order = 0;
  for (const { group, members } of groups) {
    for (const member of members) {
      order++;
      const _id = `teamMember-${group}-${slugify(member.name)}`;
      await client.createOrReplace({
        _id,
        _type: "teamMember",
        name: member.name,
        role: member.role,
        photo: imageRef(assetMap, member.photo),
        group,
        order,
      });
      count++;
    }
  }
  console.log(`Seeded ${count} teamMember documents.`);
}
