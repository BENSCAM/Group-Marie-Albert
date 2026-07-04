import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/api/files/:path*',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
