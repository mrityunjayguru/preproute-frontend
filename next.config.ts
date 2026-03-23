// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     remotePatterns: [
//       // YouTube thumbnails
//       {
//         protocol: "https",
//         hostname: "img.youtube.com",
//         pathname: "/**",
//       },

//       // AWS S3 images (YOUR FIX)
//       {
//         protocol: "https",
//         hostname: "trackroute.s3.ap-south-1.amazonaws.com",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default nextConfig;


const nextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // 🔥 Cache busting (VERY IMPORTANT)
  generateBuildId: async () => {
    return Date.now().toString();
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trackroute.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },

  // 🔥 Headers fix (MOST IMPORTANT)
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;