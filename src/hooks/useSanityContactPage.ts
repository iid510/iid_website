import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { CONTACT_PAGE_QUERY } from "@/lib/sanityQueries";

export interface ContactMethod {
  icon?: string;
  label: string;
  value: string;
  sub?: string;
  href?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ContactPageData {
  contacts: ContactMethod[];
}

const FALLBACK_CONTACT_PAGE: ContactPageData = {
  contacts: [
    { icon: "Phone", label: "Phone / WhatsApp", value: "+44 7723 953174", sub: "Available Mon – Fri, 9 am – 6 pm (BST)", href: "tel:+447723953174", ctaLabel: "Chat on WhatsApp", ctaHref: "https://wa.me/447723953174" },
    { icon: "Mail", label: "General Enquiries", value: "info@ijebuigbodescendants.org", sub: "We reply within 2 business days", href: "mailto:info@ijebuigbodescendants.org" },
    { icon: "Mail", label: "Support", value: "support@ijebuigbodescendants.org", sub: "Technical & membership questions", href: "mailto:support@ijebuigbodescendants.org" },
    { icon: "Globe", label: "Website", value: "ijebuigbodescendants.org", sub: "Official IID Omo Orimolusi portal", href: "https://www.ijebuigbodescendants.org/" },
    { icon: "MapPin", label: "Community Reach", value: "Worldwide — in Diaspora", sub: "Connecting Ijebu Igbo descendants globally" },
  ],
};

export function useSanityContactPage() {
  return useQuery<ContactPageData>({
    queryKey: ["contactPage"],
    queryFn: async () => {
      if (!isSanityConfigured) return FALLBACK_CONTACT_PAGE;
      try {
        const result = await sanityClient.fetch<ContactPageData | null>(CONTACT_PAGE_QUERY);
        return result ?? FALLBACK_CONTACT_PAGE;
      } catch {
        return FALLBACK_CONTACT_PAGE;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: FALLBACK_CONTACT_PAGE,
  });
}
