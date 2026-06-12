import type { MetadataRoute } from "next";
import { getSlugs } from "@/lib/aprende";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://formalia.pe";

const RUTAS_ESTATICAS = [
  { path: "/",             priority: 1.0, changeFrequency: "weekly"  },
  { path: "/regimen",      priority: 0.9, changeFrequency: "monthly" },
  { path: "/formalizacion",priority: 0.9, changeFrequency: "monthly" },
  { path: "/calculadoras", priority: 0.85,changeFrequency: "monthly" },
  { path: "/aprende",      priority: 0.8, changeFrequency: "monthly" },
  { path: "/glosario",     priority: 0.75,changeFrequency: "monthly" },
  { path: "/calendario",   priority: 0.8, changeFrequency: "monthly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getSlugs();
  const ahora = new Date();

  return [
    ...RUTAS_ESTATICAS.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: ahora,
      changeFrequency,
      priority,
    })),
    ...slugs.map((slug) => ({
      url: `${BASE_URL}/aprende/${slug}`,
      lastModified: ahora,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
