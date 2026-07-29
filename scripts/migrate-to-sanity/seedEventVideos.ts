import { client } from "./client";
import { EVENT_VIDEOS as FALLBACK_VIDEOS } from "../../src/data/eventVideos";

export async function seedEventVideos() {
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
