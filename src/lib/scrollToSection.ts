type RouterPush = (href: string) => void;

/**
 * Scrolls the element into view using `window.scrollTo`, which behaves more
 * reliably than `scrollIntoView({ behavior: "smooth" })` on mobile Safari.
 * Honors CSS `scroll-margin-top` on the target element.
 */
export function scrollElementIntoViewSmooth(el: HTMLElement): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const marginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const rect = el.getBoundingClientRect();
  const targetY = rect.top + window.scrollY - marginTop;

  window.scrollTo({
    top: Math.max(0, targetY),
    behavior: reduce ? "auto" : "smooth",
  });
}

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
    scrollElementIntoViewSmooth(el);
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
