import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? "placeholder",
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").url();
}

export const isSanityConfigured =
  !!import.meta.env.VITE_SANITY_PROJECT_ID &&
  import.meta.env.VITE_SANITY_PROJECT_ID !== "placeholder";
