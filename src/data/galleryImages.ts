export interface GalleryImage {
  src: string;
  alt: string;
}

export const policeImages: GalleryImage[] = Array.from({ length: 23 }, (_, i) => ({
  src: `/images/police_area_command/review${i + 1}.webp`,
  alt: `Police Area Command Commissioning - ${i + 1}`,
}));

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/courtesy-call-orimolusi.webp", alt: "Courtesy Call to the Orimolusi of Ijebu Igbo" },
  { src: "/images/iid-carnival1.webp", alt: "IID Carnival 2025" },
  { src: "/images/iid-carnival2.webp", alt: "IID Carnival 2025" },
  { src: "/images/iid-carnival3.webp", alt: "IID Carnival 2025" },
  ...policeImages,
];
