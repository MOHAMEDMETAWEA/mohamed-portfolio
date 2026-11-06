import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export — most reliable deployment on Netlify (no serverless
  // functions, no Next.js runtime on the server). Output goes to ./out
  output: "export",

  // Static export can't run the server-side image optimizer.
  // Serves images as-is from /public.
  images: {
    unoptimized: true,
  },

  reactStrictMode: true,
};

export default nextConfig;
