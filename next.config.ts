import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages.
  output: "export",
  // Only apply GitHub Pages path prefix in production build.
  ...(isProd
    ? {
        basePath: "/portfolio-2026",
        assetPrefix: "/portfolio-2026",
      }
    : {}),
};

export default nextConfig;
