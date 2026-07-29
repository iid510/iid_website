export type TeamGroup =
  | "patronMatron"
  | "adviser"
  | "currentExecutive"
  | "pastPresident"
  | "pastExecutive"
  | "general";

export interface TeamMember {
  name: string;
  role: string;
  photo?: string | null;
  group: TeamGroup;
}

export interface TeamData {
  patronMatron: TeamMember[];
  advisers: TeamMember[];
  currentExecutives: TeamMember[];
  pastPresidents: TeamMember[];
  pastExecutiveTeam: TeamMember[];
  generalMembers: TeamMember[];
}

export const TEAM_DATA: TeamData = {
  patronMatron: [
    { name: "Chief Emmanuel Folorunso Ogunnaike, JP, MFR", role: "Patron", photo: "/team/chief-emmanuel-ogunnaike.webp", group: "patronMatron" },
    { name: "Chief Mrs Ibilola Solaja", role: "Matron", photo: "/team/chief-mrs-ibilola-solaja.webp", group: "patronMatron" },
  ],
  advisers: [
    { name: "Mrs Silifat Haruna Ishola Bello", role: "Special Adviser", photo: "/team/mrs-silifat-haruna-ishola-bello.webp", group: "adviser" },
    { name: "Architect Pa Sunday Kukoyi", role: "Special Adviser", photo: "/team/architect-pa-sunday-kukoyi.webp", group: "adviser" },
  ],
  currentExecutives: [
    { name: "Chief Toyin Odueyungbo", role: "President", photo: "/team/chief-toyin-odueyungbo.webp", group: "currentExecutive" },
    { name: "Pastor Franklin Babaranti Okunowo", role: "Vice President", photo: "/team/evd-franklin-okunowo.webp", group: "currentExecutive" },
    { name: "Ms. Adetutu Ogunsanwo", role: "General Secretary", photo: "/team/ms-adetutu-ogunsanwo.webp", group: "currentExecutive" },
    { name: "Alhaji Lanre Amusa", role: "Financial Secretary", photo: null, group: "currentExecutive" },
    { name: "Chief Mrs Bisi Kazeem", role: "Treasurer", photo: "/team/chief-mrs-bisi-kazeem.webp", group: "currentExecutive" },
    { name: "Princess Kemi Sijuade", role: "Social Secretary", photo: null, group: "currentExecutive" },
    { name: "Alh Sadekunle Hamzat-Maja", role: "Auditor", photo: "/team/alh-sadekunle-hamzat-maja.webp", group: "currentExecutive" },
    { name: "Otunba Ola Busari", role: "PRO", photo: null, group: "currentExecutive" },
    { name: "Chief Rafiu Adejobi", role: "Welfare Officer", photo: null, group: "currentExecutive" },
    { name: "Alhaji Chief Sunny Sobowale", role: "Northampton Branch Chairman", photo: null, group: "currentExecutive" },
  ],
  pastPresidents: [
    { name: "Alhaji Adebowale Kazeem Haruna Ishola", role: "1st President", photo: null, group: "pastPresident" },
    { name: "Barrister Michael Popoola Sojirin", role: "2nd President", photo: "/team/barr-popoola-sojirin.webp", group: "pastPresident" },
    { name: "Otunba Ola Busari", role: "3rd President", photo: null, group: "pastPresident" },
    { name: "Prince Femi Sijuade", role: "4th President", photo: null, group: "pastPresident" },
  ],
  pastExecutiveTeam: [
    { name: "Mrs. Funke Adenuga", role: "Gen. Secretary", group: "pastExecutive" },
    { name: "Princess Toun Adebanjo", role: "Asst. Gen. Secretary", group: "pastExecutive" },
    { name: "Otunba Titi Bashorun", role: "Treasurer", group: "pastExecutive" },
    { name: "Alhaji Wasiu Agbona", role: "Chief Whip", group: "pastExecutive" },
    { name: "Mrs. Funleyi Oluyemisi Amudipe", role: "Internal Auditor", group: "pastExecutive" },
    { name: "Alhaji Fatai Olaide", role: "Legal Affairs Officer", group: "pastExecutive" },
    { name: "Deaconess Mrs. Roselyn Sojirin (JP)", role: "Women Affair Officer", group: "pastExecutive" },
    { name: "Alhaji Bola Gafar", role: "PRO", group: "pastExecutive" },
    { name: "Chief Mrs. Bisi Kazeem, Yeyeluwa of Atikori", role: "Social Secretary (4 Years)", photo: "/team/chief-mrs-bisi-kazeem.webp", group: "pastExecutive" },
    { name: "Mr. Rafiu Adejobi", role: "Welfare Officer", group: "pastExecutive" },
    { name: "Alh Sadekunle Hamzat-Maja", role: "Former Financial Secretary & Former Treasurer", group: "pastExecutive" },
    { name: "Bisi Daramola Odubanjo", role: "Social Secretary", group: "pastExecutive" },
    { name: "Prince Stephen Ademola Gbadebo", role: "Chairman, Dispute & Resolution Committee", group: "pastExecutive" },
    { name: "Dr. Dayo Amudipe", role: "Former Vice President", group: "pastExecutive" },
    { name: "Alhaja Ikeoluwa Oguntayo", role: "Vice President", group: "pastExecutive" },
    { name: "Chief Toyin Odueyungbo", role: "Past Secretary", group: "pastExecutive" },
    { name: "Dapo Nadi", role: "Past Executive", group: "pastExecutive" },
    { name: "Abi Okuyemi", role: "Past Executive", group: "pastExecutive" },
    { name: "Kaz Haruna Ishola", role: "Past Executive", group: "pastExecutive" },
  ],
  generalMembers: [],
};
