import { notFound } from "next/navigation";
import { getSearchProducts } from "@/api/products";
import { ProductList } from "@/app/ui/organisms/ProductList";

export default async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
	const params = await searchParams;
	if (!params.query) {
		throw notFound();
	}
	const products = await getSearchProducts(params.query as string);

	return (
		<div>
			<h1>Search results for {params.query}:</h1>
			{products[0] ? (
				<ProductList products={products}  pagination="1"/>
			) : (
				<h1>No results</h1>
			)}
		</div>
	);
}
