import { client } from "./client";
import { imageRef } from "./uploadImages";
import { BUSINESSES } from "../../src/data/businesses";

export async function seedBusinesses(assetMap: Record<string, string>) {
  let count = 0;
  for (const biz of BUSINESSES) {
    const _id = `business-${biz.id}`;
    await client.createOrReplace({
      _id,
      _type: "business",
      id: biz.id,
      slug: { _type: "slug", current: biz.slug },
      name: biz.name,
      category: biz.category,
      tagline: biz.tagline,
      description: biz.description,
      location: biz.location,
      phone: biz.phone,
      whatsapp: biz.whatsapp,
      email: biz.email,
      website: biz.website,
      flyer: imageRef(assetMap, biz.flyer),
      banner: imageRef(assetMap, biz.banner),
      promoVideoUrl: biz.promoVideo,
      gallery: biz.gallery?.map((g) => imageRef(assetMap, g)).filter(Boolean),
      services: biz.services,
      serviceCategories: biz.serviceCategories,
      whatWeDo: biz.whatWeDo,
      values: biz.values,
      focusAreas: biz.focusAreas,
      partners: biz.partners,
      hours: biz.hours,
      social: biz.social,
      ownerName: biz.ownerName,
      established: biz.established,
      featured: biz.featured,
      benefits: biz.benefits,
      testimonials: biz.testimonials,
      region: biz.region,
    });
    count++;
  }
  console.log(`Seeded ${count} business documents.`);
}
