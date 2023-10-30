const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: [
      'mongoose'
    ]
  },
  generateBuildId: () => {
    return process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  },
  sassOptions: {
    includePaths: [ path.join(__dirname, 'styles') ],
  }
};

module.exports = nextConfig;
