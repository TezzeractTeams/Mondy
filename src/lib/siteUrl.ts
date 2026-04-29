/** Origin for absolute share URLs (matches root layout metadata base logic). */
export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    let normalized = fromEnv.endsWith("/") ? fromEnv.slice(0, -1) : fromEnv;
    if (/^https?:\/\/mondy\.ai$/i.test(normalized)) {
      normalized = "https://www.mondy.ai";
    }
    return normalized;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
