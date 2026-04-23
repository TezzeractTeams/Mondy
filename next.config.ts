import type { NextConfig } from "next";
import path from "path";

const appDir = path.join(__dirname);
const tailwindcssPkg = path.join(appDir, "node_modules/tailwindcss");

const isDev = process.env.NODE_ENV === "development";

/** Tight enough for common tags; GTM may still require additions if new third parties load. */
const contentSecurityPolicy = [
  "default-src 'self'",
  [
    "script-src 'self'",
    "'unsafe-inline'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    "https://www.googletagmanager.com",
    "https://tagmanager.google.com",
    "https://www.google-analytics.com",
    "https://ssl.google-analytics.com",
    "https://www.google.com",
    "https://www.gstatic.com",
    "https://challenges.cloudflare.com",
    "https://www.recaptcha.net",
    "https://googleads.g.doubleclick.net",
    "https://www.googletagservices.com",
    "https://www.clarity.ms",
    "https://scripts.clarity.ms",
  ].join(" "),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  [
    "connect-src 'self'",
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://analytics.google.com",
    "https://stats.g.doubleclick.net",
    "https://www.googletagmanager.com",
    "https://challenges.cloudflare.com",
    "https://lottie.host",
    "https://www.clarity.ms",
    "https://*.clarity.ms",
  ].join(" "),
  "worker-src 'self' blob:",
  "frame-src 'self' https://www.googletagmanager.com https://www.google.com https://challenges.cloudflare.com https://www.recaptcha.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
  images: {
    qualities: [75, 92],
  },
  // Use this app as tracing root when a parent folder has another lockfile (avoids wrong bundle roots).
  outputFileTracingRoot: appDir,
  // When the shell cwd is the parent folder (…/Mondy), Turbopack/PostCSS may resolve from the wrong tree.
  // Pin the bundler root and tailwindcss to this app’s node_modules.
  turbopack: {
    root: appDir,
    resolveAlias: {
      tailwindcss: tailwindcssPkg,
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      tailwindcss: tailwindcssPkg,
    };
    return config;
  },
};

export default nextConfig;
