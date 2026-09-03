export const TEXT_STYLES = [
  "normal",
  "bold",
  "italic",
  "boldItalic",
  "sans",
  "boldSans",
  "italicSans",
  "boldItalicSans",
  "underline",
  "strikethrough",
  "script",
  "doublestruck",
  "fullwidth",
] as const;

export type TextStyle = (typeof TEXT_STYLES)[number];

export const TEXT_STYLE_LABELS: Record<TextStyle, string> = {
  normal: "Normal",
  bold: "Bold",
  italic: "Italic",
  boldItalic: "Bold Italic",
  sans: "Sans",
  boldSans: "Bold Sans",
  italicSans: "Italic Sans",
  boldItalicSans: "Bold Italic Sans",
  underline: "Underline",
  strikethrough: "Strikethrough",
  script: "Script",
  doublestruck: "Doublestruck",
  fullwidth: "Fullwidth",
};

const COMBINING_UNDERLINE = "\u0332";
const COMBINING_STRIKE = "\u0336";
const COMBINING_MARKS = new Set([COMBINING_UNDERLINE, COMBINING_STRIKE]);

function cp(code: number): string {
  return String.fromCodePoint(code);
}

function letterRange(
  from: string,
  toCode: number,
  count: number,
): Record<string, string> {
  const map: Record<string, string> = {};
  const start = from.codePointAt(0)!;
  for (let i = 0; i < count; i++) {
    map[cp(start + i)] = cp(toCode + i);
  }
  return map;
}

function withExceptions(
  base: Record<string, string>,
  exceptions: Record<string, string>,
): Record<string, string> {
  return { ...base, ...exceptions };
}

const BOLD = {
  ...letterRange("A", 0x1d400, 26),
  ...letterRange("a", 0x1d41a, 26),
  ...letterRange("0", 0x1d7ce, 10),
};

const ITALIC = {
  ...letterRange("A", 0x1d434, 26),
  ...letterRange("a", 0x1d44e, 7),
  h: "\u210E",
  ...letterRange("i", 0x1d456, 18),
};

const BOLD_ITALIC = {
  ...letterRange("A", 0x1d468, 26),
  ...letterRange("a", 0x1d482, 26),
};

const SANS = {
  ...letterRange("A", 0x1d5a0, 26),
  ...letterRange("a", 0x1d5ba, 26),
  ...letterRange("0", 0x1d7e2, 10),
};

const BOLD_SANS = {
  ...letterRange("A", 0x1d5d4, 26),
  ...letterRange("a", 0x1d5ee, 26),
  ...letterRange("0", 0x1d7ec, 10),
};

const ITALIC_SANS = {
  ...letterRange("A", 0x1d608, 26),
  ...letterRange("a", 0x1d622, 26),
};

const BOLD_ITALIC_SANS = {
  ...letterRange("A", 0x1d63c, 26),
  ...letterRange("a", 0x1d656, 26),
};

const SCRIPT = {
  A: cp(0x1d49c),
  B: "\u212C",
  C: cp(0x1d49e),
  D: cp(0x1d49f),
  E: "\u2130",
  F: "\u2131",
  G: cp(0x1d4a2),
  H: "\u210B",
  I: "\u2110",
  J: cp(0x1d4a5),
  K: cp(0x1d4a6),
  L: "\u2112",
  M: "\u2133",
  N: cp(0x1d4a9),
  O: cp(0x1d4aa),
  P: cp(0x1d4ab),
  Q: cp(0x1d4ac),
  R: "\u211B",
  S: cp(0x1d4ae),
  T: cp(0x1d4af),
  U: cp(0x1d4b0),
  V: cp(0x1d4b1),
  W: cp(0x1d4b2),
  X: cp(0x1d4b3),
  Y: cp(0x1d4b4),
  Z: cp(0x1d4b5),
  a: cp(0x1d4b6),
  b: cp(0x1d4b7),
  c: cp(0x1d4b8),
  d: cp(0x1d4b9),
  e: "\u212F",
  f: cp(0x1d4bb),
  g: "\u210A",
  h: cp(0x1d4bd),
  i: cp(0x1d4be),
  j: cp(0x1d4bf),
  k: cp(0x1d4c0),
  l: cp(0x1d4c1),
  m: cp(0x1d4c2),
  n: cp(0x1d4c3),
  o: "\u2134",
  p: cp(0x1d4c5),
  q: cp(0x1d4c6),
  r: cp(0x1d4c7),
  s: cp(0x1d4c8),
  t: cp(0x1d4c9),
  u: cp(0x1d4ca),
  v: cp(0x1d4cb),
  w: cp(0x1d4cc),
  x: cp(0x1d4cd),
  y: cp(0x1d4ce),
  z: cp(0x1d4cf),
};

