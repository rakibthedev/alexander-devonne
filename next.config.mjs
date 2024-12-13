/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Specify the protocol
        hostname: "admin.alexanderdevonne.com", // Hostname for remote images
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*', // Match all API routes dynamically
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=1800, stale-while-revalidate', // Cache API responses for 3600 seconds
          },
        ],
      },
    ];
  },
};

export default nextConfig;
