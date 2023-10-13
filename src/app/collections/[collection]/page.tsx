import { notFound } from "next/navigation";
import { type Metadata } from "next/types";
import { ProductList } from "@/app/ui/organisms/ProductList";
import { PaginationList } from "@/app/ui/molecules/PaginationList";
import { getProductsByCollectionSlug } from "@/api/products";

const capitalizeFirstLetter = (phrase: string) => {
	return phrase
		.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
	};

export const generateMetadata = async ({
	params,
}: {
	params: { collection: string; pagination: string };
}): Promise<Metadata> => {
	const collection = params.collection;

	return {
		title: `${capitalizeFirstLetter(collection.replace("-", " "))}`,
		description: `${capitalizeFirstLetter(collection.replace("-", " "))} - My Little Ecommerce`,
	};
};

export default async function ProductsPage({
	params,
}: {
	params: { collection: string; pagination: string };
}) {
	const products = await getProductsByCollectionSlug(params.collection);
	if (!products) {
		throw notFound();
	}
	return (
		<section className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl ">
			<h1 className="mb-5 capitalize">
				{params.collection.replace("-", " ")}
			</h1>
			<ProductList products={products.slice(0, 4)} />
			<PaginationList
				aria-label="Pagination"
				paginationLenght={Math.ceil(products.length / 4)}
				currentPagination={1}
			/>
		</section>
	);
}
