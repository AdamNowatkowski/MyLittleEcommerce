import { notFound } from "next/navigation";
import { type Metadata } from "next/types";
import { PaginationList } from "@/app/ui/molecules/PaginationList";
import { ProductList } from "@/app/ui/organisms/ProductList";
import { getProductsByCollectionSlug } from "@/api/products";

// TBA
// export const generateStaticParams = async ({
// 	params,
// }: {
// 	params: { category: string };
// }) => {
// 	if (params.category === "summer-vibes") {
// 		return [{ pageNumber: "1" }, { pageNumber: "2" }];
// 	} else if (params.category === "hoodies") {
// 		return [{ pageNumber: "1" }, { pageNumber: "2" }, { pageNumber: "3" }];
// 	} else if (params.category === "accessories") {
// 		return [{ pageNumber: "1" }];
// 	} else {
// 		return [];
// 	}
// };

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

export default async function CollectionProductPage({
	params,
}: {
	params: { collection: string; pagination: string };
}) {
	const products = await getProductsByCollectionSlug(params.collection);
	if (!products) {
		throw notFound();
	}
	const paginationValidation =
		parseInt(params.pagination) - 1 > Math.ceil(products.length) / 4 ||
		parseInt(params.pagination) <= 0 ||
		isNaN(parseInt(params.pagination));

	if (paginationValidation) {
		throw notFound();
	}

	return (
		<section className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl ">
			<h1 className="mb-5 capitalize">{params.collection.replace("-", " ")}</h1>
			<ProductList products={products} pagination={params.pagination} />
			<PaginationList
				aria-label="pagination1"
				paginationLenght={Math.ceil(products.length / 4)}
				currentPagination={parseInt(params.pagination)}
			/>
		</section>
	);
}
