import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { TRAVEL_GUIDE_PAGE_QUERY } from "@/lib/sanityQueries";

export interface Flight { airline: string; route: string; notes?: string }
export interface RoadOption { mode: string; description?: string }
export interface BringItem { icon?: string; tip: string }
export interface TravelContact { label: string; value: string }

export interface TravelGuidePageData {
  flights: Flight[];
  roadOptions: RoadOption[];
  whatToBring: BringItem[];
  contacts: TravelContact[];
}

const FALLBACK_TRAVEL_GUIDE: TravelGuidePageData = {
  flights: [
    { airline: "British Airways", route: "London Heathrow → Lagos (LOS)", notes: "Direct flights available. Journey approx. 6–7 hours." },
    { airline: "Air Peace", route: "London Gatwick → Lagos (LOS)", notes: "Nigerian carrier with competitive fares." },
    { airline: "Virgin Atlantic", route: "London Heathrow → Lagos (LOS)", notes: "Premium and economy options available." },
    { airline: "Turkish Airlines", route: "London → Lagos via Istanbul", notes: "Stopover option — often cheaper fares." },
  ],
  roadOptions: [
    { mode: "Car hire / Private driver", description: "Most comfortable option. Lagos to Ijebu-Igbo is approximately 90–120km depending on route, roughly 2–3 hours by road. Book through a trusted driver recommended by a community member." },
    { mode: "Bus (Interstate)", description: "Buses depart from Mile 2 and Ojota bus parks in Lagos. Look for Sagamu–Ijebu Igbo route. Journey is approx. 2–3 hours depending on traffic." },
    { mode: "Sagamu Interchange route", description: "Drive or take a bus to Sagamu, then connect to Ijebu-Igbo via the Sagamu–Benin expressway. This avoids Lagos traffic if coming from the north." },
  ],
  whatToBring: [
    { icon: "Shirt", tip: "Lightweight, breathable clothing — it is hot and humid year-round" },
    { icon: "Sun", tip: "Sunscreen, insect repellent, and any personal medications" },
    { icon: "Phone", tip: "An unlocked phone — local SIMs (MTN, Airtel, Glo) give great data rates" },
    { icon: "MapPin", tip: "Naira cash — card acceptance is limited outside major cities" },
    { icon: "AlertCircle", tip: "Copies of all important documents stored digitally (passport, travel insurance)" },
  ],
  contacts: [
    { label: "IID UK Contact (WhatsApp)", value: "+44 7496 933887" },
    { label: "Ogun State Emergency", value: "0803 000 0000" },
    { label: "LASTMA (Lagos Traffic)", value: "0700 000 2500" },
  ],
};

export function useSanityTravelGuidePage() {
  return useQuery<TravelGuidePageData>({
    queryKey: ["travelGuidePage"],
    queryFn: async () => {
      if (!isSanityConfigured) return FALLBACK_TRAVEL_GUIDE;
      try {
        const result = await sanityClient.fetch<TravelGuidePageData | null>(TRAVEL_GUIDE_PAGE_QUERY);
        return result ?? FALLBACK_TRAVEL_GUIDE;
      } catch {
        return FALLBACK_TRAVEL_GUIDE;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: FALLBACK_TRAVEL_GUIDE,
  });
}
