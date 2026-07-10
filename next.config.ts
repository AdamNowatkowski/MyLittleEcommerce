import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
	output: "standalone",
	pageExtensions: ["ts", "tsx", "mdx"],
	typedRoutes: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "media.graphassets.com",
			},
		],
	},
	redirects: async () => {
		return [
			{
				source: "/categories/t-shirts",
				destination: "/categories/t-shirts/1",
				permanent: false,
			},
			{
				source: "/products",
				destination: "/products/1",
				permanent: false,
			},
			{
				source: "/categories/hoodies",
				destination: "/categories/hoodies/1",
				permanent: false,
			},
			{
				source: "/categories/accessories",
				destination: "/categories/accessories/1",
				permanent: false,
			},
		];
	},
};

const withMDX = createMDX();
export default withMDX(nextConfig);
