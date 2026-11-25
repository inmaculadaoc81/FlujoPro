import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mapas del sitio de la web antigua (WordPress) que Google aún pide.
  async redirects() {
    return [
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/:wp(.*-sitemap[0-9]*[.]xml)", destination: "/sitemap.xml", permanent: true },
    ];
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
