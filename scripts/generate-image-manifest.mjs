#!/usr/bin/env node
/**
 * Records the intrinsic pixel size of every image in `public/` into
 * `src/data/imageDimensions.json`.
 *
 * Not one <img> in the app had width/height attributes, so the browser could
 * not reserve space and every page shifted as photos arrived — 104 unsized
 * images on /blog alone. Shipping the real dimensions lets the browser derive
 * an aspect ratio before a single byte of the image has downloaded.
 *
 * Regenerated as part of `npm run build`, so it cannot drift from the files.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, sep, extname } from "node:path";
import sharp from "sharp";
import { walk, findRedundantMasters } from "./image-pipeline.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const outFile = join(root, "src", "data", "imageDimensions.json");

const RASTER = new Set([".webp", ".png", ".jpg", ".jpeg", ".avif"]);

// Masters that never reach the bundle would only bloat the client payload.
const redundant = findRedundantMasters(root);

const entries = walk(publicDir).filter(
  (f) =>
    RASTER.has(extname(f).toLowerCase()) &&
    !redundant.has(relative(publicDir, f).split(sep).join("/")),
);

const manifest = {};
let failed = 0;

await Promise.all(
  entries.map(async (file) => {
    const urlPath = "/" + relative(publicDir, file).split(sep).join("/");
    try {
      const { width, height } = await sharp(file).metadata();
      if (width && height) manifest[urlPath] = [width, height];
    } catch {
      failed++;
    }
  }),
);

// Stable key order keeps the diff clean between runs.
const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(sorted, null, 0) + "\n");

console.log(
  `image manifest: ${Object.keys(sorted).length} images` +
    (failed ? ` (${failed} unreadable)` : ""),
);
