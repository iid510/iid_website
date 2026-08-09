import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Share2 } from "lucide-react";
import { useYourIID } from "@/context/YourIIDContext";
import { useSanityTowns } from "@/hooks/useSanityTowns";

/**
 * Shareable "Omo Orimolusi" identity card.
 *
 * Drawn on a canvas at 2x so the download is crisp on retina and on social
 * timelines. Everything is drawn with shapes and text — no external image
 * loading — so it can't be broken by a missing asset or an offline visitor.
 */

const W = 540;
const H = 675; // 4:5, the tallest aspect most social feeds show uncropped
const SCALE = 2;

const NAVY = "#0b2a6b";
const NAVY_DEEP = "#06184a";
const GOLD = "#bf9a2d";
const CREAM = "#f7f3e8";

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

interface CardData {
  name: string;
  townName: string;
  rulerTitle: string;
}

function draw(canvas: HTMLCanvasElement, data: CardData) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  ctx.scale(SCALE, SCALE);

  // Backdrop
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, NAVY);
  bg.addColorStop(1, NAVY_DEEP);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Concentric rings, echoing the site's animated hero backdrop
  ctx.strokeStyle = "rgba(191,154,45,0.16)";
  ctx.lineWidth = 1.5;
  [140, 210, 280, 350].forEach((r) => {
    ctx.beginPath();
    ctx.arc(W - 40, 90, r, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Gold frame
  ctx.strokeStyle = "rgba(191,154,45,0.55)";
  ctx.lineWidth = 2;
  roundRect(ctx, 22, 22, W - 44, H - 44, 22);
  ctx.stroke();

  ctx.textAlign = "center";

  // Eyebrow
  ctx.fillStyle = GOLD;
  ctx.font = "700 13px 'Instrument Sans', system-ui, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("IJEBU IGBO DESCENDANTS IN DIASPORA", W / 2, 92);
  ctx.letterSpacing = "0px";

  // Crown motif
  ctx.fillStyle = GOLD;
  ctx.beginPath();
  const cx = W / 2;
  const cy = 168;
  ctx.moveTo(cx - 42, cy + 20);
  ctx.lineTo(cx - 52, cy - 26);
  ctx.lineTo(cx - 21, cy - 2);
  ctx.lineTo(cx, cy - 34);
  ctx.lineTo(cx + 21, cy - 2);
  ctx.lineTo(cx + 52, cy - 26);
  ctx.lineTo(cx + 42, cy + 20);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(cx - 42, cy + 26, 84, 8);

  // "Omo Orimolusi"
  ctx.fillStyle = CREAM;
  ctx.font = "800 40px 'Bricolage Grotesque', Georgia, serif";
  ctx.fillText("Ọmọ Orimolusi", W / 2, 268);

  // Name
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 30px 'Bricolage Grotesque', Georgia, serif";
  const name = data.name.trim() || "Proud Descendant";
  // Shrink long names rather than let them overflow the frame
  let fontSize = 30;
  while (ctx.measureText(name).width > W - 110 && fontSize > 16) {
    fontSize -= 1;
    ctx.font = `700 ${fontSize}px 'Bricolage Grotesque', Georgia, serif`;
  }
  ctx.fillText(name, W / 2, 330);

  // Divider
  ctx.strokeStyle = "rgba(191,154,45,0.5)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 70, 356);
  ctx.lineTo(W / 2 + 70, 356);
  ctx.stroke();

  // Town block
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "600 12px 'Instrument Sans', system-ui, sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("OF", W / 2, 388);
  ctx.letterSpacing = "0px";

  ctx.fillStyle = GOLD;
  ctx.font = "800 44px 'Bricolage Grotesque', Georgia, serif";
  ctx.fillText(data.townName, W / 2, 436);

  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "500 15px 'Instrument Sans', system-ui, sans-serif";
  ctx.fillText("Ijebu-Igbo, Ogun State, Nigeria", W / 2, 464);

  // Ruler strip
  if (data.rulerTitle) {
    ctx.fillStyle = "rgba(255,255,255,0.07)";
    roundRect(ctx, 60, 496, W - 120, 62, 14);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "600 11px 'Instrument Sans', system-ui, sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("UNDER THE THRONE OF", W / 2, 520);
    ctx.letterSpacing = "0px";

    ctx.fillStyle = CREAM;
    ctx.font = "700 15px 'Instrument Sans', system-ui, sans-serif";
    let rulerSize = 15;
    while (ctx.measureText(data.rulerTitle).width > W - 150 && rulerSize > 10) {
      rulerSize -= 1;
      ctx.font = `700 ${rulerSize}px 'Instrument Sans', system-ui, sans-serif`;
    }
    ctx.fillText(data.rulerTitle, W / 2, 543);
  }

  // Footer
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = "600 13px 'Instrument Sans', system-ui, sans-serif";
  ctx.fillText("ijebuigbodescendants.org", W / 2, H - 54);
}

export default function IdentityCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { profile, setDisplayName, setTown } = useYourIID();
  const { data: towns = [] } = useSanityTowns();
  const [name, setName] = useState(profile.displayName ?? "");
  const [townSlug, setTownSlug] = useState(profile.town ?? "");
  const [shareSupported, setShareSupported] = useState(false);

  useEffect(() => {
    setShareSupported(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  // Keep the form in step if the profile is hydrated or changed elsewhere.
  useEffect(() => {
    if (profile.displayName) setName((n) => n || profile.displayName!);
    if (profile.town) setTownSlug((t) => t || profile.town!);
  }, [profile.displayName, profile.town]);

  const town = towns.find((t) => t.slug === townSlug);

  useEffect(() => {
    if (!canvasRef.current) return;
    draw(canvasRef.current, {
      name,
      townName: town?.name ?? "Ijebu-Igbo",
      rulerTitle: town?.rulerTitle ?? "",
    });
  }, [name, town]);

  const persist = useCallback(() => {
    setDisplayName(name.trim() || null);
    if (townSlug) setTown(townSlug);
  }, [name, townSlug, setDisplayName, setTown]);

  const filename = `omo-orimolusi-${(town?.name ?? "ijebu-igbo").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;

  const handleDownload = () => {
    persist();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = async () => {
    persist();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) return;
    const file = new File([blob], filename, { type: "image/png" });
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Ọmọ Orimolusi",
          text: `Proudly Ọmọ Orimolusi — ${town?.name ?? "Ijebu-Igbo"}. ijebuigbodescendants.org`,
        });
        return;
      }
      await navigator.share({
        title: "Ọmọ Orimolusi",
        text: `Proudly Ọmọ Orimolusi — ${town?.name ?? "Ijebu-Igbo"}.`,
        url: "https://ijebuigbodescendants.org",
      });
    } catch {
      // Share sheet dismissed, or the browser refused files — download instead.
      handleDownload();
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="order-2 lg:order-1"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Identity card for ${name || "a proud descendant"} of ${town?.name ?? "Ijebu-Igbo"}`}
          className="w-full max-w-[380px] mx-auto rounded-2xl shadow-elevated"
          style={{ aspectRatio: `${W} / ${H}` }}
        />
      </motion.div>

      {/* Controls */}
      <div className="order-1 lg:order-2 space-y-5">
        <div>
          <label htmlFor="card-name" className="block text-sm font-semibold text-foreground mb-1.5">
            Your name
          </label>
          <input
            id="card-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={persist}
            placeholder="e.g. Adebayo Ogunye"
            maxLength={40}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="card-town" className="block text-sm font-semibold text-foreground mb-1.5">
            Your town
          </label>
          <select
            id="card-town"
            value={townSlug}
            onChange={(e) => {
              setTownSlug(e.target.value);
              setTown(e.target.value || null);
            }}
            className={inputClass}
          >
            <option value="">Ijebu-Igbo (no specific town)</option>
            {towns.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground mt-1.5">
            Not sure which town is yours? <a href="/roots" className="text-primary font-semibold underline">Find your roots →</a>
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <button onClick={handleDownload} className="btn-primary !py-3 !px-6 gap-2">
            <Download size={16} /> Download card
          </button>
          {shareSupported && (
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border font-bold text-foreground hover:bg-muted transition-colors text-sm"
            >
              <Share2 size={16} /> Share
            </button>
          )}
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Your name and town stay on this device — nothing is uploaded. The card is generated
          in your browser.
        </p>
      </div>
    </div>
  );
}
