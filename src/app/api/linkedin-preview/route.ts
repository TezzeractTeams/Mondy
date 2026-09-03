import { NextResponse } from "next/server";
import {
  parseLinkedInProfileUrl,
  parseProfileFromHtml,
} from "@/lib/linkedinPreview";

const MAX_HTML_BYTES = 1_200_000;
const FETCH_TIMEOUT_MS = 12_000;
const USER_AGENTS = [
  "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  "Twitterbot/1.0",
  "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)",
];

async function fetchProfileHtml(profileUrl: URL): Promise<Response> {
  let last: Response | null = null;
  for (const userAgent of USER_AGENTS) {
    const response = await fetch(profileUrl, {
      method: "GET",
      redirect: "follow",
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": userAgent,
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    last = response;
    if (response.ok) return response;
  }
  return last!;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const urlValue =
    typeof body === "object" && body !== null && "url" in body
      ? String((body as { url: unknown }).url ?? "")
      : "";
  const profileUrl = parseLinkedInProfileUrl(urlValue);
  if (!profileUrl) {
    return NextResponse.json(
      { error: "Paste a public LinkedIn profile URL, like https://www.linkedin.com/in/your-name." },
      { status: 400 },
    );
  }

  let html: string;
  try {
    const response = await fetchProfileHtml(profileUrl);

    const finalHost = new URL(response.url).hostname.toLowerCase();
    const finalLabels = finalHost.split(".");
    const isLinkedInHost =
      finalLabels.length >= 2 &&
      finalLabels[finalLabels.length - 2] === "linkedin" &&
      finalLabels[finalLabels.length - 1] === "com";
    if (!isLinkedInHost) {
      return NextResponse.json(
        { error: "That link didn’t resolve to a LinkedIn profile." },
        { status: 422 },
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: "LinkedIn didn’t return that profile. Check the URL and try again." },
        { status: 422 },
      );
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
      return NextResponse.json(
        { error: "Couldn’t read that profile page." },
        { status: 422 },
      );
    }

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > MAX_HTML_BYTES) {
      return NextResponse.json(
        { error: "That profile page was too large to load." },
        { status: 422 },
      );
    }
    html = new TextDecoder("utf-8").decode(buffer);
  } catch {
    return NextResponse.json(
      { error: "Couldn’t reach LinkedIn. Check the URL and try again." },
      { status: 422 },
    );
  }

  const profile = parseProfileFromHtml(html);
  if (!profile) {
    return NextResponse.json(
      {
        error:
          "LinkedIn blocked the public preview. Check the URL and try again.",
      },
      { status: 422 },
    );
  }

  return NextResponse.json(profile);
}
