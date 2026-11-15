export type AccessType = "public" | "invite" | "none";

export interface Version {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  videos: { title: string; note: string }[];
  access: {
    type: AccessType;
    label: string;
    url?: string;
    note: string;
  };
}

export interface Course {
  slug: string;
  title: string;
  summary: string;
  videoUrl?: string;
  slidesUrl?: string;
  labUrl?: string;
  textbook: {
    title: string;
    taobaoUrl?: string;
  };
}

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      width?: number;
      height?: number;
    }
  | { type: "quote"; text: string };

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  source: string;
  category: string;
  summary: string;
  coverImage?: string;
  externalUrl?: string;
  blocks: NewsBlock[];
}

export interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: string;
  pdfUrl?: string;
  abstract: string;
}
