import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * "Your IID" — lightweight, login-free personalisation.
 *
 * Everything lives in localStorage on the visitor's own device. No account, no
 * server, no personal data leaves the browser — which also means it degrades
 * gracefully: if storage is unavailable (private mode, storage full), the app
 * simply behaves as it did before.
 */

const STORAGE_KEY = "iid:profile:v1";

export interface ReadingMark {
  /** 0–100 */
  percent: number;
  /** epoch ms */
  updatedAt: number;
  title: string;
}

export interface YourIIDProfile {
  /** Town slug the visitor identifies with, e.g. "atikori" */
  town: string | null;
  /** Display name used on the identity card. Never sent anywhere. */
  displayName: string | null;
  /** Business slugs */
  savedBusinesses: string[];
  /** Blog post slugs */
  savedArticles: string[];
  /** Blog slug → reading mark */
  reading: Record<string, ReadingMark>;
  tourCompleted: boolean;
  rootsCompleted: boolean;
  firstSeen: number | null;
}

const EMPTY_PROFILE: YourIIDProfile = {
  town: null,
  displayName: null,
  savedBusinesses: [],
  savedArticles: [],
  reading: {},
  tourCompleted: false,
  rootsCompleted: false,
  firstSeen: null,
};

function readProfile(): YourIIDProfile {
  if (typeof window === "undefined") return EMPTY_PROFILE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_PROFILE, firstSeen: Date.now() };
    const parsed = JSON.parse(raw) as Partial<YourIIDProfile>;
    // Merge over the defaults so a profile saved by an older build never
    // arrives missing a key the current build expects.
    return {
      ...EMPTY_PROFILE,
      ...parsed,
      savedBusinesses: Array.isArray(parsed.savedBusinesses) ? parsed.savedBusinesses : [],
      savedArticles: Array.isArray(parsed.savedArticles) ? parsed.savedArticles : [],
      reading: parsed.reading && typeof parsed.reading === "object" ? parsed.reading : {},
    };
  } catch {
    return { ...EMPTY_PROFILE, firstSeen: Date.now() };
  }
}

interface YourIIDContextValue {
  profile: YourIIDProfile;
  /** True once the profile has been hydrated from localStorage on the client. */
  ready: boolean;
  hasProfile: boolean;
  setTown: (slug: string | null) => void;
  setDisplayName: (name: string | null) => void;
  toggleBusiness: (slug: string) => void;
  toggleArticle: (slug: string) => void;
  isBusinessSaved: (slug: string) => boolean;
  isArticleSaved: (slug: string) => boolean;
  recordReading: (slug: string, title: string, percent: number) => void;
  completeTour: () => void;
  completeRoots: () => void;
  reset: () => void;
}

const YourIIDContext = createContext<YourIIDContextValue | null>(null);

export function YourIIDProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<YourIIDProfile>(EMPTY_PROFILE);
  const [ready, setReady] = useState(false);

  // Hydrate after mount so the first paint matches for everyone.
  useEffect(() => {
    setProfile(readProfile());
    setReady(true);
  }, []);

  // Persist on every change once hydrated.
  useEffect(() => {
    if (!ready || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Storage full or blocked — personalisation just won't persist.
    }
  }, [profile, ready]);

  const update = useCallback((patch: Partial<YourIIDProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch, firstSeen: prev.firstSeen ?? Date.now() }));
  }, []);

  const toggleIn = useCallback((list: string[], slug: string) =>
    list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug], []);

  const value = useMemo<YourIIDContextValue>(() => ({
    profile,
    ready,
    hasProfile:
      Boolean(profile.town) ||
      profile.savedBusinesses.length > 0 ||
      profile.savedArticles.length > 0 ||
      Object.keys(profile.reading).length > 0,
    setTown: (slug) => update({ town: slug }),
    setDisplayName: (name) => update({ displayName: name }),
    toggleBusiness: (slug) =>
      setProfile((p) => ({ ...p, savedBusinesses: toggleIn(p.savedBusinesses, slug) })),
    toggleArticle: (slug) =>
      setProfile((p) => ({ ...p, savedArticles: toggleIn(p.savedArticles, slug) })),
    isBusinessSaved: (slug) => profile.savedBusinesses.includes(slug),
    isArticleSaved: (slug) => profile.savedArticles.includes(slug),
    recordReading: (slug, title, percent) =>
      setProfile((p) => {
        const existing = p.reading[slug];
        // Only ever move progress forward, and skip trivial updates so we're not
        // writing to localStorage on every scroll frame.
        const next = Math.max(percent, existing?.percent ?? 0);
        if (existing && next - existing.percent < 5 && next < 100) return p;
        return { ...p, reading: { ...p.reading, [slug]: { percent: next, updatedAt: Date.now(), title } } };
      }),
    completeTour: () => update({ tourCompleted: true }),
    completeRoots: () => update({ rootsCompleted: true }),
    reset: () => {
      setProfile({ ...EMPTY_PROFILE, firstSeen: Date.now() });
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    },
  }), [profile, ready, update, toggleIn]);

  return <YourIIDContext.Provider value={value}>{children}</YourIIDContext.Provider>;
}

export function useYourIID() {
  const ctx = useContext(YourIIDContext);
  if (!ctx) throw new Error("useYourIID must be used within a YourIIDProvider");
  return ctx;
}
