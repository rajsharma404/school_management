/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true, // Disables Next.js Image Optimization (needed for static export)
        remotePatterns: [
            { protocol: 'https', hostname: 'img.freepik.com' },
            { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
            { protocol: 'https', hostname: 'images.rawpixel.com' }
        ],
    },
    output: 'export',
    trailingSlash: true, // Ensures correct routing for static exports
    reactStrictMode: true,
};

export default nextConfig;
