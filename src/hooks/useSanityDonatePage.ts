import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { DONATE_PAGE_QUERY } from "@/lib/sanityQueries";
import type { Card } from "@/hooks/useSanitySiteSettings";

export interface BankAccount {
  label: string;
  accountName?: string;
  bankName?: string;
  accountNumber?: string;
  sortCode?: string;
  reference?: string;
}

export interface DonatePageData {
  bankAccounts: BankAccount[];
  target: number;
  raised: number;
  impactItems: Card[];
}

const FALLBACK_DONATE_PAGE: DonatePageData = {
  bankAccounts: [
    { label: "UK Account", accountName: "IID Omo Orimolusi in Diaspora", bankName: "Natwest", accountNumber: "21598770", sortCode: "50-10-29", reference: "UNITY HOUSE" },
    { label: "Nigeria Account", accountName: "IID Omo Orimolusi in Diaspora", bankName: "FCMB", accountNumber: "4052231013", reference: "UNITY HOUSE" },
  ],
  target: 50_000,
  raised: 0,
  impactItems: [
    { icon: "Building2", title: "Unity House", description: "A permanent multipurpose learning and community centre in Ijebu-Igbo" },
    { icon: "BookOpen", title: "Scholarships", description: "Supporting deserving students from Ijebu-Igbo with educational bursaries" },
    { icon: "Wrench", title: "Infrastructure", description: "Funding community infrastructure projects in the homeland" },
    { icon: "Users", title: "Community Events", description: "Enabling cultural events, AGMs, and diaspora gatherings" },
  ],
};

export function useSanityDonatePage() {
  return useQuery<DonatePageData>({
    queryKey: ["donatePage"],
    queryFn: async () => {
      if (!isSanityConfigured) return FALLBACK_DONATE_PAGE;
      try {
        const result = await sanityClient.fetch<DonatePageData | null>(DONATE_PAGE_QUERY);
        return result ?? FALLBACK_DONATE_PAGE;
      } catch {
        return FALLBACK_DONATE_PAGE;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: FALLBACK_DONATE_PAGE,
  });
}
