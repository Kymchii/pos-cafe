import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    }
  },
  devIndicators: false,
  images: {
    domains: ['https://vlkxzaakgznxcikaayxa.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vlkxzaakgznxcikaayxa.supabase.co',
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
