import { notFound } from "next/navigation";
import { ProductList } from "@/app/ui/organisms/ProductList";
import { PaginationList } from "@/app/ui/molecules/PaginationList";
import { getProductsByCategorySlug } from "@/api/products";

export default async function ProductsPage({
	params,
}: {
	params: { category: string; pagination: string };
}) {
	const products = await getProductsByCategorySlug(params.category);
	if (!products) {
		throw notFound();
	}
	return (
		<section className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl ">
			<ProductList products={products.slice(0, 4)} />
			<PaginationList
				aria-label="Pagination"
				paginationLenght={Math.ceil(products.length / 4)}
				currentPagination={1}
			/>
		</section>
	);
}
