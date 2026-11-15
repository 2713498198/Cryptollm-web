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

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  source: string;
  body: string[];
}

export interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: string;
  pdfUrl?: string;
  abstract: string;
}
