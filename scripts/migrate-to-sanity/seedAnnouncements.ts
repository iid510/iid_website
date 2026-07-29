import { client } from "./client";
import { imageRef } from "./uploadImages";
import { ANNOUNCEMENTS } from "../../src/data/announcements";

export async function seedAnnouncements(assetMap: Record<string, string>) {
  let count = 0;
  for (const a of ANNOUNCEMENTS) {
    const _id = `announcement-${a.id}`;
    await client.createOrReplace({
      _id,
      _type: "announcement",
      category: a.category,
      title: a.title,
      body: a.body,
      date: new Date(a.date).toISOString(),
      postedBy: a.postedBy,
      image: imageRef(assetMap, a.imageUrl),
    });
    count++;
  }
  console.log(`Seeded ${count} announcement documents.`);
}
