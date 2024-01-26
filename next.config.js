/** @type {import('next').NextConfig} */
const nextConfig = {
  target: "serverless",
  target: "experimental-serverless-trace",
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
