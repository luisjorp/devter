import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // This pattern is used to load images from the GitHub CDN
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        // This pattern is used to load images from the Twitter CDN
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
      },
      {
        // This pattern is used to load images from the Firebase Storage CDN
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
      }
    ],
  },
};

export default withPlaiceholder(nextConfig);
