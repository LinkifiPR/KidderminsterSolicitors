import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/legal-guides/conveyancing-solicitor-costs-kidderminster/",
        destination:
          "/legal-guides/how-much-do-conveyancing-solicitors-cost-in-kidderminster/",
        permanent: true,
      },
      {
        source: "/legal-guides/buying-house-kidderminster-legal-checklist/",
        destination:
          "/legal-guides/buying-a-house-in-kidderminster-legal-checklist/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
