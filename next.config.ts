import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.0.103"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // port: "",
        // pathname: "/account123/**",
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/auth/:path*",
  //       destination:
  //         process.env.NODE_ENV === "development"
  //           ? "http://localhost:5000/api/v1/:path*"
  //           : "https://movievault-api.vercel.app/api/v1/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
