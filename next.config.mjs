// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         unoptimized: true,
//         remotePatterns: [
//             { protocol: 'https', hostname: 'img.freepik.com' },
//             { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
//             { protocol: 'https', hostname: 'images.rawpixel.com' }
//         ],
//     },
//     output: 'export',
//     trailingSlash: true,
//     reactStrictMode: true,
// };

// export default nextConfig;
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
};

export default nextConfig;
