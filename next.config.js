/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "yourcdn.com",
      },
      {
        protocol: "https",
        hostname: "youtube.com",
      },
    ],
  },
}

module.exports = nextConfig



