import { notFound, usePathname } from "next/navigation";
import { ProductList } from "../../ui/organisms/ProductList";
import { getProductsList } from "../../../api/products";
import { PaginationList } from "../../ui/molecules/PaginationList";

export const generateStaticParams = async () => {
	return [
		{ pagination: "1" },
		{ pagination: "2" },
		{ pagination: "3" },
		{ pagination: "4" },
	];
};

export default async function ProductsPage({
	params,
}: {
	params: { pagination: string };
}) {
	const products = await getProductsList();

	const paginationValidation =
		parseInt(params.pagination) > products.length / 4 ||
		parseInt(params.pagination) <= 0 ||
		isNaN(parseInt(params.pagination));
	if (paginationValidation) {
		notFound();
	}

	const paginatedProducts = products.slice(
		parseInt(params.pagination) * 4 - 4,
		parseInt(params.pagination) * 4,
	);
	return (
		<section className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl ">
			<ProductList products={paginatedProducts} />
			<PaginationList
				aria-label="pagination1"
				paginationLenght={Math.ceil(products.length / 4)}
				currentPagination={parseInt(params.pagination)}
			/>
		</section>
	);
}
