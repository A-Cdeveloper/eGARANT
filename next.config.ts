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
        hostname: "moccasin-obedient-guanaco-455.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;
