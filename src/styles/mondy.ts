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
  card: "#EBF2FF",
  footer: "#1B1A16",
  coral: "#E17054",
  productHunt: "#FF6154",
} as const;

export const mondyGradients = {
  stepCard:
    "linear-gradient(127deg, rgba(255,208,195,0.4) 0%, rgba(228,234,245,0.4) 100%)",
} as const;

export const mondyLayout = {
  contentMax: " mx-auto w-full",
} as const;

const btnPrimaryCore = cn(
  "bg-mondy-accent text-white font-bold transition-all",
  "hover:brightness-110 hover:scale-[1.02] active:scale-95",
);

export const mondyBtn = {
  primaryMd: cn(btnPrimaryCore, "rounded-full px-10 py-4 text-sm tracking-tight shadow-xl shadow-mondy-accent/20"),
  primaryLg: cn(btnPrimaryCore, "rounded-full px-6 py-3 text-sm tracking-[-0.03em] shadow-xl shadow-mondy-accent/20"),
  primaryPricing: cn(
    btnPrimaryCore,
    "w-full py-5 rounded-full text-lg tracking-[-0.05em] shadow-lg shadow-mondy-accent/20",
  ),
  navDesktop: cn(btnPrimaryCore, "text-[16px] px-5 py-2.5 rounded-full whitespace-nowrap"),
  navMobile: cn(btnPrimaryCore, "w-full text-center text-base py-4 rounded-2xl mt-2 block"),
  primaryHeroSubmit: cn(
    btnPrimaryCore,
    "rounded-2xl py-3.5 text-[15px] shadow-mondy-hero-submit",
    "focus-visible:ring-2 focus-visible:ring-mondy-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white",
  ),
} as const;

export const mondyType = {
  sectionHero: cn(
    "font-noah text-mondy-ink  text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.06em] leading-[0.9]",
  ),
  sectionHeading: cn(
    "font-noah text-mondy-ink  text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.06em] leading-[0.9]",
  ),
  sectionLead: cn(
    "font-noah text-mondy-ink/60 text-lg md:text-xl font-medium tracking-tight leading-relaxed",
  ),
  waitlistSubtitle: cn(
    "font-noah text-mondy-ink/50 text-xl md:text-2xl font-medium tracking-[-0.05em] leading-[1.2]",
  ),
  stepTitle: cn(
    "font-noah text-mondy-ink text-2xl font-extrabold tracking-[-0.05em] leading-[1.1] mb-4",
  ),
  stepBody: cn(
    "font-noah text-mondy-ink/60 text-lg font-medium tracking-[-0.03em] leading-relaxed",
  ),
  screenshotPlaceholder: cn(
    "font-noah relative z-10 text-[10px] text-mondy-ink/20 font-bold uppercase tracking-widest",
  ),
} as const;

/** Decorative Hero floating postcards — set `mondyHero.floatingCards.activePreset` to switch. */
export type MondyHeroFloatingCardPreset = "compact" | "cozy" | "comfortable" | "large";

export const mondyHero = {
  floatingCards: {
    /**
     * Try: `compact` (smallest) · `cozy` · `comfortable` · `large` (previous default scale).
     */
    activePreset: "compact" as MondyHeroFloatingCardPreset,
    /** Width utilities applied to both postcard wrappers (`sm`+ only; cards hidden below `sm`). */
    presetWidths: {
      compact:
        "sm:w-[min(26vw,9rem)] md:w-[152px] lg:w-[180px] xl:w-[200px]",
      cozy: "sm:w-[min(30vw,11rem)] md:w-[180px] lg:w-[212px] xl:w-[240px]",
      comfortable:
        "sm:w-[min(33vw,12.5rem)] md:w-[200px] lg:w-[248px] xl:w-[280px]",
      large:
        "sm:w-[min(36vw,14rem)] md:w-[220px] lg:w-[280px] xl:w-[320px]",
    } as const satisfies Record<MondyHeroFloatingCardPreset, string>,
    /** Next/Image `sizes` — keep in sync with `presetWidths` for the active preset. */
    presetSizes: {
      compact:
        "(min-width: 1280px) 200px, (min-width: 1024px) 180px, (min-width: 768px) 152px, (min-width: 640px) min(26vw, 9rem), 100vw",
      cozy: "(min-width: 1280px) 240px, (min-width: 1024px) 212px, (min-width: 768px) 180px, (min-width: 640px) min(30vw, 11rem), 100vw",
      comfortable:
        "(min-width: 1280px) 280px, (min-width: 1024px) 248px, (min-width: 768px) 200px, (min-width: 640px) min(33vw, 12.5rem), 100vw",
      large: "(min-width: 1280px) 320px, (min-width: 1024px) 280px, (min-width: 768px) 220px, (min-width: 640px) min(36vw, 14rem), 100vw",
    } as const satisfies Record<MondyHeroFloatingCardPreset, string>,
  },

  /**
   * Hand mock (`Handmock.webp`) — tweak layout here instead of hunting classes in Hero.tsx.
   *
   * - **frame**: column width (`w-*`, `max-w-*`). Wider = larger image.
   * - **stack**: margin between headline and image (e.g. `-mt-[4vh]` to pull up with viewport height).
   * - **nudge**: Horizontal shift stays in `px`; vertical shift uses **`vh`** — positive `translate-y-[Nvh]` = down, negative = up.
   * - **img**: `object-*` and shadow; try `object-center` or `object-[50%_40%]` to reframe the asset.
   */
  handImage: {
    frame: cn(
      "relative z-10 w-[160%] sm:w-[112%] md:w-[60%]  shrink-0 self-center",
    ),
    stack: "",
    nudge:
      "relative will-change-transform translate-x-[-16vh] translate-y-[-1vh] md:-translate-x-[72px] md:translate-y-[-2.5vh] lg:-translate-x-[140px]  xl:-translate-x-[20vh] ",
    img: "relative z-0 w-full h-auto object-contain object-bottom drop-shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)]",
  },
} as const;
