import { notFound } from "next/navigation";
import { ProductList } from "@/app/ui/organisms/ProductList";
import { getProductsByCategorySlug } from "@/api/products";

export const generateStaticParams = async ({
	params,
}: {
	params: { category: string };
}) => {
	if (params.category === "t-shirts") {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	} else if (params.category === "hoodies") {
		return [{ pageNumber: "1" }, { pageNumber: "2" }, { pageNumber: "3" }];
	} else if (params.category === "accessories") {
		return [{ pageNumber: "1" }];
	} else {
		return [];
	}
};

export default async function CategoryProductPage({
	params,
}: {
	params: { category: string; pageNumber: string };
}) {
	const products = await getProductsByCategorySlug(params.category)

	if (!products) {
		throw notFound;
	}
	return (
		<>
			<h1>Category: {params.category}</h1>
			<h2>Page: {params.pageNumber}</h2>
			<ProductList products={products} />
		</>
	);
}
