/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ["i.pravatar.cc"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "lottie-react"],
  },
};

export default nextConfig;
