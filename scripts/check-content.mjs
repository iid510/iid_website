#!/usr/bin/env node
/**
 * Content integrity check — runs before every build.
 *
 * Catches the failure modes that don't surface as type errors and would only be
 * noticed by a visitor hitting a broken page:
 *   1. image: "/..." paths in the data files that don't exist in public/
 *   2. curated blog-path slugs that no longer match a real post
 *   3. routes in App.tsx with no entry in seo.json (they'd ship with no title)
 *
 * Exits non-zero on any failure so a bad deploy stops at the build.
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];

function read(relative) {
  return readFileSync(join(root, relative), "utf8");
}

/* 1 — every referenced image exists on disk ------------------------------- */
const dataFiles = [
  "src/data/blogPosts.ts",
  "src/data/businesses.ts",
  "src/data/news.ts",
  "src/data/galleryImages.ts",
  "src/data/kings.ts",
  "src/data/team.ts",
  "src/data/members.ts",
  "src/data/places.ts",
  "src/data/foundationMembers.ts",
  "src/data/townContent/atikori.ts",
  "src/data/townContent/japara.ts",
  "src/data/townContent/ojowo.ts",
  "src/data/townContent/okeSopen.ts",
  "src/data/townContent/okeAgbo.ts",
  "src/data/townContent/aparaki.ts",
  "src/data/townContent/imopeIjebu.ts",
];

const imageKeys = /(?:image|photo|src|rulerPhoto|consortPhoto|banner|flyer|featuredImage)\s*:\s*"(\/[^"]+)"/g;
const seen = new Set();

for (const file of dataFiles) {
  if (!existsSync(join(root, file))) continue;
  const source = read(file);
  for (const [, path] of source.matchAll(imageKeys)) {
    if (seen.has(path)) continue;
    seen.add(path);
    // Ignore query strings and external-looking paths.
    const clean = path.split("?")[0];
    if (!existsSync(join(root, "public", clean))) {
      problems.push(`Missing image: ${clean}  (referenced in ${file})`);
    }
  }
}

/* 2 — curated blog path points at real posts ------------------------------ */
const starter = read("src/data/blogStarterPath.ts");
const blogPosts = read("src/data/blogPosts.ts");
const postSlugs = new Set([...blogPosts.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));

for (const [, slug] of starter.matchAll(/slug:\s*"([^"]+)"/g)) {
  if (!postSlugs.has(slug)) {
    problems.push(`Start-here path references a post that does not exist: "${slug}"`);
  }
}

/* 3 — every static route has SEO metadata --------------------------------- */
const app = read("src/App.tsx");
const seo = JSON.parse(read("src/config/seo.json"));
const seoRoutes = new Set(Object.keys(seo.routes ?? {}));

for (const [, path] of app.matchAll(/<Route\s+path="([^"]+)"/g)) {
  if (path === "*" || path.includes(":")) continue;
  if (!seoRoutes.has(path)) {
    problems.push(`Route "${path}" has no entry in src/config/seo.json`);
  }
}

/* ------------------------------------------------------------------------- */
if (problems.length) {
  console.error(`\n✗ Content check failed — ${problems.length} problem(s):\n`);
  problems.forEach((p) => console.error(`  • ${p}`));
  console.error("");
  process.exit(1);
}

console.log(`✓ Content check passed (${seen.size} images, ${postSlugs.size} posts, ${seoRoutes.size} routes)`);
