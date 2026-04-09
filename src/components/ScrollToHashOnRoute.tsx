"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * After client navigation to `/#section`, scroll smoothly once the home page is mounted.
 */
export function ScrollToHashOnRoute() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash;
    if (!hash || hash.length <= 1) return;
    const id = hash.slice(1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };

    const t = window.setTimeout(run, 0);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
