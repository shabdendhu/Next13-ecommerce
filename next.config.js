/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "acharpapad.in"], // Add the domain here
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
