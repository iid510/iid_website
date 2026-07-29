import { client } from "./client";
import { EVENTS as FALLBACK_EVENTS } from "../../src/data/events";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function seedEvents() {
  let count = 0;
  let order = 0;
  for (const event of FALLBACK_EVENTS) {
    order++;
    const _id = `event-${slugify(event.title)}`;
    await client.createOrReplace({
      _id,
      _type: "event",
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      upcoming: event.upcoming,
      order,
    });
    count++;
  }
  console.log(`Seeded ${count} event documents.`);
}
