import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/uploads/:filename*',
          destination: '/api/files/:filename*',
        },
      ],
    };
  },
};

export default nextConfig;
