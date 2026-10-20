import type { MetadataRoute } from "next";
import { clinica } from "@/data/clinica";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${clinica.url}/sitemap.xml`,
  };
}
