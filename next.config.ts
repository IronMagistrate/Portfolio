import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NShuttle and the staff dashboard used to have their own case studies; since 25 Nov 2026
  // they are part of the one Novo case study. Keep old links working.
  async redirects() {
    return [
      { source: "/work/nshuttle", destination: "/work/novo", permanent: true },
      { source: "/work/novo-admin", destination: "/work/novo", permanent: true },
    ];
  },
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
