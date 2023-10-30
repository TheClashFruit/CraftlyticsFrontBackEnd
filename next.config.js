/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: [
      'mongoose'
    ]
  }
};

module.exports = nextConfig;