const DOUBLESTRUCK = withExceptions(
  {
    ...letterRange("A", 0x1d538, 26),
    ...letterRange("a", 0x1d552, 26),
    ...letterRange("0", 0x1d7d8, 10),
  },
  {
    C: "\u2102",
    H: "\u210D",
    N: "\u2115",
    P: "\u2119",
    Q: "\u211A",
    R: "\u211D",
    Z: "\u2124",
  },
);

const FULLWIDTH: Record<string, string> = {
  ...letterRange("A", 0xff21, 26),
  ...letterRange("a", 0xff41, 26),
  ...letterRange("0", 0xff10, 10),
  " ": "\u3000",
  "!": "\uFF01",
  '"': "\uFF02",
  "#": "\uFF03",
  $: "\uFF04",
  "%": "\uFF05",
  "&": "\uFF06",
  "'": "\uFF07",
  "(": "\uFF08",
  ")": "\uFF09",
  "*": "\uFF0A",
  "+": "\uFF0B",
  ",": "\uFF0C",
  "-": "\uFF0D",
  ".": "\uFF0E",
  "/": "\uFF0F",
  ":": "\uFF1A",
  ";": "\uFF1B",
  "<": "\uFF1C",
  "=": "\uFF1D",
  ">": "\uFF1E",
  "?": "\uFF1F",
  "@": "\uFF20",
  "[": "\uFF3B",
  "\\": "\uFF3C",
  "]": "\uFF3D",
  "^": "\uFF3E",
  _: "\uFF3F",
  "`": "\uFF40",
  "{": "\uFF5B",
  "|": "\uFF5C",
  "}": "\uFF5D",
  "~": "\uFF5E",
};

const STYLE_MAPS: Record<
  Exclude<TextStyle, "normal" | "underline" | "strikethrough">,
  Record<string, string>
> = {
  bold: BOLD,
  italic: ITALIC,
  boldItalic: BOLD_ITALIC,
  sans: SANS,
  boldSans: BOLD_SANS,
  italicSans: ITALIC_SANS,
  boldItalicSans: BOLD_ITALIC_SANS,
  script: SCRIPT,
  doublestruck: DOUBLESTRUCK,
  fullwidth: FULLWIDTH,
};

const REVERSE_MAP: Record<string, string> = {};
for (const map of Object.values(STYLE_MAPS)) {
  for (const [plain, styled] of Object.entries(map)) {
    REVERSE_MAP[styled] = plain;
  }
}

function mapChars(text: string, dict: Record<string, string>): string {
  return Array.from(text)
    .map((ch) => dict[ch] ?? ch)
    .join("");
}

function applyCombining(plain: string, mark: string): string {
  return Array.from(plain)
    .map((ch) => (/\s/.test(ch) ? ch : ch + mark))
    .join("");
}

function graphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return [...segmenter.segment(text)].map((part) => part.segment);
  }
  return Array.from(text);
}

export function toPlain(text: string): string {
  return graphemes(text)
    .map((g) => {
      const stripped = Array.from(g)
        .filter((ch) => !COMBINING_MARKS.has(ch))
        .join("");
      if (!stripped) return "";
      const first = String.fromCodePoint(stripped.codePointAt(0)!);
      const rest = stripped.slice(first.length);
      return (REVERSE_MAP[first] ?? first) + rest;
    })
    .join("");
}

export function applyStyle(text: string, style: TextStyle): string {
  const plain = toPlain(text);
  if (style === "normal") return plain;
  if (style === "underline") return applyCombining(plain, COMBINING_UNDERLINE);
  if (style === "strikethrough") return applyCombining(plain, COMBINING_STRIKE);
  return mapChars(plain, STYLE_MAPS[style]);
}

export function styleIsApplied(text: string, style: TextStyle): boolean {
  if (!text) return false;
  return applyStyle(text, style) === text;
}

export function applyStyleToRange(
  text: string,
  start: number,
  end: number,
  style: TextStyle,
): { text: string; start: number; end: number } {
  const from = Math.max(0, Math.min(start, end, text.length));
  const to = Math.min(text.length, Math.max(start, end));
  const hasRange = to > from;
  const targetStart = hasRange ? from : 0;
  const targetEnd = hasRange ? to : text.length;
  const before = text.slice(0, targetStart);
  const selected = text.slice(targetStart, targetEnd);
  const after = text.slice(targetEnd);

  if (!selected) {
    return { text, start: from, end: to };
  }

  const nextSelected = styleIsApplied(selected, style)
    ? toPlain(selected)
    : applyStyle(selected, style);

  return {
    text: before + nextSelected + after,
    start: before.length,
    end: before.length + nextSelected.length,
  };
}

