import { uploadImages } from "./uploadImages";
import { seedKings } from "./seedKings";
import { seedBusinesses } from "./seedBusinesses";
import { seedNews } from "./seedNews";
import { seedTeamMembers } from "./seedTeamMembers";
import { seedEvents } from "./seedEvents";
import { seedGalleryImages } from "./seedGalleryImages";
import { seedEventVideos } from "./seedEventVideos";
import { seedTowns } from "./seedTowns";
import { seedBlogPosts } from "./seedBlogPosts";
import { seedAnnouncements } from "./seedAnnouncements";
import { seedFoundationMembers } from "./seedFoundationMembers";
import { seedPlaces } from "./seedPlaces";
import { seedSiteSettings } from "./seedSiteSettings";
import { seedPages } from "./seedPages";

async function main() {
  console.log("=== Step 1: Upload images ===");
  const assetMap = await uploadImages({ force: process.argv.includes("--reupload-images") });

  console.log("\n=== Step 2: Seed original 7 schemas ===");
  await seedKings(assetMap);
  await seedBusinesses(assetMap);
  await seedNews(assetMap);
  await seedTeamMembers(assetMap);
  await seedEvents();
  await seedGalleryImages(assetMap);
  await seedEventVideos();

  console.log("\n=== Step 3: Seed new schemas ===");
  await seedTowns(assetMap);
  await seedBlogPosts(assetMap);
  await seedAnnouncements(assetMap);
  await seedFoundationMembers();
  await seedPlaces(assetMap);
  await seedSiteSettings(assetMap);
  await seedPages(assetMap);

  console.log("\nMigration complete.");
}

main().catch((err) => {
  console.error("Migration failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
