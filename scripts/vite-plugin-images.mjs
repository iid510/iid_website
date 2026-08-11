/**
 * Build-time image plugin.
 *
 * Takes over copying `public/` into the bundle so it can do two things Vite's
 * verbatim copy cannot:
 *
 *   - skip redundant .png/.jpeg masters that already have a .webp twin
 *   - emit narrower .webp variants next to each large image, for `srcset`
 *
 * Only runs on `build`; `vite dev` keeps Vite's normal publicDir handling, so
 * the dev server still serves every file straight from `public/`. Because the
 * variants exist only in the bundle, `src/lib/imageSrc.ts` omits `srcset`
 * during dev — a dev page loads the full-size original instead.
 */
import { cp, mkdir, readdir, stat } from "node:fs/promises";
import { join, relative, sep, dirname } from "node:path";
import sharp from "sharp";
import {
  VARIANT_WIDTHS,
  findRedundantMasters,
  shouldHaveVariants,
  variantPath,
  walk,
} from "./image-pipeline.mjs";

/** Run `jobs` with bounded concurrency so we don't open 500 encoders at once. */
async function pool(jobs, limit = 8) {
  const queue = [...jobs];
  const workers = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length) await queue.shift()();
  });
  await Promise.all(workers);
}

export default function imagePipeline() {
  let root;
  let outDir;

  return {
    name: "iid-image-pipeline",
    apply: "build",

    // Vite would copy public/ verbatim; we do it ourselves in closeBundle.
    config() {
      return { publicDir: false };
    },

    configResolved(resolved) {
      root = resolved.root;
      outDir = resolved.build.outDir;
    },

    async closeBundle() {
      const publicDir = join(root, "public");
      const destDir = join(root, outDir);

      const redundant = findRedundantMasters(root);

      let skippedBytes = 0;
      for (const rel of redundant) {
        skippedBytes += (await stat(join(publicDir, rel))).size;
      }

      await cp(publicDir, destDir, {
        recursive: true,
        force: true,
        filter: (src) => {
          const rel = relative(publicDir, src).split(sep).join("/");
          if (!rel) return true;
          return !redundant.has(rel);
        },
      });

      // Responsive variants, written alongside each original in the bundle.
      const originals = walk(publicDir).filter(shouldHaveVariants);
      let written = 0;
      let variantBytes = 0;

      const jobs = originals.map((abs) => async () => {
        const rel = "/" + relative(publicDir, abs).split(sep).join("/");
        let meta;
        try {
          meta = await sharp(abs).metadata();
        } catch {
          return;
        }
        if (!meta.width) return;

        for (const width of VARIANT_WIDTHS) {
          // No point upscaling, and no point emitting a "variant" the same
          // size as the original.
          if (width >= meta.width) continue;
          const dest = join(destDir, variantPath(rel, width).slice(1));
          await mkdir(dirname(dest), { recursive: true });
          try {
            const info = await sharp(abs)
              .resize({ width, withoutEnlargement: true })
              .webp({ quality: 78 })
              .toFile(dest);
            written++;
            variantBytes += info.size;
          } catch {
            /* a single bad source must not fail the build */
          }
        }
      });

      await pool(jobs);

      const mb = (n) => (n / 1048576).toFixed(1);
      this.info?.(
        `images: skipped ${redundant.size} redundant masters (${mb(skippedBytes)} MB), ` +
          `emitted ${written} variants (${mb(variantBytes)} MB)`,
      );
      console.log(
        `\nimages: skipped ${redundant.size} redundant masters (${mb(skippedBytes)} MB), ` +
          `emitted ${written} responsive variants (${mb(variantBytes)} MB)`,
      );
    },
  };
}
