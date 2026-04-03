import { cn } from "@/lib/utils";

export const CARD_RADIUS = "rounded-mondy-inner";

/** Soft lift; matches ink tone used elsewhere on pricing CTAs. */
export const CARD_SHADOW =
  "shadow-[0_2px_20px_-6px_rgba(28,26,23,0.08),0_8px_32px_-16px_rgba(28,26,23,0.06)]";

/** Flex column; fills grid cell; clips inner to radius. */
export const SIDE_OUTER_LAYOUT =
  "flex h-full min-h-0 flex-col overflow-hidden";

/** White stroke color, card fill, elevation. */
export const SIDE_OUTER_SURFACE = cn("border-white bg-mondy-card", CARD_SHADOW);

/** 5px stroke — inner content width = column − 10px (border-box). */
export const SIDE_OUTER_STROKE = "border-[5px]";

export const INNER_RADIUS_TB_CLASS =
  "rounded-t-[calc(2.5rem-5px)] rounded-b-[calc(2.5rem-5px)]";

export const FEATURED_SHELL_GRADIENT =
  "bg-gradient-to-r from-[#FFBDAA] to-[#88A3E6]";
