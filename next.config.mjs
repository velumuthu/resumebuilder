/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'cdn.builder.io' },
            { protocol: 'https', hostname: 'i.imghippo.com' },
            { protocol: 'https', hostname: 'i.ytimg.com' },
        ],
    },
};

export default nextConfig;
