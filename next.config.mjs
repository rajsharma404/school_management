/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'img.freepik.com' },
            { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
            { protocol: 'https', hostname: 'images.rawpixel.com' }
        ],
    },
    reactStrictMode: true,

    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
                    { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
                ],
            },
        ];
    },

    async redirects() {
        return [
            {
                source: "/",
                has: [
                    {
                        type: "cookie",
                        key: "token",
                        value: ".*", // Redirect if token exists
                    },
                ],
                destination: "/dashboard",
                permanent: false,
            },
            {
                source: "/dashboard",
                has: [
                    {
                        type: "cookie",
                        key: "token",
                        value: "", // Redirect if no token exists
                    },
                ],
                destination: "/login",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
