import { client } from "./client";
import { imageRef } from "./uploadImages";
import { PLACES } from "../../src/data/places";

const BADGE_COLOR_MAP: Record<string, string> = {
  "bg-accent text-white": "accent",
  "bg-blue-700 text-white": "blue",
  "bg-emerald-700 text-white": "emerald",
  "bg-emerald-600 text-white": "emerald",
  "bg-orange-600 text-white": "orange",
  "bg-primary text-white": "accent",
};

export async function seedPlaces(assetMap: Record<string, string>) {
  let count = 0;
  let order = 0;
  for (const place of PLACES) {
    order++;
    const _id = `place-${place.id}`;
    await client.createOrReplace({
      _id,
      _type: "place",
      slug: { _type: "slug", current: place.id },
      name: place.name,
      subtitle: place.subtitle,
      badge: place.badge,
      badgeColorKey: place.badgeColor ? BADGE_COLOR_MAP[place.badgeColor] ?? "accent" : undefined,
      location: place.location,
      image: imageRef(assetMap, place.image),
      description: place.description,
      quote: place.quote,
      mapLink: place.mapLink,
      order,
    });
    count++;
  }
  console.log(`Seeded ${count} place documents.`);
}
