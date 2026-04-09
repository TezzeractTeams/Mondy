type RouterPush = (href: string) => void;

/**
 * Smooth-scroll to a section by hash. On "/" scrolls in place; otherwise
 * navigates to `/#id` so the page can scroll after the route is ready.
 */
export function navigateToSection(hash: string, router: { push: RouterPush }, pathname: string): void {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return;

  const scrollEl = () => {
    const el = document.getElementById(id);
    if (!el) return false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#${id}`
    );
    return true;
  };

  if (pathname === "/" && scrollEl()) {
    return;
  }

  router.push(`/#${id}`);
}
