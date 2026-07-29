export interface King {
  slug: string;
  name: string;
  fullTitle: string;
  subtitle?: string;
  author?: string;
  reign: string;
  status: "Previous" | "Present";
  photo: string;
  photos: string[];
  hometown: string;
  born?: string;
  died?: string;
  quote?: string;
  quoteAuthor?: string;
  biography: string[];
  achievements: { year: string; event: string }[];
  titles: string[];
}

export const kings: King[] = [
  {
    slug: "adeboye",
    name: "Late Oba Joel Adeboye",
    fullTitle: "Late Oba Joel Adeboye, The Orimolusi of Ijebu-Igbo (1947–1955)",
    subtitle: "The Architect of Modern Ijebu Igbo Kingdom — An Unforgettable Hero",
    author: "By ADEBAYO S. A. (Dr. Saint)",
    reign: "Previous Orimolusi · 1947–1955",
    status: "Previous",
    photo: "/images/oba-adeboye.webp",
    photos: ["/images/oba-adeboye.webp", "/images/oba-adeboye-2.webp"],
    hometown: "Ijebu-Igbo, Ogun State, Nigeria",
    born: "December 8th, 1909 (as Joel Sowunmi Sonuga)",
    died: "September 21st, 1955 — Plane crash at Idris Airport, Tripoli, Libya",
    quote: "One of the most progressive and enlightened natural rulers in Nigeria. He was a class by himself, a benevolent and constitutional ruler.",
    quoteAuthor: "Chief Obafemi Awolowo, at the graveside of Late Oba Joel Adeboye",
    biography: [
      "Late Oba Joel Adeboye — born December 8th, 1909 as Joel Sowunmi Sonuga — was the first formally educated King in the history of Ijebu Igbo. His crowning marked giant strides in the astronomical development of the town, earning him universal acknowledgement as the Architect of Modern Ijebu Igbo Kingdom.",
      "Prior to his ascension as Orimolusi, he was trained as a nurse at Baptist Hospital, Ogbomoso. His education, coupled with sixteen years of working experience in public service — both as a teacher and a medical officer — made him outstanding in the comity of traditional rulers in Ijebuland.",
      "Late Oba Joel Adeboye was renowned to be very intelligent, charismatic, extremely handsome, energetic, and an indomitable figure. He was a political genius, administrative wizard, an achiever of great repute, and an Oba whose memory in history will be difficult to erase in the entire Orimolusi kingdom.",
      "Although he reigned for a short period of eight years (1947–1955), he launched Ijebu Igbo into an unprecedented era of both economic and infrastructural development. Ijebu Igbo was divided into five parts by dreadful thick forest used as ORO grooves and a haven for armed robbers. He took the challenge to deforest the ORO grooves, opened free links to the five districts, integrated the five towns into one entity, and converted the thick forest to modern market stalls in 1949 — turning them into Obada, Ojowo/Atikori markets — an initiative that brought economic revolution to the town.",
      "With the 1954 Macpherson Constitution, the Ijebu Divisional Council (IDC) was established in 1955. Amazingly, Oba Joel Adeboye emerged as the first elected Chairman of the IDC upon its inauguration, defeating the then Awujale, Oba Daniel Adesanya in a hotly contested election. He then used the position to fight relentlessly for complete Autonomy from outside domination and led a delegation of Ijebu Igbo Elite to register protest before the Minister of Local Government.",
      "On September 21st, 1955, returning from the London Cocoa Alliance Conference as Chairman of the Ijebu Divisional Council — representing Ijebuland — Oba Joel Adeboye was among 47 passengers on board a Lagos-bound British Overseas Airways Corporation (BOAC) Argonaut Aircraft, which crashed at Idris Airport, some 36 kilometres from Tripoli. It was at the peak of negotiations for Ijebu Igbo's Autonomy that fate struck. He died at the height of his achievements, leaving behind an indelible legacy that continues to shape modern Ijebu Igbo to this day.",
      "Late Oba Joel Adeboye came, saw, performed, conquered, and left an indelible mark in the history of Ijebu Igbo development. Years after his demise, a tenth of his legacy is yet to be achieved. He will forever remain unforgettable in the history of the Orimolusi Kingdom.",
    ],
    achievements: [
      { year: "1947", event: "Ascended the throne as Orimolusi of Ijebu-Igbo — the first formally educated King in Ijebu Igbo history" },
      { year: "1948", event: "Town Planning Authority established" },
      { year: "1949", event: "First Secondary School, Molusi College, founded" },
      { year: "1949", event: "Deforested the ORO grooves; integrated the five districts; converted forest to Obada, Ojowo/Atikori market stalls — sparking an economic revolution" },
      { year: "1950", event: "Apoje Farm Project launched" },
      { year: "1950", event: "Introduction of AGBON-MAGBE Bank — now metamorphosed into Wema Bank Plc" },
      { year: "1950", event: "Recovery of the beaded crown seized from predecessor Oba Abraham Adesemowo in 1942" },
      { year: "1951", event: "Leper Settlement established" },
      { year: "1951", event: "Revival of the annual Agemo festival" },
      { year: "1952", event: "Modern Post Office constructed" },
      { year: "1955", event: "Establishment of N.P.F. (Nigerian Police Force post) in Ijebu Igbo" },
      { year: "1955", event: "Placed a ban on fraudulent bride price — dowry pegged at £12 10s" },
      { year: "1955", event: "Elected first Chairman of the Ijebu Divisional Council (IDC), defeating the Awujale in a contested election" },
      { year: "1955", event: "Brought electricity to Ijebu Igbo and influenced the asphalt tarring of the town's major roads" },
      { year: "Sept 21, 1955", event: "Died in the BOAC Argonaut plane crash at Idris Airport, Tripoli, Libya — returning from the London Cocoa Alliance Conference" },
    ],
    titles: [
      "Orimolusi of Ijebu-Igbo (1947–1955)",
      "Grade One Oba",
      "Architect of Modern Ijebu Igbo Kingdom",
      "First Educated King of Ijebu Igbo",
      "First Chairman, Ijebu Divisional Council",
    ],
  },
  {
    slug: "adetayo",
    name: "Late Oba Sami Adetayo",
    fullTitle: "Late Oba Sami Adetayo, The Orimolusi of Ijebu-Igbo (1956–1994)",
    reign: "Previous Orimolusi · 1956–1994",
    status: "Previous",
    photo: "/images/oba-adetayo.webp",
    photos: ["/images/oba-adetayo.webp"],
    hometown: "Ijebu-Igbo, Ogun State, Nigeria",
    biography: [
      "Late Oba Sami Adetayo succeeded Oba Joel Adeboye as the Orimolusi of Ijebu-Igbo, reigning from 1956 to 1994.",
      "Following his passing in 1994, Ijebu-Igbo experienced a 28-year interregnum before Oba Lawrence Jaiyeoba Adebajo ascended the throne in 2022.",
    ],
    achievements: [
      { year: "1956", event: "Ascended the throne as Orimolusi of Ijebu-Igbo, succeeding Late Oba Joel Adeboye" },
      { year: "1994", event: "End of reign — succeeded by a 28-year interregnum before the ascension of Oba Lawrence Jaiyeoba Adebajo in 2022" },
    ],
    titles: [
      "Orimolusi of Ijebu-Igbo (1956–1994)",
      "Grade One Oba",
    ],
  },
  {
    slug: "jaiyeoba-adebajo",
    name: "Oba Lawrence Jaiyeoba Adebajo",
    fullTitle: "Oba Lawrence Jaiyeoba Adedeji Tanimowo Adebajo, The Orimolusi of Ijebu-Igbo",
    subtitle: "A Man of Destiny, Integrity and Genuine Commitment to Ijebu Igbo",
    reign: "Present Orimolusi · 2022–present",
    status: "Present",
    photo: "/images/oba-jaiyeoba.webp",
    photos: ["/images/oba-jaiyeoba.webp", "/images/oba-jaiyeoba-2.webp"],
    hometown: "Fowoseje, Ijebu-Igbo, Ogun State, Nigeria",
    born: "November 11, 1953 — Fowoseje, Ijebu-Igbo",
    quote: "If my ascension to the throne will uplift my dear town, Ijebu Igbo, so be it.",
    biography: [
      "Oba Lawrence Jaiyeoba Adebajo is a man of destiny. He ascended the throne of Orimolusi of Ijebu Igbo in 2022, following a 28-year interregnum after the reign of Late Oba Sami Adetayo (1956–1994). Despite his initial reluctance to ascend the throne, his impeccable character and sterling quality as a man who keeps to his words and maintains his integrity in all his dealings located him — and fate entrusted this exalted position upon him. Drenched by the appeal of the people and the urgent need for his land to have a king, Oba Jaiyeoba succumbed and submitted himself.",
      "Oba Adebajo was born on November 11, 1953 in Fowoseje, a remote village in Ijebu Igbo, from the male Royal lineage of Ojuromi from Oke Tako. He was sired by Oba Tanimowo Adebajo and Mama Safuratu Adebajo (Nee Aderibigbe / J. B. King) from Atikori. Young Prince Jaiyeoba, with a burning desire to get educated, started his elementary education at St. Bridget Catholic Primary School, Fowoseje, completing his primary education at age twelve with merits. He enrolled at St Vincent Catholic Secondary Modern School, Oke Sopen in 1966 and completed his Modern School education in 1968.",
      "Painful as it was that his father could no longer afford secondary school fees, young Jaiyeoba chose to make lemonade from the lemons life threw at him. Through his late father's wise counsel, he started his career in the transportation business by joining a Transport Company in Ibadan. As the saying goes — a star that is determined to shine cannot be hidden, not even by darkness.",
      "The budding youngster performed so well that a luxury bus transport company from Lagos, ICOC, engaged and took him to Lagos on February 15, 1975. He resumed duty as a Transport Officer and was profoundly inspired by his then Managing Director, Mr. InfeayinChukwu Osondu — who later became the Igwe of Umulolo, Okigwe, Imo State — whose grass-to-grace story served as tinder for young Jaiyeoba's burning ambition.",
      "On December 24, 1977, Oba Jaiyeoba bought his first new car — which unfortunately got burnt on the second day. Armed with lessons from his boss and refusing to be thrown off balance, he forged ahead. In 1979, while still working for ICOC, he made efforts through personal contacts to buy his first luxury bus on hire purchase, completing payment in a record 10 months. His subsequent buses were paid off in 8 and 7 months respectively — impressing management enough to offer him additional vehicles.",
      "As a man of conscience who would not allow a clash of interests with his employer, he resigned as Workshop Manager and on August 1, 1984, registered his own company — L.A. TANMO & Sons — a name coined from his father's name 'Tanimowo'. His company grew into a fleet of buses and later secured a facility management contract with Lagos State Waste Water Management Office (LSWMO), earning a commendation letter in 2021 for over 12 years of meritorious and unblemished service. His LSWMO contract remains valid to date.",
      "Oba Lawrence Jaiyeoba Adedeji Tanimowo Adebajo is a humble, noble, God-fearing and compassionate personality. He has assisted many people through educational, business and financial support — helping many set up businesses, standing as guarantor for those in need, and making countless anonymous donations. His philanthropic activities earned him the title of Balogun Ijo of St. Peters Catholic Church, Oke Sopen, Ijebu Igbo. He has also contributed generously towards the renovation of mosques in his neighbourhood, earning a commendation award from a mosque in Okota, Lagos.",
      "Oba Jaiyeoba is not one that discriminates against religious leanings. Beyond his Catholic contributions, he donated generously towards a church in Ukpenu, near Ekpoma, Edo State, and donated a complete set of Musical Equipment to the Christian Association of Nigeria (CAN), Ijebu North. He served as Secretary, Treasurer, and Chairman of his Community Development Association in Okota, Lagos before voluntarily stepping down to allow others to contribute.",
      "Oba Lawrence Jaiyeoba Adedeji Tanimowo Adebajo is married to Mrs. Bolanle Mary Adebajo, an entrepreneur from Osan Ekiti, Moba Local Government of Ekiti State. They are blessed with children and grandchildren.",
    ],
    achievements: [
      { year: "1953", event: "Born on November 11 in Fowoseje, Ijebu Igbo — Royal lineage of Ojuromi, Oke Tako" },
      { year: "1966", event: "Enrolled at St Vincent Catholic Secondary Modern School, Oke Sopen" },
      { year: "1975", event: "Joined ICOC Luxury Bus Transport Company, Lagos — February 15" },
      { year: "1977", event: "Purchased his first new car — December 24" },
      { year: "1979", event: "Bought first luxury bus on hire purchase; completed payment in a record 10 months" },
      { year: "1984", event: "Registered L.A. TANMO & Sons — August 1" },
      { year: "2022", event: "Ascended the throne as Orimolusi of Ijebu-Igbo, following a 28-year interregnum after the reign of Late Oba Sami Adetayo" },
      { year: "—", event: "Built houses in Aledo, Oke Agbo, Ijebu Igbo and in Okota, Lagos before age 40" },
      { year: "—", event: "Secured facility management contract with Lagos State Waste Water Management Office (LSWMO)" },
      { year: "—", event: "Awarded Balogun Ijo of St. Peters Catholic Church, Oke Sopen, Ijebu Igbo" },
      { year: "—", event: "Donated Musical Equipment to Christian Association of Nigeria (CAN), Ijebu North" },
      { year: "—", event: "Received renovation award from mosque in Okota, Lagos" },
      { year: "2021", event: "Received commendation letter from LSWMO for 12+ years of meritorious service" },
      { year: "2026", event: "Presided over Ojude Oba Orimolusi 2026 — a landmark cultural celebration" },
      { year: "2026", event: "Received magnificent horse gift from Egbe Bobagunwa Asiwaju Orimolu at Ojude Oba 2026" },
      { year: "—", event: "Welcomed by IID Omo Orimolusi in Diaspora members in London — strengthening diaspora ties" },
    ],
    titles: [
      "Orimolusi of Ijebu-Igbo",
      "Kabiyesi — His Royal Majesty",
      "Grade One Oba",
      "Paramount Ruler of the Seven Quarters",
      "Balogun Ijo — St. Peters Catholic Church",
    ],
  },
];
