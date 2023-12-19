/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["files.augse.in", "www.augse.in", "localhost"],
  },
};

module.exports = nextConfig;
