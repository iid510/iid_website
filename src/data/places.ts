export interface Place {
  id: string;
  name: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  location: string;
  image: string | null;
  description: string[];
  quote?: string;
  mapLink?: string;
}

export const PLACES: Place[] = [
  {
    id: "aafin-orimolusi-palace",
    name: "Aafin Orimolusi Palace",
    subtitle: "Ijebu-Igbo Kingdom",
    badge: "Royal Heritage",
    badgeColor: "bg-accent text-white",
    location: "Ijebu-Igbo, Ogun State, Nigeria",
    image: "/images/aafin-orimolusi-palace.webp",
    description: [
      "Standing majestically at the heart of Ijebu-Igbo, the Aafin Orimolusi Palace represents the rich cultural heritage, history, and traditional leadership of the Ijebu-Igbo Kingdom. As the official residence of the Orimolusi of Ijebu-Igbo, the palace serves as a symbol of unity, peace, progress, and the enduring traditions of the Yoruba people.",
      "The iconic entrance, adorned with royal insignia and distinguished architectural features, welcomes visitors into a kingdom deeply rooted in honour, wisdom, and community development. Beyond its gates lies a legacy that has guided generations, preserved cultural values, and fostered growth within the kingdom.",
      "Aafin Orimolusi remains not only a seat of traditional authority but also a beacon of cultural identity, where history meets modern aspirations for the prosperity of the people of Ijebu-Igbo.",
    ],
    quote: "Preserving Our Heritage, Inspiring Future Generations.",
    mapLink: "https://maps.google.com/?q=Aafin+Orimolusi+Palace,+Ijebu-Igbo,+Ogun+State,+Nigeria",
  },
  {
    id: "ojowo-important-places",
    name: "Important Places in Ojowo",
    subtitle: "Ojowo Quarter, Ijebu-Igbo",
    badge: "Heritage Site",
    badgeColor: "bg-blue-700 text-white",
    location: "Ojowo, Ijebu-Igbo, Ogun State, Nigeria",
    image: "/images/ojowo/ojowo-important-places.webp",
    description: [
      "Ojowo is one of the five historic quarters of Ijebu-Igbo, governed under the traditional leadership of the Olokine. The quarter is home to a number of landmarks, sacred sites, and community spaces that have shaped the identity and daily life of its people across generations.",
      "These places of interest reflect the deep cultural roots, communal spirit, and living heritage of the Ojowo people — from traditional meeting grounds and community centres to historically significant locations that have witnessed the growth of Ijebu-Igbo over the centuries.",
    ],
    quote: "The roots of Ojowo run deep — in its land, its people, and its legacy.",
  },
  {
    id: "st-james-church-atikori",
    name: "St James Anglican Church",
    subtitle: "Atikori Quarter, Ijebu-Igbo",
    badge: "Oldest Church in Ijebu Igbo",
    badgeColor: "bg-emerald-700 text-white",
    location: "Atikori, Ijebu-Igbo, Ogun State, Nigeria",
    image: "/images/atikori/st-james-church-atikori.webp",
    description: [
      "St James Anglican Church holds the distinguished honour of being the first and oldest church in Ijebu-Igbo, standing as a living monument to the earliest introduction of Christianity into the region. Located in the Atikori quarter, this historic church has been a cornerstone of faith, community, and education for generations.",
      "As a landmark of spiritual and cultural significance, St James has witnessed the growth and transformation of Ijebu-Igbo across the centuries, its walls carrying the stories of families, community leaders, and milestones that have shaped the identity of the town.",
    ],
    quote: "Faith that has stood the test of time.",
  },
  {
    id: "abraham-adesanya-polytechnic",
    name: "Abraham Adesanya Polytechnic",
    subtitle: "Atikori Quarter, Ijebu-Igbo",
    badge: "Education",
    badgeColor: "bg-emerald-600 text-white",
    location: "Atikori, Ijebu-Igbo, Ogun State, Nigeria",
    image: "/images/atikori/abraham-adesanya-polytechnic-atikori.webp",
    description: [
      "Abraham Adesanya Polytechnic is a key tertiary educational institution situated in the Atikori quarter of Ijebu-Igbo. Named in honour of the late Chief Abraham Adesanya, a towering figure in Yoruba and Nigerian politics, the institution stands as a tribute to his legacy of advocacy, leadership, and commitment to the development of the Yoruba people.",
      "The polytechnic plays a vital role in providing accessible higher education and vocational training to students from Ijebu-Igbo and the wider Ogun State region, contributing to the intellectual and economic development of the community.",
    ],
  },
  {
    id: "atikori-football-team",
    name: "Atikori Football Team",
    subtitle: "Community Sport & Youth",
    badge: "Community Sport",
    badgeColor: "bg-orange-600 text-white",
    location: "Atikori, Ijebu-Igbo, Ogun State, Nigeria",
    image: "/images/atikori/atikori-football-team.webp",
    description: [
      "Football is more than a sport in Atikori — it is a vehicle for community pride, youth development, and local identity. The Atikori Football Team represents the heart of the quarter's youth, bringing together young men who compete with discipline and passion to carry the name of Atikori forward.",
      "The team's success on the pitch is a reflection of the strong communal bonds and the investment that community elders and leaders make in nurturing the next generation. Their victories are celebrated by the whole quarter as shared achievements.",
    ],
    quote: "United on the pitch, united as a community.",
  },
  {
    id: "unity-house",
    name: "Unity House",
    subtitle: "Multipurpose Learning Resource Centre",
    badge: "Proposed Site",
    badgeColor: "bg-primary text-white",
    location: "Ijebu-Igbo, Ogun State, Nigeria",
    image: "/images/unity-house.webp",
    description: [
      "Unity House is the proposed site for the Ijebu-Igbo Descendants Omo Orimolusi in Diaspora Multipurpose Learning Resource Centre — a landmark project that represents the community's commitment to education, development, and collective progress.",
      "Once completed, the centre will serve as a hub for learning, skills development, community gatherings, and cultural exchange, benefiting the people of Ijebu-Igbo both at home and in the diaspora. The facility is envisioned as a lasting physical legacy of the IID's investment in the homeland.",
      "The proposed site stands as a testament to what the diaspora community can achieve together — turning shared vision into brick-and-mortar reality for the next generation.",
    ],
    quote: "Building bridges between the diaspora and the homeland.",
  },
];
