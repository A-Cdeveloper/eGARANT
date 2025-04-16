import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "gold-solid-chameleon-765.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;