export function insertAtRange(
  text: string,
  start: number,
  end: number,
  insert: string,
): { text: string; start: number; end: number } {
  const from = Math.max(0, Math.min(start, end, text.length));
  const to = Math.min(text.length, Math.max(start, end));
  const next = text.slice(0, from) + insert + text.slice(to);
  const caret = from + insert.length;
  return { text: next, start: caret, end: caret };
}

export type PointBreakerKind = "line" | "point" | "divider";

/** Insert a LinkedIn-style line/point breaker, starting a new line when needed. */
export function insertPointBreaker(
  text: string,
  start: number,
  end: number,
  marker: string,
  kind: PointBreakerKind,
): { text: string; start: number; end: number } {
  const from = Math.max(0, Math.min(start, end, text.length));
  if (kind === "line") {
    return insertAtRange(text, start, end, "\n");
  }
  const atLineStart = from === 0 || text[from - 1] === "\n";
  const prefix = atLineStart ? "" : "\n";
  const insert = kind === "divider" ? `${prefix}${marker}\n` : `${prefix}${marker} `;
  return insertAtRange(text, start, end, insert);
}

export type ListKind = "bullet" | "number";

const BULLET_STRIP = /^(?:[•·‣◦▪▫*–—-]|→|↳|☑|✓|▸)\s+/u;
const NUMBER_STRIP = /^\d+[.)]\s+/;

function stripListPrefix(line: string): string {
  return line.replace(NUMBER_STRIP, "").replace(BULLET_STRIP, "");
}

function isBulletLine(line: string): boolean {
  return BULLET_STRIP.test(line);
}

function isNumberLine(line: string): boolean {
  return NUMBER_STRIP.test(line);
}

function contentLines(block: string): string[] {
  return block.split("\n").filter((line) => line.trim() !== "");
}

function expandToLines(
  text: string,
  start: number,
  end: number,
): { from: number; to: number } {
  let from = Math.max(0, Math.min(start, end, text.length));
  let to = Math.min(text.length, Math.max(start, end));
  while (from > 0 && text[from - 1] !== "\n") from -= 1;
  if (to > from && text[to - 1] === "\n") to -= 1;
  while (to < text.length && text[to] !== "\n") to += 1;
  return { from, to };
}

function formatAsList(block: string, kind: ListKind): string {
  let index = 0;
  return block
    .split("\n")
    .map((line) => {
      if (line.trim() === "") return line;
      const plain = stripListPrefix(line);
      index += 1;
      return kind === "bullet" ? `• ${plain}` : `${index}. ${plain}`;
    })
    .join("\n");
}

export function listIsApplied(text: string, kind: ListKind): boolean {
  const lines = contentLines(text);
  if (lines.length === 0) return false;
  return kind === "bullet" ? lines.every(isBulletLine) : lines.every(isNumberLine);
}

export function applyListToRange(
  text: string,
  start: number,
  end: number,
  kind: ListKind,
): { text: string; start: number; end: number } {
  if (!text) {
    const insert = kind === "bullet" ? "• " : "1. ";
    return insertAtRange(text, 0, 0, insert);
  }

  const hasRange = Math.abs(end - start) > 0;
  const { from, to } = hasRange ? expandToLines(text, start, end) : { from: 0, to: text.length };
  const selected = text.slice(from, to);
  if (!selected) {
    const insert = kind === "bullet" ? "• " : "1. ";
    return insertAtRange(text, from, to, insert);
  }

  const nextSelected = listIsApplied(selected, kind)
    ? selected
        .split("\n")
        .map((line) => (line.trim() === "" ? line : stripListPrefix(line)))
        .join("\n")
    : formatAsList(selected, kind);

  return {
    text: text.slice(0, from) + nextSelected + text.slice(to),
    start: from,
    end: from + nextSelected.length,
  };
}

export function textStats(text: string): {
  chars: number;
  words: number;
  readingLabel: string;
} {
  const chars = Array.from(text).length;
  const trimmed = text.trim();
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  const seconds = words === 0 ? 0 : Math.max(1, Math.round((words / 200) * 60));
  let readingLabel = "< 1 sec";
  if (seconds >= 60) {
    const minutes = Math.round(seconds / 60);
    readingLabel = `${minutes} min`;
  } else if (seconds > 0) {
    readingLabel = `${seconds} sec`;
  }
  return { chars, words, readingLabel };
}
