import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISSED_KEY = "iid:install-dismissed";

/**
 * "Add to home screen" nudge.
 *
 * Only Chromium fires `beforeinstallprompt`, so this simply never appears
 * elsewhere — no fake iOS instructions. Dismissal is remembered for 30 days so
 * a returning visitor isn't nagged.
 */
export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissedAt = Number(window.localStorage.getItem(DISMISSED_KEY) ?? 0);
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    if (dismissedAt && Date.now() - dismissedAt < thirtyDays) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      // Let the visitor get their bearings before offering to install.
      window.setTimeout(() => setVisible(true), 25_000);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  };

  const install = async () => {
    if (!deferred) return;
    setVisible(false);
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    dismiss();
  };

  return (
    <AnimatePresence>
      {visible && deferred && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[70] safe-area-bottom"
        >
          <div className="bg-card border border-border rounded-2xl shadow-elevated p-4 flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
              <Download size={20} className="text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display font-bold text-foreground text-sm">Install this app</p>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                Add IID to your home screen for faster access — and so it keeps working on a weak
                connection.
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={install}
                  className="bg-accent text-charcoal font-bold text-xs px-4 py-2.5 rounded-xl hover:brightness-110 transition-all touch-manipulation"
                >
                  Install
                </button>
                <button
                  onClick={dismiss}
                  className="text-muted-foreground font-semibold text-xs px-3 py-2.5 hover:text-foreground transition-colors touch-manipulation"
                >
                  Not now
                </button>
              </div>
            </div>
            <button
              onClick={dismiss}
              aria-label="Dismiss install prompt"
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0 p-1"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
