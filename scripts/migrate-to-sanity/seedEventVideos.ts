import { client } from "./client";
import { uploadImages, imageRef } from "./uploadImages";
import { EVENT_VIDEOS as FALLBACK_VIDEOS } from "../../src/data/eventVideos";

export async function seedEventVideos(assetMap: Record<string, string>) {
  let count = 0;
  let order = 0;
  for (const video of FALLBACK_VIDEOS) {
    order++;
    const _id = `eventVideo-${video.id}`;
    await client.createOrReplace({
      _id,
      _type: "eventVideo",
      id: video.id,
      title: video.title,
      description: video.description,
      localSrc: video.src,
      thumbnail: imageRef(assetMap, video.thumbnail),
      youtubeId: video.youtubeId,
      date: video.date,
      credit: video.credit,
      tag: video.tag,
      featured: video.featured,
      order,
    });
    count++;
  }
  console.log(`Seeded ${count} eventVideo documents.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  uploadImages().then((assetMap) => seedEventVideos(assetMap)).catch((err) => {
    console.error("Seeding failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  });
}
