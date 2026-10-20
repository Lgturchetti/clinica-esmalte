import type { MetadataRoute } from "next";
import { clinica, posts, tratamentos } from "@/data/clinica";
import { paginas } from "@/data/navegacao";

// Data fixa da última revisão (com Cache Components, `new Date()` impediria a página de ser estática).
const revisado = "2026-10-20";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: clinica.url, lastModified: revisado, priority: 1 },
    ...paginas.map((p) => ({ url: `${clinica.url}${p.href}`, lastModified: revisado, priority: 0.8 })),
    ...tratamentos.map((t) => ({ url: `${clinica.url}/tratamentos/${t.slug}`, lastModified: revisado, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${clinica.url}/blog/${p.slug}`, lastModified: p.data, priority: 0.6 })),
  ];
}
