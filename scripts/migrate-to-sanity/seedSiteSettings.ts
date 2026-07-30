import { client } from "./client";
import { imageRef } from "./uploadImages";
import { FOUNDATION_SOURCE, FOUNDATION_PERIOD } from "../../src/data/foundationMembers";

type AssetMap = Record<string, string>;

const FOOTER_STATS = [
  { icon: "Users", value: "200+", label: "Members" },
  { icon: "CalendarDays", value: "2017", label: "Est." },
  { icon: "Globe", value: "3", label: "Countries" },
  { icon: "Flag", value: "1", label: "Hometown" },
];

const IMPACT_EYEBROW = "Global Community";
const IMPACT_HEADING = "Ọmọ Alárè Across the World";
const IMPACT_INTRO = "From Nigeria to the United Kingdom, the United States, Canada, and beyond, Ijebu Igbo descendants continue to connect, support one another, and contribute to the development of our hometown.";

const IMPACT_CARDS = [
  { icon: "Globe", title: "Community Development", description: "Infrastructural projects targeting clean water, roads, and renewable energy in Ijebu Igbo." },
  { icon: "BookOpen", title: "Education Support", description: "Scholarship funds and digital literacy programmes empowering local youth for global opportunities." },
  { icon: "Heart", title: "Cultural Preservation", description: "Documenting oral histories, supporting the annual Ojude Oba festival, and preserving Ijebu traditions." },
  { icon: "Users", title: "Diaspora Networking", description: "A professional bridge connecting experts abroad with local opportunities back home." },
];

const CULTURAL_PILLARS = [
  { icon: "Megaphone", title: "IID — Awareness", description: "Ijebu Igbo Descendants create awareness on what is going on in Ijebu Igbo for all Omo Orimolusi in Diaspora worldwide." },
  { icon: "Users", title: "IID — Togetherness", description: "Ijebu Igbo Descendants create an atmosphere to bring all Omo Orimolusi in Diaspora together, no matter where in the world they live." },
  { icon: "Heart", title: "IID — Support", description: "Ijebu Igbo Descendants give support to hometown projects and other related causes." },
  { icon: "Crown", title: "IID — We Represent", description: "One of our visions is to represent our most respected town — Ijebu Igbo — well in character, diversity and prosperity." },
];

const CLANS = [
  { name: "Oke-Sopen", meaning: "The Elevated Ones" },
  { name: "Japara", meaning: "The Peaceful Settlers" },
  { name: "Oke-Agbo", meaning: "The Noble Highlands" },
  { name: "Atikori", meaning: "The Ancient Lineage" },
  { name: "Ojowo", meaning: "The Prosperous Path" },
  { name: "Imope-Ijebu", meaning: "Seat of the Onimope" },
  { name: "Aparaki", meaning: "Seat of the Alaparaki" },
];

const TESTIMONIALS = [
  { quote: "No matter where we live in the world, Ijebu Igbo remains home.", author: "Diaspora Member", location: "United Kingdom" },
  { quote: "Our culture connects us beyond borders.", author: "Community Leader", location: "United States" },
  { quote: "Development begins when sons and daughters remember their roots.", author: "Development Advocate", location: "Canada" },
];

const HERO_PHRASES = [
  "KÁÀBỌ̀ ỌMỌ ORÍMÓLÚSÍ",
  "Ẹ̀ WẸ̀ SỌ̀Ọ́ ỌMỌ ALÁRÈ",
  "IJEBU IGBO KÌ Í ṢOFO",
  "ILU WA, IGBERAGA WA",
  "ỌMỌ ALÁRÈ KÁ GBÉ IJEBU IGBO GA",
];

const FAQS = [
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
];

const SATELLITE_TOWNS = ["Agunboye", "Odo-Alamo", "Asigidi"];
const GRADE1_DESCRIPTION = "The supreme traditional ruler of Ijebu-Igbo, presiding over all seven quarters and their communities.";

const ELIGIBILITY = [
  "Must be of Ijebu-Igbo descent (parent or grandparent from Ijebu-Igbo)",
  "Currently enrolled in a recognised secondary school, college, or university",
  "Demonstrated financial need or exceptional academic achievement",
  "Recommendation from a parent, guardian, or community elder who is an IID member",
  "Completion of the scholarship application form",
];

const HOW_TO_APPLY = [
  { stepNumber: "1", title: "Download the form", description: "Contact the General Secretary via WhatsApp to receive the scholarship application form." },
  { stepNumber: "2", title: "Complete & submit", description: "Fill in all sections, attach your academic records and a personal statement, and submit before the deadline." },
  { stepNumber: "3", title: "Review process", description: "The scholarship committee reviews all applications. Shortlisted candidates may be contacted for a brief interview." },
  { stepNumber: "4", title: "Award announcement", description: "Successful recipients are announced at the Annual General Meeting and contacted directly." },
];

const FLIGHTS = [
  { airline: "British Airways", route: "London Heathrow → Lagos (LOS)", notes: "Direct flights available. Journey approx. 6–7 hours." },
  { airline: "Air Peace", route: "London Gatwick → Lagos (LOS)", notes: "Nigerian carrier with competitive fares." },
  { airline: "Virgin Atlantic", route: "London Heathrow → Lagos (LOS)", notes: "Premium and economy options available." },
  { airline: "Turkish Airlines", route: "London → Lagos via Istanbul", notes: "Stopover option — often cheaper fares." },
];

