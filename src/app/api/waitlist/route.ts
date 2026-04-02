/**
 * Waitlist → Brevo contacts. Requires:
 * - BREVO_API_KEY (server-only)
 * - BREVO_WAITLIST_LIST_ID (optional; adds contact to that list)
 */
import { NextResponse } from "next/server";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const MAX_NAME = 120;
const MAX_EMAIL = 254;

function isValidEmail(email: string): boolean {
  if (email.length > MAX_EMAIL) return false;
  // Practical check; browser also enforces type="email"
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("waitlist: BREVO_API_KEY is not set");
    return NextResponse.json(
      { error: "Waitlist is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { firstName, lastName, email } = body as Record<string, unknown>;

  const first =
    typeof firstName === "string" ? firstName.trim().slice(0, MAX_NAME) : "";
  const last =
    typeof lastName === "string" ? lastName.trim().slice(0, MAX_NAME) : "";
  const addr =
    typeof email === "string" ? email.trim().toLowerCase().slice(0, MAX_EMAIL) : "";

  if (!addr || !isValidEmail(addr)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const listIdRaw = process.env.BREVO_WAITLIST_LIST_ID?.trim();
  const listIds =
    listIdRaw && /^\d+$/.test(listIdRaw) ? [Number.parseInt(listIdRaw, 10)] : undefined;

  const payload: Record<string, unknown> = {
    email: addr,
    attributes: {
      FIRSTNAME: first || undefined,
      LASTNAME: last || undefined,
    },
    updateEnabled: true,
  };
  if (listIds?.length) {
    payload.listIds = listIds;
  }

  const brevoRes = await fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (brevoRes.ok) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  let brevoMessage = "";
  try {
    const errJson = (await brevoRes.json()) as { message?: string };
    brevoMessage = typeof errJson.message === "string" ? errJson.message : "";
  } catch {
    /* ignore */
  }

  console.error("waitlist: Brevo error", brevoRes.status, brevoMessage || "(no body)");

  const generic =
    "Something went wrong. Please try again in a moment or use a different email.";

  if (process.env.NODE_ENV === "development" && brevoMessage) {
    return NextResponse.json(
      { error: generic, debug: brevoMessage },
      { status: brevoRes.status >= 400 && brevoRes.status < 600 ? brevoRes.status : 502 },
    );
  }

  return NextResponse.json({ error: generic }, { status: 502 });
}
