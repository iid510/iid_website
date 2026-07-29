import { client } from "./client";
import { imageRef } from "./uploadImages";
import { GALLERY_IMAGES as FALLBACK_GALLERY } from "../../src/data/galleryImages";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function seedGalleryImages(assetMap: Record<string, string>) {
  let count = 0;
  let order = 0;
  for (const img of FALLBACK_GALLERY) {
    order++;
    const _id = `galleryImage-${slugify(img.src)}`;
    const image = imageRef(assetMap, img.src);
    if (!image) continue;
    await client.createOrReplace({
      _id,
      _type: "galleryImage",
      image,
      alt: img.alt,
      order,
    });
    count++;
  }
  console.log(`Seeded ${count} galleryImage documents.`);
}
