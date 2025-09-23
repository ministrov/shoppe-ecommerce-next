import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // domains: ['http://localhost:3000'],
    unoptimized: process.env.NODE_ENV === 'production' ? false : true, // Optional: disable optimization in dev
  },
};

export default nextConfig;
