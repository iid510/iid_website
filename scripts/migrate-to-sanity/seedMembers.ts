import { client } from "./client";
import { MEMBERS } from "../../src/data/members";

async function seedMembers() {
  let count = 0;
  for (const member of MEMBERS) {
    await client.createOrReplace({
      _id: member.id,
      _type: "member",
      name: member.name,
      location: member.location,
      role: member.role,
      order: member.order,
    });
    count++;
  }
  console.log(`Seeded ${count} member documents.`);
}

seedMembers().catch((err) => {
  console.error("Seeding failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
