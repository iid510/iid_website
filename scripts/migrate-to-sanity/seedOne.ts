/**
 * Seed a single business and/or event video into Sanity, by id.
 *
 * The full `npm run migrate` calls createOrReplace on every document, so it
 * overwrites anything edited in the Studio since the last run. Once real
 * editors are working in Sanity that is destructive, so adding one new record
 * should not go through it.
 *
 * This uploads only the images the chosen records reference, and writes only
 * those documents. Everything else in the dataset is left untouched.
 *
 *   npx tsx scripts/migrate-to-sanity/seedOne.ts --business 14 --video 12
 *   npx tsx scripts/migrate-to-sanity/seedOne.ts --business 14 --dry
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { client } from "./client";
import { BUSINESSES } from "../../src/data/businesses";
import { EVENT_VIDEOS } from "../../src/data/eventVideos";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "../../public");

const argv = process.argv.slice(2);
const dryRun = argv.includes("--dry");

function flag(name: string) {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
}

/** Per-run cache: a flyer that is also the first gallery item uploads once. */
const uploaded = new Map<string, { _type: "image"; asset: { _type: "reference"; _ref: string } }>();

/** Upload one local image and return an image reference for it. */
async function uploadImage(sitePath: string) {
  const cached = uploaded.get(sitePath);
  if (cached) return cached;

  const abs = path.join(PUBLIC_DIR, sitePath.replace(/^\//, ""));
  if (!fs.existsSync(abs)) throw new Error(`Image not found on disk: ${sitePath}`);

  if (dryRun) {
    console.log(`  would upload ${sitePath}`);
    return undefined;
  }

  const asset = await client.assets.upload("image", fs.createReadStream(abs), {
    filename: path.basename(abs),
  });
  console.log(`  uploaded ${sitePath} -> ${asset._id}`);
  const ref = { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
  uploaded.set(sitePath, ref);
  return ref;
}

async function seedBusiness(id: number) {
  const biz = BUSINESSES.find((b) => b.id === id);
  if (!biz) throw new Error(`No business with id ${id} in src/data/businesses.ts`);

  console.log(`\nbusiness-${id}  ${biz.name}`);
  const flyer = biz.flyer ? await uploadImage(biz.flyer) : undefined;
  const gallery = [];
  for (const g of biz.gallery ?? []) {
    const ref = await uploadImage(g);
    if (ref) gallery.push(ref);
  }

  const doc = {
    _id: `business-${biz.id}`,
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
    flyer,
    gallery: gallery.length ? gallery : undefined,
    services: biz.services,
    serviceCategories: biz.serviceCategories,
    whatWeDo: biz.whatWeDo,
    benefits: biz.benefits,
    social: biz.social,
    region: biz.region,
    featured: biz.featured,
  };

  if (dryRun) {
    console.log(`  would write business-${id}`);
    return;
  }
  await client.createOrReplace(doc);
  console.log(`  wrote business-${id}`);
}

async function seedVideo(id: number) {
  const video = EVENT_VIDEOS.find((v) => v.id === id);
  if (!video) throw new Error(`No event video with id ${id} in src/data/eventVideos.ts`);

  console.log(`\neventVideo-${id}  ${video.title}`);
  const thumbnail = video.thumbnail ? await uploadImage(video.thumbnail) : undefined;

  // The .mp4 itself stays in public/videos, matching every other event video —
  // Sanity holds the metadata and the poster frame, not a 10 MB upload.
  const doc = {
    _id: `eventVideo-${video.id}`,
    _type: "eventVideo",
    id: video.id,
    title: video.title,
    description: video.description,
    localSrc: video.src,
    thumbnail,
    youtubeId: video.youtubeId,
    date: video.date,
    credit: video.credit,
    tag: video.tag,
    featured: video.featured,
    order: video.id,
  };

  if (dryRun) {
    console.log(`  would write eventVideo-${id}`);
    return;
  }
  await client.createOrReplace(doc);
  console.log(`  wrote eventVideo-${id}`);
}

async function main() {
  const b = flag("business");
  const v = flag("video");
  if (!b && !v) throw new Error("Nothing to do — pass --business <id> and/or --video <id>");

  if (dryRun) console.log("DRY RUN — nothing will be written\n");
  if (b) await seedBusiness(Number(b));
  if (v) await seedVideo(Number(v));
  console.log(dryRun ? "\nDry run complete." : "\nDone.");
}

main().catch((err) => {
  console.error("Failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
