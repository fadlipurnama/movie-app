import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Inisialisasi plugin
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
};

// Export config yang sudah dibungkus plugin
export default withNextIntl(nextConfig);
