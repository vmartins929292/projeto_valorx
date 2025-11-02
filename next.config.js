/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['figma.com', 'figma-alpha-api.s3.us-west-2.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.NODE_ENV === 'development', // Desabilita otimização em desenvolvimento
  },
}

module.exports = nextConfig

