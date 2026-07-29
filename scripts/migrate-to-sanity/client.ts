import { createClient } from "@sanity/client";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  process.loadEnvFile(path.resolve(__dirname, "../../.env"));
} catch {
  // .env already loaded into process.env by the shell, or file missing
}

const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || projectId === "placeholder") {
  throw new Error("Missing VITE_SANITY_PROJECT_ID in .env");
}
if (!token) {
  throw new Error("Missing SANITY_API_TOKEN in .env");
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});
