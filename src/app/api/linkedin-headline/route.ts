import { NextResponse } from "next/server";
import {
  HEADLINE_CUT,
  HEADLINE_MAX,
  HEADLINE_PROFILE_OPTIONS,
  cleanGeneratedHeadline,
  parseHeadlineInput,
  type HeadlineInput,
} from "@/lib/linkedinHeadline";
import { readGeminiApiKey, readServerEnv } from "@/lib/serverEnv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20;

type GeminiPayload = {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
  error?: { message?: string; status?: string };
};

function extractHeadlineText(payload: GeminiPayload): string {
  return (
    payload.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("") ?? ""
  );
}

function generateUrls(model: string): string[] {
  const encoded = encodeURIComponent(model);
  return [
    `https://generativelanguage.googleapis.com/v1beta/models/${encoded}:generateContent`,
    `https://aiplatform.googleapis.com/v1/publishers/google/models/${encoded}:generateContent`,
  ];
}

const hits = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request): string {
  const cf = request.headers.get("cf-connecting-ip");
  if (cf?.trim()) return cf.trim();
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const current = hits.get(ip);
  if (!current || now >= current.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_MAX;
}

function profileLabel(input: HeadlineInput): string {
  return HEADLINE_PROFILE_OPTIONS.find((option) => option.id === input.profile)?.label ?? input.profile;
}

function leadRule(profile: HeadlineInput["profile"]): string {
  switch (profile) {
    case "founder":
      return "Lead with the problem you take off their desk, then Founder, then the category and who it is for. Do not write visionary, serial entrepreneur, or passionate about.";
    case "freelance":
      return "Lead with who you take on and what changes, then the service named the way clients say it. Do not write available for new opportunities.";
    case "jobseeker":
      return "Lead with the role they want next, not the one they left, then the exact job title. Do not write open to work.";
    case "employed":
      return "Lead with the niche they actually know, then the field and tools. Do not use internal job codes or company slogans.";
  }
}

function systemPrompt(): string {
  return [
    "You write LinkedIn headlines. Reply with the headline only: no quotes, no preamble, no extra lines.",
    `Hard limit: ${HEADLINE_MAX} characters.`,
    `The first ~${HEADLINE_CUT} characters must stand alone. Search, comments, and invitations cut there.`,
    "Write in the same language as the answers. Do not translate.",
    "One line. Use | between parts if it helps scanning.",
    "Put the outcome or niche first so it survives the cut. Titles and extras go after.",
  ].join(" ");
}

function userPrompt(input: HeadlineInput): string {
  return [
    `Profile: ${profileLabel(input)}`,
    leadRule(input.profile),
    `What they do: ${input.whatYouDo || "(blank)"}`,
    `Who they help, and what changes: ${input.whoYouHelp || "(blank)"}`,
    `What they want from LinkedIn: ${input.whatYouWant || "(blank)"}`,
  ].join("\n");
}

export async function POST(request: Request) {
  const apiKey = readGeminiApiKey();
  if (!apiKey) {
    console.error("linkedin-headline: GEMINI_API_KEY is not set", {
      cwd: process.cwd(),
    });
    return NextResponse.json(
      {
        error:
          "GEMINI_API_KEY isn’t loaded. Add it to .env.local and restart npm run dev.",
      },
      { status: 503 },
    );
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many headlines in a minute. Wait a moment and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const input = parseHeadlineInput(body);
  if (!input) {
    return NextResponse.json(
      { error: "Fill in at least what you do, or who you help." },
      { status: 400 },
    );
  }

  const model = readServerEnv("GEMINI_HEADLINE_MODEL") || "gemini-2.5-flash";
  const requestBody = {
    systemInstruction: { parts: [{ text: systemPrompt() }] },
    contents: [{ role: "user", parts: [{ text: userPrompt(input) }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 120,
    },
  };

  let lastStatus = 0;
  let lastMessage = "";

  try {
    for (const url of generateUrls(model)) {
      const geminiRes = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(20_000),
      });
      const payload = (await geminiRes.json()) as GeminiPayload;
      lastStatus = geminiRes.status;
      lastMessage = payload.error?.message ?? "";

      if (!geminiRes.ok) {
        console.error("linkedin-headline: Gemini error", geminiRes.status, payload.error?.status);
        continue;
      }

      const headline = cleanGeneratedHeadline(extractHeadlineText(payload));
      if (headline) return NextResponse.json({ headline });
    }
  } catch {
    return NextResponse.json(
      { error: "Couldn’t reach the writer. Try again in a moment." },
      { status: 502 },
    );
  }

  const authFailed = lastStatus === 401 || lastStatus === 403;
  return NextResponse.json(
    {
      error: authFailed
        ? "Gemini rejected the key. Restart the dev server after saving GEMINI_API_KEY, and confirm the key is from Google AI Studio."
        : lastMessage || "Couldn’t write that headline. Try again in a moment.",
    },
    { status: lastStatus >= 400 && lastStatus < 600 ? lastStatus : 502 },
  );
}
