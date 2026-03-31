import { cn } from "@/lib/utils";

/**
 * Hex values for inline styles (gradients, third-party props).
 * In className, prefer Tailwind `mondy-*` tokens from globals.css.
 */
export const mondy = {
  surface: "#F5F3F0",
  ink: "#1C1A17",
  accent: "#708FDB",
  accentDeep: "#4E74D3",
  card: "#FBFBF9",
  footer: "#1B1A16",
  coral: "#E17054",
  productHunt: "#FF6154",
} as const;

export const mondyGradients = {
  stepCard:
    "linear-gradient(127deg, rgba(255,208,195,0.4) 0%, rgba(228,234,245,0.4) 100%)",
} as const;

export const mondyLayout = {
  contentMax: "max-w-[1440px] mx-auto w-full",
} as const;

const btnPrimaryCore = cn(
  "bg-mondy-accent text-white font-bold transition-all",
  "hover:brightness-110 hover:scale-[1.02] active:scale-95",
);

export const mondyBtn = {
  primaryMd: cn(btnPrimaryCore, "rounded-full px-10 py-4 text-sm tracking-tight shadow-xl shadow-mondy-accent/20"),
  primaryLg: cn(btnPrimaryCore, "rounded-full px-10 py-5 text-lg tracking-[-0.03em] shadow-xl shadow-mondy-accent/20"),
  primaryPricing: cn(
    btnPrimaryCore,
    "w-full py-5 rounded-full text-lg tracking-[-0.05em] shadow-lg shadow-mondy-accent/20",
  ),
  navDesktop: cn(btnPrimaryCore, "text-[13px] px-5 py-2.5 rounded-full whitespace-nowrap"),
  navMobile: cn(btnPrimaryCore, "w-full text-center text-base py-4 rounded-2xl mt-2 block"),
  primaryHeroSubmit: cn(
    btnPrimaryCore,
    "rounded-2xl py-3.5 text-[15px] shadow-mondy-hero-submit",
    "focus-visible:ring-2 focus-visible:ring-mondy-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white",
  ),
} as const;

export const mondyType = {
  sectionHeading: cn(
    "text-mondy-ink text-5xl md:text-7xl font-extrabold tracking-[-0.06em] leading-[0.9]",
  ),
  sectionLead: cn(
    "text-mondy-ink/60 text-lg md:text-xl font-medium tracking-tight leading-relaxed",
  ),
  waitlistTitle: cn(
    "text-mondy-ink text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-[-0.06em] leading-[0.95]",
  ),
  waitlistSubtitle: cn(
    "text-mondy-ink/50 text-xl md:text-2xl font-medium tracking-[-0.05em] leading-[1.2]",
  ),
  stepTitle: cn(
    "text-mondy-ink text-2xl font-extrabold tracking-[-0.05em] leading-[1.1] mb-4",
  ),
  stepBody: cn(
    "text-mondy-ink/60 text-lg font-medium tracking-[-0.03em] leading-relaxed",
  ),
  screenshotPlaceholder: cn(
    "relative z-10 text-[10px] text-mondy-ink/20 font-bold uppercase tracking-widest",
  ),
} as const;

export const mondyHero = {
  floatingCardSizes: "(min-width: 1024px) 320px, 90vw",
} as const;
