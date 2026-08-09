import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, CloudSun } from "lucide-react";

/**
 * "Ijebu-Igbo Now" — the time and weather back home, next to the visitor's own.
 * For diaspora visitors this is the small emotional hook: it's 4pm and 31° there.
 *
 * Weather comes from Open-Meteo (no API key, no tracking). If the request fails
 * — offline, blocked, rate-limited — the clock still renders on its own.
 */

const IJEBU_IGBO = { lat: 6.9833, lon: 4.0167, tz: "Africa/Lagos" } as const;

/** WMO weather interpretation codes → label + icon. */
function describeWeather(code: number): { label: string; Icon: typeof Sun } {
  if (code === 0) return { label: "Clear", Icon: Sun };
  if (code <= 2) return { label: "Partly cloudy", Icon: CloudSun };
  if (code === 3) return { label: "Overcast", Icon: Cloud };
  if (code <= 48) return { label: "Foggy", Icon: CloudFog };
  if (code <= 57) return { label: "Drizzle", Icon: CloudDrizzle };
  if (code <= 67) return { label: "Rain", Icon: CloudRain };
  if (code <= 77) return { label: "Snow", Icon: CloudSnow };
  if (code <= 82) return { label: "Showers", Icon: CloudRain };
  if (code <= 86) return { label: "Snow showers", Icon: CloudSnow };
  return { label: "Thunderstorm", Icon: CloudLightning };
}

function formatTime(date: Date, timeZone?: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    ...(timeZone ? { timeZone } : {}),
  }).format(date);
}

function formatDay(date: Date, timeZone?: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    ...(timeZone ? { timeZone } : {}),
  }).format(date);
}

/** Whole-hour offset between the visitor and Ijebu-Igbo, e.g. -1 in UK summer. */
function hoursFromHome(date: Date) {
  const here = new Date(date.toLocaleString("en-US"));
  const home = new Date(date.toLocaleString("en-US", { timeZone: IJEBU_IGBO.tz }));
  return Math.round((here.getTime() - home.getTime()) / 3_600_000);
}

interface Props {
  /** "card" for a standalone block, "strip" for a slim inline row */
  variant?: "card" | "strip";
  className?: string;
}

export default function IjebuIgboNow({ variant = "card", className = "" }: Props) {
  const [now, setNow] = useState(() => new Date());
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${IJEBU_IGBO.lat}&longitude=${IJEBU_IGBO.lon}` +
        `&current=temperature_2m,weather_code&timezone=${encodeURIComponent(IJEBU_IGBO.tz)}`,
      { signal: controller.signal },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("weather unavailable"))))
      .then((data) => {
        const temp = data?.current?.temperature_2m;
        const code = data?.current?.weather_code;
        if (typeof temp === "number" && typeof code === "number") setWeather({ temp, code });
      })
      .catch(() => {
        /* Clock-only fallback. */
      });
    return () => controller.abort();
  }, []);

  const offset = hoursFromHome(now);
  const offsetLabel =
    offset === 0
      ? "Same time as you"
      : `${Math.abs(offset)} hour${Math.abs(offset) === 1 ? "" : "s"} ${offset > 0 ? "behind you" : "ahead of you"}`;

  const { label: weatherLabel, Icon: WeatherIcon } = describeWeather(weather?.code ?? 0);

  if (variant === "strip") {
    return (
      <div className={`flex items-center gap-2 text-xs text-primary-foreground/70 ${className}`}>
        {weather && <WeatherIcon size={14} className="text-accent shrink-0" />}
        <span>
          Ijebu-Igbo <strong className="text-primary-foreground/90">{formatTime(now, IJEBU_IGBO.tz)}</strong>
          {weather && <> · {Math.round(weather.temp)}°C</>}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <p className="label-accent !mb-1">Right Now</p>
          <h3 className="font-display font-bold text-foreground text-lg leading-tight">Ijebu-Igbo & You</h3>
        </div>
        {weather && (
          <div className="flex items-center gap-2 shrink-0">
            <WeatherIcon size={26} className="text-accent" />
            <div className="text-right">
              <p className="font-display font-black text-foreground text-xl leading-none">
                {Math.round(weather.temp)}°C
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{weatherLabel}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-primary/5 border border-primary/15 rounded-xl p-3.5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-accent mb-1">Ijebu-Igbo</p>
          <p className="font-display font-black text-foreground text-lg leading-none">
            {formatTime(now, IJEBU_IGBO.tz)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">{formatDay(now, IJEBU_IGBO.tz)}</p>
        </div>
        <div className="bg-muted/50 border border-border rounded-xl p-3.5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-1">Where you are</p>
          <p className="font-display font-black text-foreground text-lg leading-none">{formatTime(now)}</p>
          <p className="text-[11px] text-muted-foreground mt-1">{formatDay(now)}</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">{offsetLabel}</p>
    </motion.div>
  );
}
