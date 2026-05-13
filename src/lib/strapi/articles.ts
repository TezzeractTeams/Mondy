import type { RelatedPost } from "@/components/blog/ArticleRelated";
import type { BlogPostSummary } from "@/lib/blogPosts";
import { SOCIAL_PREVIEW_PATH } from "@/lib/socialPreviewImage";
import { getStrapiUrl, isStrapiConfigured, strapiArticleFetchHeaders } from "./config";
import { strapiMediaUrl } from "./media";
import type {
  BlogArticlePageData,
  StrapiArticleAuthor,
  StrapiArticleSection,
  StrapiArticleSubsection,
  StrapiBreadcrumbItem,
  StrapiFaqItem,
} from "./types";

/** Match `ArticleTOC` slugify so anchor ids stay consistent when Strapi omits `h2Id`. */
function slugifyHeading(text: string): string {
  const s = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "section";
}

function pickString(v: unknown): string | undefined {
  if (typeof v === "string") return v.trim() || undefined;
  return undefined;
}

function pickNumber(v: unknown): number | undefined {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim()) {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

/** Strapi v4 `{ data: { attributes } }` / `{ data: { … } }` or v5-ish flat entries. */
function unwrapEntry(entry: unknown): Record<string, unknown> {
  if (!entry || typeof entry !== "object") return {};
  let cur = entry as Record<string, unknown>;
  if ("data" in cur && cur.data !== undefined && cur.data !== null && typeof cur.data === "object") {
    cur = cur.data as Record<string, unknown>;
  }
  if (cur.attributes && typeof cur.attributes === "object") {
    return { id: cur.id, documentId: cur.documentId, ...(cur.attributes as Record<string, unknown>) };
  }
  return cur;
}

function unwrapList(raw: unknown): Record<string, unknown>[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(unwrapEntry);
  if (typeof raw === "object" && raw !== null && "data" in raw) {
    const data = (raw as { data: unknown }).data;
    if (data === null || data === undefined) return [];
    if (Array.isArray(data)) return data.map(unwrapEntry);
    if (typeof data === "object") return [unwrapEntry(data)];
  }
  return [];
}

function mediaUrl(media: unknown): string | null {
  if (!media) return null;
  const m = unwrapEntry(media);
  const url = pickString(m.url);
  if (url) return strapiMediaUrl(url);
  const formats = m.formats;
  if (formats && typeof formats === "object") {
    const large = (formats as { large?: { url?: string } }).large?.url;
    const medium = (formats as { medium?: { url?: string } }).medium?.url;
    const small = (formats as { small?: { url?: string } }).small?.url;
    const u = large ?? medium ?? small;
    if (u) return strapiMediaUrl(u);
  }
  return null;
}

function mediaAlt(media: unknown): string | null {
  if (!media) return null;
  const m = unwrapEntry(media);
  return pickString(m.alternativeText) ?? pickString(m.caption) ?? null;
}

function formatPublishedLabel(iso: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(d);
  } catch {
    return iso;
  }
}

