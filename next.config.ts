import {NextConfig} from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
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
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
