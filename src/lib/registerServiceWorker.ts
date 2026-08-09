/**
 * Registers the service worker in production only.
 *
 * In dev it's actively unhelpful — it caches Vite's module graph and serves
 * stale code — so registration is skipped and any worker left over from a
 * previous production visit on the same origin is torn down.
 */
export function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  if (!import.meta.env.PROD) {
    navigator.serviceWorker.getRegistrations?.().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        // When a new build is waiting, activate it so the next navigation is fresh.
        registration.addEventListener("updatefound", () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            if (installing.state === "installed" && navigator.serviceWorker.controller) {
              installing.postMessage("SKIP_WAITING");
            }
          });
        });
      })
      .catch(() => {
        // Registration failing must never break the app.
      });
  });
}
