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
      }
    ],
  },
};

export default nextConfig;
