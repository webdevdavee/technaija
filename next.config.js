/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["razziwp.com", "flagsapi.com", "utfs.io"],
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
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
