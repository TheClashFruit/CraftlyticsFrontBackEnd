/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: [
      'mongoose'
    ],
    layers: true
  },
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true
    };

    return config;
  }
};

module.exports = nextConfig;
