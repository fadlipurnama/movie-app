import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Inisialisasi plugin
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
};

// Export config yang sudah dibungkus plugin
export default withNextIntl(nextConfig);
