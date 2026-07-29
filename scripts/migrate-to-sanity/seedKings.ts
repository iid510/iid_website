import { client } from "./client";
import { imageRef } from "./uploadImages";
import { kings } from "../../src/data/kings";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function seedKings(assetMap: Record<string, string>) {
  let count = 0;
  for (const king of kings) {
    const _id = `king-${slugify(king.slug)}`;
    await client.createOrReplace({
      _id,
      _type: "king",
      slug: { _type: "slug", current: king.slug },
      name: king.name,
      fullTitle: king.fullTitle,
      subtitle: king.subtitle,
      author: king.author,
      reign: king.reign,
      status: king.status,
      photo: imageRef(assetMap, king.photo),
      photos: king.photos?.map((p) => imageRef(assetMap, p)).filter(Boolean),
      hometown: king.hometown,
      born: king.born,
      died: king.died,
      quote: king.quote,
      quoteAuthor: king.quoteAuthor,
      biography: king.biography,
      achievements: king.achievements,
      titles: king.titles,
    });
    count++;
  }
  console.log(`Seeded ${count} king documents.`);
}
