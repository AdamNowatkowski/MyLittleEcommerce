import { notFound } from "next/navigation";
import { getSearchProducts } from "@/api/products";
import { ProductList } from "@/app/ui/organisms/ProductList";

export default async function SearchPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] };
}) {
	if (!searchParams.query) {
		throw notFound();
	}
	const products = await getSearchProducts(searchParams.query as string);
	// if (!products[0]) {
	// 	throw notFound();
	// }

	return (
		<div>
			<h1>Search results for {searchParams.query}:</h1>
			{products[0] ? (
				<ProductList products={products} />
			) : (
				<h1>No results</h1>
			)}
		</div>
	);
}
