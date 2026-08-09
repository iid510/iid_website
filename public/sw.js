/*
 * Service worker for ijebuigbodescendants.org
 *
 * Built for visitors on patchy mobile data — much of the audience is in Nigeria
 * or roaming. Strategy per resource type:
 *
 *   navigations  → network-first, falling back to the cached shell so the app
 *                  still opens offline instead of showing the browser error page
 *   hashed build → cache-first (immutable; the filename changes on every deploy)
 *   images       → stale-while-revalidate, capped, so the photo archive doesn't
 *                  fill the device
 *   everything   → network-first with a cache fallback
 *
 * Bump CACHE_VERSION to force old caches out on the next deploy.
 */

const CACHE_VERSION = "v1";
const SHELL_CACHE = `iid-shell-${CACHE_VERSION}`;
const ASSET_CACHE = `iid-assets-${CACHE_VERSION}`;
const IMAGE_CACHE = `iid-images-${CACHE_VERSION}`;
const MAX_IMAGE_ENTRIES = 120;

const SHELL_URLS = ["/", "/offline.html", "/manifest.json", "/logo.webp"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      // A single missing URL must not abort the whole install.
      .then((cache) => Promise.allSettled(SHELL_URLS.map((url) => cache.add(url))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  const keep = new Set([SHELL_CACHE, ASSET_CACHE, IMAGE_CACHE]);
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

/** Keep a cache from growing without bound (oldest entries evicted first). */
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  await Promise.all(keys.slice(0, keys.length - maxEntries).map((k) => cache.delete(k)));
}

async function networkFirstNavigation(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    // Only cache real successes; a 404 shell would poison the fallback.
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return (
      (await cache.match(request)) ||
      (await cache.match("/")) ||
      (await cache.match("/offline.html")) ||
      new Response("You are offline.", { status: 503, headers: { "Content-Type": "text/plain" } })
    );
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone()).then(() => {
          if (maxEntries) trimCache(cacheName, maxEntries);
        });
      }
      return response;
    })
    .catch(() => hit);
  return hit || network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Never touch cross-origin traffic (weather API, fonts, Google Forms iframe,
  // Sanity CDN) — let the network handle it and fail naturally when offline.
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(cacheFirst(request, ASSET_CACHE));
    return;
  }

  if (request.destination === "image") {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE, MAX_IMAGE_ENTRIES));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, ASSET_CACHE));
});

// Lets the page trigger an immediate update instead of waiting for a reload.
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
