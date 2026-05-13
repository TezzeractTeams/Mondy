import { getStrapiUrl } from "./config";

/** Strapi REST often returns `/uploads/...` — prefix with API origin for Next/Image and anchors. */
export function strapiMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = getStrapiUrl();
  if (!base) return url;
  return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
}
