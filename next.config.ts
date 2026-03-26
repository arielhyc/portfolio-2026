import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages.
  output: "export",
  // GitHub Pages is hosted under:
  // https://arielhyc.github.io/portfolio-2026/
  // so we must prefix all asset paths to avoid 404 at "/_next/*".
  basePath: "/portfolio-2026",
  assetPrefix: "/portfolio-2026",
};

export default nextConfig;
