type InlineStyle = {
  bold: boolean;
  italic: boolean;
  code: boolean;
  strikethrough: boolean;
};

type InlineSegment = {
  text: string;
  style: InlineStyle;
  link?: { url: string; inner: string };
};

const PLAIN: InlineStyle = {
  bold: false,
  italic: false,
  code: false,
  strikethrough: false,
};

function styleFromNode(ch: Record<string, unknown>): InlineStyle {
  return {
    bold: Boolean(ch.bold),
    italic: Boolean(ch.italic),
    code: Boolean(ch.code),
    strikethrough: Boolean(ch.strikethrough),
  };
}

function styleKey(style: InlineStyle): string {
  return `${style.bold ? "b" : ""}${style.italic ? "i" : ""}${style.code ? "c" : ""}${style.strikethrough ? "s" : ""}`;
}

function mergeSegments(segments: InlineSegment[]): InlineSegment[] {
  const merged: InlineSegment[] = [];
  for (const seg of segments) {
    if (seg.link) {
      merged.push(seg);
      continue;
    }
    const last = merged[merged.length - 1];
    if (last && !last.link && styleKey(last.style) === styleKey(seg.style)) {
      last.text += seg.text;
    } else {
      merged.push({ ...seg, text: seg.text });
    }
  }
  return merged;
}

/** Wrap styled text; keep leading/trailing spaces outside markdown markers. */
function wrapSegment(text: string, style: InlineStyle): string {
  if (!text) return "";
  if (!style.bold && !style.italic && !style.code && !style.strikethrough) return text;

  const lead = text.match(/^\s*/)?.[0] ?? "";
  const trail = text.match(/\s*$/)?.[0] ?? "";
  const core = text.slice(lead.length, text.length - trail.length);
  if (!core) return text;

  // Strapi sometimes marks lone punctuation bold; invalid / ugly as **.**
  if (style.bold && !/[\p{L}\p{N}]/u.test(core)) return text;

  let wrapped = core;
  if (style.code) wrapped = `\`${wrapped}\``;
  if (style.strikethrough) wrapped = `~~${wrapped}~~`;
  if (style.bold && style.italic) wrapped = `***${wrapped}***`;
  else if (style.bold) wrapped = `**${wrapped}**`;
  else if (style.italic) wrapped = `*${wrapped}*`;

  return `${lead}${wrapped}${trail}`;
}

function segmentsFromChildren(children: unknown): InlineSegment[] {
  if (!Array.isArray(children)) return [];
  const segments: InlineSegment[] = [];

  for (const c of children) {
    if (!c || typeof c !== "object") continue;
    const ch = c as Record<string, unknown>;

    if (ch.type === "text") {
      segments.push({
        text: typeof ch.text === "string" ? ch.text : "",
        style: styleFromNode(ch),
      });
    } else if (ch.type === "link" && typeof ch.url === "string") {
      const inner = strapiInlineChildrenToMarkdown(ch.children);
      segments.push({
        text: "",
        style: PLAIN,
        link: { url: ch.url, inner },
      });
    } else if (Array.isArray(ch.children)) {
      const inner = strapiInlineChildrenToMarkdown(ch.children);
      if (inner) segments.push({ text: inner, style: PLAIN });
    }
  }

  return segments;
}

/** Strapi Blocks inline nodes → CommonMark (bold/italic/links with sane delimiters). */
export function strapiInlineChildrenToMarkdown(children: unknown): string {
  const segments = mergeSegments(segmentsFromChildren(children));
  let out = "";

  for (const seg of segments) {
    if (seg.link) {
      const label = seg.link.inner || seg.link.url;
      out += `[${label}](${seg.link.url})`;
      continue;
    }
    out += wrapSegment(seg.text, seg.style);
  }

  return out;
}