function normalizeTags(raw: unknown): string[] | undefined {
  if (Array.isArray(raw)) {
    const tags = raw.filter((x): x is string => typeof x === "string" && x.trim() !== "");
    return tags.length ? tags : undefined;
  }
  if (typeof raw === "string" && raw.trim()) {
    return raw
      .split(/·|,/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return undefined;
}

/** Strapi Blocks (richtext) — paragraph / heading text for intro + card excerpt fallbacks. */
function inlineMarkdownFromBlockChildren(children: unknown): string {
  if (!Array.isArray(children)) return "";
  let out = "";
  for (const c of children) {
    if (!c || typeof c !== "object") continue;
    const ch = c as Record<string, unknown>;
    if (ch.type === "text") {
      let t = pickString(ch.text) ?? "";
      if (ch.bold) t = t ? `**${t}**` : "";
      else if (ch.italic) t = t ? `*${t}*` : t;
      out += t;
    } else if (ch.type === "link" && typeof ch.url === "string") {
      const inner = inlineMarkdownFromBlockChildren(ch.children);
      out += inner ? `[${inner}](${ch.url})` : pickString(ch.url) ?? "";
    } else if (Array.isArray(ch.children)) {
      out += inlineMarkdownFromBlockChildren(ch.children);
    }
  }
  return out;
}

function blocksToMarkdown(blocks: unknown): string | null {
  if (!Array.isArray(blocks)) return null;
  const parts: string[] = [];
  for (const block of blocks) {
    if (!block || typeof block !== "object") continue;
    const b = block as Record<string, unknown>;
    const t = b.type;
    if (t === "paragraph") {
      const line = inlineMarkdownFromBlockChildren(b.children).trim();
      if (line) parts.push(line);
    } else if (t === "heading") {
      const level = typeof b.level === "number" ? Math.min(Math.max(b.level, 1), 6) : 2;
      const hashes = "#".repeat(level);
      const line = inlineMarkdownFromBlockChildren(b.children).trim();
      if (line) parts.push(`${hashes} ${line}`);
    } else if (t === "list") {
      const ordered = b.format === "ordered";
      const listChildren = Array.isArray(b.children) ? b.children : [];
      for (const item of listChildren) {
        if (!item || typeof item !== "object") continue;
        const li = item as Record<string, unknown>;
        if (li.type !== "list-item") continue;
        const line = inlineMarkdownFromBlockChildren(li.children).trim();
        if (!line) continue;
        parts.push(ordered ? `1. ${line}` : `- ${line}`);
      }
    }
  }
  const s = parts.join("\n\n").trim();
  return s || null;
}

/** Plain excerpt from first blocks paragraph (no markdown). */
function firstParagraphPlainFromBlocks(blocks: unknown): string {
  const md = blocksToMarkdown(blocks);
  if (!md) return "";
  return md.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/#+\s*/g, "").trim();
}

/** Mondy Strapi component: `SubTitle` + `bodyData` (markdown). */
function mapBodyContentRow(raw: Record<string, unknown>): StrapiArticleSection | null {
  const h2Title =
    pickString(raw.SubTitle) ?? pickString(raw.subTitle) ?? pickString(raw.h2Title) ?? pickString(raw.title);
  const bodyMarkdown =
    pickString(raw.bodyData) ?? pickString(raw.body_data) ?? pickString(raw.bodyMarkdown) ?? "";
  if (!h2Title || !bodyMarkdown.trim()) return null;
  const h2Id = pickString(raw.h2Id) ?? pickString(raw.anchorId) ?? slugifyHeading(h2Title);
  return {
    h2Title,
    h2Id,
    h2IntroMarkdown: null,
    subsections: [{ h3Title: null, bodyMarkdown: bodyMarkdown.trim() }],
  };
}

function mapSubsection(raw: Record<string, unknown>): StrapiArticleSubsection | null {
  const bodyMarkdown =
    pickString(raw.bodyMarkdown) ?? pickString(raw.body) ?? pickString(raw.descriptionText) ?? "";
  const h3Title = pickString(raw.h3Title) ?? pickString(raw.title);
  if (!h3Title && !bodyMarkdown) return null;
  return { h3Title: h3Title ?? null, bodyMarkdown };
}

function mapSection(raw: Record<string, unknown>): StrapiArticleSection | null {
  const h2Title = pickString(raw.h2Title) ?? pickString(raw.title);
  if (!h2Title) return null;
  const h2Id = pickString(raw.h2Id) ?? pickString(raw.anchorId) ?? slugifyHeading(h2Title);
  const h2IntroMarkdown = pickString(raw.h2IntroMarkdown) ?? pickString(raw.introMarkdown);
  const subsSource = raw.subsections ?? raw.h3Blocks ?? raw.items;
  const subsections = unwrapList(subsSource)
    .map(mapSubsection)
    .filter((s): s is StrapiArticleSubsection => Boolean(s));
  return { h2Title, h2Id, h2IntroMarkdown, subsections };
}

function mapAuthor(raw: Record<string, unknown>): StrapiArticleAuthor {
  const name = pickString(raw.name) ?? "Author";
  const bioMarkdown =
    pickString(raw.bioMarkdown) ?? pickString(raw.bio) ?? pickString(raw.description) ?? "";
  const avatar = raw.avatar ?? raw.photo ?? raw.image;
  const avatarUrl = mediaUrl(avatar);
  const avatarAlt = mediaAlt(avatar) ?? pickString(raw.avatarAlt) ?? null;
  return { name, bioMarkdown, avatarUrl, avatarAlt };
}

function faqAnswerText(raw: Record<string, unknown>): string | undefined {
  const plain =
    pickString(raw.answer) ??
    pickString(raw.Answer) ??
    pickString(raw.answerText) ??
    pickString(raw.answer_text) ??
    pickString(raw.body);
  if (plain) return plain;
  const blocks = raw.answer ?? raw.Answer;
  if (Array.isArray(blocks)) {
    const md = blocksToMarkdown(blocks);
    if (md) return md;
  }
  return undefined;
}

function mapFaqItem(raw: Record<string, unknown>): StrapiFaqItem | null {
  const question = pickString(raw.question) ?? pickString(raw.Question);
  const answer = faqAnswerText(raw);
  if (!question || !answer) return null;
  return { question, answer };
}

/** Strapi field names for repeatable FAQ rows (camelCase or snake_case). */
function listFaqRawEntries(raw: Record<string, unknown>): Record<string, unknown>[] {
  const candidates = [raw.faqItems, raw.faqItem, raw.faqs, raw.faq_items, raw.FaqItems, raw.faq_item];
  for (const c of candidates) {
    const list = unwrapList(c);
    if (list.length > 0) return list;
  }
  return [];
}

function mapBreadcrumb(raw: Record<string, unknown>): StrapiBreadcrumbItem | null {
  const label = pickString(raw.label);
  if (!label) return null;
  const href = pickString(raw.href);
  return { label, href: href || undefined };
}

function mapRelated(raw: Record<string, unknown>): RelatedPost | null {
  const href = pickString(raw.href);
  const title = pickString(raw.title);
  const meta = pickString(raw.meta) ?? "";
  if (!href || !title) return null;
  return {
    href,
    title,
    meta,
    tags: normalizeTags(raw.tags),
  };
}

/**
 * Maps a Strapi `Article` entry (attributes / flat document) to `BlogArticlePageData`.
 *
 * Supported shapes:
 * - **Structured sections**: `sections` / `articleSections` with `h2Title`, `subsections`, etc.
 * - **BodyContent component** (Mondy CMS): repeatable `BodyContent` / `bodyContent` with `SubTitle` + `bodyData` (markdown).
 * - **Lead blocks**: Strapi Blocks field `body` → intro markdown when `introMarkdown` is empty.
 * - **SEO / card text**: `description`, `excerpt`, `shortDescription`, `seoDescription`, or first `body` paragraph.
 */
export function normalizeStrapiArticleEntry(
  raw: Record<string, unknown>,
  fallbackSlug: string,
): BlogArticlePageData | null {
  const slug = pickString(raw.slug) ?? fallbackSlug;
  const title = pickString(raw.title);
  if (!title) return null;

  const fromFields =
    pickString(raw.description) ??
    pickString(raw.excerpt) ??
    pickString(raw.shortDescription) ??
    pickString(raw.seoDescription) ??
    "";
  const fromBlocks = firstParagraphPlainFromBlocks(raw.body);
  const description = (fromFields.trim() || fromBlocks).trim();

  const readingTimeMinutes = pickNumber(raw.readingTimeMinutes) ?? 5;
  const publishedAtIso =
    pickString(raw.publishedAt) ?? pickString(raw.published_at) ?? new Date().toISOString();
  const publishedOnLabel = formatPublishedLabel(publishedAtIso);

  const introMarkdown =
    pickString(raw.introMarkdown) ??
    pickString(raw.leadMarkdown) ??
    (raw.body ? blocksToMarkdown(raw.body) : null);

  const cover = raw.coverImage ?? raw.heroImage ?? raw.image ?? raw.cover ?? raw.ogImage;
  const heroImageUrl = strapiMediaUrl(mediaUrl(cover)) ?? SOCIAL_PREVIEW_PATH;
  const heroImageAlt =
    pickString(raw.coverImageAlt) ??
    pickString(raw.heroImageAlt) ??
    pickString(raw.heroAlt) ??
    title;
  const heroCaption = pickString(raw.heroCaption) ?? null;

  const author = mapAuthor(unwrapEntry(raw.author));

  const fromPlural = unwrapList(raw.categories)
    .map((c) => pickString(c.name))
    .filter((n): n is string => Boolean(n));
  const singleCategory = raw.category ? pickString(unwrapEntry(raw.category).name) : undefined;
  const categories = fromPlural.length > 0 ? fromPlural : singleCategory ? [singleCategory] : [];

  let sections = unwrapList(raw.sections ?? raw.articleSections)
    .map(mapSection)
    .filter((s): s is StrapiArticleSection => Boolean(s));

  if (sections.length === 0) {
    const bodyContentSource = raw.BodyContent ?? raw.bodyContent ?? raw.body_contents;
    sections = unwrapList(bodyContentSource)
      .map(mapBodyContentRow)
      .filter((s): s is StrapiArticleSection => Boolean(s));
  }

  const faqItems = listFaqRawEntries(raw)
    .map(mapFaqItem)
    .filter((f): f is StrapiFaqItem => Boolean(f));

  const faqTitle = pickString(raw.faqTitle) ?? "FAQs";
  const faqSectionId = pickString(raw.faqSectionId) ?? `${slug}-faqs`;

  const breadcrumbItems = unwrapList(raw.breadcrumbItems)
    .map(mapBreadcrumb)
    .filter((b): b is StrapiBreadcrumbItem => Boolean(b));

  const relatedPosts = unwrapList(raw.relatedLinks ?? raw.relatedPosts)
    .map(mapRelated)
    .filter((r): r is RelatedPost => Boolean(r));

  const disclaimerMarkdown = pickString(raw.disclaimerMarkdown) ?? pickString(raw.disclaimer);

  return {
    slug,
    title,
    description,
    readingTimeMinutes,
    publishedAtIso,
    publishedOnLabel,
    introMarkdown,
    heroImageUrl,
    heroImageAlt,
    heroCaption,
    author,
    categories,
    sections,
    faqTitle,
    faqSectionId,
    faqItems,
    breadcrumbItems,
    relatedPosts,
    disclaimerMarkdown,
  };
}

const ARTICLE_POPULATE = "populate=*";

const LIST_POPULATE = "populate=*";

function mapStrapiEntryToPostSummary(flat: Record<string, unknown>): BlogPostSummary | null {
  const slug = pickString(flat.slug);
  const title = pickString(flat.title);
  if (!slug || !title) return null;

  const publishedAtIso =
    pickString(flat.publishedAt) ?? pickString(flat.published_at) ?? new Date().toISOString();
  const dateIso = publishedAtIso.slice(0, 10);
  const dateLabel = formatPublishedLabel(publishedAtIso);

  const excerpt =
    pickString(flat.description) ??
    pickString(flat.excerpt) ??
    pickString(flat.shortDescription) ??
    pickString(flat.seoDescription) ??
    firstParagraphPlainFromBlocks(flat.body);

  const cover = flat.coverImage ?? flat.heroImage ?? flat.image ?? flat.cover ?? flat.ogImage;
  const imageSrc = strapiMediaUrl(mediaUrl(cover)) ?? SOCIAL_PREVIEW_PATH;
  const imageAlt =
    mediaAlt(cover) ??
    pickString(flat.coverImageAlt) ??
    pickString(flat.heroImageAlt) ??
    pickString(flat.heroAlt) ??
    title;

  return {
    slug,
    title,
    dateIso,
    dateLabel,
    excerpt: excerpt.trim() ? excerpt.trim() : "Read the full article on Mondy.",
    imageSrc,
    imageAlt,
    href: `/blog/${slug}`,
  };
}

type FetchOptions = {
  /** Passed to `fetch` (Next.js cache / revalidate). */
  next?: { revalidate?: number | false; tags?: string[] };
};

/**
 * Lists published articles for the blog index (newest first).
 * Returns an empty array when Strapi is not configured or the request fails.
 */
export async function getBlogArticleSummaries(options?: FetchOptions): Promise<BlogPostSummary[]> {
  if (!isStrapiConfigured()) return [];
  const base = getStrapiUrl();
  if (!base) return [];

  const qs = new URLSearchParams();
  qs.set("publicationState", "live");
  qs.set("sort[0]", "publishedAt:desc");
  qs.set("pagination[limit]", "50");
  const url = `${base}/api/articles?${qs.toString()}&${LIST_POPULATE}`;

  try {
    const res = await fetch(url, {
      headers: { ...strapiArticleFetchHeaders() },
      next: options?.next ?? { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: unknown };
    const list = Array.isArray(json.data) ? json.data : [];
    const summaries: BlogPostSummary[] = [];
    for (const entry of list) {
      const flat = unwrapEntry(entry);
      const row = mapStrapiEntryToPostSummary(flat);
      if (row) summaries.push(row);
    }
    return summaries;
  } catch {
    return [];
  }
}

/**
 * Loads a single published article by slug from Strapi REST (`/api/articles`).
 * Returns `null` when Strapi is not configured, the request fails, or no entry is found.
 */
export async function getBlogArticleBySlug(
  slug: string,
  options?: FetchOptions,
): Promise<BlogArticlePageData | null> {
  if (!isStrapiConfigured()) return null;
  const base = getStrapiUrl();
  if (!base) return null;

  const qs = new URLSearchParams();
  qs.set("filters[slug][$eq]", slug);
  qs.set("pagination[limit]", "1");
  qs.set("publicationState", "live");
  const url = `${base}/api/articles?${qs.toString()}&${ARTICLE_POPULATE}`;

  try {
    const res = await fetch(url, {
      headers: { ...strapiArticleFetchHeaders() },
      next: options?.next ?? { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: unknown };
    const list = Array.isArray(json.data) ? json.data : [];
    const first = list[0];
    if (!first) return null;
    const flat = unwrapEntry(first);
    return normalizeStrapiArticleEntry(flat, slug);
  } catch {
    return null;
  }
}
