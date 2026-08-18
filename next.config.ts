import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/festival-aquatico",
        destination: "/eventos/festival-aquatico",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;