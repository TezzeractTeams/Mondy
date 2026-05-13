/** Server-side Strapi base URL (no trailing slash). */
export function getStrapiUrl(): string | null {
  const raw = process.env.STRAPI_URL?.trim();
  if (!raw) return null;
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export function isStrapiConfigured(): boolean {
  return Boolean(getStrapiUrl());
}

export function strapiRequestHeaders(): HeadersInit {
  const token = process.env.STRAPI_API_TOKEN?.trim();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

/**
 * Headers for public blog article REST reads (`/api/articles`).
 * Some Strapi hosts return 500 for the same GET when an API token is sent; public `find` works.
 * Set `STRAPI_SEND_API_TOKEN=true` if your Articles API requires authentication.
 */
export function strapiArticleFetchHeaders(): HeadersInit {
  if (process.env.STRAPI_SEND_API_TOKEN === "true") {
    return { Accept: "application/json", ...strapiRequestHeaders() };
  }
  return { Accept: "application/json" };
}
