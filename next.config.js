

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    experimental: {
        typedRoutes: false,
        mdxRs: true
    },
};

const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig)
