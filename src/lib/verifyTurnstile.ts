/**
 * Cloudflare Turnstile server-side validation.
 *
 * Env (see also waitlist route header):
 * - TURNSTILE_SECRET_KEY — server-only; never expose to the client.
 *
 * Dummy keys for local / automated tests (any hostname, including localhost):
 * - Always pass: sitekey 1x00000000000000000000AA + secret 1x0000000000000000000000000000000AA
 * - Always fail: sitekey 2x00000000000000000000AB + secret 2x0000000000000000000000000000000AA
 * @see https://developers.cloudflare.com/turnstile/troubleshooting/testing/
 */

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const MAX_TOKEN_LEN = 4096;

export async function verifyTurnstileToken(
  token: string,
  secret: string,
  remoteip?: string | null,
): Promise<boolean> {
  const trimmed = token.trim();
  if (!trimmed || trimmed.length > MAX_TOKEN_LEN) {
    return false;
  }

  const body = new URLSearchParams({
    secret,
    response: trimmed,
  });
  if (remoteip?.trim()) {
    body.set("remoteip", remoteip.trim());
  }

  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    return false;
  }

  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}
