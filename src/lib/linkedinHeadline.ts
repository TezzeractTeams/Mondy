export const HEADLINE_MAX = 220;
export const HEADLINE_CUT = 70;

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

/**
 * Local headline composer. Swap this for an API / model call later:
 * same `HeadlineInput` in, one string out, capped at `HEADLINE_MAX`.
 */
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