const ROAD_OPTIONS = [
  { mode: "Car hire / Private driver", description: "Most comfortable option. Lagos to Ijebu-Igbo is approximately 90–120km depending on route, roughly 2–3 hours by road. Book through a trusted driver recommended by a community member." },
  { mode: "Bus (Interstate)", description: "Buses depart from Mile 2 and Ojota bus parks in Lagos. Look for Sagamu–Ijebu Igbo route. Journey is approx. 2–3 hours depending on traffic." },
  { mode: "Sagamu Interchange route", description: "Drive or take a bus to Sagamu, then connect to Ijebu-Igbo via the Sagamu–Benin expressway. This avoids Lagos traffic if coming from the north." },
];

const WHAT_TO_BRING = [
  { icon: "Shirt", tip: "Lightweight, breathable clothing — it is hot and humid year-round" },
  { icon: "Sun", tip: "Sunscreen, insect repellent, and any personal medications" },
  { icon: "Phone", tip: "An unlocked phone — local SIMs (MTN, Airtel, Glo) give great data rates" },
  { icon: "MapPin", tip: "Naira cash — card acceptance is limited outside major cities" },
  { icon: "AlertCircle", tip: "Copies of all important documents stored digitally (passport, travel insurance)" },
];

const TRAVEL_CONTACTS = [
  { label: "IID UK Contact (WhatsApp)", value: "+44 7496 933887" },
  { label: "Ogun State Emergency", value: "0803 000 0000" },
  { label: "LASTMA (Lagos Traffic)", value: "0700 000 2500" },
];

const BANK_ACCOUNTS = [
  { label: "UK Account", accountName: "IID Omo Orimolusi in Diaspora", bankName: "Natwest", accountNumber: "21598770", sortCode: "50-10-29", reference: "UNITY HOUSE" },
  { label: "Nigeria Account", accountName: "IID Omo Orimolusi in Diaspora", bankName: "FCMB", accountNumber: "4052231013", reference: "UNITY HOUSE" },
];

const DONATE_IMPACT_ITEMS = [
  { icon: "Building2", title: "Unity House", description: "A permanent multipurpose learning and community centre in Ijebu-Igbo" },
  { icon: "BookOpen", title: "Scholarships", description: "Supporting deserving students from Ijebu-Igbo with educational bursaries" },
  { icon: "Wrench", title: "Infrastructure", description: "Funding community infrastructure projects in the homeland" },
  { icon: "Users", title: "Community Events", description: "Enabling cultural events, AGMs, and diaspora gatherings" },
];

const CONTACT_METHODS = [
  { icon: "Phone", label: "Phone / WhatsApp", value: "+44 7723 953174", sub: "Available Mon – Fri, 9 am – 6 pm (BST)", href: "tel:+447723953174", ctaLabel: "Chat on WhatsApp", ctaHref: "https://wa.me/447723953174" },
  { icon: "Mail", label: "General Enquiries", value: "info@ijebuigbodescendants.org", sub: "We reply within 2 business days", href: "mailto:info@ijebuigbodescendants.org" },
  { icon: "Mail", label: "Support", value: "support@ijebuigbodescendants.org", sub: "Technical & membership questions", href: "mailto:support@ijebuigbodescendants.org" },
  { icon: "Globe", label: "Website", value: "ijebuigbodescendants.org", sub: "Official IID Omo Orimolusi portal", href: "https://www.ijebuigbodescendants.org/" },
  { icon: "MapPin", label: "Community Reach", value: "Worldwide — in Diaspora", sub: "Connecting Ijebu Igbo descendants globally" },
];

export async function seedSiteSettings(assetMap: AssetMap) {
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    footerStats: FOOTER_STATS,
    heroPhrases: HERO_PHRASES,
    clans: CLANS,
    culturalPillars: CULTURAL_PILLARS,
    impactEyebrow: IMPACT_EYEBROW,
    impactHeading: IMPACT_HEADING,
    impactIntro: IMPACT_INTRO,
    impactCards: IMPACT_CARDS,
    testimonials: TESTIMONIALS,
    faqs: FAQS,
    honourRoll: { source: FOUNDATION_SOURCE, period: FOUNDATION_PERIOD },
  });
  console.log("Seeded siteSettings singleton.");

  await client.createOrReplace({
    _id: "kingdomOverview",
    _type: "kingdomOverview",
    orgChartImage: imageRef(assetMap, "/images/ijebu-traditional-council-chart.webp"),
    councilOfObasImage: imageRef(assetMap, "/images/ijebu-igbo-council-of-obas.webp"),
    grade1Description: GRADE1_DESCRIPTION,
    satelliteTowns: SATELLITE_TOWNS,
  });
  console.log("Seeded kingdomOverview singleton.");

  await client.createOrReplace({
    _id: "scholarshipPage",
    _type: "scholarshipPage",
    eligibility: ELIGIBILITY,
    howToApply: HOW_TO_APPLY,
    pastRecipients: [],
  });
  console.log("Seeded scholarshipPage singleton.");

  await client.createOrReplace({
    _id: "travelGuidePage",
    _type: "travelGuidePage",
    flights: FLIGHTS,
    roadOptions: ROAD_OPTIONS,
    whatToBring: WHAT_TO_BRING,
    contacts: TRAVEL_CONTACTS,
  });
  console.log("Seeded travelGuidePage singleton.");

  await client.createOrReplace({
    _id: "donatePage",
    _type: "donatePage",
    bankAccounts: BANK_ACCOUNTS,
    target: 50000,
    raised: 0,
    impactItems: DONATE_IMPACT_ITEMS,
  });
  console.log("Seeded donatePage singleton.");

  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    contacts: CONTACT_METHODS,
  });
  console.log("Seeded contactPage singleton.");
}
