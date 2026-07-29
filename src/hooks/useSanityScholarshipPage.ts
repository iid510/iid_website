import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { SCHOLARSHIP_PAGE_QUERY } from "@/lib/sanityQueries";

export interface HowToApplyStep { stepNumber?: string; title: string; description?: string }
export interface PastRecipient { name: string; year?: number; institution?: string }

export interface ScholarshipPageData {
  eligibility: string[];
  howToApply: HowToApplyStep[];
  pastRecipients: PastRecipient[];
}

const FALLBACK_SCHOLARSHIP: ScholarshipPageData = {
  eligibility: [
    "Must be of Ijebu-Igbo descent (parent or grandparent from Ijebu-Igbo)",
    "Currently enrolled in a recognised secondary school, college, or university",
    "Demonstrated financial need or exceptional academic achievement",
    "Recommendation from a parent, guardian, or community elder who is an IID member",
    "Completion of the scholarship application form",
  ],
  howToApply: [
    { stepNumber: "1", title: "Download the form", description: "Contact the General Secretary via WhatsApp to receive the scholarship application form." },
    { stepNumber: "2", title: "Complete & submit", description: "Fill in all sections, attach your academic records and a personal statement, and submit before the deadline." },
    { stepNumber: "3", title: "Review process", description: "The scholarship committee reviews all applications. Shortlisted candidates may be contacted for a brief interview." },
    { stepNumber: "4", title: "Award announcement", description: "Successful recipients are announced at the Annual General Meeting and contacted directly." },
  ],
  pastRecipients: [],
};

export function useSanityScholarshipPage() {
  return useQuery<ScholarshipPageData>({
    queryKey: ["scholarshipPage"],
    queryFn: async () => {
      if (!isSanityConfigured) return FALLBACK_SCHOLARSHIP;
      try {
        const result = await sanityClient.fetch<ScholarshipPageData | null>(SCHOLARSHIP_PAGE_QUERY);
        return result ?? FALLBACK_SCHOLARSHIP;
      } catch {
        return FALLBACK_SCHOLARSHIP;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: FALLBACK_SCHOLARSHIP,
  });
}
