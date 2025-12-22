const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // This flag is accepted by Next.js at runtime even if not in the TS type.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
};

export default nextConfig;