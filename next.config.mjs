/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.bluemove.net",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
  // distDir: "build",
};

export default nextConfig;
