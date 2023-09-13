import { type ReactNode } from "react";

export const generateStaticParams = async () => {
	return [
		{ category: "t-shirts" },
		{ category: "jackets" },
		{ category: "boots" },
	];
};

export default function CategoryProductPage({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
