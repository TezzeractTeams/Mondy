export const COOKIE_CONSENT_NAME = "mondy_cookie_consent" as const;

/** ~180 days */
export const COOKIE_CONSENT_MAX_AGE = 180 * 24 * 60 * 60;

export type CookieConsentLevel = "essential" | "all";

export function parseConsentCookie(
  value: string | undefined,
): CookieConsentLevel | null {
  if (value === "essential" || value === "all") return value;
  return null;
}

export function getClientCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const parts = document.cookie.split("; ");
  for (const part of parts) {
    const i = part.indexOf("=");
    if (i === -1) continue;
    const key = part.slice(0, i);
    const value = part.slice(i + 1);
    if (key === name) {
      try {
        return decodeURIComponent(value);
      } catch {
        return value;
      }
    }
  }
  return undefined;
}

export function setClientCookie(
  name: string,
  value: string,
  options: {
    maxAge: number;
    path?: string;
    sameSite?: "Lax" | "Strict";
    secure?: boolean;
  },
): void {
  if (typeof document === "undefined") return;
  const { maxAge, path = "/", sameSite = "Lax", secure } = options;
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=${path}; Max-Age=${maxAge}; SameSite=${sameSite}`;
  if (secure) cookie += "; Secure";
  document.cookie = cookie;
}

export function setConsentCookie(level: CookieConsentLevel): void {
  setClientCookie(COOKIE_CONSENT_NAME, level, {
    maxAge: COOKIE_CONSENT_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
}
