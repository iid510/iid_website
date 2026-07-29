import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { GALLERY_QUERY } from "@/lib/sanityQueries";
import { GALLERY_IMAGES, type GalleryImage } from "@/data/galleryImages";

export type { GalleryImage };

export function useSanityGallery() {
  return useQuery<GalleryImage[]>({
    queryKey: ["gallery"],
    queryFn: async () => {
      if (!isSanityConfigured) return GALLERY_IMAGES;
      try {
        const results = await sanityClient.fetch<GalleryImage[]>(GALLERY_QUERY);
        return results?.length ? results : GALLERY_IMAGES;
      } catch {
        return GALLERY_IMAGES;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: GALLERY_IMAGES,
  });
}
