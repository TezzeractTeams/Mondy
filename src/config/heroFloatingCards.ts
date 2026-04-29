/**
 * Hero floating postcard layout — standalone module (no `cn`, no `mondy.ts`)
 * so Turbopack client chunks always resolve a defined export.
 */
export type MondyHeroFloatingCardPreset = "compact" | "cozy" | "comfortable" | "large";

export const mondyHeroFloatingCards = {
  activePreset: "compact" as MondyHeroFloatingCardPreset,
  presetWidths: {
    compact:
      "sm:w-[min(26vw,9rem)] md:w-[152px] lg:w-[180px] xl:w-[200px]",
    cozy: "sm:w-[min(30vw,11rem)] md:w-[180px] lg:w-[212px] xl:w-[240px]",
    comfortable:
      "sm:w-[min(33vw,12.5rem)] md:w-[200px] lg:w-[248px] xl:w-[280px]",
    large:
      "sm:w-[min(36vw,14rem)] md:w-[220px] lg:w-[280px] xl:w-[320px]",
  },
  presetSizes: {
    compact:
      "(min-width: 1280px) 200px, (min-width: 1024px) 180px, (min-width: 768px) 152px, (min-width: 640px) min(26vw, 9rem), 100vw",
    cozy: "(min-width: 1280px) 240px, (min-width: 1024px) 212px, (min-width: 768px) 180px, (min-width: 640px) min(30vw, 11rem), 100vw",
    comfortable:
      "(min-width: 1280px) 280px, (min-width: 1024px) 248px, (min-width: 768px) 200px, (min-width: 640px) min(33vw, 12.5rem), 100vw",
    large: "(min-width: 1280px) 320px, (min-width: 1024px) 280px, (min-width: 768px) 220px, (min-width: 640px) min(36vw, 14rem), 100vw",
  },
} as const;
