"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollElementIntoViewSmooth } from "@/lib/scrollToSection";

/**
 * After client navigation to `/#section`, scroll smoothly once the home page is mounted.
 * Delay helps mobile browsers finish layout after route transition.
 */
export function ScrollToHashOnRoute() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash;
    if (!hash || hash.length <= 1) return;
    const id = hash.slice(1);

    const run = () => {
      const el = document.getElementById(id);
      if (!el) return;
      scrollElementIntoViewSmooth(el);
    };

    const t = window.setTimeout(run, 100);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
