export type VideoTag = "Royal Visit" | "Ojude Oba" | "Carnival" | "Community" | "Live Stream" | "Performance";

export interface EventVideo {
  id: number;
  title: string;
  description: string;
  src?: string;
  thumbnail?: string;
  youtubeId?: string;
  date: string;
  credit?: string;
  tag: VideoTag;
  featured?: boolean;
}

export const EVENT_VIDEOS: EventVideo[] = [
  {
    id: 9,
    title: "Full Live Stream — Ojude Oba 2026, Ijebu Igbo",
    description: "The full live stream of Ojude Oba 2026, Ijebu Igbo — capturing every moment of the grand cultural celebration in its entirety.",
    youtubeId: "KbInaslfyrk",
    date: "Ojude Oba Orimolusi 2026",
    credit: "Raw Radio",
    tag: "Live Stream",
    featured: true,
  },
  {
    id: 1,
    title: "Royal Welcome — Alayeluwa Oba Aderemi Adewale Ogunye (Part 1)",
    description: "Alayeluwa Oba Aderemi Adewale Ogunye, The Kotolori-Ojuule I, Abijaparako of Japara, receives a royal welcome by IID Omo Orimolusi in Diaspora members in London.",
    src: "/videos/events/oba-royal-welcome-london1.mp4",
    thumbnail: "/videos/thumbs/oba-royal-welcome-london1.webp",
    date: "London, United Kingdom",
    tag: "Royal Visit",
  },
  {
    id: 2,
    title: "Royal Welcome — Alayeluwa Oba Aderemi Adewale Ogunye (Part 2)",
    description: "Continuation of the royal welcome ceremony hosted by IID Omo Orimolusi in Diaspora in London.",
    src: "/videos/events/oba-royal-welcome-london2.mp4",
    thumbnail: "/videos/thumbs/oba-royal-welcome-london2.webp",
    date: "London, United Kingdom",
    tag: "Royal Visit",
  },
  {
    id: 4,
    title: "A Royal Gift for Ojude Oba Orimolusi 2026",
    description: "Kabiyesi HRM Oba Jaiyeoba Adebajo is presented with a magnificent new horse — a powerful symbol of royalty, honour, and cultural heritage.",
    src: "/videos/events/kabiyesi-horse-gift-ojude-oba-2026.mp4",
    thumbnail: "/videos/thumbs/kabiyesi-horse-gift-ojude-oba-2026.webp",
    date: "Ojude Oba Orimolusi 2026",
    tag: "Ojude Oba",
  },
  {
    id: 5,
    title: "Otunba Atunlunto of Ilugun Graces Ojude Oba 2026",
    description: "Otunba Atunlunto alongside his family and friends from Brazil graces Ojude Oba Orimolusi 2026 in magnificent style.",
    src: "/videos/events/ojude-oba-2026-otunba-atunlunto.mp4",
    thumbnail: "/videos/thumbs/ojude-oba-2026-otunba-atunlunto.webp",
    date: "Ojude Oba Orimolusi 2026",
    tag: "Ojude Oba",
  },
  {
    id: 6,
    title: "Nollywood Stars Grace Ojude Oba Orimolusi 2026",
    description: "Nollywood stars grace Ojude Oba Orimolusi 2026 in magnificent grand style, adding glamour, culture, and prestige.",
    src: "/videos/events/ojude-oba-2026-nollywood-stars.mp4",
    thumbnail: "/videos/thumbs/ojude-oba-2026-nollywood-stars.webp",
    date: "Ojude Oba Orimolusi 2026",
    tag: "Performance",
  },
  {
    id: 10,
    title: "Saheed Osupa Thrills at Ojude Oba Orimolusi 2026",
    description: "Fuji music star Saheed Osupa thrills the people of Ijebu Igbo with melodious music and unforgettable moments of dance.",
    src: "/videos/events/ojude-oba-2026-saheed-osupa.mp4",
    thumbnail: "/videos/thumbs/ojude-oba-2026-saheed-osupa.webp",
    date: "Ojude Oba Orimolusi 2026",
    credit: "MarvelTvUpdates",
    tag: "Performance",
  },
  {
    id: 7,
    title: "IID Carnival 2025",
    description: "Members of IID Omo Orimolusi in Diaspora come alive at IID Carnival 2025 — a vibrant celebration of culture, colour, music, and community spirit.",
    src: "/videos/events/iid-carnival-2025.mp4",
    thumbnail: "/videos/thumbs/iid-carnival-2025.webp",
    date: "IID Omo Orimolusi in Diaspora, 2025",
    tag: "Carnival",
  },
  {
    id: 11,
    title: "IID Carnival 2025 (Part 2)",
    description: "More highlights from IID Carnival 2025 — continuing the celebration of culture, colour, music, and community spirit.",
    src: "/videos/events/iid-carnival-2025-2.mp4",
    thumbnail: "/videos/thumbs/iid-carnival-2025-2.webp",
    date: "IID Omo Orimolusi in Diaspora, 2025",
    tag: "Carnival",
  },
  {
    id: 8,
    title: "IID Carnival 2025 (Part 3)",
    description: "Further highlights from IID Carnival 2025 — more moments of culture, colour, music, and community celebration.",
    src: "/videos/events/iid-carnival-3.mp4",
    thumbnail: "/videos/thumbs/iid-carnival-3.webp",
    date: "IID Omo Orimolusi in Diaspora, 2025",
    tag: "Carnival",
  },
  {
    id: 3,
    title: "IID New Year Party",
    description: "Members of IID Omo Orimolusi in Diaspora come together to celebrate the new year in style — a joyful evening of music, culture, and community.",
    src: "/videos/events/iid-new-year-party.mp4",
    thumbnail: "/videos/thumbs/iid-new-year-party.webp",
    date: "IID Omo Orimolusi in Diaspora",
    tag: "Community",
  },
  {
    id: 12,
    title: "President's Speech — Healthcare Outreach Project",
    description:
      "The President of IID Omo Orimolusi in Diaspora speaks from the ground at the community healthcare outreach project, on what the programme means for Ijebu-Igbo and the people it was built to serve.",
    src: "/videos/events/iid-president-speech-healthcare-outreach.mp4",
    thumbnail: "/videos/thumbs/iid-president-speech-healthcare-outreach.webp",
    date: "IID Omo Orimolusi in Diaspora",
    tag: "Community",
  },
];
