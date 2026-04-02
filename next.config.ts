import type { NextConfig } from "next";
import path from "path";

const appDir = path.join(__dirname);
const tailwindcssPkg = path.join(appDir, "node_modules/tailwindcss");

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 92],
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*\\.(png|jpg|jpeg|webp|gif|svg|ico|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
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
