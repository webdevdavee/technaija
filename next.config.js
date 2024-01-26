/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["razziwp.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "razziwp.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
