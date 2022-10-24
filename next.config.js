/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.nftstorage.link",
      },
      {
        protocol: "https",
        hostname: "**.arweave.net",
      },
      {
        protocol: "https",
        hostname: "arweave.net",
      },
      {
        protocol: "https",
        hostname: "ipfs.io",
      },
      {
        protocol: "https",
        hostname: "**.ipfs.io",
      },
      {
        protocol: "https",
        hostname: "**.dweb.link",
      },
      {
        protocol: "https",
        hostname: "dweb.link",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudflare-ipfs.com",
      },
      {
        protocol: "https",
        hostname: "famousfoxes.com",
      },
      {
        protocol: "https",
        hostname: "genesysgo.net",
      },
      {
        protocol: "https",
        hostname: "**.genesysgo.net",
      },
      { protocol: "https", hostname: "mypinata.cloud" },
      { protocol: "https", hostname: "**.mypinata.cloud" },
    ],
  },
};

module.exports = nextConfig;
