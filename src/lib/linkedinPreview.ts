export type LinkedInPreviewProfile = {
  name: string;
  headline: string;
  photoUrl: string | null;
};

const LOGIN_TITLE =
  /log\s*in|sign\s*up|authwall|join linkedin|linkedin:\s*log/i;

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, num: string) =>
      String.fromCodePoint(Number.parseInt(num, 10)),
    )
    .trim();
}

export function parseLinkedInProfileUrl(raw: string): URL | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  if (url.username || url.password) return null;

  const host = url.hostname.toLowerCase();
  const labels = host.split(".");
  if (labels.length < 2) return null;
  if (labels[labels.length - 2] !== "linkedin" || labels[labels.length - 1] !== "com") {
    return null;
  }

  const path = url.pathname.replace(/\/+$/, "");
  if (!path.startsWith("/in/")) return null;
  const slug = path.slice(4).split("/")[0];
  if (!slug || slug.length > 120 || !/^[a-zA-Z0-9._-]+$/.test(slug)) return null;

  url.hash = "";
  url.search = "";
  url.pathname = `/in/${slug}/`;
  return url;
}

function metaContent(html: string, key: string): string | null {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escaped}["']`,
      "i",
    ),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeEntities(match[1]);
  }
  return null;
}

function stripTags(value: string): string {
  return decodeEntities(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function aboutFromHtml(html: string): string {
  const section = html.match(
    /data-section=["']summary["'][\s\S]{0,8000}?<\/section>/i,
  );
  if (!section) return "";
  const paras = [...section[0].matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => stripTags(match[1]))
    .filter(Boolean);
  return paras.join(" ").trim();
}

function headlineFromTopCard(html: string): string {
  const match = html.match(
    /<(?:h2|h3|div|p)\b[^>]*class=["'][^"']*top-card-layout__headline[^"']*["'][^>]*>([\s\S]*?)<\/(?:h2|h3|div|p)>/i,
  );
  return match ? stripTags(match[1]) : "";
}

function firstJsonLdPerson(html: string): {
  name?: string;
  jobTitle?: string;
  description?: string;
} | null {
  const scripts = html.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );
  for (const script of scripts) {
    let data: unknown;
    try {
      data = JSON.parse(script[1].trim());
    } catch {
      continue;
    }
    const people: unknown[] = [];
    const visit = (value: unknown) => {
      if (Array.isArray(value)) {
        value.forEach(visit);
        return;
      }
      if (!value || typeof value !== "object") return;
      const record = value as Record<string, unknown>;
      const type = record["@type"];
      const isPerson =
        type === "Person" || (Array.isArray(type) && type.includes("Person"));
      if (isPerson) people.push(record);
      Object.values(record).forEach(visit);
    };
    visit(data);
    for (const person of people) {
      if (!person || typeof person !== "object") continue;
      const record = person as Record<string, unknown>;
      const jobRaw = record.jobTitle;
      const jobTitle = Array.isArray(jobRaw)
        ? jobRaw.map((part) => String(part).trim()).filter(Boolean).join(" · ")
        : typeof jobRaw === "string"
          ? jobRaw.trim()
          : "";
      const description =
        typeof record.description === "string" ? record.description.trim() : "";
      const name = typeof record.name === "string" ? record.name.trim() : "";
      if (jobTitle || description || name) {
        return { name: name || undefined, jobTitle: jobTitle || undefined, description: description || undefined };
      }
    }
  }
  return null;
}

function bioFromDescription(description: string): string {
  return description
    .split(/\s·\sExperience:/i)[0]
    .replace(/\s*View\s+.+'s\s+profile[\s\S]*$/i, "")
    .replace(/\s*[|\-–—]\s*LinkedIn\s*$/i, "")
    .trim();
}

export function parseProfileFromHtml(html: string): LinkedInPreviewProfile | null {
  const title =
    metaContent(html, "og:title") ??
    metaContent(html, "twitter:title") ??
    html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ??
    "";
  const decodedTitle = decodeEntities(title);
  if (!decodedTitle || LOGIN_TITLE.test(decodedTitle)) return null;

  const withoutBrand = decodedTitle
    .replace(/\s*[|\-–—]\s*LinkedIn\s*$/i, "")
    .trim();
  const parts = withoutBrand.split(/\s+[-–—|]\s+/).filter(Boolean);
  const jsonLd = firstJsonLdPerson(html);
  const h1Name = html.match(
    /<h1\b[^>]*class=["'][^"']*top-card-layout__title[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i,
  );
  const name = (
    h1Name ? stripTags(h1Name[1]) : (jsonLd?.name ?? parts[0] ?? withoutBrand)
  ).trim();
  if (!name || name.length > 120) return null;

  const description =
    metaContent(html, "og:description") ??
    metaContent(html, "twitter:description") ??
    jsonLd?.description ??
    "";
  const headlineFromTitle = parts.slice(1).join(" — ").trim();
  let headline =
    headlineFromTopCard(html) ||
    jsonLd?.jobTitle ||
    aboutFromHtml(html) ||
    bioFromDescription(jsonLd?.description ?? description) ||
    bioFromDescription(description) ||
    headlineFromTitle;
  headline = headline
    .replace(/\s*[|\-–—]\s*LinkedIn\s*$/i, "")
    .replace(/^View\s+.+'s\s+profile\s*/i, "")
    .trim();
  if (headline.length > 400) headline = `${headline.slice(0, 397).trim()}…`;

  const image =
    metaContent(html, "og:image") ?? metaContent(html, "twitter:image");
  const photoUrl =
    image && /^https:\/\//i.test(image) && !/static\.licdn\.com\/.*logo/i.test(image)
      ? image
      : null;

  return { name, headline, photoUrl };
}
