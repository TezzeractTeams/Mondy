import { cookies } from "next/headers";
import {
  COOKIE_CONSENT_NAME,
  parseConsentCookie,
  type CookieConsentLevel,
} from "./cookies";

export async function getServerCookieConsent(): Promise<CookieConsentLevel | null> {
  const jar = await cookies();
  return parseConsentCookie(jar.get(COOKIE_CONSENT_NAME)?.value);
}
