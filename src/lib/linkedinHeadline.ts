export const HEADLINE_MAX = 220;
export const HEADLINE_CUT = 70;
export const HEADLINE_FIELD_MAX = 400;

export const HEADLINE_PROFILES = [
  "founder",
  "freelance",
  "jobseeker",
  "employed",
] as const;

export type HeadlineProfile = (typeof HEADLINE_PROFILES)[number];

export const HEADLINE_PROFILE_OPTIONS: { id: HeadlineProfile; label: string }[] = [
  { id: "founder", label: "Founder" },
  { id: "freelance", label: "Freelance or consultant" },
  { id: "jobseeker", label: "Looking for a job" },
  { id: "employed", label: "Employed expert" },
];

export type HeadlineInput = {
  whatYouDo: string;
  whoYouHelp: string;
  whatYouWant: string;
  profile: HeadlineProfile;
};

export function isHeadlineProfile(value: string): value is HeadlineProfile {
  return (HEADLINE_PROFILES as readonly string[]).includes(value);
}

function readField(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, HEADLINE_FIELD_MAX);
}

export function parseHeadlineInput(body: unknown): HeadlineInput | null {
  if (!body || typeof body !== "object") return null;
  const rec = body as Record<string, unknown>;
  const profile = typeof rec.profile === "string" ? rec.profile : "";
  if (!isHeadlineProfile(profile)) return null;
  const whatYouDo = readField(rec.whatYouDo);
  const whoYouHelp = readField(rec.whoYouHelp);
  const whatYouWant = readField(rec.whatYouWant);
  if (!whatYouDo && !whoYouHelp && !whatYouWant) return null;
  return { whatYouDo, whoYouHelp, whatYouWant, profile };
}

export function cleanGeneratedHeadline(raw: string): string {
  const line = raw
    .replace(/^[\s"'“”‘’`]+|[\s"'“”‘’`]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return truncateHeadline(line, HEADLINE_MAX);
}

const ROLE_LABEL: Record<HeadlineProfile, string> = {
  founder: "Founder",
  freelance: "",
  jobseeker: "",
  employed: "",
};

function collapse(value: string): string {
  return value.replace(/\|/g, "/").replace(/\s+/g, " ").trim();
}

function alreadyCovered(existing: string[], next: string): boolean {
  const n = next.toLowerCase();
  return existing.some((part) => {
    const p = part.toLowerCase();
    return p === n || p.includes(n);
  });
}

function pushUnique(parts: string[], next: string): void {
  const value = collapse(next);
  if (!value) return;
  if (alreadyCovered(parts, value)) return;
  parts.push(value);
}

/** Fallback if the model is unavailable. Prefer POST /api/linkedin-headline. */
export function composeHeadline(input: HeadlineInput): string {
  const whatYouDo = collapse(input.whatYouDo);
  const whoYouHelp = collapse(input.whoYouHelp);
  const whatYouWant = collapse(input.whatYouWant);
  const parts: string[] = [];

  switch (input.profile) {
    case "founder":
      pushUnique(parts, whoYouHelp || whatYouDo);
      pushUnique(parts, ROLE_LABEL.founder);
      pushUnique(parts, whatYouDo);
      break;
    case "freelance":
      pushUnique(parts, whoYouHelp || whatYouDo);
      pushUnique(parts, whatYouDo);
      break;
    case "jobseeker":
      pushUnique(parts, whatYouWant || whoYouHelp || whatYouDo);
      pushUnique(parts, whatYouDo);
      if (whatYouWant) pushUnique(parts, whoYouHelp);
      break;
    case "employed":
      pushUnique(parts, whoYouHelp || whatYouDo);
      pushUnique(parts, whatYouDo);
      break;
  }

  return truncateHeadline(parts.join(" | "), HEADLINE_MAX);
}

export function truncateHeadline(
  text: string,
  at: number,
  options?: { ellipsis?: boolean },
): string {
  if (text.length <= at) return text;
  if (!options?.ellipsis) return text.slice(0, at);
  return `${text.slice(0, at).trimEnd()}…`;
}

export function headlineOutsideProfile(text: string): string {
  return truncateHeadline(text, HEADLINE_CUT, { ellipsis: true });
}

export function splitHeadlineAtCut(text: string): { visible: string; clipped: string } {
  if (text.length <= HEADLINE_CUT) return { visible: text, clipped: "" };
  return {
    visible: text.slice(0, HEADLINE_CUT),
    clipped: text.slice(HEADLINE_CUT),
  };
}

export const DEFAULT_HEADLINE_INPUT: HeadlineInput = {
  whatYouDo: "LinkedIn content for people who hate writing",
  whoYouHelp: "I get operators posting every week from one voice note",
  whatYouWant: "Founders who want a posting habit without a writing habit",
  profile: "founder",
};

export const DEFAULT_HEADLINE = composeHeadline(DEFAULT_HEADLINE_INPUT);
