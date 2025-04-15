/** @type {import('next').NextConfig} */

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: 'standalone',
    images: {
        unoptimized: true,

        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
            },
        ],
    },
};
const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl(nextConfig);
