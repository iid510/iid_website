import { client } from "./client";
import { FOUNDATION_EXECUTIVES, FOUNDATION_MEMBERS } from "../../src/data/foundationMembers";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function seedFoundationMembers() {
  let count = 0;
  let order = 0;
  for (const exec of FOUNDATION_EXECUTIVES) {
    order++;
    const _id = `foundationMember-executive-${slugify(exec.name)}`;
    await client.createOrReplace({
      _id,
      _type: "foundationMember",
      name: exec.name,
      position: exec.position,
      group: "Executive",
      order,
    });
    count++;
  }

  order = 0;
  for (const name of FOUNDATION_MEMBERS) {
    order++;
    const _id = `foundationMember-general-${slugify(name)}`;
    await client.createOrReplace({
      _id,
      _type: "foundationMember",
      name,
      group: "General",
      order,
    });
    count++;
  }
  console.log(`Seeded ${count} foundationMember documents.`);
}
