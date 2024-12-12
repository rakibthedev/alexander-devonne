/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // or http
        hostname: "admin.alexanderdevonne.com", // Use strings for hostnames
      },
    ],
  },
};

export default nextConfig;
