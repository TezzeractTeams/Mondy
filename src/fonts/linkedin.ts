import localFont from "next/font/local";

/**
 * LinkedIn’s UI typeface is the proprietary “LinkedIn Sans”.
 * These Source Sans Pro files are the public family it was based on.
 */
export const linkedInSans = localFont({
  src: [
    { path: "./SourceSansPro-Light.ttf", weight: "300", style: "normal" },
    { path: "./SourceSansPro-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "./SourceSansPro-Regular.ttf", weight: "400", style: "normal" },
    { path: "./SourceSansPro-Italic.ttf", weight: "400", style: "italic" },
    { path: "./SourceSansPro-Semibold.ttf", weight: "600", style: "normal" },
    { path: "./SourceSansPro-SemiboldItalic.ttf", weight: "600", style: "italic" },
    { path: "./SourceSansPro-Semibold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-source-sans",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});
