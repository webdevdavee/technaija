/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["razziwp.com", "flagsapi.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "razziwp.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "flagsapi.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
