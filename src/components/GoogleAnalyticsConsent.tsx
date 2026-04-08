"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  COOKIE_CONSENT_NAME,
  getClientCookie,
  parseConsentCookie,
} from "@/lib/cookies";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function analyticsAllowed(): boolean {
  return parseConsentCookie(getClientCookie(COOKIE_CONSENT_NAME)) === "all";
}

export default function GoogleAnalyticsConsent() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    function sync() {
      setAllowed(analyticsAllowed());
    }
    sync();
    document.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, sync);
    return () => document.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, sync);
  }, []);

  if (!gaId || !allowed) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
