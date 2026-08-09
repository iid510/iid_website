import type { SanityEvent } from "@/data/events";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  past: boolean;
}

/** Events store dates as display strings ("April 15, 2026"). */
export function parseEventDate(event: Pick<SanityEvent, "date">): Date | null {
  const parsed = new Date(event.date);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * The soonest event still in the future. The `upcoming` flag in the data is
 * maintained by hand and drifts, so dates are the source of truth here.
 */
export function findNextEvent<T extends Pick<SanityEvent, "date">>(events: T[], from: Date = new Date()): T | null {
  const future = events
    .map((event) => ({ event, when: parseEventDate(event) }))
    .filter((entry): entry is { event: T; when: Date } => entry.when !== null && entry.when.getTime() >= from.getTime())
    .sort((a, b) => a.when.getTime() - b.when.getTime());
  return future[0]?.event ?? null;
}

export function countdownTo(target: Date, from: Date = new Date()): Countdown {
  const diff = target.getTime() - from.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, past: true };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    past: false,
  };
}

/**
 * A downloadable calendar entry. Events have no end time in the data, so each
 * one is treated as a two-hour block (all-day events start at 09:00 local).
 */
export function buildIcs(event: SanityEvent): string {
  const start = parseEventDate(event) ?? new Date();
  start.setHours(9, 0, 0, 0);
  const end = new Date(start.getTime() + 2 * 3_600_000);

  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const escape = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//IID Omo Orimolusi//Events//EN",
    "BEGIN:VEVENT",
    `UID:${stamp(start)}-${encodeURIComponent(event.title)}@ijebuigbodescendants.org`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escape(event.title)}`,
    `DESCRIPTION:${escape(event.description)}`,
    `LOCATION:${escape(event.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(event: SanityEvent) {
  const blob = new Blob([buildIcs(event)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
