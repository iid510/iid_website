import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { SITE_SETTINGS_QUERY } from "@/lib/sanityQueries";

export interface Stat { icon?: string; value: string; label: string }
export interface Card { icon?: string; title: string; description?: string }
export interface ClanEntry { name: string; meaning?: string }
export interface Testimonial { quote: string; author: string; location?: string }
export interface FaqEntry { category?: string; question: string; answer?: string[] }

export interface SiteSettings {
  footerStats: Stat[];
  heroPhrases: string[];
  clans: ClanEntry[];
  culturalPillars: Card[];
  impactCards: Card[];
  testimonials: Testimonial[];
  faqs: FaqEntry[];
  honourRoll?: { source?: string; period?: string };
}

const FALLBACK_SITE_SETTINGS: SiteSettings = {
  footerStats: [
    { icon: "ShieldCheck", value: "06408579", label: "UK Charity Reg. No." },
    { icon: "ShieldCheck", value: "9684235", label: "Nigeria Reg. No." },
    { icon: "Users", value: "200+", label: "Members" },
    { icon: "CalendarDays", value: "2017", label: "Est." },
    { icon: "Globe", value: "3", label: "Countries" },
    { icon: "Flag", value: "1", label: "Hometown" },
  ],
  heroPhrases: [
    "KÁÀBỌ̀ ỌMỌ ORÍMÓLÚSÍ",
    "Ẹ̀ WẸ̀ SỌ̀Ọ́ ỌMỌ ALÁRÈ",
    "IJEBU IGBO KÌ Í ṢOFO",
    "ILU WA, IGBERAGA WA",
    "ỌMỌ ALÁRÈ KÁ GBÉ IJEBU IGBO GA",
  ],
  clans: [
    { name: "Oke-Sopen", meaning: "The Elevated Ones" },
    { name: "Japara", meaning: "The Peaceful Settlers" },
    { name: "Oke-Agbo", meaning: "The Noble Highlands" },
    { name: "Atikori", meaning: "The Ancient Lineage" },
    { name: "Ojowo", meaning: "The Prosperous Path" },
    { name: "Imope-Ijebu", meaning: "Seat of the Onimope" },
    { name: "Aparaki", meaning: "Seat of the Alaparaki" },
  ],
  culturalPillars: [
    { icon: "Megaphone", title: "IID — Awareness", description: "Ijebu Igbo Descendants create awareness on what is going on in Ijebu Igbo for all Omo Orimolusi in Diaspora worldwide." },
    { icon: "Users", title: "IID — Togetherness", description: "Ijebu Igbo Descendants create an atmosphere to bring all Omo Orimolusi in Diaspora together, no matter where in the world they live." },
    { icon: "Heart", title: "IID — Support", description: "Ijebu Igbo Descendants give support to hometown projects and other related causes." },
    { icon: "Crown", title: "IID — We Represent", description: "One of our visions is to represent our most respected town — Ijebu Igbo — well in character, diversity and prosperity." },
  ],
  impactCards: [
    { icon: "Globe", title: "Community Development", description: "Infrastructural projects targeting clean water, roads, and renewable energy in Ijebu Igbo." },
    { icon: "BookOpen", title: "Education Support", description: "Scholarship funds and digital literacy programmes empowering local youth for global opportunities." },
    { icon: "Heart", title: "Cultural Preservation", description: "Documenting oral histories, supporting the annual Ojude Oba festival, and preserving Ijebu traditions." },
    { icon: "Users", title: "Diaspora Networking", description: "A professional bridge connecting experts abroad with local opportunities back home." },
  ],
  testimonials: [
    { quote: "No matter where we live in the world, Ijebu Igbo remains home.", author: "Diaspora Member", location: "United Kingdom" },
    { quote: "Our culture connects us beyond borders.", author: "Community Leader", location: "United States" },
    { quote: "Development begins when sons and daughters remember their roots.", author: "Development Advocate", location: "Canada" },
  ],
  faqs: [
    {
      category: "Membership & Contributions",
      question: "What is Project 500, and is it a replacement for the Monthly Contribution?",
      answer: [
        "Project 500 (Please Count Me In) is NOT a replacement for the monthly contribution of £10. It is a separate initiative designed to generate funds for our community cause — and importantly, you do not have to be a Member of IID to participate. Anyone who wants to support our people is welcome.",
        "The idea is simple: if we can find 500 Ijebu Igbo sons and daughters in Diaspora who each commit to donating just £2 a month to their hometown, we would raise £12,000 a year — enough to fund the projects we have been working hard to deliver.",
        "Members are also encouraged to participate voluntarily if they can afford it. Our children, friends, and others who may not wish to attend meetings but still want to help are especially welcome to be part of this initiative.",
        "It was envisioned that if we reach the 500-person target, the monthly contribution may be scrapped entirely. To join Project 500, please contact Alhaji Kazeem Haruna Ishola. Feel free to share this with friends who may not want to be members but simply want to help.",
      ],
    },
    {
      category: "Culture & Meetings",
      question: "What does it mean when someone 'Hosts' an IID event or meeting?",
      answer: [
        "One of the core aims and objectives of IID is to preserve and promote our culture — supported by Section 2, Subsections 2.2, 2.7 and 2.10 of our Constitution. Hosting is a beautiful expression of that culture.",
        "In the tradition of our parents, a member would host the venue or prepare food for people attending the meeting. This is done in turns. It is a way of saying: I belong, I care, I love our meeting and our people, and I am a cheerful giver.",
        "Our meetings are spiced with food and light music so members can relax, socialise and look forward to the next gathering. Many members come straight from work, church, or other commitments — hosting ensures they are taken care of.",
        "With our number, if we all get involved and host in turns, it may come around once every three years. Some members link their hosting to a birthday, wedding anniversary, or another special occasion — though this is not required. Hosting is not compulsory, but if you can afford it, why not participate?",
        "Hosting is supervised by the Social Secretary and the Cultural Secretary.",
      ],
    },
    {
      category: "Dignitaries & International Relations",
      question: "How does IID organise meetings with dignitaries who visit London?",
      answer: [
        "When we receive distinguished visitors — such as royals or people in government — we use a special hosting initiative: we invite all attendees to a restaurant or private venue. This creates a conducive atmosphere for our guest while allowing members to socialise in a relaxed setting.",
        "This type of hosting is sponsored by those who attend and does not come from the organisation's funds.",
        "The benefit is clear: it gives us the opportunity to be identified with the guest, make them feel honoured, dialogue in a comfortable environment, and promote our community — which in turn may open doors of support and goodwill.",
        "We have done this in the past and believe we need more of such occasions as part of the ways we move forward together.",
      ],
    },
  ],
  honourRoll: { source: "IID First Project Event Brochure, September 2009", period: "2006–2009" },
};

export function useSanitySiteSettings() {
  return useQuery<SiteSettings>({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      if (!isSanityConfigured) return FALLBACK_SITE_SETTINGS;
      try {
        const result = await sanityClient.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
        return result ?? FALLBACK_SITE_SETTINGS;
      } catch {
        return FALLBACK_SITE_SETTINGS;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: FALLBACK_SITE_SETTINGS,
  });
}
