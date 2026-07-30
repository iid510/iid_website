export const NEWS_QUERY = `
  *[_type == "newsArticle"] | order(_createdAt desc) {
    "id": id.current,
    title,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    date,
    category,
    content,
    "gallery": gallery[]{
      "src": asset->url,
      alt
    }
  }
`;

export const BUSINESSES_QUERY = `
  *[_type == "business"] | order(id asc) {
    id,
    "slug": slug.current,
    name,
    category,
    tagline,
    description,
    location,
    phone,
    whatsapp,
    email,
    website,
    "flyer": flyer.asset->url,
    "banner": banner.asset->url,
    "promoVideo": select(defined(promoVideo) => promoVideo.asset->url, promoVideoUrl),
    "gallery": gallery[].asset->url,
    services,
    serviceCategories,
    whatWeDo,
    "values": values[]{title, description, items},
    focusAreas,
    partners,
    hours,
    social,
    ownerName,
    established,
    featured,
    benefits,
    testimonials,
    region
  }
`;

export const KINGS_QUERY = `
  *[_type == "king"] | order(_createdAt asc) {
    "slug": slug.current,
    name,
    fullTitle,
    subtitle,
    author,
    reign,
    status,
    "photo": photo.asset->url,
    "photos": photos[].asset->url,
    hometown,
    born,
    died,
    quote,
    quoteAuthor,
    biography,
    achievements,
    titles
  }
`;

export const TEAM_QUERY = `
  *[_type == "teamMember"] | order(order asc) {
    name,
    role,
    "photo": photo.asset->url,
    group
  }
`;

export const EVENTS_QUERY = `
  *[_type == "event"] | order(order asc) {
    title,
    date,
    time,
    location,
    description,
    upcoming
  }
`;

export const GALLERY_QUERY = `
  *[_type == "galleryImage"] | order(order asc) {
    "src": image.asset->url,
    alt
  }
`;

export const EVENT_VIDEOS_QUERY = `
  *[_type == "eventVideo"] | order(order asc) {
    id,
    title,
    description,
    "src": select(defined(videoFile) => videoFile.asset->url, localSrc),
    youtubeId,
    date,
    credit,
    tag,
    featured
  }
`;

const TOWN_PROJECTION = `
  "slug": slug.current,
  name,
  eyebrow,
  tagline,
  rulerTitle,
  rulerName,
  "rulerPhoto": rulerPhoto.asset->url,
  consortName,
  "consortPhoto": consortPhoto.asset->url,
  quickFacts,
  history,
  governanceNotes,
  rulerBio,
  rulerOriki,
  townOriki,
  anthem,
  subdivisionGroups,
  "chiefGroups": chiefGroups[]{
    groupLabel,
    "members": members[]{ name, title, note, quarter, occupation, phone, "photo": photo.asset->url }
  },
  "baales": baales[]{ name, title, note, quarter, occupation, phone, "photo": photo.asset->url },
  pastRulers,
  "notableProfiles": notableProfiles[]{ name, title, bio, "photo": photo.asset->url },
  "heritagePlaces": heritagePlaces[]{ name, description, "image": image.asset->url },
  "aroundTown": aroundTown[]{ name, description, "image": image.asset->url },
  projectAchievements,
  "galleryCaptions": galleryCaptions[]{ caption, "image": image.asset->url },
  "extraGalleryImages": extraGalleryImages[].asset->url,
  sourceNote,
  placeholderNote
`;

export const TOWNS_QUERY = `
  *[_type == "town"] | order(order asc) {
    ${TOWN_PROJECTION}
  }
`;

export const TOWN_BY_SLUG_QUERY = `
  *[_type == "town" && slug.current == $slug][0] {
    ${TOWN_PROJECTION}
  }
`;

export const BLOG_POSTS_QUERY = `
  *[_type == "blogPost"] | order(order asc) {
    "slug": slug.current,
    title,
    keyword,
    category,
    excerpt,
    "image": image.asset->url,
    "date": dateLabel,
    content
  }
`;

export const ANNOUNCEMENTS_QUERY = `
  *[_type == "announcement"] | order(date desc) {
    "id": _id,
    category,
    title,
    body,
    date,
    postedBy,
    "imageUrl": image.asset->url
  }
`;

export const MEMBERS_QUERY = `
  *[_type == "member"] | order(order asc) {
    "id": _id,
    name,
    clan,
    location,
    role,
    "photo": photo.asset->url,
    joinedYear,
    order
  }
`;

export const PLACES_QUERY = `
  *[_type == "place"] | order(order asc) {
    "id": slug.current,
    name,
    subtitle,
    badge,
    "badgeColor": badgeColorKey,
    location,
    "image": image.asset->url,
    description,
    quote,
    mapLink
  }
`;

export const FOUNDATION_MEMBERS_QUERY = `
  *[_type == "foundationMember"] | order(group asc, order asc) {
    name,
    position,
    group
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    footerStats,
    heroPhrases,
    clans,
    culturalPillars,
    impactCards,
    testimonials,
    faqs,
    honourRoll
  }
`;

export const KINGDOM_OVERVIEW_QUERY = `
  *[_type == "kingdomOverview"][0] {
    "orgChartImage": orgChartImage.asset->url,
    "councilOfObasImage": councilOfObasImage.asset->url,
    grade1Description,
    satelliteTowns
  }
`;

export const SCHOLARSHIP_PAGE_QUERY = `
  *[_type == "scholarshipPage"][0] {
    eligibility,
    howToApply,
    pastRecipients
  }
`;

export const TRAVEL_GUIDE_PAGE_QUERY = `
  *[_type == "travelGuidePage"][0] {
    flights,
    roadOptions,
    whatToBring,
    contacts
  }
`;

export const DONATE_PAGE_QUERY = `
  *[_type == "donatePage"][0] {
    bankAccounts,
    target,
    raised,
    impactItems
  }
`;

export const CONTACT_PAGE_QUERY = `
  *[_type == "contactPage"][0] {
    contacts
  }
`;

export const PAGE_QUERY = `
  *[_type == "page" && key == $key][0] {
    key,
    hero,
    "sections": sections[]{
      sectionId,
      eyebrow,
      heading,
      body,
      "image": image.asset->url
    },
    timeline
  }
`;
