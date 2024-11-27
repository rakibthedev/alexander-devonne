
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https", // or http
          hostname: "sumanpatwary.com", // if your website has no www, drop it
        },
      ],
    },
  };
  
export default nextConfig;
