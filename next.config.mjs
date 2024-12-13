/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Specify the protocol
        hostname: "admin.alexanderdevonne.com", // Hostname for remote images
      },
      {
        protocol: "https", // Specify the protocol
        hostname: "sumanpatwary.com", // Hostname for remote images
      },
    ],
  },
  
};

export default nextConfig;
