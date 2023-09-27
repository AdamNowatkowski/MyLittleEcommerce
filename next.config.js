/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["ts", "tsx", "mdx"],
	experimental: {
		typedRoutes: true,
		mdxRs: true,
		serverActions: true,
	},
	images: {
		domains: ["media.graphassets.com"],
	},
	redirects: async () => {
		return [
			{
				source: "/products/categories/t-shirts",
				destination: "/products/categories/t-shirts/1",
				permanent: false,
			},
			{
				source: "/products/categories/hoodies",
				destination: "/products/categories/hoodies/1",
				permanent: false,
			},
			{
				source: "/products/categories/accessories",
				destination: "/products/categories/accessories/1",
				permanent: false,
			},
		];
	},
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
