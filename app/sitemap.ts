import type { MetadataRoute } from "next";
import { courses } from "@/content/courses";
import { news } from "@/content/news";
import { versions } from "@/content/versions";

const base = "https://cryptollm.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/bench",
    "/api",
    "/courses",
    "/news",
    "/research",
    "/community",
  ];

  const dynamicRoutes = [
    ...versions.map((v) => `/products/${v.slug}`),
    ...courses.map((c) => `/courses/${c.slug}`),
    ...news.map((n) => `/news/${n.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
