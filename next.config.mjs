/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "necessary-porpoise-368.convex.cloud" },
    ],
  },
};

export default nextConfig;
