import { client } from "./client";
import { uploadImages, imageRef } from "./uploadImages";
import { MEMBERS } from "../../src/data/members";

async function seedMembers() {
  const assetMap = await uploadImages();
  let count = 0;
  for (const member of MEMBERS) {
    await client.createOrReplace({
      _id: member.id,
      _type: "member",
      name: member.name,
      location: member.location,
      role: member.role,
      order: member.order,
      photo: imageRef(assetMap, member.photo),
    });
    count++;
  }
  console.log(`Seeded ${count} member documents.`);
}

seedMembers().catch((err) => {
  console.error("Seeding failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
